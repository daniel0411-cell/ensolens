import test from 'node:test';
import assert from 'node:assert/strict';
import { canonicalRedirect, indexingAllowed, secureResponse } from '../src/lib/http.ts';

test('www redirects to the canonical HTTPS host, preserving path and query', async () => {
  const response = secureResponse(canonicalRedirect(new Request('https://www.ensolens.com/forecast/?view=compare')), false);
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://ensolens.com/forecast/?view=compare');
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
});

test('HTTP on the apex redirects to HTTPS', async () => {
  const response = canonicalRedirect(new Request('http://ensolens.com/winter-outlook/'));
  assert.equal(response.headers.get('location'), 'https://ensolens.com/winter-outlook/');
});

test('asset response statuses and headers survive on the canonical host', async () => {
  const response = secureResponse(new Response('Not found', { status: 404 }), true);
  assert.equal(response.status, 404);
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  assert.equal(await response.text(), 'Not found');
});

test('indexing requires an explicit switch and the production hostname', () => {
  assert.equal(indexingAllowed('ensolens.com', 'true'), true);
  for (const [host, enabled] of [['ensolens.com', undefined], ['ensolens.com', 'false'], ['localhost', 'true'], ['preview.workers.dev', 'true']]) {
    assert.equal(indexingAllowed(host, enabled), false);
  }
  assert.equal(canonicalRedirect(new Request('https://ensolens.com/')), null);
});
