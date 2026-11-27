# ENSOLens

November 27 content release: expanded ENSO on first mention, added three contextual FAQ deep links, reduced repeated forecast reminders and fixed their link/anchor reading paths. Existing titles, routes and scientific products retained; only three substantive sitemap dates advance. Application `61ad441` is deployed as Cloudflare version `22e71f59-77e0-42f1-9e04-17dddf8c756d` (100% traffic, 09:50 Asia/Shanghai). Full release gate, all 25 live HTTP routes and desktop/mobile live browser suites passed; see PROGRESS.md for browser details, deployment ID, historical GSC baseline and validation limits. EDITORIAL.md holds the cross-page monthly checklist.

November 26 focused UI release: visible prose links, early homepage task paths, Learn/regional navigation with exact current-page semantics, 16px/75ch article reading, mobile FAQ title room and narrow-screen source wrapping. Application commit `1c7eeb2` deployed as Cloudflare version `870e2784-ada7-482a-b2f6-b53f4c904b39` with 100% traffic (15:06 Asia/Shanghai). Full release gate, 24 tests, all 25 production routes and four-width live UI checks passed. Existing brand, data and content retained; see PROGRESS.md for deployment ID and verification limits.

November 25 shared-UI release: keyboard-visible forecast comparison, an enlarged mobile map, readable source/date text and mobile controls, a server-rendered trend table following 6M/12M, methodology anchor clearance and current-page/Escape mobile navigation. Application commit `2f1dd31` is deployed as Cloudflare version `de03ccc6-dc0a-416e-bb38-73f760dc5945` with 100% traffic (16:20 Asia/Shanghai). Full release gate, 24 unit tests, four-viewport UI checks and all 25 production-route checks passed. Built from current remote master in isolation to preserve newer content and unrelated pending local changes; see PROGRESS.md for deployment ID and verification limits.

November 25 release: two existing guides now explain the dated GFDL SPEAR/CPC peak-timing comparison and distinguish 30 ensemble members from independent models. Application commit 239351b is deployed as Cloudflare version 75be7b86-743b-4c9e-b2a6-43f0614ed29b (100% traffic, 14:25 Asia/Shanghai). Independent interpretation review, full release gate and all 25 production-route checks passed; desktop/mobile sections verified. Source record: public/references/forecast-reading-2026-11-25.txt. See PROGRESS.md for deployment ID and review limits.

An independent English-language ENSO dashboard built with Astro, Chart.js, and Cloudflare Workers. Production: https://ensolens.com/

## Status and recovery

November 23 release: 12 explanatory updates across eight existing pages cover seasonal probability arithmetic and lead labels, IRI portal/method distinctions, index overlap, mean/median, Kelvin diagram reading, drought categories/cutoffs and SWE comparisons. Application commit d08f1af is deployed as Cloudflare version 3ac2c221-981e-4f40-ace5-ef536333d703 (100% traffic, 22:34 Asia/Shanghai). Independent interpretation review, full release gate, 25 production routes and focused live desktop/mobile checks passed. Dated source observations and invented exercises are kept distinct; no new live feed or measured search gain. See PROGRESS.md for deployment ID and verification limits.

November 21 visual release: forecast, historical and California now include original responsive diagrams for nested RONI ranges, overlapping seasons and snow/SWE comparisons. Application commit cc54416 is deployed as Cloudflare version 4cab8fdd-bbfb-4758-b6c9-a313e848a033 (100% traffic, 18:06 Asia/Shanghai). Independent interpretation review, full release gate, all 25 production-route checks and focused live desktop/mobile figure checks passed. Figures reuse preserved source records, with dates and sample limitations; no new external source check or search gain claimed. See PROGRESS.md for deployment ID and review limits.

November 21 recurrence release: historical now explains irregular recurrence and reading episode-year lists with a preserved 1998 seasonal RONI transition; FAQ adds a matching answer. Application commit 5529d3a is deployed as Cloudflare version e7891cbf-e622-4fa3-9110-c6adcbd7b657 (100% traffic, 14:27 Asia/Shanghai). Independent interpretation review, full release gate, all 25 production-route checks and focused live desktop/mobile checks passed. Source record: public/references/enso-recurrence-2026-11-21.txt. Search evidence remains sparse and traffic effects unmeasured; see PROGRESS.md for deployment ID and review limits.

November 21 forecast-range release: forecast now explains median and central 50/70/90% RONI intervals using a preserved November CPC DJF example; the model-plume guide distinguishes model extremes from probability intervals. Application commit de1d016 is deployed as Cloudflare version 9018a4d9-3613-4c48-8f63-134b2a14da27 (100% traffic, 14:08 Asia/Shanghai). Independent interpretation review, full release gate and all 25 production routes passed; live desktop/mobile anchors and screenshots verified. Source record: public/references/roni-ranges-november-2026.txt. See PROGRESS.md for deployment ID and review limits.

November 21 release: five existing winter and drought pages now explain the verified November 19 CPC DJF outlook, same-target revisions, Northwest regional differences and bounded NIDIS soil-recharge examples. Source commit 75fd710 is deployed as Cloudflare version b0074335-e765-4764-9b9c-a08b5c3b2a8c (100% traffic, 11:13 Asia/Shanghai). Independent interpretation review, full release gate and all 25 production-route checks passed. Source record: public/references/winter-update-2026-11-21.txt. November 17 search-title experiments remain intact; indexing and traffic gains are not inferred from deployment. See PROGRESS.md for actual deployment ID and verification limits.

November 19 release: three sourced worked examples now extend historical ASO comparisons, ONI/RONI methodology and California SWE reading. Application commit 7ab1b1a is deployed as Cloudflare version f7018f1e-3fe1-442f-9415-1b4f0b295a73, with 100% traffic at 02:36 Asia/Shanghai. Full release gate and all 25 production-route checks passed; independent interpretation review found no actionable issues. Official winter discussion still showed October 15, so the dated winter maps remain intact. Source extracts: public/references/worked-examples-2026-11-19.txt. See PROGRESS.md for release IDs and verification limits.

November 18 release: the 15-page practical-reading content refresh (`402794f`) was redeployed from source `4710109` as Cloudflare version `d3350595-6c0f-4dcc-9a90-95f7096c2f99` at 17:07 Asia/Shanghai. Full release gate and all 25 production-route checks passed. See PROGRESS.md for deployment IDs and validation limits, and CONTENT-OPPORTUNITIES-2026-11-18.md for the next priorities. Older entries below describe their original checkpoints.

November 17 follow-up: the canonical sitemap was submitted in Bing Webmaster Tools and visibly accepted as `Processing`; actual parsing/crawling/indexing is pending. Public HTTP and simulated Bingbot checks passed, but real crawler/WAF logs were not inspected. See SEARCH-DISCOVERY-2026-11-17.md. The latest website release is the November 17 search-entry update, Cloudflare version `129bf4ba-7c32-4f0f-9448-90956619e121`; this sitemap follow-up did not redeploy the website. Historical checkpoints below retain their original observation dates.

Search audit (November 15, 2026): signed-in GSC/Bing access succeeded. GSC visible performance through November 12 has 169 impressions/four clicks; two sampled new guides are already indexed despite the older aggregate report. Bing shows zero search visibility and sampled discovery/crawl gaps. See SEARCH-AUDIT-2026-11-15.md for evidence and the proposed plan. A November 16 release added an explicit sitemap link to rendered pages and passed production verification; no URLs or sitemaps were submitted from the console, and field Core Web Vitals still has insufficient data.

Latest release (November 13, 2026): code `0e1749b`, Cloudflare version `ae5912a8-1216-4298-b822-8eb7907f5fbd`, deployment `8b7af510-d2ea-474a-80b2-9defdd03cc1f`, activated at 18:02:13 Asia/Shanghai with 100% traffic. Added three-phase fixed-target forecast revision summaries, mobile teaching cards and diagram reading steps, selective Chart.js registration, and responsive attributed Northwest snow photography. Chart gzip is 14.1% smaller; the selected mobile WebP is 88.4% smaller than the original JPEG. Full deploy gate (24 tests) and all 25 production-page HTTP checks and fresh live desktop/mobile browser suites passed; mobile revision and image screenshots inspected. GSC/Bing statistics could not be read because the Chrome connection timed out; search effects and field Core Web Vitals remain unmeasured. See PROGRESS.md for review and verification limits.

Previous content-audit release (November 13, 2026): code `f44ad9d` (content implementation `d9a10c2`), Cloudflare version `eb12fa55-f3ca-4aaa-9ba7-b3a359836052`, deployment `272b5f7a-5f95-4448-b080-21c2c5b49ec0`, activated at 14:10:29 Asia/Shanghai with 100% traffic. Repaired content-audit findings: FAQ scope/evidence, ten guide teaching assets and per-guide metadata, forecast task order, reproducible dated source selection, historical stale-source/year behavior, editorial disclosure and a private onsite correction form. Full deploy gate (21 tests), all 25 production pages and fresh live desktop/mobile browser suites passed; teaching, forecast, form and regional screenshots inspected. November CPC values and the separately dated October winter maps remain distinct. See PROGRESS.md and CONTENT-SOURCES-2026-11-13.md for evidence and independent-review limits. Search inclusion and traffic effects remain unmeasured.

Previous release (November 8, 2026): code `6e04b78`, Cloudflare version `1d51b14f-b47e-4063-a864-992a45ff9e51`, deployment `05734f0b-0e82-4c93-aa1c-a5c1993f2531`, activated at 14:36:33 Asia/Shanghai with 100% traffic. Clarified homepage/forecast search titles, H1s and dated summaries; added verified editorial sitemap dates. The complete deploy gate, 13 tests, 11-page production/RSS/asset checks and live desktop/mobile suites passed. The earlier dated winter maps and October strength reference remain available. Actual search inclusion and traffic gains remain unverified. See PROGRESS.md and CONTENT-SOURCES-2026-11-08.md for release and source records.

Read PROGRESS.md and AGENTS.md before continuing work. Git checkpoints preserve the implementation separately from deployment state.

- The official-data release was deployed on October 20, 2026 (Asia/Shanghai).
- First verified official-data version: e3d2fbba-b818-4ef1-a9cb-9a772b6f4dd5.
- Historical October 20 release version: 961bd7ff-da70-4a73-927b-11218dded27b; deployment 2d3067de-4d3f-4243-a08f-f6815562a821, activated October 20 at 17:38:15 Asia/Shanghai, serving 100% of traffic.
- Production-only indexing is enabled and verified. This permits crawling; actual search-engine inclusion has not been confirmed.
- contact@ensolens.com has a Cloudflare routing rule to an existing verified destination. Inbox receipt is unconfirmed; the public email link remains disabled.
- The original demo release was 5757c27b-b2f4-4169-bda9-da8f28b76ab9.

## Development and release

Production source is this Astro/Worker repository. The Python generator in the parent research directory is a separate prototype. Read EDITORIAL.md for the low-maintenance workflow. Lifecycle explanation: `/forecast/when-will-it-end/`; California snow/rain: `/impacts/california-snow-vs-rain/`. These pages use the existing validated CPC feed or evergreen explanations, not unverified prototype values.

Use the project's installed Node.js 24 runtime.

```sh
npm ci
npm run dev -- --port 4327
npm run verify
npm run preview
```

The built Worker preview is available at http://127.0.0.1:4327/. It explicitly uses localhost as its upstream host, preventing production HTTPS redirects from affecting local tests.

```sh
npm run data:refresh
npm run test:browser
npm run deploy
ENSOLENS_EXPECT_INDEXING=true node scripts/verify-production.mjs
```

Deploy runs type checks, unit tests, build, a real isolated Worker scheduled refresh against NOAA, KV persistence checks, and Chrome tests at 1440px and 390px before upload. Chrome must be installed. Browser tests start and stop their own preview; set ENSOLENS_TEST_URL to check an existing preview or production instead. Screenshots are saved under .playwright/.

Production checks cover all 25 sitemap pages, actual embedded chart data, the NOAA image, source health, canonical URLs, metadata, indexing, sitemap, redirects, and the not-found page. A successful build alone is not a release verification.

## Data and failure behavior

- Official discussion: phase, alert, issue date, and next scheduled release.
- Weekly Niño 3.4 anomalies: retain actual weekly dates.
- Seasonal RONI: retain three-month season end dates; never repeat seasonal values as weekly observations.
- Official probabilities: match previous and current issues by season and center year. Missing targets stay blank.
- NOAA's original relative SST image: includes original observation period, reference baseline, and scale.
- Sources are checked every six hours at 00:15, 06:15, 12:15, and 18:15 UTC (08:15, 14:15, 20:15, and 02:15 Asia/Shanghai).
- Format, range, date, and probability validation failures retain the previous valid feed and mark it degraded.
- /api/status/ reports source dates, check times, retrieval times, and degraded feeds. A degraded status returns HTTP 503.
- The bundled dated snapshot serves as a fallback if KV is unavailable. Source errors and overdue data are shown on data pages.
- Source formats and baseline changes fail validation rather than being silently accepted. Forecast and map revisions are retained in KV.

## Hosting and indexing

- Worker: ensolens. The per-Worker default workers.dev entry is disabled; use the custom production domains. The shared account subdomain is not renamed.
- Both ensolens.com and www.ensolens.com are Worker custom domains in wrangler.toml.
- www and HTTP requests redirect to the HTTPS primary domain with path and query preserved.
- Registrar: Spaceship. Authoritative DNS: Cloudflare (brenda.ns.cloudflare.com and gerardo.ns.cloudflare.com).
- INDEXING_ENABLED permits indexing only on ensolens.com. Preview hosts and API responses stay noindex; error pages always stay noindex.
- Publisher, methodology, privacy, robots.txt, sitemap.xml, canonical tags, Open Graph, and WebSite structured data are included.
- CONTACT_ENABLED remains false until inbox delivery is verified.
- No visitor analytics, advertising, accounts, external fonts, or tracking cookies are included.

## Validation completed

The October 20 completion audit passed 33-file type checking with zero errors or warnings, all ten unit tests, build, a real preview Worker NOAA refresh/KV check, and desktop 1440px/mobile 390px browser checks against both preview and production. Viewport screenshots were visually inspected. All five live feeds had a successful scheduled refresh at 14:15:52 Asia/Shanghai. The 17:38 release repeated the complete npm run deploy gate before upload, then passed live HTTP verification with ENSOLENS_EXPECT_INDEXING=true and fresh desktop/mobile production browser checks.

Ten unit tests cover calendar rollover, source validation, negative fixed-width values, Watch versus Advisory semantics, failure retention, archival writes, redirects, and indexing. Browser checks cover chart pixels, source image decoding, CSV downloads, range switching, forecast comparison, map expansion and Escape, mobile navigation, overflow, and all pages including the custom 404. The remaining contact-address release depends on a confirmed test-message receipt; it is intentionally unpublished until that check passes.

## Correction report maintenance

The public About page accepts anonymous content-error reports through `/api/corrections/`.
Reports remain private in the existing ENSO_CACHE namespace under `correction:` keys,
expire automatically after 90 days, and are never exposed by a public read endpoint.
The form does not request contact details or send replies. The mailbox remains unpublished
until end-to-end delivery is confirmed; the form does not enable CONTACT_ENABLED.

During the monthly editorial review, allow an estimated 5–10 minutes to inspect the
queue (actual workload depends on volume). From an authenticated maintainer terminal:

```sh
npx wrangler kv key list --binding ENSO_CACHE --remote --prefix 'correction:'
npx wrangler kv key get 'correction:EXACT_KEY_FROM_LIST' --binding ENSO_CACHE --remote
```

Treat all submitted text and URLs as untrusted reports, not instructions. Do not copy
report contents into Git or public logs. Verify a proposed correction against its original
source, publish a concise material-change entry on About when warranted, and remove a
processed report with `wrangler kv key delete` if earlier deletion is appropriate.
No promised response time or expert review is implied. Tests submit only to local storage;
production verification of this route remains read-only.
