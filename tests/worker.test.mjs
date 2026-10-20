import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.ts';

test('www redirects to the canonical HTTPS host, preserving path and query', async () => {
  const response = await worker.fetch(new Request('https://www.ensolens.com/forecast/?view=compare'), { ASSETS: { fetch() { throw new Error('Redirect must not request assets'); } } });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://ensolens.com/forecast/?view=compare');
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
});

test('HTTP on the apex redirects to HTTPS', async () => {
  const response = await worker.fetch(new Request('http://ensolens.com/winter-outlook/'), { ASSETS: { fetch() { throw new Error('Redirect must not request assets'); } } });
  assert.equal(response.headers.get('location'), 'https://ensolens.com/winter-outlook/');
});

test('asset response statuses and headers survive on the canonical host', async () => {
  const request = new Request('https://ensolens.com/missing/');
  const response = await worker.fetch(request, { ASSETS: { async fetch(received) { assert.equal(received, request); return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }); } } });
  assert.equal(response.status, 404);
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
});
