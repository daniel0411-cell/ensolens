import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { indexingAllowed } from '../lib/http';
export const GET: APIRoute = ({ url }) => new Response(indexingAllowed(url.hostname, env.INDEXING_ENABLED)
  ? 'User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://ensolens.com/sitemap.xml\n'
  : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
