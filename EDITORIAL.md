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

The winter page preserves the November 19, 2026 DJF 2026–27 maps and interpretation; the forecast strength explainer preserves the November 2026 CPC strength issue, checked November 13, 2026. The winter maps were checked and saved November 21, 2026. The forecast page also preserves a November 2026 RONI percentile-range worked example, checked November 21, in public/references/roni-ranges-november-2026.txt. It is an archival teaching example, not a new live feed; retain its issue and target if future monthly examples replace it. These are explicitly manual dated references, separate from the live phase-probability feed. At monthly review, check both products separately and update their dates, targets, text and archived assets together. Do not relabel a rolling map as the saved issue. Allow about 20–30 minutes for this review within the monthly budget.

Review the latest CPC discussion and probabilities separately. The live lifecycle table follows the dashboard's validated CPC feed. Qualify the spring predictability barrier, distinguish peak/phase/impacts, and do not extend forecasts beyond their target horizon. If adding IRI, store it as a separate dated product with verified methodology and matching targets, not as a continuation of the CPC series.

California guidance remains evergreen unless a dated regional source supports a current claim. Snowfall, heating demand and hurricane attribution require their own evidence. No prewritten claim that ENSO must have suppressed a hurricane season.

## Cross-page synchronization checklist

Before a monthly update, record each product's actual publication/issue date, initialization date if relevant, target period, index/baseline and source URL. A scheduled release is a check trigger, not evidence of publication. Next planned checks from the currently preserved schedules: CPC ENSO December 10, 2026; regional seasonal outlook December 17, 2026. Verify actual publication and the current schedule before changing content.

| Changed product | Pages or sections to check | Keep synchronized |
|---|---|---|
| CPC discussion and phase probabilities | Home; forecast current table/revisions; lifecycle first answer, synopsis and table; neutral guide's current-reading links | Each product's issue/observation dates, three-state probabilities, same target season/year and source-health notice. Do not overwrite a dated November commentary with live values. |
| Strength probabilities and RONI percentile outlook | Forecast strength table, thresholds, percentile worked example and November commentary; any FAQ reference naming the issue | Decide explicitly whether to retain an archival example or replace it. For replacement, update numbers, captions, source extract and associated diagram together. Phase, strength and percentile products are distinct. |
| Regional seasonal discussion/maps | Winter page; impacts seasonal summary; California and Northwest dated paragraphs/cards | Saved original maps, issue date, target season, legend/baseline, regional wording, alt text and captions. Compare the same winter across issues. ENSO live values do not refresh these manual products. |
| A cited experimental/model outlook | Lifecycle dated comparison; model-plume guide and its evidence mapping | Preserve publication, initialization and horizon; experimental versus operational scope and members versus models. A later article is not automatically a CPC revision. |
| Index revisions or methodology | Historical fixed-season examples; methodology; FAQ/index guide where applicable | Same series/version/baseline/window, observed revision versus forecast revision, preserved data vintage. Keep valid archival examples dated rather than silently replacing their numbers. |
| Source correction or broken official route | The affected explanation and its incoming references | Verify the original claim, repair only supported text/links, and record a material correction when warranted. |

After editing, check visible text, tables, teaching diagrams, original assets, reference extracts, links/anchors, structured data and known sitemap modification dates as applicable. Only changed pages receive substantive editorial dates. Run the existing release gate and production verifier; record Git, actual deployment IDs and local versus live validation separately in PROGRESS.md.

## Search evidence and update triggers

Use the dated November 26 GSC baseline in PROGRESS.md; it is a historical measurement, not November 27 traffic. Retain the November 17 impacts/neutral title-description experiment until the planned December 1–15 review window supplies useful comparable evidence. Use the same property, search type, date windows and filters, then inspect page/query and country/device differences where available. Small samples and anonymized queries limit inference; missing metrics stay missing. No arbitrary impression threshold guarantees a useful conclusion.

Do not manufacture a weekly article when sources or interpretation have not materially changed. Keep source/health review in the existing weekly 20-minute allowance and product checks in the existing monthly review; use additional editing time only for supported changes. A routine read without substantive edits does not advance lastmod. Revisit evergreen methods when official definitions change, a source fails, a reproducible correction arrives or a recurring real reader question reveals a gap.

Google's documentation update log, checked November 26, 2026, states FAQ rich results stopped appearing May 7, 2026 (May 8 entry): https://developers.google.com/search/updates?hl=en . Maintain useful visible FAQs and matching markup; do not promise Google FAQ dropdown results or expand content to obtain them. Recheck current search documentation before future structured-data proposals.

## Release

When a page's main content changes meaningfully, update its known editorial date in `src/pages/sitemap.xml.ts`. Omit dates without a verified record. A deploy, review without changes or successful source check is not a content modification; do not reset every URL to today's date.

Use `npm run deploy` and then `ENSOLENS_EXPECT_INDEXING=true node scripts/verify-production.mjs`. Record Git and actual deployment IDs separately in PROGRESS.md. FAQ structured data must match visible answers. FAQ rich-result eligibility and actual search inclusion are not promised.

The Python site in the parent research folder is an independent prototype, not the production source. Do not deploy its `public/` over ENSOLens or copy its fixed historical rankings into the validated data feed.
