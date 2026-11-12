import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';

let base = process.env.ENSOLENS_TEST_URL;
let server;
if (!base) {
  const socket = createServer();
  await new Promise((resolve, reject) => { socket.on('error', reject); socket.listen(0, '127.0.0.1', resolve); });
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  base = 'http://127.0.0.1:' + port;
  server = spawn(process.execPath, ['node_modules/wrangler/bin/wrangler.js', 'dev', '--config', 'dist/server/wrangler.json', '--ip', '127.0.0.1', '--local-upstream', 'localhost', '--port', String(port), '--test-scheduled'], { env: { ...process.env, WRANGLER_LOG_PATH: '.wrangler/logs' }, stdio: ['ignore', 'pipe', 'pipe'] });
}
const output = new URL('../.playwright/', import.meta.url);
await mkdir(output, { recursive: true });
let browser;
try {
  const deadline = Date.now() + 45000;
  while (true) {
    try { const response = await fetch(base + '/api/status', { signal: AbortSignal.timeout(1500) }); if (response.status === 200 || response.status === 503) break; } catch {}
    if (Date.now() > deadline) throw new Error('Worker preview did not become ready');
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  if (server) {
    const beforeRefresh = Date.now();
    const response = await fetch(base + '/cdn-cgi/local/scheduled?cron=15%20*%2F6%20*%20*%20*', { signal: AbortSignal.timeout(50000) });
    assert.equal(response.status, 200, 'Scheduled NOAA refresh failed: ' + await response.text());
    const health = await (await fetch(base + '/api/status/')).json();
    assert.equal(health.status, 'ok', JSON.stringify(health));
    assert.ok(Date.parse(health.feeds.weekly.checkedAt) >= beforeRefresh, 'Scheduled refresh must write a new KV snapshot');
    console.log('PASS real Worker scheduled refresh: NOAA validation, KV persistence and healthy status');
  }
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const rssResponse = await fetch(base + '/rss.xml');
  assert.equal(rssResponse.status, 200);
  assert.equal(rssResponse.headers.get('content-type'), 'application/xml; charset=utf-8');
  assert.equal(rssResponse.headers.get('cache-control'), 'public, max-age=3600');
  const rssPage = await browser.newPage();
  const rssCheck = await rssPage.evaluate(xml => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    return { errors: doc.querySelectorAll('parsererror').length, items: doc.querySelectorAll('item').length, buildDates: doc.querySelectorAll('lastBuildDate').length };
  }, await rssResponse.text());
  assert.deepEqual(rssCheck, { errors: 0, items: 5, buildDates: 0 });
  await rssPage.close();
  console.log('PASS RSS: real XML parsing, response headers and item count');
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1, acceptDownloads: true, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    assert.doesNotMatch(await page.content(), /hurricanetracker\.cc|hurricanehub|Hurricane Tracker|same independent builder|same publisher as/i);
    assert.equal(await page.locator('.sister-project-banner').count(), 0);
    assert.equal(await page.locator('nav a[href="/hurricane-connection/"]').count(), 0);
    assert.equal(await page.locator('.scenario-card a[href="/impacts/california-snow-vs-rain/"]').count(), 1);
    const scale = page.locator('.status-scale-wrap');
    const label = await scale.getAttribute('aria-label');
    const scaleValues = label.match(/anomaly: ([+-]?[\d.]+)°C; scale from -([\d.]+)°C to \+([\d.]+)°C/);
    assert.ok(scaleValues, 'Anomaly scale must identify the weekly value and range');
    const [, value, minimum, maximum] = scaleValues.map(Number);
    assert.equal(minimum, maximum);
    assert.ok(maximum >= Math.abs(value) + 0.5);
    const pinPosition = await page.locator('.status-scale-pin').evaluate(element => parseFloat(element.style.left));
    assert.ok(Math.abs(pinPosition - (value + maximum) / (2 * maximum) * 100) < 1e-8);
    const scaleBounds = await scale.boundingBox();
    assert.ok(scaleBounds && scaleBounds.x >= 0 && scaleBounds.x + scaleBounds.width <= width + 1);
    const contrasts = await page.locator('.stat-label, .snapshot-stamp span, .status-scale-labels, .status-scale-caption, .footer-note').evaluateAll(elements => {
      const rgba = color => color.match(/[\d.]+/g).map(Number);
      const over = (top, bottom) => top.slice(0, 3).map((channel, i) => channel * (top[3] ?? 1) + bottom[i] * (1 - (top[3] ?? 1)));
      const luminance = rgb => rgb.reduce((sum, channel, i) => {
        const c = channel / 255;
        return sum + [0.2126, 0.7152, 0.0722][i] * (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
      }, 0);
      return elements.filter(element => element.getClientRects().length).map(element => {
        const ancestors = [];
        for (let parent = element; parent; parent = parent.parentElement) ancestors.push(parent);
        let background = [255, 255, 255];
        for (const parent of ancestors.reverse()) background = over(rgba(getComputedStyle(parent).backgroundColor), background);
        const foreground = over(rgba(getComputedStyle(element).color), background);
        const light = luminance(foreground), dark = luminance(background);
        return { text: element.textContent, ratio: (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05) };
      });
    });
    for (const sample of contrasts) assert.ok(sample.ratio >= 4.5, `${sample.text}: contrast ${sample.ratio}`);
    await page.waitForFunction(() => [...document.querySelectorAll('canvas')].every(canvas => canvas.width > 0 && canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data.some((value, index) => index % 4 === 3 && value > 0)));
    assert.equal(await page.locator('#ocean-image').evaluate(image => image.complete && image.naturalWidth > 100), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, 'Homepage overflow at ' + width);
    assert.doesNotMatch(await page.locator('main').innerText(), /illustrative|synthetic|example phase/i);
    await page.getByRole('button', { name: '6M', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: '6M', exact: true }).getAttribute('aria-pressed'), 'true');
    const trendDownload = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download official trend data as CSV' }).click();
    const trend = await trendDownload;
    assert.match(await readFile(await trend.path(), 'utf8'), /CPC seasonal RONI/);
    await page.getByRole('button', { name: 'Expand ocean map' }).click();
    assert.equal(await page.locator('#map-dialog').evaluate(dialog => dialog.open), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#map-dialog').evaluate(dialog => dialog.open), false);
    if (width === 390) {
      await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
      assert.equal(await page.locator('#mobile-navigation').isVisible(), true);
      await page.getByRole('button', { name: 'Close navigation', exact: true }).click();
    }
    await page.locator('section[aria-labelledby="status-reading-heading"]').screenshot({ path: fileURLToPath(new URL('status-reading-' + width + '.png', output)) });
    await page.screenshot({ path: fileURLToPath(new URL('dashboard-' + width + '.png', output)), fullPage: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: fileURLToPath(new URL('dashboard-' + width + '-viewport.png', output)), fullPage: false });
    await page.goto(base + '/forecast/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('head link[rel="alternate"][type="application/rss+xml"]').getAttribute('href'), '/rss.xml');
    assert.equal(await page.locator('footer a[href="/rss.xml"]').count(), 1);
    const nextRelease = page.locator('.content-notice').filter({ hasText: 'Next scheduled consensus release:' });
    assert.equal(await nextRelease.count(), 1);
    const noticeBounds = await nextRelease.boundingBox();
    assert.ok(noticeBounds && noticeBounds.x >= 0 && noticeBounds.x + noticeBounds.width <= width + 1);
    const forecastData = JSON.parse(await page.locator('#forecast-data').textContent());
    assert.match(await page.locator('#strength-table caption').innerText(), /October 2026.*dated reference/);
    assert.equal(await page.locator('#strength-table tbody tr').count(), 2);
    if (width === 390) {
      const strengthRegion = page.getByRole('region', { name: 'Dated ENSO strength probabilities', exact: true });
      assert.equal(await strengthRegion.evaluate(element => element.scrollWidth > element.clientWidth), true);
      await strengthRegion.focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForFunction(() => document.querySelector('[aria-label="Dated ENSO strength probabilities"]').scrollLeft > 0);
      await page.keyboard.press('ArrowLeft');
      await page.waitForFunction(() => document.querySelector('[aria-label="Dated ENSO strength probabilities"]').scrollLeft === 0);
    }
    await page.locator('#strength-table').screenshot({ path: fileURLToPath(new URL('strength-' + width + '.png', output)) });
    const comparisonRows = page.locator('section[aria-labelledby="comparison-heading"] table tbody tr');
    assert.equal(await comparisonRows.count(), forecastData.current.rows.length);
    for (const [index, row] of forecastData.current.rows.entries()) {
      const prior = forecastData.previous?.rows.find(item => item.key === row.key);
      const cells = comparisonRows.nth(index).locator('td');
      assert.equal(await cells.nth(0).innerText(), prior ? `${prior.nino}%` : '—');
      const delta = prior ? row.nino - prior.nino : null;
      assert.equal(await cells.nth(2).innerText(), delta === null ? 'Comparison unavailable' : delta === 0 ? '±0 pp' : `${delta > 0 ? '+' : ''}${delta} pp`);
    }
    await page.getByText('Previous issue', { exact: true }).click();
    assert.equal(await page.locator('#compare-forecast').isChecked(), true);
    assert.equal(await page.locator('#forecast-comparison').isVisible(), true);
    const probabilityDownload = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download official forecast probabilities', exact: true }).click();
    const forecast = await probabilityDownload;
    const csv = await readFile(await forecast.path(), 'utf8');
    assert.match(csv, /target_key/);
    assert.doesNotMatch(csv, /ILLUSTRATIVE/);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, 'Forecast overflow at ' + width);
    await page.screenshot({ path: fileURLToPath(new URL('forecast-' + width + '.png', output)), fullPage: true });
    await page.locator('section[aria-labelledby="wmo-record-heading"]').screenshot({ path: fileURLToPath(new URL('wmo-update-' + width + '.png', output)) });
    await page.locator('section[aria-labelledby="reading-probabilities-heading"]').screenshot({ path: fileURLToPath(new URL('probability-reading-' + width + '.png', output)) });
    for (const path of ['/forecast/when-will-it-end/', '/forecast/enso-neutral/', '/impacts/', '/impacts/california-snow-vs-rain/', '/impacts/pacific-northwest-winter/', '/historical/', '/faq/', '/winter-outlook/', '/hurricane-connection/', '/methodology/', '/about/', '/privacy/']) {
      const response = await page.goto(base + path, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, path);
      assert.doesNotMatch(await page.content(), /hurricanetracker\.cc|hurricanehub|Hurricane Tracker|same independent builder|same publisher as/i, path);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, path + ' overflow at ' + width);
      if (['/impacts/', '/impacts/pacific-northwest-winter/', '/forecast/enso-neutral/'].includes(path)) {
        assert.equal(await page.locator('h1').count(), 1);
        for (const img of await page.locator('main img').all()) {
          assert.equal(await img.evaluate(el => el.complete && el.naturalWidth > 500 && Number(el.getAttribute('width')) === el.naturalWidth && Number(el.getAttribute('height')) === el.naturalHeight), true, 'Guide image must decode and reserve its actual aspect ratio');
        }
        const table = page.locator('.probability-table-wrap');
        if (await table.count()) {
          await table.focus();
          const needsScroll = await table.evaluate(el => el.scrollWidth > el.clientWidth);
          if (needsScroll) {
            await page.keyboard.press('ArrowRight');
            await page.waitForFunction(() => document.querySelector('.probability-table-wrap').scrollLeft > 0);
          }
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        const name = path === '/impacts/' ? 'impacts' : path.includes('northwest') ? 'northwest' : 'neutral';
        await page.screenshot({ path: fileURLToPath(new URL(name + '-' + width + '.png', output)), fullPage: true });
      }
      if (path === '/winter-outlook/') {
        const maps = page.locator('.outlook-maps img');
        assert.equal(await maps.count(), 2);
        for (const map of await maps.all()) {
          assert.equal(await map.evaluate(image => image.complete && image.naturalWidth === 3300 && image.naturalHeight === 2550), true);
        }
        await page.screenshot({ path: fileURLToPath(new URL('winter-' + width + '.png', output)), fullPage: true });
      }
      if (path === '/faq/') {
        await page.locator('#faq-search').fill('super');
        assert.equal(await page.locator('.faq-item:visible').count(), 1);
        assert.equal(await page.locator('#faq-empty').isVisible(), false);
        await page.locator('#super-el-nino summary').click();
        assert.equal(await page.locator('#super-el-nino .faq-answer').isVisible(), true);
        assert.equal(await page.locator('.faq-num').last().textContent(), '10');
        await page.screenshot({ path: fileURLToPath(new URL('faq-strength-' + width + '.png', output)), fullPage: true });
        await page.locator('#faq-search').fill('');
        assert.equal(await page.locator('.faq-item:visible').count(), 10);
        await page.locator('#faq-search').fill('no-matching-question-12345');
        assert.equal(await page.locator('.faq-item:visible').count(), 0);
        assert.equal(await page.locator('#faq-empty').isVisible(), true);
        await page.locator('#faq-search').fill('');
      }
      if (path === '/historical/') {
        const canvas = page.locator('#analog-chart');
        await page.waitForFunction(() => {
          const canvas = document.querySelector('#analog-chart');
          if (!canvas || !canvas.width || !canvas.height) return false;
          const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
          return pixels.some((value, index) => index % 4 === 3 && value > 0);
        });
        await page.waitForFunction(() => document.querySelectorAll('[data-analog-toggle]').length === 4);
        for (const toggle of await page.locator('[data-analog-toggle]').all()) {
          const beforeToggle = await canvas.evaluate(canvas => canvas.toDataURL());
          await toggle.click();
          assert.equal(await toggle.getAttribute('aria-pressed'), 'false');
          await page.waitForFunction(previous => document.querySelector('#analog-chart').toDataURL() !== previous, beforeToggle);
          await toggle.click();
          assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
        }
        const analogDownload = page.waitForEvent('download');
        await page.getByRole('button', { name: 'Download official historical analog data as CSV', exact: true }).click();
        const analogCsv = await readFile(await (await analogDownload).path(), 'utf8');
        const analogData = JSON.parse(await page.locator('#analog-data').textContent());
        const expectedRows = 1 + analogData.current.length + analogData.benchmarks.reduce((count, item) => count + item.weeks.length, 0);
        assert.equal(analogCsv.split('\r\n').length, expectedRows);
        assert.match(analogCsv, /observation_date/);
        assert.ok(analogCsv.includes(analogData.current.at(-1).date));
        await canvas.screenshot({ path: fileURLToPath(new URL('historical-chart-' + width + '.png', output)) });
        await page.screenshot({ path: fileURLToPath(new URL('historical-' + width + '.png', output)), fullPage: true });
      }
      if (path === '/forecast/when-will-it-end/' || path === '/impacts/california-snow-vs-rain/') {
        assert.equal(await page.locator('h1').count(), 1);
        const faq = await page.locator('script[type="application/ld+json"]').last().textContent();
        assert.equal(JSON.parse(faq)['@type'], 'FAQPage');
        await page.screenshot({ path: fileURLToPath(new URL(path.includes('when-will') ? 'lifecycle-' + width + '.png' : 'california-' + width + '.png', output)), fullPage: true });
      }
    }
    const missing = await page.goto(base + '/missing-page-check/', { waitUntil: 'networkidle' });
    assert.equal(missing.status(), 404);
    assert.match(await page.locator('meta[name=robots]').getAttribute('content'), /noindex/);
    assert.deepEqual(errors, [], 'Browser JavaScript errors');
    console.log('PASS ' + width + 'px: pages, chart pixels, source image, range, comparison, CSV, map, navigation, overflow, 404');
    await context.close();
  }
} finally {
  await browser?.close();
  if (server) {
    server.kill('SIGTERM');
    await new Promise(resolve => server.once('exit', resolve));
  }
}
