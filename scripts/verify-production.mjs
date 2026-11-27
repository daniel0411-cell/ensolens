import assert from 'node:assert/strict';
import { load } from 'cheerio/slim';

const indexable = process.env.ENSOLENS_EXPECT_INDEXING === 'true';
const host = 'https://ensolens.com';
const paths = ['/learn/', '/learn/kelvin-waves-and-enso/', '/learn/soi-vs-ocean-indices/', '/learn/nino-regions-explained/', '/learn/enso-and-climate-change/', '/learn/marine-heatwaves-vs-el-nino/', '/learn/el-nino-and-drought-recovery/', '/learn/enso-jet-stream-teleconnections/', '/learn/enso-model-plumes-and-probabilities/', '/learn/climate-normals-and-anomalies/', '/learn/how-enso-is-observed/', '/', '/forecast/', '/forecast/when-will-it-end/', '/forecast/enso-neutral/', '/impacts/', '/impacts/california-snow-vs-rain/', '/impacts/pacific-northwest-winter/', '/historical/', '/faq/', '/winter-outlook/', '/hurricane-connection/', '/methodology/', '/about/', '/privacy/'];
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
  assert.equal($('link[rel=sitemap]').attr('href'), '/sitemap.xml');
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
  if (path === '/learn/') assert.equal($('.library-grid article').length, 10);
  const newAnchors = { '/winter-outlook/': ['probability-examples-heading','seasonal-lead-example'], '/impacts/california-snow-vs-rain/': ['station-basin-heading'], '/impacts/pacific-northwest-winter/': ['early-swe-heading'] };
  for (const id of newAnchors[path] ?? []) assert.equal($('#' + id).length, 1);
  if (path === '/learn/enso-model-plumes-and-probabilities/' || path === '/forecast/when-will-it-end/') {
    assert.equal($('main a[href="https://www.gfdl.noaa.gov/prediction/november-2026-el-nino-predictions/"]').length, 1);
    assert.match($('main').text(), /October 31, 2027/);
    assert.match($('main').text(), /November 16/);
  }
  if (path === '/learn/enso-model-plumes-and-probabilities/') { assert.ok($('main').text().includes('not a calibrated probability')); assert.equal($('.sources a[href="https://forecast.ccsr.columbia.edu/forecasts/enso/methodology"]').length, 1); }
  if (path.startsWith('/learn/') && path !== '/learn/') {
    assert.equal($('h1').length, 1);
    assert.equal($('.guide-section').length, ({ '/learn/el-nino-and-drought-recovery/': 8, '/learn/enso-model-plumes-and-probabilities/': 7, '/learn/kelvin-waves-and-enso/': 5, '/learn/nino-regions-explained/': 5, '/learn/climate-normals-and-anomalies/': 5 }[path] ?? 4));
    assert.equal($('.checklist li').length, 3);
    const article = JSON.parse($('script[type="application/ld+json"]').last().text());
    assert.equal(article['@type'], 'Article');
    assert.equal(article.headline, $('h1').text());
    assert.equal(article.datePublished, '2026-11-12');
    assert.equal(article.dateModified, path === '/learn/enso-model-plumes-and-probabilities/' ? '2026-11-25' : ['/learn/kelvin-waves-and-enso/', '/learn/nino-regions-explained/', '/learn/climate-normals-and-anomalies/', '/learn/el-nino-and-drought-recovery/', '/learn/enso-model-plumes-and-probabilities/'].includes(path) ? '2026-11-23' : '2026-11-17');
    assert.equal($('.decision-card h2').length, 1);
    assert.ok($('.decision-card p').text().length > 100);
    assert.equal($('.teaching-figure').length, 1);
    assert.equal($('.section-evidence').length, ({ '/learn/el-nino-and-drought-recovery/': 8, '/learn/enso-model-plumes-and-probabilities/': 7, '/learn/kelvin-waves-and-enso/': 5, '/learn/nino-regions-explained/': 5, '/learn/climate-normals-and-anomalies/': 5 }[path] ?? 4));
    for(const a of $('.section-evidence a').toArray()) assert.equal($($(a).attr('href')).length,1);
    assert.equal(article.url, host + path);
    assert.deepEqual(article.citation, $('.sources a').toArray().map(el => $(el).attr('href')));
    for (const el of $('main a[href^="/"]').toArray()) assert.ok(paths.includes($(el).attr('href').split('#')[0]), path + ' unknown internal link');
  }
  assert.doesNotMatch($('main').text(), /illustrative|synthetic|example phase/i);
  if (path === '/forecast/when-will-it-end/') {
    for (const id of ['model-timing-heading', 'monitoring-change-heading', 'spring-barrier-heading', 'double-dip-heading']) assert.equal($('#' + id).length, 1);
    assert.equal($('.evidence-table tbody tr').length, 4);
    assert.equal($('.source-note a[href^="https://www.climate.gov/news-features/blogs/enso/"]').length, 2);
    assert.match($('main').text(), /historical examples, not analog forecasts/);
    assert.match($('main').text(), /Temporary neutral conditions can separate winter episodes/);
  }
  if (path === '/impacts/' || path === '/impacts/pacific-northwest-winter/' || path === '/forecast/enso-neutral/') {
    assert.equal($('h1').length, 1);
    assert.match($('.eyebrow').first().text(), path === '/forecast/enso-neutral/' ? /NOVEMBER 17, 2026/ : /NOVEMBER 21, 2026/);
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
  if (path === '/impacts/pacific-northwest-winter/') {
    assert.equal($('picture source[type="image/webp"]').length,1);
    for (const width of [700,1400]) {
      const asset = await request('/images/guides/northwest-snow-usfs-'+width+'.webp');
      assert.equal(asset.status,200);
      assert.match(asset.headers.get('content-type'),/image\/webp/);
      const size = (await asset.arrayBuffer()).byteLength;
      assert.ok(size > 1000 && size < 532048);
    }
  }
  if (path === '/forecast/') {
    assert.equal($('#roni-range-heading').length, 1);
    assert.equal($('.roni-ranges > div').length, 3);
    assert.deepEqual($('.roni-ranges strong').toArray().map(el => $(el).text()), ['+2.00 to +2.56°C', '+1.85 to +2.71°C', '+1.59 to +2.97°C']);
    assert.equal($('a[href="/references/roni-ranges-november-2026.txt"]').length, 2);
    assert.equal($('#range-visual').length, 1);
    assert.equal($('#range-visual .range-band').length, 3);
    assert.equal($('#reading-probabilities-heading').length, 1);
    assert.equal($('#revision-summary-heading').text(), 'What changed in this issue?');
    assert.match($('.revision-summary').text(), /identical seasonal targets, across all three ENSO phases/);
    assert.match($('section[aria-labelledby="reading-probabilities-heading"]').text(), /teaching example, not a current CPC forecast/);
    assert.equal($('#wmo-record-heading').text(), 'Will this El Niño be the strongest on record?');
    assert.match($('section[aria-labelledby="wmo-record-heading"]').text(), /November 9, 2026.+not an observed seasonal record/s);
    assert.equal($('section[aria-labelledby="wmo-record-heading"] a[href="https://wmo.int/news/media-centre/state-of-climate-2026-gives-new-meaning-phrase-charts"]').length, 1);
    assert.equal($('#super-el-nino-heading').text(), 'What is a super El Niño?');
    assert.equal($('h1').text(), 'El Niño & La Niña forecast.');
    assert.ok(html.indexOf('id="probability-heading"') < html.indexOf('id="november-update-heading"'));
    assert.equal($('a[href="/references/cpc-november-2026.txt"]').length,2);
    const current = JSON.parse($('#forecast-data').text()).current;
    const target = current.rows.find(row => row.season === 'DJF') ?? current.rows[0];
    assert.ok($('.page-intro p').text().includes(`${target.nino}% El Niño, ${target.neutral}% neutral and ${target.nina}% La Niña`));
    assert.match($('#strength-table caption').text(), /November 2026.*dated reference/);
    assert.equal($('#strength-table tbody tr').length, 2);
    assert.equal($('#november-update-heading').length, 1);
    assert.match($('section[aria-labelledby="november-update-heading"]').text(), /61%.+38%.+1%/);
    assert.deepEqual($('#strength-table tbody tr').toArray().map(el => $(el).find('td').toArray().map(td => $(td).text())), [['0%', '2%', '19%', '79%', '100%'], ['3%', '18%', '44%', '35%', '100%']]);

  }
  if (path === '/impacts/california-snow-vs-rain/') {
    assert.equal($('#snow-water-visual').length, 1);
    assert.equal($('#snow-water-visual .swe-water').length, 2);
    assert.match($('#snow-water-visual').text(), /57%/);
    assert.match($('#snow-water-visual').text(), /38%/);
  }
  if (path === '/faq/') {
    assert.match($('#enso-frequency').text(), /two to seven years/);
    assert.equal($('#enso-frequency a[href="/historical/#enso-frequency-heading"]').length, 1);
    assert.equal($('a[href="/methodology/#ocean-atmosphere-heading"]').length, 2);
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
  if (path === '/about/') {
    assert.equal($('form[action="/api/corrections/"]').length,1);
    assert.equal($('#correction-log-heading').length,1);
    assert.match($('main').text(), /AI assistance/);
  }
  if (path === '/historical/') {
    assert.equal($('#same-season-heading').length, 1);
    assert.equal($('#enso-frequency-heading').length, 1);
    assert.equal($('#event-years-heading').length, 1);
    assert.equal($('#season-visual .season-window').length, 5);
    assert.equal($('#season-visual .transition-cards > div').length, 3);
    assert.match($('main').text(), /five consecutive overlapping three-month seasons/);
    assert.match($('main').text(), /−1.0°C/);
    const analog = JSON.parse($('#analog-data').text());
    assert.ok(analog.current.every(p=>p.date.startsWith(analog.currentYear)));
    assert.ok($('main').text().includes(analog.current.at(-1).date));
    for (const b of analog.benchmarks) {
      assert.ok($('.analog-summary-table').text().includes(b.peakDate));
      assert.equal(b.extreme.anomaly, b.peakAnomaly);
      assert.equal(b.extreme.date, b.peakDate);
    }
    assert.match($('.analog-summary-table').text(), /-1.7°C/);
    assert.equal($('#analog-limits-heading').length, 1);
    assert.equal($('a[href$="wksst9120.for"]').length, 1);
  }
  if (path === '/methodology/') {
    assert.equal($('#index-worked-example-heading').length, 1);
    assert.equal($('#ocean-atmosphere-heading').length, 1);
    assert.equal($('a[href="https://www.weather.gov/fwd/basics"]').length, 1);
    assert.equal($('a[href="https://www.noaa.gov/understanding-el-nino"]').length, 1);
  }
  if (path === '/impacts/') assert.equal($('#current-winter-heading').length, 1);
  if (path === '/impacts/pacific-northwest-winter/') assert.equal($('#northwest-outlook-heading').length, 1);
  if (path === '/winter-outlook/') {
    assert.equal($('#november-changes-heading').length, 1);
    assert.match($('.eyebrow').first().text(), /CPC ISSUE NOVEMBER 19, 2026/);
    assert.equal($('.outlook-maps img[src^="/images/outlooks/2026-11/"]').length, 2);
    assert.equal($('#forecast-horizon-heading').length, 1);
    assert.equal($('#winter-variability-heading').length, 1);
    assert.equal($('#mjo-enso-heading').length, 1);
    assert.equal($('a[href="https://www.cpc.ncep.noaa.gov/products/precip/CWlink/MJO/mjo.shtml"]').length, 1);
    assert.equal($('a[href="https://www.climate.gov/news-features/blogs/enso/what-mjo-and-why-do-we-care"]').length, 1);
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
    assert.equal($('#california-outlook-heading').length, 1);
    assert.equal($('#swe-worked-example-heading').length, 1);
    assert.equal($('#swe-percent-heading').length, 1);
    assert.equal($('#atmospheric-river-heading').length, 1);
    assert.equal($('a[href="https://www.noaa.gov/stories/what-are-atmospheric-rivers"]').length, 1);
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
    // Editorial dates are recorded in the project's Asia/Shanghai calendar.
    const editorialToday = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    assert.ok(modified <= editorialToday, 'Sitemap dates must not be in the future (Asia/Shanghai)');
  }
}
for (const path of ['/learn/enso-model-plumes-and-probabilities/', '/', '/forecast/', '/forecast/when-will-it-end/', '/faq/', '/historical/', '/winter-outlook/', '/impacts/', '/impacts/california-snow-vs-rain/', '/impacts/pacific-northwest-winter/', '/forecast/enso-neutral/', '/methodology/']) {
  const entry = sitemapXml('url').filter((_, element) => sitemapXml(element).find('loc').text() === host + path);
  const expected = ['/','/faq/','/forecast/'].includes(path) ? '2026-11-27' : ['/forecast/when-will-it-end/', '/learn/enso-model-plumes-and-probabilities/'].includes(path) ? '2026-11-25' : ['/winter-outlook/', '/impacts/california-snow-vs-rain/', '/impacts/pacific-northwest-winter/', '/learn/kelvin-waves-and-enso/', '/learn/nino-regions-explained/', '/learn/climate-normals-and-anomalies/', '/learn/el-nino-and-drought-recovery/', '/learn/enso-model-plumes-and-probabilities/'].includes(path) ? '2026-11-23' : ['/faq/','/historical/','/forecast/','/winter-outlook/','/impacts/','/impacts/california-snow-vs-rain/','/impacts/pacific-northwest-winter/'].includes(path) ? '2026-11-21' : ['/historical/','/methodology/','/impacts/california-snow-vs-rain/'].includes(path) ? '2026-11-19' : ['/impacts/','/forecast/enso-neutral/','/winter-outlook/','/forecast/','/methodology/'].includes(path) ? '2026-11-17' : ['/faq/','/historical/','/forecast/when-will-it-end/','/impacts/california-snow-vs-rain/','/impacts/pacific-northwest-winter/'].includes(path) ? '2026-11-13' : '2026-11-12';
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

const readingRecord = await request('/references/reading-examples-2026-11-23.txt');
assert.equal(readingRecord.status, 200);
assert.match(await readingRecord.text(), /not a calibrated probability/);

const rangeRecord = await request('/references/roni-ranges-november-2026.txt');
assert.equal(rangeRecord.status, 200);
assert.match(await rangeRecord.text(), /DJF,1.59,1.85,2.00,2.28,2.56,2.71,2.97/);
const preserved = await fetch(host + '/references/cpc-november-2026.txt');
assert.equal(preserved.status,200);
assert.match(await preserved.text(), /DJF 2026–27,0,2,19,79,100/);
const winterRecord = await request('/references/winter-update-2026-11-21.txt');
assert.equal(winterRecord.status, 200);
assert.match(await winterRecord.text(), /Next scheduled seasonal issue: December 17, 2026/);

const worked = await request('/references/worked-examples-2026-11-19.txt');
assert.equal(worked.status, 200);
assert.match(await worked.text(), /2026 \| \+2.0/);
const correctionGet = await fetch(host + '/api/corrections/');
assert.equal(correctionGet.status,405);
assert.match(correctionGet.headers.get('x-robots-tag'),/noindex/);
console.log('PASS dated source record and private correction endpoint (read-only)');

const forecastReadingRecord = await request('/references/forecast-reading-2026-11-25.txt');
assert.equal(forecastReadingRecord.status, 200);
assert.match(await forecastReadingRecord.text(), /Thirty individual runs/);
console.log('PASS dated November 25 forecast-reading source record');
