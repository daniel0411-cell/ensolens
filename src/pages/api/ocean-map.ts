import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { Buffer } from 'node:buffer';
import { getSnapshot } from '../../lib/data';
import type { OceanImage } from '../../lib/enso';

export const GET: APIRoute = async ({ url }) => {
  const snapshot = await getSnapshot(env);
  const version = url.searchParams.get('version') ?? snapshot.map.data.version;
  if (!/^[a-f0-9]{20}$/.test(version)) return new Response('Invalid map version', { status: 400 });
  const map = version === snapshot.map.data.version ? snapshot.map.data : await env.ENSO_CACHE?.get<OceanImage>(`map:${version}`, 'json');
  if (!map) return new Response('Map unavailable', { status: 404 });
  return new Response(Buffer.from(map.base64, 'base64'), { headers: { 'Content-Type': 'image/gif', 'Cache-Control': 'public, max-age=86400, immutable', 'X-Robots-Tag': 'noindex', ETag: `"${map.version}"` } });
};
