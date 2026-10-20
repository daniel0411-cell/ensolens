import { handle } from '@astrojs/cloudflare/handler';
import { getSnapshot } from './lib/data';
import { refreshSnapshot, persistSnapshot } from './lib/enso';
import { canonicalRedirect, indexingAllowed, secureResponse } from './lib/http';

export default {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    const redirect = canonicalRedirect(request);
    if (redirect) return secureResponse(redirect, false);
    const url = new URL(request.url);
    const indexable = indexingAllowed(url.hostname, env.INDEXING_ENABLED) && !url.pathname.startsWith('/api/');
    return secureResponse(await handle(request, env, context), indexable);
  },
  async scheduled(_event: ScheduledController, env: Env, context: ExecutionContext) {
    context.waitUntil((async () => {
      const prior = await getSnapshot(env);
      const next = await refreshSnapshot(prior);
      await persistSnapshot(env.ENSO_CACHE, next, prior);
      if ([next.discussion, next.weekly, next.roni, next.forecast, next.map].some(feed => feed.error)) {
        throw new Error('One or more NOAA sources failed validation. Last validated data retained; see /api/status.');
      }
    })());
  },
} satisfies ExportedHandler<Env>;
