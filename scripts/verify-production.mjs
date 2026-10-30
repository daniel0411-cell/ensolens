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
  const $ = load(await response.text());
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
const robots = await (await request('/robots.txt')).text();
assert.match(robots, indexable ? /Allow: \/\n/ : /Disallow: \/\n/);
if (indexable) assert.match(robots, /Sitemap: https:\/\/ensolens.com\/sitemap.xml/);
const sitemap = await (await request('/sitemap.xml')).text();
for (const path of paths) assert.ok(sitemap.includes('<loc>' + host + path + '</loc>'));
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
