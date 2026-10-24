# ENSOLens

An independent English-language ENSO dashboard built with Astro, Chart.js, and Cloudflare Workers. Production: https://ensolens.com/

## Status and recovery

Read PROGRESS.md and AGENTS.md before continuing work. Git checkpoints preserve the implementation separately from deployment state.

- The official-data release was deployed on October 20, 2026 (Asia/Shanghai).
- First verified official-data version: e3d2fbba-b818-4ef1-a9cb-9a772b6f4dd5.
- Read the newest release checkpoint in PROGRESS.md for the independently verified production version and deployment ID. Earlier release records are historical.
- Production-only indexing is enabled and verified. This permits crawling; actual search-engine inclusion has not been confirmed.
- contact@ensolens.com has a Cloudflare routing rule to an existing verified destination. Inbox receipt is unconfirmed; the public email link remains disabled.
- The original demo release was 5757c27b-b2f4-4169-bda9-da8f28b76ab9.

## Development and release

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

Production checks cover eight pages, FAQ schema, actual embedded chart data, the NOAA image, source health, canonical URLs, metadata, indexing configuration, sitemap, redirects, and the not-found page. Browser checks also exercise historical chart rendering, toggles and CSV, plus FAQ search, filters, empty states and anchors at desktop and mobile sizes. A successful build alone is not a release verification.

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

- Worker: ensolens; fallback: https://ensolens.hurricanehub-canbao1.workers.dev/.
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
