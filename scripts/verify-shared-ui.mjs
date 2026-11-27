import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

export async function verifySharedUI(browser, base, output) {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    try {
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `${width}px: homepage has no page overflow`);
      assert.equal(await page.locator('.next-steps a').count(), 3);
      assert.ok(await page.locator('.next-steps').evaluate(el => el.getBoundingClientRect().top < document.querySelector('.overview-grid').getBoundingClientRect().top));
      assert.equal(await page.locator('.desktop-nav a[href="/learn/"]').count(), 1);
      const payload = JSON.parse(await page.locator('#trend-data').textContent());
      await page.getByText('View trend data', { exact: true }).click();
      for (const months of [12, 6, 12]) {
        await page.getByRole('button', { name: months + 'M', exact: true }).click();
        const latest = Math.max(Date.parse(payload.weekly.at(-1).date), Date.parse(payload.roni.at(-1).date));
        const cutoff = new Date(latest);
        cutoff.setUTCMonth(cutoff.getUTCMonth() - months);
        const expected = [
          ...payload.weekly.map(p => ({ date: p.date, value: p.anomaly, series: 'Weekly Niño 3.4' })),
          ...payload.roni.map(p => ({ date: p.date, value: p.value, series: 'Seasonal RONI' })),
        ].filter(p => Date.parse(p.date) >= +cutoff).sort((a, b) => b.date.localeCompare(a.date) || a.series.localeCompare(b.series));
        const rows = await page.locator('#trend-table tbody tr:not([hidden])').evaluateAll(rows => rows.map(row => ({ date: row.dataset.trendDate, series: row.cells[1].textContent, value: Number(row.cells[2].textContent) })));
        assert.deepEqual(rows, expected, `${width}px: rendered table matches official data for ${months} months`);
        assert.equal(await page.locator('#trend-table-range').textContent(), months + ' months');
      }
      await page.locator('.trend-data-details').screenshot({ path: fileURLToPath(new URL('shared-table-' + width + '.png', output)) });
      await page.locator('.trend-data-details > summary').click();
      const before = await page.locator('#ocean-image').boundingBox();
      await page.getByRole('button', { name: 'Expand ocean map', exact: true }).click();
      const after = await page.locator('#ocean-image').boundingBox();
      assert.ok(after.width > before.width, `${width}px: map must actually enlarge (${before.width} → ${after.width})`);
      assert.equal(await page.locator('#expand-map').isVisible(), false);
      assert.match(await page.getByRole('link', { name: 'Open this figure at original size' }).getAttribute('href'), /^\/api\/ocean-map\?version=/);
      await page.screenshot({ path: fileURLToPath(new URL('shared-map-' + width + '.png', output)) });
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => document.activeElement === document.querySelector('#expand-map'));
      assert.equal(await page.locator('#expand-map').evaluate(el => document.activeElement === el), true);
      assert.equal(await page.locator('#map-dialog').evaluate(el => el.open), false);
      if (width <= 800) {
        for (const selector of ['.mobile-menu', '.download-data', '#expand-map', '.segmented button']) {
          for (const rect of await page.locator(selector).evaluateAll(es => es.map(e => { const r = e.getBoundingClientRect(); return { w: r.width, h: r.height }; }))) {
            assert.ok(rect.w >= 44 && rect.h >= 44, `${selector} has a 44px touch target`);
          }
        }
        await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
        const styles = await page.locator('#mobile-navigation a').evaluateAll(es => es.map(e => ({ current: e.getAttribute('aria-current'), weight: getComputedStyle(e).fontWeight })));
        assert.ok(Number(styles.find(e => e.current === 'page').weight) > Number(styles.find(e => !e.current).weight));
        await page.locator('#mobile-navigation a').first().focus();
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#mobile-navigation').isVisible(), false);
        assert.equal(await page.locator('.mobile-menu').evaluate(el => document.activeElement === el), true);
      }
      assert.ok(await page.locator('.prototype-strip').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 12));
      assert.ok(await page.locator('.footer-note').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 14));
      await page.locator('.trend-section').scrollIntoViewIfNeeded();
      await page.screenshot({ path: fileURLToPath(new URL('shared-trend-' + width + '.png', output)) });
      await page.goto(base + '/methodology/#indices', { waitUntil: 'networkidle' });
      const bounds = await page.evaluate(() => ({ target: document.querySelector('#indices').getBoundingClientRect().top, header: document.querySelector('.site-header').getBoundingClientRect().bottom }));
      assert.ok(bounds.target > bounds.header, `${width}px: anchor clears sticky header`);
      await page.goto(base + '/forecast/', { waitUntil: 'networkidle' });
      await page.locator('#compare-forecast').focus();
      const focus = await page.locator('#compare-forecast').evaluate(input => ({ visible: input.matches(':focus-visible'), outline: getComputedStyle(input.nextElementSibling).outlineStyle, width: parseFloat(getComputedStyle(input.nextElementSibling).outlineWidth) }));
      assert.equal(focus.visible, true);
      assert.equal(focus.outline, 'solid');
      assert.ok(focus.width >= 2);
      await page.keyboard.press('Space');
      assert.equal(await page.locator('#compare-forecast').isChecked(), true);
      await page.locator('.compare-toggle').screenshot({ path: fileURLToPath(new URL('shared-focus-' + width + '.png', output)) });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `${width}px: forecast has no page overflow`);
      await page.goto(base + '/impacts/california-snow-vs-rain/', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('header [aria-current="page"]').count(), 0, 'Regional child is not the directory URL');
      const prose = await page.locator('.body-copy').first().evaluate(el => ({ size: parseFloat(getComputedStyle(el).fontSize), width: el.getBoundingClientRect().width }));
      assert.ok(prose.size >= 16);
      assert.ok(prose.width <= 900, 'Long prose retains a reading measure');
      assert.ok(await page.locator('.body-copy a').first().evaluate(el => getComputedStyle(el).textDecorationLine.includes('underline')));
      await page.screenshot({ path: fileURLToPath(new URL('reading-' + width + '.png', output)), fullPage: true });
      await page.goto(base + '/faq/', { waitUntil: 'networkidle' });
      if (width <= 900) assert.equal(await page.locator('.faq-category-tag').first().isVisible(), false);
      await page.locator('.faq-question').first().click();
      assert.equal(await page.locator('.faq-item').first().getAttribute('open'), '');
      await page.screenshot({ path: fileURLToPath(new URL('faq-' + width + '.png', output)) });
      for (const [question, href, target] of [
        ['enso-basics', '/forecast/enso-neutral/#neutral-check-heading', '#neutral-check-heading'],
        ['nino-34-threshold', '/learn/nino-regions-explained/#section-1', '#section-1'],
        ['local-weather-guarantee', '/impacts/california-snow-vs-rain/#california-outlook-heading', '#california-outlook-heading'],
      ]) {
        await page.goto(base + '/faq/#' + question, { waitUntil: 'networkidle' });
        const link = page.locator('#' + question + ' a[href="' + href + '"]');
        assert.equal(await link.isVisible(), true);
        assert.ok(await link.evaluate(el => getComputedStyle(el).textDecorationLine.includes('underline')));
        await page.waitForFunction(id => document.getElementById(id).getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().bottom, question);
        await link.press('Enter');
        await page.waitForURL(base + href);
        await page.waitForLoadState('networkidle');
        const destination = await page.locator(target).boundingBox();
        const header = await page.locator('.site-header').boundingBox();
        assert.ok(destination.y >= header.y + header.height, `${width}px: FAQ destination clears header`);
      }
      console.log(`PASS shared UI ${width}px: data table/ranges, enlarged map, touch targets, navigation, anchor and keyboard focus`);
    } finally { await context.close(); }
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(base + '/');
    await page.locator('.trend-data-details > summary').click();
    assert.ok(await page.locator('#trend-table tbody tr:not([hidden])').count() > 0);
    console.log('PASS trend data table is rendered and readable without JavaScript');
  } finally { await context.close(); }
}
