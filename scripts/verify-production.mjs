import assert from 'node:assert/strict';
import { load } from 'cheerio/slim';

const indexable = process.env.ENSOLENS_EXPECT_INDEXING === 'true';
const host = 'https://ensolens.com';
const paths = ['/', '/forecast/', '/historical/', '/faq/', '/winter-outlook/', '/methodology/', '/about/', '/privacy/'];
async function request(path, options = {}) {
  return fetch(path.startsWith('http') ? path : host + path, { signal: AbortSignal.timeout(30000), ...options });
}
for (const path of paths) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get('x-robots-tag'), indexable ? /^index, follow$/ : /noindex/);
  const html = await response.text();
  assert.doesNotMatch(html, /hurricane|cyclone|sister-project|same independent builder/i, path);
  const $ = load(html);
  assert.equal($('link[rel=canonical]').attr('href'), host + path);
  assert.match($('meta[name=robots]').attr('content'), indexable ? /^index, follow$/ : /noindex/);
  assert.ok($('meta[name=description]').attr('content')?.length > 20);
  const schema = JSON.parse($('script[type="application/ld+json"]').text());
  assert.equal(schema['@type'], path === '/faq/' ? 'FAQPage' : 'WebSite');
  if (path === '/faq/') {
    assert.equal(schema.url, host + path);
    assert.equal(schema.mainEntity.length, $('.faq-item').length);
    assert.ok(schema.mainEntity.every(question => question['@type'] === 'Question' && question.acceptedAnswer['@type'] === 'Answer'));
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
assert.doesNotMatch(sitemap, /hurricane/i);
for (const path of paths) assert.ok(sitemap.includes('<loc>' + host + path + '</loc>'));
const missing = await request('/missing-page-check/');
const retired = await request('/hurricane-connection/');
assert.equal(retired.status, 404);
assert.match(retired.headers.get('x-robots-tag'), /noindex/);
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
