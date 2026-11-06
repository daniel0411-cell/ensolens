import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getData } from '../lib/data';
import { renderRss } from '../lib/rss';

export const GET: APIRoute = async () => {
  const { snapshot, stale } = await getData(env);
  return new Response(renderRss(snapshot, stale), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
