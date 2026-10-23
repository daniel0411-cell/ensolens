import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { latestAnnualSeries, weeklyPeak } from '../src/lib/historical.ts';

const { benchmarks } = JSON.parse(await readFile(new URL('../src/data/historical-analogs.json', import.meta.url), 'utf8'));

test('historical comparison rolls into the latest observation year and retains calendar gaps and week 53', () => {
  const series = latestAnnualSeries([
    { date: '2026-12-30', anomaly: 1, sst: 27 },
    { date: '2027-01-06', anomaly: 1.1, sst: 27.1 },
    { date: '2027-01-20', anomaly: 1.2, sst: 27.2 },
    { date: '2027-12-31', anomaly: 1.3, sst: 27.3 },
  ]);
  assert.equal(series.year, 2027);
  assert.deepEqual(series.current.map(point => point.week), [1, 3, 53]);
});

test('historical peak metadata agrees with the supplied weekly observations', () => {
  for (const benchmark of benchmarks) {
    const peak = weeklyPeak(benchmark.weeks, benchmark.category === 'la-nina');
    assert.equal(peak.anomaly, benchmark.peakAnomaly, benchmark.id);
    assert.ok(benchmark.weeks.some(point => point.date === benchmark.peakDate && point.anomaly === peak.anomaly), benchmark.id + ' peak date');
  }
  const cold = weeklyPeak(benchmarks.find(benchmark => benchmark.id === '2020').weeks, true);
  assert.equal(cold.anomaly, -1.7);
  assert.equal(cold.date, '2020-10-28');
});
