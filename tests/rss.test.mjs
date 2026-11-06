import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { load } from 'cheerio/slim';
import { freshness } from '../src/lib/enso.ts';
import { renderRss } from '../src/lib/rss.ts';

const seed = JSON.parse(await readFile(new URL('../src/data/official.json', import.meta.url), 'utf8'));

test('RSS preserves source dates and does not republish unchanged data on retrieval', () => {
  const first = renderRss(seed, []);
  const refreshed = structuredClone(seed);
  for (const key of ['discussion', 'weekly', 'forecast']) {
    refreshed[key].retrievedAt = refreshed[key].checkedAt = '2026-11-06T00:00:00Z';
  }
  assert.equal(renderRss(refreshed, []), first);
  const $ = load(first, { xmlMode: true });
  assert.equal($('item').length, 5);
  assert.equal($('lastBuildDate').length, 0);
  assert.equal($('item').eq(0).find('pubDate').text(), new Date(seed.discussion.data.issued).toUTCString());
  assert.equal($('item').eq(1).find('pubDate').length, 0);
  assert.equal($('item').eq(2).find('pubDate').length, 0);
  assert.ok($('item').eq(2).find('description').text().includes('observation center week'));
});

test('RSS exposes failed checks and expired fallback data without replacing valid observations', () => {
  const failed = structuredClone(seed);
  failed.forecast.error = 'Source check failed; showing the last validated data.';
  failed.forecast.checkedAt = '2026-11-06T00:00:00Z';
  const $ = load(renderRss(failed, ['forecast']), { xmlMode: true });
  assert.match($('channel > description').text(), /Data status: degraded/);
  const description = $('item').eq(1).find('description').text();
  assert.match(description, /source check failed/);
  assert.ok(description.includes(failed.forecast.checkedAt));
  assert.ok(description.includes(failed.forecast.retrievedAt));
  assert.doesNotMatch($('item').eq(0).find('description').text(), /Data status/);
  const expired = load(renderRss(seed, freshness(seed, new Date('2026-12-01T00:00:00Z'))), { xmlMode: true });
  assert.match(expired('item').eq(2).find('description').text(), /out of date/);
  assert.ok(expired('item').eq(2).find('guid').text().includes(seed.weekly.data.at(-1).date));
});

test('RSS escapes official text and remains readable XML', () => {
  const snapshot = structuredClone(seed);
  snapshot.discussion.data.synopsis = `A & B < C > D "quoted" 'text'`;
  const xml = renderRss(snapshot, []);
  assert.ok(xml.includes('A &amp; B &lt; C &gt; D &quot;quoted&quot; &apos;text&apos;'));
  const $ = load(xml, { xmlMode: true });
  assert.ok($('item').first().find('description').text().includes(snapshot.discussion.data.synopsis));
});
