import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

export async function verifyReadingUpdates(browser, base, output) {
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      const weekly = JSON.parse(await page.locator('#trend-data').textContent()).weekly;
      const latest = weekly.at(-1), previous = weekly.at(-2);
      const comparison = await page.locator('.weekly-comparison').innerText();
      assert.ok(comparison.includes(previous.anomaly.toFixed(1)));
      assert.ok(comparison.includes((latest.anomaly - previous.anomaly).toFixed(1)));
      assert.ok((await page.locator('.page-intro p').innerText()).startsWith('NOAA CPC reports '));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.screenshot({ path: fileURLToPath(new URL(`reading-home-${width}.png`, output)) });
      await page.goto(base + '/historical/#weekly-lookup-heading', { waitUntil: 'networkidle' });
      const data = JSON.parse(await page.locator('#analog-data').textContent());
      const series = [{ year: data.currentYear, weeks: data.current }, ...data.benchmarks.map(b => ({ year: b.id, weeks: b.weeks }))];
      for (const item of series) {
        const details = page.locator(`.weekly-year:has([data-weekly-year="${item.year}"])`);
        const summary = details.locator('summary');
        await summary.focus();
        await page.keyboard.press('Enter');
        assert.equal(await details.getAttribute('open'), '');
        const rows = await details.locator('tbody tr').evaluateAll(rows => rows.map(row => ({ date: row.cells[0].textContent, sst: Number(row.cells[1].textContent), anomaly: Number(row.cells[2].textContent.replace('°C', '')) })));
        assert.deepEqual(rows, [...item.weeks].reverse().map(p => ({ date: p.date, sst: p.sst, anomaly: p.anomaly })), 'Every visible weekly value matches chart data');
        const frame = details.locator('[role="region"]');
        await frame.focus();
        if (await frame.evaluate(el => el.scrollHeight > el.clientHeight)) {
          await page.keyboard.press('End');
          await page.waitForFunction(year => {
            const region = document.querySelector(`[data-weekly-year="${year}"]`).closest('[role="region"]');
            return region.scrollTop >= region.scrollHeight - region.clientHeight - 2;
          }, item.year);
          assert.ok(await frame.evaluate(el => el.scrollTop > 0), 'Overflowing year can be scrolled with keyboard');
        } else {
          assert.equal(await details.locator('tbody tr').last().isVisible(), true, 'Short year is fully readable without scrolling');
        }
        await frame.evaluate(el => el.scrollTo({ top: 0, behavior: 'instant' }));
        if (item.year === data.currentYear) {
          await summary.scrollIntoViewIfNeeded();
          await page.screenshot({ path: fileURLToPath(new URL(`reading-historical-${width}.png`, output)) });
        }
        await summary.click();
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.goto(base + '/impacts/california-snow-vs-rain/#dwr-report-heading', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.dwr-example tbody tr').count(), 4);
      assert.match(await page.locator('#dwr-report-heading').locator('..').innerText(), /November 13, 2026/);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.screenshot({ path: fileURLToPath(new URL(`reading-dwr-${width}.png`, output)) });
      console.log(`PASS reading updates ${width}x1000: status, exact weekly rows, keyboard lookup, dated DWR example, no overflow`);
    } finally { await context.close(); }
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 1000 } });
  try {
    const page = await context.newPage();
    await page.goto(base + '/historical/');
    for (const details of await page.locator('.weekly-year').all()) {
      await details.locator('summary').click();
      assert.ok(await details.locator('tbody tr').count() > 0);
      assert.equal(await details.locator('tbody tr').first().isVisible(), true);
    }
    console.log('PASS all historical weekly tables readable without JavaScript');
  } finally { await context.close(); }
}
