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
