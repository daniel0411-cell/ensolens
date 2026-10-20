import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseWeekly, parseForecast, parseDiscussion, refreshSnapshot, freshness, persistSnapshot, seasonLabel, previousIssue, fetchOfficial } from '../src/lib/enso.ts';

const seed = JSON.parse(await readFile(new URL('../src/data/official.json', import.meta.url), 'utf8'));
const now = new Date(seed.discussion.retrievedAt);

test('upstream fetch uses a Workers-compatible redirect mode and rejects redirects', async () => {
  await assert.rejects(fetchOfficial('https://www.cpc.ncep.noaa.gov/data/indices/wksst9120.for', async (_url, options) => {
    assert.equal(options.redirect, 'manual');
    return new Response(null, { status: 302, headers: { Location: 'https://example.org/' } });
  }), /HTTP 302/);
  await assert.rejects(fetchOfficial('https://example.org/private'), /Unexpected upstream host/);
});

function forecastFixture() {
  const names = ['NDJ', 'DJF', 'JFM', 'FMA', 'MAM', 'AMJ', 'MJJ', 'JJA', 'JAS'];
  return '<h2>Issued December 2026</h2>Relative Oceanic 1991<table id="probabilities-table">' + names.map(season => '<tr><th><abbr>' + season + '</abbr></th><td>10</td><td>20</td><td>70</td></tr>').join('') + '</table>';
}

test('forecast targets preserve their center year across December and January', () => {
  const result = parseForecast(forecastFixture(), undefined, new Date('2026-12-20'));
  assert.equal(result.rows[0].key, '2026-12');
  assert.equal(result.rows[1].key, '2027-01');
  assert.equal(seasonLabel(result.rows[0]), 'NDJ 2026-27');
  assert.equal(seasonLabel(result.rows[1]), 'DJF 2026-27');
  assert.equal(previousIssue('2027-01'), '2026-12');
  assert.throws(() => parseForecast(forecastFixture().replace('<td>10</td>', '<td></td>'), undefined, new Date('2026-12-20')), /probability/);
  assert.throws(() => parseForecast(forecastFixture().replace('<td>70</td>', '<td>90</td>'), undefined, new Date('2026-12-20')), /sum/);
  assert.throws(() => parseForecast(forecastFixture(), undefined, new Date('2026-10-20')), /future/);
});

test('fixed-width weekly input parses joined negative anomalies without shifting columns', () => {
  const lines = Array.from({ length: 52 }, (_, i) => {
    const date = new Date(Date.UTC(2025, 0, 1 + i * 7));
    const label = String(date.getUTCDate()).padStart(2, '0') + date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase() + date.getUTCFullYear();
    return label + ' 20.6-0.1 24.0-0.2 26.0-0.3 28.0-0.4';
  });
  const points = parseWeekly('Nino34\n' + lines.join('\n'), now);
  assert.equal(points.at(-1).sst, 26);
  assert.equal(points.at(-1).anomaly, -0.3);
  assert.throws(() => parseWeekly('Nino34\n' + [...lines, lines.at(-1)].join('\n'), now), /ordered/);
});

test('an ENSO Watch is not incorrectly labeled as an active event', () => {
  const html = '<p>8 October 2026 ENSO Alert System Status: <a href="enso-alert-readme">El Niño Watch</a></p><p><u>Synopsis:</u><strong>ENSO-neutral conditions continued during the past month.</strong></p><p>The next ENSO Diagnostics Discussion is scheduled for 12 November 2026.</p>';
  assert.equal(parseDiscussion(html, now).phase, 'ENSO-neutral');
});

test('failed upstream checks retain all valid values and their retrieval dates', async () => {
  const next = await refreshSnapshot(seed, async () => { throw new Error('Simulated upstream outage'); }, now);
  for (const key of ['discussion', 'weekly', 'roni', 'forecast', 'map']) {
    assert.deepEqual(next[key].data, seed[key].data);
    assert.equal(next[key].retrievedAt, seed[key].retrievedAt);
    assert.match(next[key].error, /last validated/);
    assert.ok(freshness(next, now).includes(key));
  }
  assert.deepEqual(next.previous, seed.previous);
  assert.equal(freshness(seed, now).length, 0);
  assert.ok(freshness(seed, new Date(+now + 3 * 86400000)).length > 0);
});

test('KV writes preserve image and forecast revisions before publishing the snapshot', async () => {
  const writes = [];
  const store = { async put(key, value) { writes.push([key, JSON.parse(value)]); } };
  await persistSnapshot(store, seed, null);
  assert.match(writes[0][0], /^map:/);
  assert.match(writes[1][0], /^forecast:/);
  assert.equal(writes.at(-1)[0], 'snapshot:v1');
  const broken = { async put(key) { if (key.startsWith('map:')) throw new Error('KV unavailable'); } };
  await assert.rejects(persistSnapshot(broken, seed, null), /KV unavailable/);
});
