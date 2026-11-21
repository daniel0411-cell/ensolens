# Search and content opportunity audit — November 21, 2026

Checked November 21, 2026 (Asia/Shanghai). Scope: signed-in Chrome ENSOLens GSC/Bing reports, official public sources in the background browser, current production winter page and existing repository content. This is research and an implementation plan; no application change, submission, deployment or independent review occurred.

## Search evidence

GSC property: `sc-domain:ensolens.com`, Web/text, report last updated four hours before observation. The seven-day chart actually covers November 12–18, not the seven calendar days immediately preceding this audit. The 24-hour chart covers November 20–21 and is provisional; do not combine it with settled daily data.

| Window | Impressions | Clicks | CTR shown | Average position |
| --- | ---: | ---: | ---: | ---: |
| October 22–November 18 (28 days) | 664 | 9 | 1.4% | 12.4 |
| November 12–18 (7 days) | 525 | 5 | 1% | 10.8 |
| November 20–21 (24-hour report) | 102 | 1 | 1% | 12.4 |

The preceding seven days, November 5–11, sum to 55 impressions and one click from the daily table. The latest settled seven days therefore have about 9.5 times as many impressions (+855%) and five versus one click. This is an observed visibility increase from a small baseline, not proof of causality from any specific release. Calculated CTR falls from 1/55 (1.82%) to 5/525 (0.95%); the traffic mix changed and click counts are too small to conclude that the new snippets are worse.

Daily records, date: clicks/impressions:
- November 5–11: 0/4, 0/5, 0/6, 0/2, 0/9, 1/17, 0/12.
- November 12–18: 0/21, 0/5, 0/8, 2/62, 1/153, 1/136, 1/140.
- November 16–18 alone account for 429 impressions. Continue observation before calling this a durable growth trend.

### Seven-day landing-page priorities

| Page | Impressions | Clicks | Position |
| --- | ---: | ---: | ---: |
| /impacts/ | 167 | 0 | 10.9 |
| /forecast/ | 101 | 3 | 12.3 |
| / | 72 | 0 | 9.7 |
| /forecast/enso-neutral/ | 61 | 0 | 11.5 |
| /learn/nino-regions-explained/ | 22 | 0 | 6.9 |
| /impacts/pacific-northwest-winter/ | 20 | 0 | 11.0 |
| /learn/how-enso-is-observed/ | 16 | 0 | 11.8 |
| /learn/kelvin-waves-and-enso/ | 12 | 1 | 8.8 |
| /learn/climate-normals-and-anomalies/ | 12 | 0 | 16.6 |
| /learn/el-nino-and-drought-recovery/ | 5 | 1 | 6.2 |

These are selected rows, not an additive breakdown of property totals. Do not extrapolate the drought guide's one click into a reliable 20% CTR advantage.

Recent query evidence: seven-day `enso status` has 23 impressions, zero clicks, position 9.1; `current enso status` 5/0/7.8; `enso weekly` 5/0/8.8; `enso neutral meaning` 4/0/10.0. The 24-hour report includes `el niño winter forecast` (two impressions, position 5) and `are we el nino or la nina` (one, position 8). These suggest status, forecast and regional-winter intent, but volumes are small. The unrelated `make them clickable` query is excluded from editorial planning.

Filtering the seven-day report to /impacts/ exposed sparse query rows: `lanina forecast` and `are we in el niño or la niña` each two impressions; `does el nino mean more snow`, `how does el nino affect nebraska` and `el nino effects on north america` each one. This shows mixed intent; it does not explain all 167 impressions. Query privacy omissions and low volumes prevent a firm diagnosis of the zero-click result or justification for a Nebraska page.

### Bing: discovery improved, internal-page crawling still pending

- Seven-day chart labeled November 14–20: zero impressions, zero clicks, no keyword rows. The visible daily table ended November 19; November 20 may be incomplete.
- Sitemap https://ensolens.com/sitemap.xml now shows **Success**, 25 discovered URLs, zero errors/warnings; submitted and crawled November 17. This improves on the November 17 Processing/zero-URL checkpoint.
- URL inspection: homepage **indexed successfully**, with no SEO/GEO issue shown.
- /forecast/ and /impacts/: **discovered but not yet crawled**, discovered November 17; not eligible to appear in Bing at this observation.
- Discovery is not indexing. Zero search traffic is not evidence that the entire site is unindexed. These samples do not establish a WAF block, crawl failure cause or domain-wide quality penalty. No real crawler logs were read, no indexing requests were sent and no settings changed.

## Verified current official material

### 1. CPC November 19 seasonal outlook: strongest freshness opportunity

Source: https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html

Visible header: **830 AM EST Thu Nov 19 2026**. Target: **December 2026–February 2027 (DJF)**; climate reference period 1991–2020. Verified discussion text, not just search snippets.

- Strong El Niño expected to persist through JFM 2027 and be a major winter/spring influence.
- Above-normal seasonal temperatures favored across much of the northern two-thirds of the contiguous U.S.; parts of the Southeast favor near-normal temperatures.
- Above-normal precipitation favored in California, Southwest and much of the southern/eastern U.S. Florida, southern Georgia and coastal Carolinas exceed 70% in the discussion.
- **Explicit October-to-November change:** above-normal precipitation probabilities increased in California, Desert Southwest and East Coast; southern California and southwestern Arizona exceed 60%.
- Below-normal precipitation favored in parts of the Great Lakes, northern High Plains, northern Rockies and mainland Alaska.
- Blocking/AO/NAO remain temperature uncertainties. A seasonal warm tendency does not rule out cold outbreaks, and a wet-category probability does not establish snowfall or local flood probability.
- Next seasonal issue stated as December 17, 2026.

Production https://ensolens.com/winter-outlook/ was read directly: it still labels and preserves October 15 maps, checked November 8, and describes November 19 as the next scheduled issue. Repository content matches that older dated product. It is correctly dated but now stale as the site's winter reference.

**Implementation prerequisite:** inspect and archive both actual November 19 DJF map images and their legends before replacing assets and regional numerical descriptions. This audit verified the discussion only; no new map asset has been saved or visually verified. Keep the official monthly ENSO strength product separate from these seasonal regional maps. Do not copy the discussion's weekly Niño 3.4 figure into the automated dashboard feed.

### 2. Southeast wet winter, drought recovery and flood context

Source: https://www.drought.gov/news/strong-el-nino-tilts-odds-toward-wetter-winter-across-southeast-2026-11-19

Published **November 19, 2026**, NOAA/NIDIS; reports the November 17 Southeast Climate Monthly Webinar. Opened and read primary article via Drought.gov's featured-news link.

Useful supported angle: wetter DJF odds can offer drought relief while water managers still need to monitor water stores and river-flood conditions. The article distinguishes a large-scale climate pattern from individual storms. Use the dated CPC seasonal discussion/maps for current regional category probabilities. Do not turn a precipitation probability into a numeric flood probability, local warning or a guarantee of drought removal. Numerical ENSO strength/historical-ranking claims in this news article need separate verification against the relevant CPC strength issue before reuse; they are unnecessary for this content update.

### 3. New precipitation-effectiveness research explainer

Source: https://www.drought.gov/news/why-heavy-rain-doesnt-always-end-drought-2026-11-19

Published **November 19, 2026**, Dr. Trent Ford, Illinois State Climatologist. Opened and read the full article.

It summarizes a Water Resources Research study using three Illinois Climate Network stations, May–October events in 2008–2023, soil recharge in the top three feet. Rain intensity and antecedent soil moisture help explain why rainfall totals alone do not establish soil recharge. This is a specific Illinois growing-season study, not a measured prediction of Southeast winter infiltration. The study itself was not opened in this audit: attribute research summaries to NIDIS, or verify the paper before adding numerical results. Avoid portraying its reported under-10% to over-80% range as a national recharge rule.

Existing guide src/content/guides.ts already explains storage recovery, flooding/drought coexistence and local indicators. Its useful addition would be the bounded study example and a dated Southeast application, rather than repeating the general definition in another article.

## Recommended implementation sequence

| Priority | Existing pages / task | Concrete useful addition | Initial effort estimate |
| --- | --- | --- | --- |
| P0 | /winter-outlook/ | Replace with verified November 19 DJF maps and matching text; add a concise same-target October→November change table; update issue/check/next-review dates, alt text and archived source record together | 1.5–2.5 hours |
| P1 | /impacts/; California; Northwest | Route readers to the new issue and add bounded regional context; explain why the actual November map can differ from a generic El Niño tendency, especially Northwest; retain local snow/flood limits | 1–1.5 hours |
| P1 | Existing drought-recovery guide | Add the scoped Illinois rainfall-effectiveness example and optional dated Southeast case with observation checklist; link from winter/impacts | 0.75–1.25 hours |
| P2 | Homepage and /forecast/ | Audit status-question routing: make the current official status, source date and distinction from weekly values easy to find; strengthen status→forecast→regional reading links where a real gap remains | 0.5–1 hour |
| Parallel follow-up | Bing internal-page discovery | Recheck sampled URLs November 24–December 1; if still pending, inspect real Bingbot/WAF evidence before configuration changes or a small targeted resubmission | 0.25–0.5 hour initially |

These are planning estimates, not guaranteed costs. Suggested first batch: winter page, impacts index, California, Northwest and drought guide—**five substantive existing-page updates**, plus link adjustments only where useful. Do not expand to a generic article quota based on this small search sample.

Keep the November 17 impacts/neutral title and description experiment stable for at least 14–28 days (first review December 1; fuller review by December 15). A substantive source update is justified now; repeated title flips would make measurement harder. /forecast/ already contributes three of five recent clicks, so preserve useful intent rather than broadly rewriting it without a gap.

For P2, first inspect current rendered content and existing dated answer blocks; do not add another duplicate status explanation. No new city pages or unsupported “2027 La Niña confirmed” article: model/tool projections beyond official probability horizons are not a confirmed phase forecast.

## Measurement and maintenance

- Compare complete seven-day windows after release, plus page/query results across 14–28 days. Track impressions, clicks, CTR and position together; do not set unsupported traffic promises or treat a handful of clicks as statistically stable.
- Primary pages: /winter-outlook/, /impacts/, /forecast/, home and the drought guide. Distinguish search landing-page improvement from internal-link navigation, which GSC alone cannot measure.
- Bing success criterion is first observed internal-page crawl/indexing, then actual impressions; sitemap success has already been achieved.
- Estimated recurring work: 20–30 minutes/week source health (about 1.5–2 hours/month), 30–45 minutes/month matching official seasonal/strength issue checks, and about 30 minutes/month search review. The proposed first batch consumes much of one month's 6–10-hour budget; keep later dated case maintenance bounded and avoid a daily news obligation.
- Any future application release must advance only meaningfully changed sitemap dates, align EDITORIAL.md's preserved-issue statement, pass npm run deploy, and run the production indexing verifier. Obtain independent interpretation review where available. This research checkpoint did not run application tests or alter production.
