# ENSOLens Delivery Status

Updated: 2026-10-20 (Asia/Shanghai)

## Confirmed baseline

- The demo was deployed to ensolens.com on October 20; version recorded in README.md.
- Official NOAA ingestion, a dated seed, KV storage, and scheduled refresh were started but not deployed.
- Pages still use demo values. Indexing and contact publishing are disabled.
- Initial verification: six type errors; legacy Worker tests cannot load cloudflare: modules under Node.

## Active delivery

1. DONE: inherited implementation saved in commit ea1ca0b; runtime typing repaired.
2. DONE: dashboard, forecasts, CSV downloads and original NOAA image use official data.
3. DONE: publisher, privacy, metadata, sitemap and hostname-aware indexing implemented.
4. IN PROGRESS: 10 unit tests; desktop 1440px and mobile 390px interactions passed. Real Worker scheduled refresh exposed unsupported fetch redirect mode; fixed, awaiting rerun.
5. PENDING: deploy verified build, production checks, indexing enablement and version record.

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

- contact@ensolens.com now has an active Cloudflare routing rule to an existing verified destination. Domain MX/SPF/DKIM records were provisioned. Inbox delivery has not been observed; do not claim end-to-end receipt verification.
