import test from 'node:test';
import assert from 'node:assert/strict';
import { forecastChanges } from '../src/lib/forecast-changes.ts';

const row = (season, year, key, nina, neutral, nino) => ({ season, year, key, nina, neutral, nino });
const issue = (issue, rows) => ({ issue, source: 'fixture', rows });
test('revision summary matches years and targets, compares every phase, and preserves ties', () => {
  const prior = issue('2026-10', [row('DJF',2027,'2027-01',0,0,100),row('AMJ',2027,'2027-05',0,40,60)]);
  const current = issue('2026-11', [row('DJF',2027,'2027-01',0,0,100),row('AMJ',2027,'2027-05',1,61,38),row('DJF',2028,'2028-01',20,30,50)]);
  const result = forecastChanges(current,prior);
  assert.equal(result.matched,2);
  assert.equal(result.unmatched,1);
  assert.deepEqual(result.changes.map(c=>[c.phase,c.delta]),[['nino',-22],['neutral',21],['nina',1]]);
  const tie = forecastChanges(issue('2026-11',[row('DJF',2027,'2027-01',0,10,90)]),prior);
  assert.deepEqual(tie.changes.map(c=>c.delta),[10,-10]);
});
test('unchanged, no overlapping targets, and missing or stale issues remain distinct', () => {
  const r = row('DJF',2027,'2027-01',0,0,100);
  const current = issue('2026-11',[r]);
  assert.equal(forecastChanges(current,null).available,false);
  assert.equal(forecastChanges(current,issue('2025-10',[r])).available,false);
  const unchanged = forecastChanges(current,issue('2026-10',[r]));
  assert.equal(unchanged.matched,1);
  assert.equal(unchanged.changes.length,0);
  const noOverlap = forecastChanges(current,issue('2026-10',[row('DJF',2026,'2026-01',0,0,100)]));
  assert.equal(noOverlap.matched,0);
  assert.equal(noOverlap.changes.length,0);
});

test('consecutive issue comparison crosses December to January without changing target year', () => {
  const r = row('DJF',2027,'2027-01',0,0,100);
  const result = forecastChanges(issue('2027-01',[r]),issue('2026-12',[r]));
  assert.equal(result.available,true);
  assert.equal(result.matched,1);
  assert.equal(result.changes.length,0);
});
