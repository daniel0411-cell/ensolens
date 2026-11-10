import test from 'node:test';
import assert from 'node:assert/strict';
import { anomalyScale } from '../src/lib/anomaly-scale.ts';

test('anomaly scale preserves zero, sign and numerical position without clipping extreme readings', () => {
  assert.deepEqual(anomalyScale(0), { limit: 2, position: 50 });
  for (const value of [0.5, 1.5, 2, 3.3, 4, 9.9]) {
    const warm = anomalyScale(value);
    const cool = anomalyScale(-value);
    assert.ok(warm.limit >= value + 0.5);
    assert.equal(cool.limit, warm.limit);
    assert.ok(warm.position > 50 && warm.position < 100);
    assert.ok(cool.position > 0 && cool.position < 50);
    assert.ok(Math.abs((warm.position / 100 * 2 - 1) * warm.limit - value) < 1e-10);
    assert.ok(Math.abs(warm.position + cool.position - 100) < 1e-10);
  }
  assert.equal(anomalyScale(3.3).limit, 4);
  for (const value of [NaN, Infinity, -Infinity]) assert.throws(() => anomalyScale(value), /finite/);
});
