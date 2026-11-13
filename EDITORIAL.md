# Editorial maintenance

ENSOLens answers recurring ENSO questions using dated official observations and probabilities. Monthly maintenance budget: 6–10 hours. Focus on the dashboard, lifecycle explanation and one regional use case before adding more pages.

## Brand boundary

Present ENSOLens as its own independent project. Do not add cross-site promotion, shared-operator statements or links to other operator-owned sites. Scientific hurricane context may remain with official NOAA/NHC citations; it is not a primary navigation item. Use the existing California and lifecycle guides for homepage routing. Keep this Worker's default workers.dev entry and preview URLs disabled without renaming the account-wide subdomain or affecting other Workers. Public repository history and third-party archives are not erased by a website release.

## Weekly review (target: 20 minutes)

1. Check `/api/status/` and the official weekly file. Distinguish the center week, source release and retrieval dates. An upstream failure is not unchanged conditions.
2. Compare the latest two observations in the same dataset and inspect recent revisions. Do not infer subsurface waves from surface values alone.
3. Review the lifecycle page and source health. Publish a separate briefing only when there is material new information; no obligation to generate weekly near-duplicates.

If a briefing is justified, use three sections:

- Headline move: observation date, anomaly, weekly change, baseline and cited source.
- Spatial nuance: regional differences supported by data. Do not invent regional observations from the Niño 3.4-only runtime feed.
- One reader question: explain one concept, separate observations from forecasts, cite the relevant source.

Freeze the issue's observations and check date in any archival article. Do not render an old issue using current live values. Do not inherit another publisher's issue numbers.

## Monthly review

The winter page preserves the October 15, 2026 DJF 2026–27 maps and interpretation; the forecast strength explainer preserves the November 2026 CPC strength issue, checked November 13, 2026. The winter maps were checked November 8, 2026. Both are explicitly manual dated references, separate from the live phase-probability feed. At monthly review, check both products separately and update their dates, targets, text and archived assets together. Do not relabel a rolling map as the saved issue. Allow about 20–30 minutes for this review within the monthly budget.

Review the latest CPC discussion and probabilities separately. The live lifecycle table follows the dashboard's validated CPC feed. Qualify the spring predictability barrier, distinguish peak/phase/impacts, and do not extend forecasts beyond their target horizon. If adding IRI, store it as a separate dated product with verified methodology and matching targets, not as a continuation of the CPC series.

California guidance remains evergreen unless a dated regional source supports a current claim. Snowfall, heating demand and hurricane attribution require their own evidence. No prewritten claim that ENSO must have suppressed a hurricane season.

## Release

When a page's main content changes meaningfully, update its known editorial date in `src/pages/sitemap.xml.ts`. Omit dates without a verified record. A deploy, review without changes or successful source check is not a content modification; do not reset every URL to today's date.

Use `npm run deploy` and then `ENSOLENS_EXPECT_INDEXING=true node scripts/verify-production.mjs`. Record Git and actual deployment IDs separately in PROGRESS.md. FAQ structured data must match visible answers. FAQ rich-result eligibility and actual search inclusion are not promised.

The Python site in the parent research folder is an independent prototype, not the production source. Do not deploy its `public/` over ENSOLens or copy its fixed historical rankings into the validated data feed.
