import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getData } from '../../lib/data';

export const GET: APIRoute = async () => {
  const { snapshot, stale } = await getData(env);
  return Response.json({ status: stale.length ? 'degraded' : 'ok', stale,
    feeds: Object.fromEntries((['discussion', 'weekly', 'roni', 'forecast', 'map'] as const).map(key => [key, { checkedAt: snapshot[key].checkedAt, retrievedAt: snapshot[key].retrievedAt, error: snapshot[key].error }])),
    dates: { discussion: snapshot.discussion.data.issued, nextDiscussion: snapshot.discussion.data.next, weekly: snapshot.weekly.data.at(-1)!.date, roni: snapshot.roni.data.at(-1)!.date, forecast: snapshot.forecast.data.issue },
  }, { status: stale.length ? 503 : 200, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
};
