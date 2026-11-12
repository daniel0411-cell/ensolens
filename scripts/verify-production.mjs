import assert from 'node:assert/strict';
import { load } from 'cheerio/slim';

const indexable = process.env.ENSOLENS_EXPECT_INDEXING === 'true';
const host = 'https://ensolens.com';
const paths = ['/', '/forecast/', '/forecast/when-will-it-end/', '/forecast/enso-neutral/', '/impacts/', '/impacts/california-snow-vs-rain/', '/impacts/pacific-northwest-winter/', '/historical/', '/faq/', '/winter-outlook/', '/hurricane-connection/', '/methodology/', '/about/', '/privacy/'];
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
    assert.equal($('#status-reading-heading').length, 1);
    assert.equal($('a[href="/forecast/#reading-probabilities-heading"]').length, 1);
    assert.equal($('.scenario-card a[href="/impacts/california-snow-vs-rain/"]').length, 1);
    assert.equal($('.scenario-card a[href="/hurricane-connection/"]').length, 0);
    for (const href of ['/impacts/', '/impacts/pacific-northwest-winter/', '/forecast/enso-neutral/']) assert.ok($(`main a[href="${href}"]`).length, href + ' must be discoverable from homepage');
  }
  assert.equal($('link[rel=canonical]').attr('href'), host + path);
  assert.match($('meta[name=robots]').attr('content'), indexable ? /^index, follow$/ : /noindex/);
  assert.ok($('meta[name=description]').attr('content')?.length > 20);
  assert.equal(JSON.parse($('script[type="application/ld+json"]').first().text())['@type'], 'WebSite');
  if (['/forecast/when-will-it-end/', '/impacts/california-snow-vs-rain/', '/impacts/pacific-northwest-winter/', '/forecast/enso-neutral/'].includes(path)) {
    const faq = JSON.parse($('script[type="application/ld+json"]').last().text());
    assert.equal(faq['@type'], 'FAQPage');
    assert.equal(faq.mainEntity.length, 3);
    for (const item of faq.mainEntity) {
      assert.ok($('main').text().includes(item.name));
      assert.ok($('main').text().includes(item.acceptedAnswer.text));
    }
  }
  assert.doesNotMatch($('main').text(), /illustrative|synthetic|example phase/i);
  if (path === '/forecast/when-will-it-end/') {
    for (const id of ['monitoring-change-heading', 'spring-barrier-heading', 'double-dip-heading']) assert.equal($('#' + id).length, 1);
    assert.equal($('.evidence-table tbody tr').length, 4);
    assert.equal($('.source-note a[href^="https://www.climate.gov/news-features/blogs/enso/"]').length, 2);
    assert.match($('main').text(), /historical examples, not analog forecasts/);
    assert.match($('main').text(), /Temporary neutral conditions can separate winter episodes/);
  }
  if (path === '/impacts/' || path === '/impacts/pacific-northwest-winter/' || path === '/forecast/enso-neutral/') {
    assert.equal($('h1').length, 1);
    assert.match($('.eyebrow').first().text(), /NOVEMBER 12, 2026/);
    for (const element of $('main a[href^="/"]').toArray()) {
      const target = $(element).attr('href').split('#')[0];
      assert.ok(paths.includes(target) || target.startsWith('/images/'), path + ' has an unknown internal destination: ' + target);
    }
    for (const element of $('main img').toArray()) {
      const asset = await request($(element).attr('src'));
      assert.equal(asset.status, 200);
      assert.match(asset.headers.get('content-type'), /image\/jpeg/);
    }
  }
  if (path === '/forecast/') {
    assert.equal($('#reading-probabilities-heading').length, 1);
    assert.match($('section[aria-labelledby="reading-probabilities-heading"]').text(), /teaching example, not a current CPC forecast/);
    assert.equal($('#wmo-record-heading').text(), 'Will this El Niño be the strongest on record?');
    assert.match($('section[aria-labelledby="wmo-record-heading"]').text(), /November 9, 2026.+not confirmation/s);
    assert.equal($('section[aria-labelledby="wmo-record-heading"] a[href="https://wmo.int/news/media-centre/state-of-climate-2026-gives-new-meaning-phrase-charts"]').length, 1);
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
      assert.equal(visible.find('.faq-answer > p').first().text(), load(item.acceptedAnswer.text.replace(/<br\s*\/?>/g, '\n')).text());
    }
    assert.equal($('#super-el-nino').length, 1);
    assert.match($('#alerts-explained').text(), /not a waiting requirement/);
    assert.equal($('#alerts-explained a[href$="enso-alert-readme.shtml"]').length, 1);
  }
  if (path === '/historical/') {
    const analog = JSON.parse($('#analog-data').text());
    for (const b of analog.benchmarks) {
      assert.ok($('.analog-summary-table').text().includes(b.peakDate));
      assert.equal(b.extreme.anomaly, b.peakAnomaly);
      assert.equal(b.extreme.date, b.peakDate);
    }
    assert.match($('.analog-summary-table').text(), /-1.7°C/);
    assert.equal($('#analog-limits-heading').length, 1);
    assert.equal($('a[href$="wksst9120.for"]').length, 1);
  }
  if (path === '/winter-outlook/') {
    assert.equal($('#forecast-horizon-heading').length, 1);
    assert.equal($('#winter-variability-heading').length, 1);
    for (const product of ['WK34', '610day', '814day', '30day']) {
      assert.equal($('a[href="https://www.cpc.ncep.noaa.gov/products/predictions/' + product + '/"]').length, 1);
    }
    assert.equal($('.outlook-maps img').length, 2);
    for (const image of $('.outlook-maps img').toArray()) {
      const asset = await request($(image).attr('src'));
      assert.equal(asset.status, 200);
      assert.match(asset.headers.get('content-type'), /image\/gif/);
      assert.ok((await asset.arrayBuffer()).byteLength > 10000);
    }
  }
  if (path === '/impacts/california-snow-vs-rain/') {
    assert.equal($('#swe-percent-heading').length, 1);
    assert.match($('main').text(), /Hypothetical example/);
    assert.equal($('a[href="https://www.drought.gov/topics/snow-drought"]').length, 1);
  }
  if (path === '/impacts/pacific-northwest-winter/') {
    assert.equal($('#snow-drought-heading').length, 1);
    assert.equal($('a[href="/impacts/california-snow-vs-rain/#swe-percent-heading"]').length, 1);
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
for (const path of ['/', '/forecast/', '/forecast/when-will-it-end/', '/faq/', '/historical/', '/winter-outlook/', '/impacts/', '/impacts/california-snow-vs-rain/', '/impacts/pacific-northwest-winter/', '/forecast/enso-neutral/']) {
  const entry = sitemapXml('url').filter((_, element) => sitemapXml(element).find('loc').text() === host + path);
  const expected = '2026-11-12';
  assert.equal(entry.find('lastmod').text(), expected);
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
