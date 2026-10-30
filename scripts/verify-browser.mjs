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
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1, acceptDownloads: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/', { waitUntil: 'networkidle' });
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
    await page.screenshot({ path: fileURLToPath(new URL('dashboard-' + width + '.png', output)), fullPage: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: fileURLToPath(new URL('dashboard-' + width + '-viewport.png', output)), fullPage: false });
    await page.goto(base + '/forecast/', { waitUntil: 'networkidle' });
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
    for (const path of ['/forecast/when-will-it-end/', '/impacts/california-snow-vs-rain/', '/historical/', '/faq/', '/winter-outlook/', '/hurricane-connection/', '/methodology/', '/about/', '/privacy/']) {
      const response = await page.goto(base + path, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, path);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, path + ' overflow at ' + width);
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
