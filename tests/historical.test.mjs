import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { calendarWeek } from '../src/lib/historical.ts';

test('calendar comparison retains late-year positions and leap-year week 53', () => {
  assert.equal(calendarWeek('2026-01-07'), 1);
  assert.equal(calendarWeek('2026-11-04'), 44);
  assert.equal(calendarWeek('2020-12-30'), 53);
  assert.equal(calendarWeek('1997-12-31'), 53);
  assert.equal(calendarWeek('2020-03-01'), 9);
});

test('benchmark metadata agrees with complete calendar-year series', async () => {
  const data = JSON.parse(await readFile(new URL('../src/data/historical-analogs.json', import.meta.url), 'utf8'));
  const expected = { '2015': [3, '2015-11-18'], '1997': [2.3, '1997-12-17'], '2023': [2.1, '2023-11-22'], '2020': [-1.7, '2020-10-28'] };
  for (const b of data.benchmarks) {
    const extreme = b.weeks.reduce((a, p) => Math.abs(p.anomaly) > Math.abs(a.anomaly) ? p : a);
    assert.deepEqual([b.peakAnomaly, b.peakDate], expected[b.id]);
    assert.equal(b.peakAnomaly, extreme.anomaly);
    assert.equal(b.peakDate, extreme.date);
    for (const p of b.weeks) {
      assert.ok(p.date.startsWith(b.id));
      assert.equal(p.week, calendarWeek(p.date));
    }
  }
});

test('historical view retains failed-source dates and follows observation year rather than clock year', async () => {
  const { historicalView } = await import('../src/lib/historical.ts');
  const { refreshSnapshot, freshness } = await import('../src/lib/enso.ts');
  const seed = JSON.parse(await readFile(new URL('../src/data/official.json', import.meta.url), 'utf8'));
  const now = new Date(seed.weekly.retrievedAt);
  const failed = await refreshSnapshot(seed, async () => { throw new Error('outage'); }, now);
  const view = historicalView(failed, freshness(failed, now));
  assert.ok(view.stale.includes('weekly'));
  assert.equal(view.latestDate, seed.weekly.data.at(-1).date);
  assert.equal(view.retrievedAt, seed.weekly.retrievedAt);
  assert.deepEqual(view.current.map(({week,...point})=>point), seed.weekly.data.filter(p=>p.date.startsWith(view.year)));
  // A clock rollover alone must not relabel December as January observations.
  assert.equal(historicalView(seed, freshness(seed, new Date('2027-01-01'))).year, seed.weekly.data.at(-1).date.slice(0,4));
  failed.weekly.data.push({date:'2027-01-06',anomaly:1.2,sst:27});
  const january = historicalView(failed, ['weekly']);
  assert.equal(january.year, '2027');
  assert.deepEqual(january.current, [{date:'2027-01-06',anomaly:1.2,sst:27,week:1}]);
});
