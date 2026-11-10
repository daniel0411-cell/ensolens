# ENSOLens Delivery Status

Updated: 2026-11-10 (Asia/Shanghai)

## WMO December record forecast interpretation (November 10)

- Added a dated forecast-page section citing WMO's November 9 release and its expected December 2026 record. Explicitly separates an attributed forecast from an already observed seasonal record, and notes that the quoted sentence does not specify index, dataset version or averaging period.
- Keeps WMO interpretation separate from the automated CPC phase chart and fixed October RONI strength table. No new numerical probability, historical ranking or local hazard forecast inferred. Source evidence added to CONTENT-SOURCES-2026-11-10.md. Forecast sitemap date already reflects today's substantive edits and remains November 10.
- Independent diff/source-note review found no actionable issues; reviewer could not reopen WMO in its browser and did not run build/browser checks. Release verification pending.

## ENSO strength terminology update (November 10)

- Added a forecast explanation of "super El Nino", weekly versus seasonal measurements, ONI/RONI comparison limits and regional-impact uncertainty. Added matching FAQ content; corrected the threshold-as-physical-tipping-point claim and completed the RONI variance-adjustment description. FAQ numbering now supports ten entries.
- Verified CPC strength, RONI and ONI pages in the background browser; source notes are in CONTENT-SOURCES-2026-11-10.md. October strength probabilities remain dated and unchanged. Existing winter guidance already covers cold outbreaks and rain versus snow, so no duplicate section was added.
- Independent code/source-note review found a flex-layout issue in the new source paragraph; corrected before the build/browser gate. Reviewer did not independently revisit sources or run build/browser checks. Visual inspection also found the existing FAQ empty-state flex style overriding hidden; fixed with a scoped rule, independently reviewed and covered for matching, empty and reset searches.
- Added FAQ search/expanded-answer browser verification and production FAQ/schema parity checks. Only forecast and FAQ editorial sitemap dates advance.
- Code commits `6356015` and `63fd712` pushed to `origin/master`. Complete final `npm run deploy` gate passed: 42-file type check (zero errors/warnings, two existing icon hints), 14 tests, build, real local Worker NOAA refresh/KV validation, RSS and 1440px/390px browser checks. Screenshots inspected.
- Final version `4fb00ee7-6316-4e9d-a570-85d19d060f4c`, deployment `d828740d-fabe-4c6a-bbf8-06b93fea1216`, activated November 10 at 13:53:01 Asia/Shanghai with 100% traffic, from actual Wrangler output. This supersedes the initial content version `8ba20577-e284-405f-a482-b8d065434080`, deployment `9c37d1e2-9b99-4ade-9f53-ed1340b5a540` at 13:51:00, which lacked the empty-state CSS fix. Both domains, schedule, indexing enabled and contact disabled confirmed.
- Post-release verification passed all 11 pages, FAQ visible/schema parity, sitemap dates, RSS, source health, assets and redirects. Fresh live 1440px/390px browser suites passed, including new FAQ checks. Initial sandbox DNS failures were resolved with approved network access. Corrected the verifier to inspect the FAQPage nested in the existing WebSite mainEntity; no application schema change was needed. Actual GSC/Bing inclusion and traffic gains remain unverified.

## Small-text contrast and weekly anomaly scale (November 10)

- Code `f9f1945` raises the shared subtle text token to #94a3b8. The homepage weekly Nino 3.4 scale now expands symmetrically around zero, with at least 0.5C headroom and exact proportional positioning. It labels the weekly metric explicitly and does not classify ENSO event strength. Only the homepage sitemap modification date advances.
- Added regression coverage for positive/negative extreme values, zero and invalid input, plus browser assertions for rendered scale range/position and representative small-text contrast over composited backgrounds. This is targeted contrast verification, not a full-site accessibility certification.
- Independent review found no blocking issues and independently passed the scale unit test; reviewer did not independently repeat full build/browser checks. Complete `npm run deploy` gate passed: 42-file type check (zero errors/warnings, two existing FAQ icon hints), 14 tests, build, real Worker NOAA refresh/KV validation, RSS, 1440px/390px browser checks. Desktop/mobile screenshots inspected.
- Released version `1d5f8fb7-eab2-4611-88d8-391eedf51f6a`, deployment `ecfded38-fcc3-443f-952b-bc2c5fdb8535`, activated November 10 at 12:10:04 Asia/Shanghai with 100% traffic, confirmed by actual Wrangler output. Both custom domains, six-hour schedule, indexing enabled and contact disabled remain configured.
- Post-deploy 11-page production verification passed metadata, data/source health, sitemap, RSS, assets, indexing configuration and redirects. Fresh live 1440px/390px browser suites passed, including scale and representative text contrast checks; screenshots inspected. The latest validated weekly center date is November 4, 2026. Actual search inclusion and traffic impact remain unverified.

## Search entry clarity and sitemap dates (November 8)

- Code `6e04b78`: changed homepage and forecast titles, descriptions and H1s to name current ENSO status and El Nino/La Nina forecasts directly. Homepage summary uses the validated official phase and dated weekly observation; forecast summary uses all three probabilities from one matching issue/target. Existing stale-data notices remain visible.
- Added known editorial modification dates to seven sitemap entries; four entries with no reviewed date remain undated. Dates do not advance on requests, deployments or unchanged source checks. EDITORIAL.md records the maintenance rule. No new topic pages or indexing submission were added.
- Independent source/Git review found no blocking issues, but did not independently run browser or build checks. Full `npm run deploy` gate passed: 40-file type check (zero errors/warnings; two pre-existing FAQ icon hints), 13 tests, build, real Worker NOAA refresh/KV checks, RSS, 1440px/390px browser suites. Screenshots inspected.
- Released version `1d51b14f-b47e-4063-a864-992a45ff9e51`, deployment `05734f0b-0e82-4c93-aa1c-a5c1993f2531`, activated November 8 at 14:36:33 Asia/Shanghai with 100% traffic, confirmed by actual Wrangler output. Both custom domains, schedule, indexing and disabled contact configuration remain configured.
- Production verification passed all 11 pages, metadata, source health, maps, RSS, robots, sitemap and redirects. Added and passed focused checks for new H1s, probability-summary consistency and sitemap dates. Fresh production 1440px/390px browser suites passed; homepage and forecast screenshots inspected. Initial sandbox DNS failures were resolved by running checks with approved network access.
- GSC/Bing account metrics and actual indexing remain unverified; this release does not establish traffic or ranking gains. Use subsequent 28-day query/page/indexing reports to select further content work.

## Dated winter outlook and strength interpretation (November 8)

- Based this update on `origin/master` at `1375b5a`, rather than the outdated local `main`. Preserved the existing independent branding, RSS, forecast comparison and historical repair.
- Replaced the generic winter guide with the October 15, 2026 CPC DJF 2026-27 temperature/precipitation maps, dated regional interpretation, EC/category-probability explanations and snow limits. Original 3300x2550 GIFs are saved under issue-specific paths to prevent rolling NOAA images from changing underneath the text.
- Added an explicitly fixed October 2026 RONI strength reference to the forecast page, with DJF/JFM bins, unconditional probabilities and the distinction between all El Nino, very strong and strong-or-greater probabilities. The live phase feed remains separate. Updated the homepage winter routing text to match.
- Verified official sources in the background browser on November 8; URLs, target periods and values are in CONTENT-SOURCES-2026-11-08.md. Monthly maintenance instructions now cover both manually reviewed products. No unpublished November 12 bulletin values were invented.
- Final `npm run deploy` gate passed: 40-file type check (zero errors/warnings, two existing FAQ icon deprecation hints), 13 tests, build, real Worker NOAA refresh/KV checks, RSS and 1440px/390px browser suites. Winter screenshots inspected; the mobile strength table supports horizontal keyboard scrolling without page overflow. Independent review found no actionable content/code issues; reviewer did not independently repeat live source or browser checks.
- Code `67fad25` pushed to `origin/master`. Released version `a668c075-4430-4e9b-8835-aee81539b34b`, deployment `420ded5d-aa15-40f9-92d7-5880c381b3e8`, activated November 8 at 12:38:37 Asia/Shanghai with 100% traffic, confirmed by actual Wrangler output. Both custom domains, the six-hour schedule, `INDEXING_ENABLED=true` and `CONTACT_ENABLED=false` remain configured.
- Post-deploy production verification passed all 11 pages, original-map assets, strength reference, source health, RSS, indexing configuration, sitemap and redirects. Fresh live 1440px/390px browser suites passed map decoding/dimensions, table keyboard scrolling, charts, comparison, CSV, navigation and overflow. Desktop/mobile screenshots inspected. No search-index submission or future scheduled content task was created; actual search inclusion remains unverified.

## Historical chart initialization fix (November 6)

- Reproduced the live blank historical chart: valid embedded data with 43 current observations, an unpainted 300x150 canvas, inert benchmark toggles and no JavaScript exception. The shared initializer returned when the page lacked a forecast chart, before reaching the historical initializer.
- Scoped forecast initialization to its own conditional block so historical chart setup and controls run independently, retaining existing chart-instance guards.
- Added desktop/mobile browser coverage for historical canvas pixels, actual visual changes on benchmark toggles and CSV row counts. Browser screenshots use reduced motion to avoid capturing chart animations partway through drawing.
- Independent review found no actionable regressions in the initialization fix. Code commit `217b4bd` was pushed to `origin/master`, and the remote SHA matched the isolated release checkout before deployment. Concurrent social-share changes remain uncommitted and were excluded, including their edits to shared verification/documentation files.
- Deployed from `/private/tmp/ensolens-historical-release-20261106` through the full `npm run deploy` gate: type check, 13 tests, build, real NOAA refresh/KV validation, RSS checks and 1440px/390px browser suites, now including actual historical pixels, toggle visual changes and CSV download.
- Released version `f6cb7b46-de1f-4452-bd16-13c96b21fc63`, deployment `6dfcda6c-dce5-44fb-bd22-6f98809fc884`, activated November 6 at 19:02:47 Asia/Shanghai with 100% traffic, confirmed by Wrangler. Both custom domains and the existing six-hour refresh schedule remain configured.
- Post-deploy production checks passed all 11 pages, RSS, healthy feeds, indexing configuration, sitemap and redirects. Fresh live 1440px/390px browser suites confirmed the historical chart paints, all four toggles change pixels and CSV contains every expected data row. Desktop/mobile historical screenshots were inspected. No indexing submission performed.

## RSS subscription update (November 6)

- Added the RSS endpoint, global autodiscovery/footer subscription link and dated next-discussion reminder from the reviewed pending changes.
- RSS omits optional publication/build timestamps when the source provides only an issue month, observation center week or retrieval time. Verified discussion and guide publication dates remain. Unchanged successful source checks do not alter the feed content.
- Retained valid data during source failures and added channel-level degradation plus affected-item notices with last retrieval/check timestamps. A pure XML renderer enables regression checks without mocking the Worker runtime.
- Added RSS tests for date stability, failure/expiry handling and XML escaping, and extended local browser and production checks for the new endpoint. Independent review identified a category-versus-strength wording error in the release notice; corrected it to seasonal ENSO category probabilities.
- Code commit `b834594` pushed to `origin/master`; the remote SHA matched before upload. The complete `npm run deploy` gate passed: 40-file type check, 13 tests, build, real Worker NOAA refresh/KV checks, RSS XML parsing/headers and 1440px/390px browser suites.
- Released version `6071cc76-ba2c-4155-aa0b-ba1a39cde0d2`, deployment `418c164a-f5cf-4ad9-b759-050a20e0e18a`, activated November 6 at 17:39:21 Asia/Shanghai with 100% traffic, confirmed by Wrangler. Both custom domains and the existing six-hour refresh schedule remain configured.
- Production verification passed all 11 pages, RSS source-date semantics/headers, healthy official feeds, indexing configuration, sitemap, canonical redirects and 404 behavior. Fresh live desktop/mobile browser suites passed, including RSS XML parsing, subscription discovery and forecast notice bounds. Forecast screenshots were inspected. No search indexing submission was performed; actual search inclusion remains unverified.

## Collaboration rules update (November 6)

- Expanded AGENTS.md with shared AI roles, owner decision authority, evidence and hypothesis distinctions, scientific boundaries, maintenance-budget tradeoffs, independent-review reporting and production/prototype separation.
- Retained EDITORIAL.md as the scientific editing reference and PROGRESS.md as the implementation/release record. Documentation-only change; no application code or deployment configuration changed and no website deployment was performed.

## Forecast explanation update (November 6)

- Integrated the pending fixed-target comparison table, interpretation boundaries and decision-routing cards, preserving the existing chart selectors and download controls.
- Missing prior issues or target estimates now read "Comparison unavailable" instead of implying a new forecast target. CPC probabilities are distinguished from model agreement, and calendar three-month periods and same-target comparisons are described without assuming a universal peak/decay timeline.
- Added browser assertions comparing each table row with the embedded official current/prior forecasts, including missing targets and percentage-point changes. The separate parent Python prototype received the matching uncertainty wording and corrected methodology link; it is not deployed.
- Code commit `f3cd78b` pushed to `origin/master`; the remote SHA matched before deployment. The complete `npm run deploy` gate passed: type checks, ten unit tests, build, real Worker NOAA refresh/KV verification and 1440px/390px browser suites with table assertions.
- Released version `53d1068e-e6d6-4aa9-a921-288e79beaeff`, deployment `82ab440d-aaa9-47a9-958d-26fcae5f9677`, activated November 6 at 16:17:17 Asia/Shanghai with 100% traffic, confirmed by Wrangler. Both custom domains and the six-hour refresh schedule remain configured.
- Post-deploy production verification passed all 11 pages, healthy source feeds, indexing configuration, sitemap, canonical redirects and 404 behavior. Fresh production browser suites passed at 1440px and 390px; forecast screenshots were inspected. Actual search inclusion remains unverified; no indexing submission was performed.

## Independent branding release (November 6)

- Removed cross-project promotion and shared-publisher statements from the homepage, About, privacy and hurricane explanation. Removed the hurricane primary navigation item; the existing science page and official NHC citations remain available at their original route.
- Homepage routing now features California rain/snow and ENSO lifecycle guides. Added browser and production checks for cross-site branding and homepage/navigation regressions.
- Set this Worker's `workers_dev = false` while preserving both custom domains, preview-url settings and the shared account subdomain. No other site's configuration or repository visibility is changed.
- Existing uncommitted forecast-page and CSS changes belong to other ongoing work and are excluded from this release. Deploy from an isolated committed checkout so these changes remain untouched and unpublished.
- Code commit `ccb3f31` pushed to `origin/master`; remote SHA matched the isolated release checkout before deployment. The complete `npm run deploy` gate passed: 37-file type check with no errors, ten unit tests, build, real Worker NOAA refresh/KV checks, and 1440px/390px browser suites. Homepage screenshots were inspected.
- Released version `7b644ff2-0e86-4858-b7b7-3745d92602e5`, deployment `d39b9fbf-19d4-4b1f-be09-6f7ec9e2ac2b`, activated November 6 at 15:56:25 Asia/Shanghai with 100% traffic, confirmed by Wrangler deployment output.
- All 11 production pages passed metadata, brand-boundary, source-health, FAQ, sitemap, redirect and 404 verification. Production desktop/mobile browser suites passed. The old default workers.dev endpoint returned HTTP 404; both custom domains and the existing schedule remain configured.
- The other site's live homepage and local source scan had no direct ENSOLens reference; this is not an exhaustive historical audit. The GitHub repository is public. Public Git history and third-party archives can retain prior statements; this release does not claim historical anonymity, change repository permissions, or rewrite history.

## Lifecycle and California explanation release (October 30)

- Production source confirmed as this Astro/Cloudflare Worker repository, `daniel0411-cell/ensolens`, branch `master`. The parent research directory's Python generator is a separate prototype, not a production checkout.
- Added `/forecast/when-will-it-end/` with live validated CPC probabilities, dated weekly observations, a peak/phase/impact distinction, spring forecast uncertainty, citations and visible-answer-matched FAQ JSON-LD.
- Added `/impacts/california-snow-vs-rain/` with snow-level/SWE explanations and local official sources. No unsupported seasonal snowfall probabilities or historical attribution claims were imported.
- Reused the existing same-season forecast comparison and automatic source-refresh pipeline. Added forecast-page links, sitemap entries, Twitter title/description, editorial maintenance instructions, and coverage in preview/production verification scripts.
- Refreshed the build fallback through the existing official pipeline on October 30: weekly center October 21, Niño 3.4 +3.4°C; CPC discussion October 8; forecast issue October; RONI JAS 2026 +1.7 in the production table's published precision. No conversion from prototype values.
- Code commit `f45a1ea` pushed to `origin/master` and remote SHA verified before deployment. `npm run deploy` passed type check (37 files, no errors), ten unit tests, build, real isolated Worker scheduled NOAA refresh/KV persistence, and 1440px/390px browser suites. New-page screenshots were visually inspected.
- Released version `e7fe983d-ba7c-40f9-b96b-d559705aaf84` on October 30 at 17:02:22 Asia/Shanghai, serving 100% according to `wrangler deployments list`. Both custom domains and the existing six-hour schedule were confirmed in actual deploy output.
- Post-deploy `ENSOLENS_EXPECT_INDEXING=true node scripts/verify-production.mjs` passed all 11 pages, visible FAQ/schema matching, healthy feeds, robots, sitemap, 404 and canonical redirects. Production 1440px/390px browser suites also passed. The default workers.dev hostname returned the new lifecycle page successfully. Search-engine inclusion remains unverified; no indexing submission performed.

Older release statements below are historical checkpoints, not the current version record.

## Historical Analog Tool & FAQ Knowledge Hub release (October 22)

- Released version `83ff102e-2cb5-4eca-9023-980c13697a2e` serving 100% of production traffic across `ensolens.com` and `www.ensolens.com`.
- **Historical Analog Tool (`/historical/`)**: Interactive multi-line comparison tool mapping current 2026 Niño 3.4 weekly trajectory against 4 defining climate benchmarks: 1997–98 Monster El Niño (+2.3°C), 2015–16 Super El Niño (+3.0°C), 2020–23 Triple-Dip La Niña (-1.4°C), and 2023–24 Strong El Niño (+2.1°C). Supports dataset toggles, event profile cards, and CSV download.
- **FAQ Knowledge Hub (`/faq/`)**: 8 authoritative questions covering Walker circulation, Niño 3.4 ±0.5°C threshold, ONI vs RONI baselines, NOAA diagnostic alerts (Watch vs Advisory), and hurricane teleconnections. Equipped with instant client-side search, category filter pills, smooth accordion interactions, and Schema.org `FAQPage` JSON-LD markup for Google Rich Snippets.
- **Verification Gates**: 35 Astro files type-checked (0 errors), 10 unit tests, 1440px desktop & 390px mobile Playwright suites (including canvas pixel tests, no overflow across all 9 pages), and production live verification (`verify-production.mjs`) passed across all 9 pages.

## Independent redesign audit (October 22)

- Completed read-only production and code audit; findings and reproduction details are in AUDIT-2026-10-22.md. Application code and production were not changed.
- Actual Wrangler output confirms version `ef995825-4bba-42d5-863e-d525f1326066` at 100% traffic; deployment `a39209a1-516f-44a4-8d2e-1a1f86eaa62f`, activated October 22 at 13:58:37 Asia/Shanghai. Older "current production" statements below and in README are historical and superseded by this observation.
- Both remote branches pointed to f97040c at audit time. Production HTTP/indexing-permission checks, local type checks, all 10 unit tests and build passed. Browser inspection covered the live redesign, mobile navigation, trend range, forecast comparison, map dialog and a downloaded forecast CSV. Actual search indexing remains unverified.
- Open findings: insufficient small-text contrast, mobile map shrinking on expansion, homepage horizontal overflow at 320px, tablet phase-badge intrusion, sticky-header anchor occlusion and conflicting recovery documentation. No immediate rollback-level fault was identified within this audit's scope. The full local Worker refresh/browser release gate was not rerun and no release was attempted.

## Dark Modern Climate Observatory release (October 22)

- Transformed the full website visual & layout design to Concept 1: "Dark Modern Climate Observatory" (深邃气象仪器风). Deep midnight canvas (`#090e0c`), frosted glass panels (`rgba(18, 26, 23, 0.75)`), glowing emerald accents (`#10b981`), thermal orange anomalies (`#f97316`), and luminous dark Chart.js data visualizations.
- Pinned `<meta name="theme-color" content="#090e0c" />` and synced all component color tokens across the dashboard, forecasts, winter outlook, hurricane connection, methodology, about, and privacy pages.
- Released version `ef995825-4bba-42d5-863e-d525f1326066` on Cloudflare Workers serving 100% of production traffic across `ensolens.com` and `www.ensolens.com`.
- Git commit `82d9ca6` pushed to both `origin/main` and `origin/master`.

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
