import assert from 'node:assert/strict';
import { load } from 'cheerio/slim';

const indexable = process.env.ENSOLENS_EXPECT_INDEXING === 'true';
const host = 'https://ensolens.com';
const paths = ['/', '/forecast/', '/forecast/when-will-it-end/', '/impacts/california-snow-vs-rain/', '/historical/', '/faq/', '/winter-outlook/', '/hurricane-connection/', '/methodology/', '/about/', '/privacy/'];
async function request(path, options = {}) {
  return fetch(path.startsWith('http') ? path : host + path, { signal: AbortSignal.timeout(30000), ...options });
}
for (const path of paths) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get('x-robots-tag'), indexable ? /^index, follow$/ : /noindex/);
  const html = await response.text();
  assert.doesNotMatch(html, /hurricanetracker\.cc|hurricanehub|Hurricane Tracker|same independent builder|same publisher as/i, path + ' must not expose cross-site branding');
  const $ = load(html);
  assert.equal($('nav a[href="/hurricane-connection/"]').length, 0, 'Hurricane topic is not a primary navigation item');
  if (path === '/') {
    assert.equal($('h1').text(), 'Current ENSO status.');
    assert.match($('title').text(), /Current ENSO Status: El Niño & La Niña Tracker/);
    assert.match($('.page-intro p').text(), /NOAA CPC reports .+ discussion\..+Niño 3.4.+Next scheduled discussion:/);
    assert.equal($('.sister-project-banner').length, 0);
    assert.equal($('.scenario-card a[href="/impacts/california-snow-vs-rain/"]').length, 1);
    assert.equal($('.scenario-card a[href="/hurricane-connection/"]').length, 0);
  }
  assert.equal($('link[rel=canonical]').attr('href'), host + path);
  assert.match($('meta[name=robots]').attr('content'), indexable ? /^index, follow$/ : /noindex/);
  assert.ok($('meta[name=description]').attr('content')?.length > 20);
  assert.equal(JSON.parse($('script[type="application/ld+json"]').first().text())['@type'], 'WebSite');
  if (path === '/forecast/when-will-it-end/' || path === '/impacts/california-snow-vs-rain/') {
    const faq = JSON.parse($('script[type="application/ld+json"]').last().text());
    assert.equal(faq['@type'], 'FAQPage');
    assert.equal(faq.mainEntity.length, 3);
    for (const item of faq.mainEntity) {
      assert.ok($('main').text().includes(item.name));
      assert.ok($('main').text().includes(item.acceptedAnswer.text));
    }
  }
  assert.doesNotMatch($('main').text(), /illustrative|synthetic|example phase/i);
  if (path === '/forecast/') {
    assert.equal($('#super-el-nino-heading').text(), 'What is a super El Niño?');
    assert.equal($('h1').text(), 'El Niño & La Niña forecast.');
    const current = JSON.parse($('#forecast-data').text()).current;
    const target = current.rows.find(row => row.season === 'DJF') ?? current.rows[0];
    assert.ok($('.page-intro p').text().includes(`${target.nino}% El Niño, ${target.neutral}% neutral and ${target.nina}% La Niña`));
    assert.match($('#strength-table caption').text(), /October 2026.*dated reference/);
    assert.equal($('#strength-table tbody tr').length, 2);
  }
  if (path === '/faq/') {
    const faq = JSON.parse($('script[type="application/ld+json"]').first().text()).mainEntity;
    assert.equal(faq['@type'], 'FAQPage');
    assert.equal(faq.mainEntity.length, $('.faq-item').length);
    for (const item of faq.mainEntity) {
      const visible = $('.faq-item').filter((_, element) => $(element).find('.faq-title').text() === item.name);
      assert.equal(visible.length, 1);
      assert.equal(visible.find('.faq-answer > p').text(), load(item.acceptedAnswer.text.replace(/<br\s*\/?>/g, '\n')).text());
    }
    assert.equal($('#super-el-nino').length, 1);
  }
  if (path === '/winter-outlook/') {
    assert.equal($('.outlook-maps img').length, 2);
    for (const image of $('.outlook-maps img').toArray()) {
      const asset = await request($(image).attr('src'));
      assert.equal(asset.status, 200);
      assert.match(asset.headers.get('content-type'), /image\/gif/);
      assert.ok((await asset.arrayBuffer()).byteLength > 10000);
    }
  }
  if (path === '/') {
    const forecast = JSON.parse($('#forecast-data').text());
    const trend = JSON.parse($('#trend-data').text());
    assert.equal(forecast.current.rows.length, 9);
    assert.ok(trend.weekly.length >= 52);
    const image = await request($('#ocean-image').attr('src'));
    assert.equal(image.status, 200);
    assert.match(image.headers.get('x-robots-tag'), /noindex/);
    assert.ok((await image.arrayBuffer()).byteLength > 1000);
  }
  console.log('PASS production', path, 'status, canonical, metadata, indexing and source data');
}
const healthResponse = await request('/api/status/');
assert.equal(healthResponse.status, 200);
const health = await healthResponse.json();
assert.equal(health.status, 'ok');
assert.deepEqual(health.stale, []);
const rssResponse = await request('/rss.xml');
assert.equal(rssResponse.status, 200);
assert.equal(rssResponse.headers.get('content-type'), 'application/xml; charset=utf-8');
assert.equal(rssResponse.headers.get('cache-control'), 'public, max-age=3600');
const rss = load(await rssResponse.text(), { xmlMode: true });
assert.equal(rss('rss').attr('version'), '2.0');
assert.equal(rss('item').length, 5);
assert.equal(rss('lastBuildDate').length, 0);
assert.equal(rss('item').eq(1).find('pubDate').length, 0);
assert.equal(rss('item').eq(2).find('pubDate').length, 0);
assert.doesNotMatch(rss('channel > description').text(), /Data status: degraded/);
console.log('PASS production RSS response headers, items and source date semantics');
const robots = await (await request('/robots.txt')).text();
assert.match(robots, indexable ? /Allow: \/\n/ : /Disallow: \/\n/);
if (indexable) assert.match(robots, /Sitemap: https:\/\/ensolens.com\/sitemap.xml/);
const sitemap = await (await request('/sitemap.xml')).text();
for (const path of paths) assert.ok(sitemap.includes('<loc>' + host + path + '</loc>'));
const sitemapXml = load(sitemap, { xmlMode: true });
assert.equal(sitemapXml('url').length, paths.length);
for (const entry of sitemapXml('url').toArray()) {
  const modified = sitemapXml(entry).find('lastmod').text();
  if (modified) {
    assert.match(modified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Date.parse(modified) <= Date.now(), 'Sitemap dates must not be in the future');
  }
}
for (const path of ['/', '/forecast/', '/faq/', '/winter-outlook/']) {
  const entry = sitemapXml('url').filter((_, element) => sitemapXml(element).find('loc').text() === host + path);
  assert.equal(entry.find('lastmod').text(), path === '/winter-outlook/' ? '2026-11-08' : '2026-11-10');
}
const missing = await request('/missing-page-check/');
assert.equal(missing.status, 404);
assert.match(missing.headers.get('x-robots-tag'), /noindex/);
const missingHtml = load(await missing.text());
assert.match(missingHtml('meta[name=robots]').attr('content'), /noindex/);
for (const url of ['https://www.ensolens.com/forecast/?view=compare', 'http://ensolens.com/forecast/?view=compare']) {
  const response = await request(url, { redirect: 'manual' });
  assert.ok([301, 308].includes(response.status));
  assert.equal(response.headers.get('location'), host + '/forecast/?view=compare');
}
console.log('PASS production health, robots, sitemap, 404 and canonical redirects', JSON.stringify(health.dates));
