# ENSOLens Delivery Status

Updated: 2026-10-21 (Asia/Shanghai)

## GitHub backup checkpoint (October 21)

- Associated origin with https://github.com/daniel0411-cell/ensolens.git after confirming the remote had no refs. Existing local history through 5fbf539 was successfully pushed to master, which now tracks origin/master.
- Reviewed tracked files and historical filenames and scanned current content and historical diffs for common credential patterns; no matching credentials were found. Environment files, local Wrangler state, dependencies, builds, and browser screenshots are ignored. Repository visibility has not been checked.
- GitHub synchronization is separate from the Cloudflare deployment and GSC verification state; this upload did not deploy the site or submit a sitemap.

## GSC verification checkpoint (October 21)

- Previous chat stopped with `stream disconnected before completion: response protection is unavailable`. Its last GSC screenshot showed the Cloudflare automatic DNS verification prompt before starting; it did not show a Google verification failure. The cause of the chat transport error is unconfirmed; the evidence does not establish a Chrome component fault.
- Public NS lookup confirms brenda.ns.cloudflare.com and gerardo.ns.cloudflare.com. Both authoritative servers and Google Public DNS (8.8.8.8) return only the root TXT `v=spf1 include:_spf.mx.cloudflare.net ~all`; no root `google-site-verification=` TXT is published at observation time. This establishes the missing TXT prerequisite, not the status of every possible CNAME verification method or the signed-in GSC account.
- Subsequent October 21 update: the user supplied a Cloudflare screenshot showing a root Google verification TXT. A fresh lookup against brenda.ns.cloudflare.com and 8.8.8.8 now returns the Google verification TXT alongside the preserved SPF. Public TXT publication is confirmed; the remaining step is GSC Verify using the matching account-issued value. GSC success and sitemap submission are still unconfirmed.
- Live `ENSOLENS_EXPECT_INDEXING=true node scripts/verify-production.mjs` passed all seven pages, source health, robots, sitemap, 404 and canonical redirects. No deployment was needed or performed. GSC ownership, sitemap submission, and actual indexing remain unconfirmed.
- Recommended next action: in the ensolens.com Domain property verification dialog, switch the provider dropdown from Cloudflare.com to Any DNS provider to obtain the exact TXT value. In Cloudflare > ensolens.com > DNS > Records, add a separate TXT record at @ with that entire value and TTL Auto. Preserve existing mail and application records; do not add it at Spaceship because Cloudflare is authoritative. Confirm it is publicly served, then click Verify in GSC. Retain the TXT after success; submit https://ensolens.com/sitemap.xml afterward.
- User's earlier preference was to operate Chrome themselves. No Chrome tab was opened or manipulated during this audit; the account-specific TXT token has not been obtained. Public documentation was read in a background in-app browser.
- Official reference: https://support.google.com/webmasters/answer/9008080?hl=zh-Hans (observed October 21, 2026; no publication date shown). Google documents automatic provider verification and manual TXT verification, exact-token matching, record retention, and possible propagation delays of up to 2-3 days. Waiting alone will not create an absent record.

## Confirmed production state

- Current production version: 1b2be18d-6b5d-40ec-a2a5-54edfbb16f55, activated October 21, 2026, serving 100% of traffic.
- Live release incorporates UI typography accessibility enhancements (min 11px font scale), dynamic SST anomaly spectrum bar in official status card, 4-scenario audience decision matrix, and cross-promotional banner for hurricanetracker.cc.
- Verification passed: 10 unit tests, desktop 1440px / mobile 390px Playwright browser suites, and production HTTP checks across all 7 pages via scripts/verify-production.mjs.
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
