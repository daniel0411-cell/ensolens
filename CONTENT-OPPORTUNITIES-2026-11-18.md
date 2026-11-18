# Content opportunities — November 18, 2026

## Evidence and scope

Yesterday's 15-page revision is now deployed. It improves interpretation on existing URLs; it does not add 15 new articles. The following priorities combine a fresh official-source check with existing page coverage and the dated November 16–17 GSC snapshot. No new search-console session was read today; search-volume and traffic benefits remain hypotheses.

Primary sources read in the background browser on November 18 (Asia/Shanghai), after a focused Google search:

- https://www.cpc.ncep.noaa.gov/products/predictions/long_range/seasonal.php?lead=1 — rolling selector shows NDJ 2026–27 and later targets. Its labels do not establish a new issue date.
- https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html — visible issue header remains `830 AM EDT Thu Oct 15 2026`.
- https://cpc.ncep.noaa.gov/products/predictions/schedule.php — row for forecast month December lists November 19, 2026, covering DJF 2026–DJF 2027. General release time is approximately 08:30 Eastern, equivalent to November 19 at 21:30 Asia/Shanghai in November. This is a scheduled time, not confirmation of publication.

## 1. Refresh the dated winter outlook when the new issue actually exists

Highest priority: `/winter-outlook/`. Verify the temperature map, precipitation map, issue header, legend and DJF 2026–27 validity together. Preserve dated original assets and update all corresponding metadata/captions/interpretation. Add a short October-to-November comparison for the same DJF target only if supported. Do not compare October NDJ with November DJF as though only the forecast issue changed.

Value hypothesis: a timely answer to current winter-planning questions, with the strongest source-based reason for a change. The site currently preserves October 15 assets and clearly labels them. Implementation estimate: 60–100 minutes plus release checks. Ongoing review remains the existing monthly 20–30-minute allowance; no separate recurring news schedule.

## 2. Add practical regional comparisons alongside that release

Update `/impacts/`, California and Northwest routes with a compact side-by-side explanation of what the verified new seasonal outlook changes for each region. Distinguish a changed probability from a changed favored category, and state when no material change is supported. Retain evergreen snow/water explanations; no city-page expansion or storm prediction.

The November 16–17 snapshot gave `/impacts/` 46 impressions, position 8.7, zero clicks. This is a small prior sample and supports a page worth studying, not proof of demand for every regional topic. Keep the November 17 title/description test stable while improving useful downstream content. Estimate: 45–75 minutes, tied to the monthly winter review.

## 3. Make the historical comparison answer a specific reader question

Candidate addition to `/historical/`: a worked comparison of the latest observation with a matching calendar window in 1997/2015/2023, using the existing same-baseline weekly series. Explain why an earlier year's full-year maximum and this year's latest week answer different questions, and why four selected years cannot establish an all-time rank. First verify date alignment, source revisions and coverage; use explicit observation dates rather than silently matching unrelated weekly centers.

The page already has a chart, extrema table and analog limits. Another general warning would be redundant; a small reproducible table/example could add practical value. This is a product/content hypothesis, without fresh query evidence. Estimate: 60–90 minutes. Prefer one fixed dated example to a new manually maintained weekly ranking; a dynamic comparison would require independent review where available and regression tests.

## 4. Help water readers reach the correct official observation

Candidate addition to California/Northwest guides: one worked station-versus-basin example and a short source path for SWE, precipitation and water-supply observations. Existing pages already explain SWE percentages, atmospheric rivers and warm/dry snow drought; do not publish a duplicate generic explainer. Verify the selected official report's date, geography, metric, reference years and median/average before using any actual number. Use an explicitly hypothetical example if a stable, reproducible record cannot be preserved.

Value hypothesis: moves readers from a definition to a usable observation while fitting existing regional scope. No fresh search evidence establishes its priority above the winter refresh. Estimate: 45–75 minutes, with approximately 10–15 minutes quarterly link/reference review. New graphics can use the established code-native teaching components; no outside image production is required.

## Measurement and sequencing

Implement priorities 1–2 after the official issue is published and verified. Then choose 3 or 4 using a larger GSC query/page window; do not assume the 24-hour sample establishes a durable CTR pattern. Retain the planned December 1–15 observation window for the November 17 snippet test. Bing sitemap parsing/crawl follow-up remains separate and was not checked today. No reminders or new recurring workload were created by this audit.

## Follow-up: concrete examples and duplication check (November 18)

Read current page sources, including `src/content/guides.ts` and teaching components. ONI/RONI definitions, alert labels, MJO/ENSO differences, forecast-horizon selection, equal chances and SWE definitions already exist. A new generic article on each would substantially repeat existing coverage. Prefer the following bounded additions; these remain proposals, not published content or demonstrated search demand.

### A. A seasonal comparison that answers “How strong is this year?”

Extend `/historical/` with a separately labeled seasonal table alongside its existing weekly chart. The official RONI table, read November 18, lists ASO (August–October) values of +2.1°C in 1997, +1.8°C in 2015, +1.0°C in 2023 and +2.0°C in 2026. These are four selected same-season ERSSTv6 RONI values using the product's 1991–2020 baseline, not episode peaks, a weekly comparison or an all-time ranking. Recent values remain provisional. Preserve a dated source extract before implementation. This improves the prior same-window idea with an actual verified seasonal example; keep the existing weekly series separate.

Source: https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/ (rolling table, checked November 18; no issue date asserted). Estimate 60–90 minutes plus release checks; retain as a dated example to avoid a new weekly editorial obligation.

### B. Show why ONI/RONI comparisons and recent values can change

Add a short worked case to `/methodology/` or `/forecast/`, linking to the seasonal table rather than duplicating definitions on a new URL. Compare the same season in the two official products, retaining each product's baseline method. Explain that the same ocean observations can yield different index values because their construction differs, and distinguish an observation revision from a changed future forecast. The RONI page explicitly says recent values may change for up to two months after initial posting. A new source snapshot is needed to claim an actual revision; this check did not compare two vintages.

Sources read November 18: RONI page above and https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/oni/v6/ . The ONI page states RONI is used for official ENSO monitoring/prediction and describes centered 30-year ONI base periods. Its filter note still names ERSSTv5 despite the page's ERSSTv6 heading; do not silently reconcile this source inconsistency or copy that version label into an explanation. Estimate 40–60 minutes, with 10–15 minutes quarterly source-method review shared with existing methodology maintenance.

### C. Turn a snowpack percentage into a reproducible reading exercise

Use the USDA NRCS report-format sample in the California or Northwest guide. Format 4 shows Cedar Pass SWE 7.3 inches, today's median 12.9 inches and median peak 19.3 inches: approximately 57% of today's median and 38% of median peak. These are explicitly official format-sample numbers with no current observation date; never describe them as November 2026 snow conditions. Point out the separate station rows and basin index without inferring a basin aggregation formula from two rows. Retain the elevation and distinguish SWE from snow depth. Existing generic SWE text should link to this example rather than be repeated.

Source: https://wcc.sc.egov.usda.gov/reports/format_html.html (read November 18; sample page, publication/observation date not supplied). Estimate 45–60 minutes; quarterly link check can share the 10–15-minute reference allowance above. Existing HTML/SVG teaching components are sufficient; no external image agent is needed.

### Sequencing and limits

Recommended next batch: A and C can proceed with dated, preserved evidence; B can be a compact supporting block in the same batch. Keep the November 17 `/impacts/` and neutral title/description experiment stable. The winter outlook remains the timely priority once its new official issue is verified: a fresh November 18 browser read still showed the October 15 issue header at https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html . Do not label the scheduled November 19 release as published.

Total preparation/implementation estimate for A–C: about 2.5–3.5 hours plus release verification; seasonal map work is additional. Incremental recurring review can remain around 10–15 minutes quarterly by sharing reference checks, without committing to a news cadence. No fresh GSC/Bing read, new application code, release, or independent review occurred in this follow-up. Evaluate candidate-query impressions and engagement over a larger window before calling these traffic successes.
