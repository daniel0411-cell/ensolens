export function canonicalRedirect(request: Request) {
  const url = new URL(request.url);
  if (url.hostname === 'www.ensolens.com' || (url.hostname === 'ensolens.com' && url.protocol !== 'https:')) {
    url.hostname = 'ensolens.com';
    url.protocol = 'https:';
    return new Response(null, { status: 308, headers: { Location: url.href, 'Cache-Control': 'public, max-age=3600' } });
  }
  return null;
}
export function indexingAllowed(hostname: string, enabled: string | undefined) {
  return enabled === 'true' && hostname === 'ensolens.com';
}
export function secureResponse(response: Response, indexable: boolean) {
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('X-Robots-Tag', indexable && response.status < 400 ? 'index, follow' : 'noindex, follow');
  if (headers.get('Content-Type')?.includes('text/html')) headers.set('Cache-Control', 'public, max-age=0, s-maxage=300');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
