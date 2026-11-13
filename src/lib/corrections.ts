interface CorrectionStore {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options: { expirationTtl: number }): Promise<void>;
}
const headers = { 'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'no-store', 'X-Robots-Tag':'noindex' };
function reply(status:number, message:string) {
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>ENSOLens correction report</title><body><main><h1>Correction report</h1><p>${message}</p><p><a href="/about/#corrections-heading">Return to editorial standards and corrections</a></p></main></body></html>`, {status,headers});
}
export async function submitCorrection(request: Request, store?: CorrectionStore, now = new Date()) {
  if (request.method !== 'POST') return reply(405, 'Use the correction form on the About page.');
  const url = new URL(request.url);
  if (request.headers.get('origin') !== url.origin) return reply(403, 'Open the form on ENSOLens and submit it from there.');
  if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return reply(415, 'Use the correction form on the About page.');
  if (!store) return reply(503, 'The report could not be saved. Please try again later.');
  // Bound actual bytes rather than trusting Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply(400, 'A page path and explanation are required.');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const part = await reader.read(); if (part.done) break;
    size += part.value.byteLength;
    if (size > 8192) { await reader.cancel(); return reply(413, 'The report is too long. Please keep it under 2,000 characters.'); }
    chunks.push(part.value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.length; }
  const form = new URLSearchParams(new TextDecoder().decode(bytes));
  if (form.get('website')) return reply(400, 'The report could not be accepted.');
  const page = form.get('page')?.trim() ?? '';
  const explanation = form.get('explanation')?.trim() ?? '';
  if (!/^\/(?!\/)[a-z0-9/_.#-]*$/i.test(page) || page.length > 240 || explanation.length < 15 || explanation.length > 2000) return reply(400, 'Enter an ENSOLens page path and an explanation of 15–2,000 characters.');
  const address = request.headers.get('cf-connecting-ip');
  try {
    // A best-effort abuse throttle; KV is eventually consistent, not an atomic limiter.
    const digest = address ? [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(address + now.toISOString().slice(0,13))))].map(v=>v.toString(16).padStart(2,'0')).join('') : null;
    const throttle = digest ? `correction-throttle:${digest}` : null;
    if (throttle && await store.get(throttle)) return reply(429, 'A report was recently received from this connection. Please try again in an hour.');
    const id = `${now.toISOString()}:${crypto.randomUUID()}`;
    // Notes stay private in KV; there is no public report-reading endpoint.
    await store.put(`correction:${id}`, JSON.stringify({ page, explanation, receivedAt:now.toISOString() }), {expirationTtl:90*86400});
    if (throttle) await store.put(throttle, '1', {expirationTtl:3600});
    return reply(201, 'Your report has been saved for editorial review. Reports are private; we cannot send a personal reply through this form. Confirmed material corrections appear in the public correction log.');
  } catch { return reply(503, 'The report could not be confirmed as saved. Please try again later.'); }
}
