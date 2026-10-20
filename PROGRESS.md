# ENSOLens Delivery Status

Updated: 2026-10-20 (Asia/Shanghai)

## Confirmed production state

- The official NOAA-data release is live at https://ensolens.com/; pages no longer use demo values.
- Current version: 961bd7ff-da70-4a73-927b-11218dded27b, from actual Wrangler upload output and deployments list.
- Deployment: 2d3067de-4d3f-4243-a08f-f6815562a821, activated October 20, 2026 at 17:38:15 Asia/Shanghai, serving 100% of traffic.
- Production-only indexing is enabled. The October 20 recheck passed page robots headers/meta, canonical URLs, robots.txt and sitemap.xml. Search-engine crawling and inclusion are not confirmed by these checks.
- NOAA scheduled refresh is operating: all five live feeds were checked and retrieved at 14:15:52 Asia/Shanghai on October 20 with status ok and no stale feeds.
- Contact publishing remains disabled until actual inbox delivery is confirmed.

## Active delivery

1. DONE: inherited implementation saved in commit ea1ca0b; runtime typing repaired.
2. DONE: dashboard, forecasts, CSV downloads and original NOAA image use official data.
3. DONE: publisher, privacy, metadata, sitemap and hostname-aware indexing implemented.
4. DONE: 10 unit tests; desktop 1440px and mobile 390px interactions passed. Real Worker scheduled refresh passes NOAA parsing, KV persistence, and healthy status checks. Code checkpoint: e8a84e2.
5. DONE: first official-data version e3d2fbba-b818-4ef1-a9cb-9a772b6f4dd5 passed production checks with indexing disabled. Version ceb51bdf-5f04-41fa-a1b0-a3a764becc6b enabled production-only indexing; live verification now passes with ENSOLENS_EXPECT_INDEXING=true.
6. DONE: October 20 completion audit passed 33-file type checking (zero errors/warnings), all 10 unit tests, build, real local Worker NOAA refresh/KV checks, and 1440px/390px browser checks against both preview and production. Viewport screenshots were inspected. Recovery documentation is synchronized with the actual deployment.
7. PENDING EXTERNAL VERIFICATION: contact@ensolens.com has an active routing rule, but the routing dashboard has no received-message activity. The user has been asked to send a test and confirm receipt before CONTACT_ENABLED can be enabled and released through npm run deploy.
8. DONE: user-requested release of checkpoint fef5b70 completed through npm run deploy at 17:38 Asia/Shanghai on October 20. All release gates passed before upload. Version 961bd7ff-da70-4a73-927b-11218dded27b then passed scripts/verify-production.mjs with ENSOLENS_EXPECT_INDEXING=true and fresh 1440px/390px production browser checks. INDEXING_ENABLED=true and CONTACT_ENABLED=false were confirmed in actual Wrangler output.

## Runtime issues identified and addressed

- Compatibility date exceeded local workerd support; pinned to 2026-10-19.
- Legacy static HTML handling interfered with SSR/dev asset routes; Astro now owns page routing.
- Wrangler previews inherited the production hostname; preview explicitly uses localhost.
- Workers does not implement fetch redirect:error; manual mode now rejects non-2xx upstream responses.
- Deployment now runs type checks, unit tests, build, and real Worker/browser verification before upload.

## Recovery rules

- Read this file and git status before resuming. Never infer deployment from local code.
- Update this file at completed milestones and commit those milestones.
- Run npm run verify before deploying; do not publish an unverified mailbox.
- Preserve dated valid data on upstream failures and display degraded status.
- Do not record credentials, browser session state, or private contact destinations here.

## Pending external detail

- contact@ensolens.com has an active Cloudflare routing rule to an existing verified destination; routing is enabled and its DNS records are locked. Domain MX/SPF/DKIM records were provisioned. Inbox delivery has not been observed; do not claim end-to-end receipt verification or publish the address yet.
- The completion audit was followed by an explicitly requested deployment of checkpoint fef5b70. Both custom domains and the six-hour refresh schedule were confirmed in actual Wrangler output; the active version and deployment IDs are recorded above.
