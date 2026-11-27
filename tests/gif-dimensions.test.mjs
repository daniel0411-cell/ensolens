import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { gifDimensions } from '../src/lib/gif-dimensions.ts';
test('GIF dimensions come from actual little-endian source bytes and reject invalid headers', async () => {
  const bytes = await readFile('public/images/outlooks/2026-11/djf-temperature.gif');
  assert.deepEqual(gifDimensions(bytes), {width:3300,height:2550});
  assert.throws(()=>gifDimensions(bytes.subarray(0,8)),/header/);
  const zero=Buffer.from(bytes);zero[6]=0;zero[7]=0;
  assert.throws(()=>gifDimensions(zero),/dimensions/);
  const fake=Buffer.from(bytes);fake[0]=0;
  assert.throws(()=>gifDimensions(fake),/header/);
});
