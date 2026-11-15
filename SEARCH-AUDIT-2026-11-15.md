# Search performance and indexing audit — November 15, 2026

Read-only audit of the signed-in Google Search Console Domain property and Bing Webmaster Tools HTTPS property for ensolens.com. Browser console data were read directly; no index requests, sitemap submissions, site scans, website edits or deployments were performed. Account identities and session details are excluded. Application baseline: `0e1749b`; documentation baseline: `fba6058`.

## Findings and limits

Google has early visibility concentrated in the existing status and forecast tools. Bing has a concrete discovery/crawl gap in sampled URLs. These are different problems and need different work. Neither platform's data supports a claim that the new learning library has failed or that more article volume is the immediate remedy.

- GSC selected “28 days”; the actual displayed daily coverage was **October 19–November 12, 2026**, 25 rows. All four metrics were enabled, search type Web (text). Three-month selection showed the same aggregate. Do not describe this as 28 complete observed days.
- Bing 30-day chart range was **October 16–November 14, 2026**, with zero clicks/impressions. The three-month August 15–November 14 selection also showed zero. Accessible daily rows ran October 28–November 12. There are no keyword rows to analyze; zero visibility is not a CTR diagnosis.
- GSC performance ends before the November 13 releases. The November 12 learning library has almost no performance observation time. No release-impact attribution is possible.
- This is a console and source-code audit, not a new production HTTP/WAF-log audit or an exhaustive inspection of all URLs. No independent reviewer participated.

## Google performance

| Metric | Observed value |
| --- | ---: |
| Clicks | 4 |
| Impressions | 169 |
| CTR | 2.4% |
| Average position | 16.9 |

Same-length comparison calculated by adding the visible daily rows, not by claiming a console comparison report:

| Window | Impressions | Clicks | Calculated CTR |
| --- | ---: | ---: | ---: |
| October 30–November 5 | 33 | 2 | 6.1% |
| November 6–12 | 72 | 1 | 1.4% |

Impressions increased 118.2%, but two clicks versus one cannot establish a meaningful CTR decline, title failure or improvement caused by a specific release. Changes in queries, countries and positions can change aggregate CTR.

### All visible landing-page rows

| Path | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| /forecast/ | 2 | 74 | 2.7% | 16.9 |
| / | 1 | 70 | 1.4% | 14.2 |
| /historical/ | 1 | 5 | 20% | 22.4 |
| /methodology/ | 0 | 14 | 0% | 29.0 |
| /hurricane-connection/ | 0 | 4 | 0% | 21.8 |
| /forecast/when-will-it-end/ | 0 | 3 | 0% | 5.0 |
| /winter-outlook/ | 0 | 3 | 0% | 19.0 |
| /about/ | 0 | 1 | 0% | 3.0 |
| /faq/ | 0 | 1 | 0% | 61.0 |

Page impressions sum to 175, while property impressions are 169: aggregation differs. Do not force these totals to match. Homepage and forecast account for 144 of 175 page-level impressions (82.3%) and three of four clicks. Prioritize their visibility and task completion. Three impressions at position 5 on the lifecycle page are a small observation, not proven high-volume opportunity. No query-by-page mapping was collected; keyword cannibalization is unproven.

### All visible query rows

| Query | Clicks | Impressions | Position |
| --- | ---: | ---: | ---: |
| noaa enso forecast | 1 | 1 | 10.0 |
| enso forecast | 0 | 7 | 27.1 |
| enso status | 0 | 6 | 9.7 |
| el nino enso forecast noaa cpc probability update | 0 | 5 | 8.0 |
| enso strength probabilities | 0 | 3 | 7.3 |
| current enso status | 0 | 3 | 8.3 |
| cpc probabilistic enso outlook | 0 | 3 | 14.0 |
| enso weekly update | 0 | 2 | 6.0 |
| noaa cpc enso probabilities | 0 | 2 | 8.0 |
| el nino probability | 0 | 2 | 10.5 |
| enso tracker | 0 | 2 | 13.0 |
| enso outlook | 0 | 2 | 24.5 |
| enso update today | 0 | 2 | 77.5 |
| cpc enso probabilities | 0 | 2 | 86.5 |
| enso report | 0 | 1 | 7.0 |
| current enso conditions | 0 | 1 | 9.0 |
| enso diagnostic | 0 | 1 | 9.0 |
| enso now | 0 | 1 | 9.0 |
| weekly enso update | 0 | 1 | 9.0 |
| cpc enso | 0 | 1 | 10.0 |
| enso probabilities | 0 | 1 | 10.0 |
| ninaforecast | 0 | 1 | 12.0 |
| enso autopilot | 0 | 1 | 27.0 |
| enso forecast probability | 0 | 1 | 28.0 |
| lanina forecast | 0 | 1 | 46.0 |
| enso watch | 0 | 1 | 47.0 |
| el nino percentage | 0 | 1 | 51.0 |
| enso tracker bom | 0 | 1 | 83.0 |

Only one of four property clicks is represented in visible query rows. Privacy filtering/aggregation prevents assigning the other clicks to queries. Unlisted queries do not establish zero demand. Current status, forecast probabilities and strength are demonstrated intent themes; broad market volume is unknown.

### Devices and countries

| Device | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| Desktop | 3 | 123 | 2.4% | 19.3 |
| Mobile | 1 | 44 | 2.3% | 10.4 |
| Tablet | 0 | 2 | 0% | 8.5 |

There is no evidence here for prioritizing another mobile redesign. GSC Core Web Vitals shows insufficient usage data over 90 days for both mobile and desktop; that is neither a field pass nor a field failure. Prior release asset reductions are not measured ranking gains.

The country table had 39 rows; only the first ten were inspected. US: 71 impressions, one click, position 11.3. Other clicks were Mexico (4 impressions), Chile (2), Pakistan (1). Brazil had 14 impressions, Argentina 7, Canada 6, Thailand/Netherlands/Russia 5 each. The sample does not justify translated sites or country-specific page expansion.

## Google discovery and indexing

- Sitemap report: `https://ensolens.com/sitemap.xml`, submitted October 21, last read **November 15**, **Success**, **25 discovered pages**, zero videos.
- Aggregate index report last updated **November 9**: 11 indexed, four excluded. It predates the new library; **11/25 is not a valid current indexing ratio**.
- All three noindex examples are alternative home URLs: `https://www.ensolens.com/` (last crawl November 9), `http://ensolens.com/` and `http://www.ensolens.com/` (November 5). These are not three missing articles. Current implementation redirects variants; recheck live redirects/headers before deciding whether any change is needed. Do not remove intentional noindex across APIs/previews to clear a report.
- The robots exclusion is `https://ensolens.com/api/status`, last crawled October 21: not a public editorial landing page. Zero “crawled, currently not indexed” rows were reported at the November 9 snapshot; this does not cover later pages.
- Fresh URL inspection: `/learn/kelvin-waves-and-enso/` **indexed**; Googlebot smartphone crawl **November 15 at 10:08:42, console-displayed time**, successful fetch, crawling/indexing allowed, sitemap discovery, declared and Google-selected canonical both the inspected URL. Console timezone not independently established.
- Fresh URL inspection: `/learn/enso-model-plumes-and-probabilities/` **indexed**, HTTPS. Its detailed crawl panel was not expanded.
- These two samples prove the aggregate index report lags current URL state; they do not certify every guide as indexed.

## Bing discovery and indexing

- 30-day and three-month search totals both zero. Site Explorer's indexed-URL view returned no data.
- Sitemap list: no rows, counts displayed as dashes, no matching data under All types/All status. This property has no visible sitemap record; it does not prove Bing has never encountered a sitemap by another route.
- Homepage URL inspection: **Discovered, not crawled**, discovered **October 22, 2026**; cannot appear on Bing according to the report.
- `/forecast/`: **Not discovered**.
- `/learn/kelvin-waves-and-enso/`: **Not discovered**.
- The discovery/crawl gap is directly observed in these URLs. Root cause is not yet proven: check fetch accessibility, robots, canonical, Cloudflare challenges/rate rules and actual Bingbot requests before attributing it to site quality or configuration. Do not treat console wording as proof of a manual penalty.

## Prioritized implementation plan (proposed, not executed)

| Priority | Work | Evidence / purpose | Completion and evaluation | Estimated one-time effort |
| --- | --- | --- | --- | --- |
| P0 | Diagnose Bing fetch/discovery, then submit the canonical sitemap in Bing; inspect home, forecast and two guides. Request key URLs after accessibility checks. Consider IndexNow only if a persistent discovery gap warrants ongoing integration. | Zero visibility; no visible sitemap record; home discovered but not crawled; forecast not discovered. | Record sitemap acceptance/read/discovered counts, URL status and actual crawl evidence. Recheck after 7–14 days; submission does not guarantee indexing. | 1–2 h, excluding platform waiting |
| P1 | Complete a 25-route index matrix: intended indexability, sitemap membership, console status, last crawl, canonical; prioritize core pages and ten guides. Verify current alternate-host redirect headers. | Google aggregate is stale; two new guides already indexed. | Separate intended exclusions from actual missing editorial pages; fix only confirmed technical causes. No blanket noindex removal or repetitive bulk resubmission. | 1–1.5 h |
| P1 | Audit rendered search-entry alignment on home and forecast; map current-status queries to home, CPC probabilities/strength to forecast, end-date intent to lifecycle. Inspect query-by-page overlap before edits. Improve only missing concise answers/links or poorly matched metadata. | Home/forecast dominate page impressions; status/probability/strength terms already appear. | Keep existing dated summaries, strength table, task navigation and automatic revision summary: these already exist. One coherent scoped change, then compare page+query groups over comparable windows. Avoid another whole-page rewrite or duplicate keyword pages. | 1–1.5 h |
| P2 | Strengthen contextual paths from core tools to model-plume, index-definition and lifecycle explanations where an explanation is actually missing. Audit the existing links before adding any. | Supports observed probability/status intent; ten guides already have related links and teaching assets. | Useful task-specific anchors and verified destinations; monitor discovery and non-brand impressions on existing guides. No article-count quota. | 0.5–1 h |
| P2 | Observe new library and November 13 changes through a fuller 28-day window before choosing additional subjects. Potential first extensions: probability vs strength; weekly status vs seasonal phase; peak vs return to neutral. Prefer existing-page additions after gap review. | These intent themes are observed, but much existing material already answers them. | At November 29 review early discovery/performance; around December 13 evaluate roughly four weeks after release, using only dates fully available in the console. Expand only where query evidence and a distinct answer justify it. | 0.5 h review; any new article separately scoped |

Estimated initial work: **4–6.5 hours**. Proposed search monitoring: **15–20 minutes weekly**, ideally inside the existing weekly review rather than a second routine. Monthly index/query summary: **20–30 minutes**. Fit this alongside data/editorial duties within the existing 6–10 hours/month; if investigation expands, defer P2 work before adding recurring publishing.

Success order: (1) confirmed fetch/discovery, (2) intended editorial indexing and correct canonicals, (3) more relevant non-brand query/page impressions, (4) clicks/CTR once sufficient comparable exposure exists. Do not set an unsupported traffic or revenue promise, or judge 1–7-impression queries on CTR. Position must be compared within stable query/page/device groups, not just sitewide averages.

Deferred: another ten-article batch, city/country-page multiplication, repeated title changes, manufactured daily updates, blanket schema additions, another visual redesign, and any assertion of a Bing penalty. None is supported as the next priority by the observed data.

## Evidence locations

All console observations above were read November 15, 2026 through the signed-in Chrome session. Links require property access; no authentication material is stored here.

- GSC performance: https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aensolens.com
- GSC indexing: https://search.google.com/search-console/index?resource_id=sc-domain%3Aensolens.com
- GSC sitemaps: https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aensolens.com
- GSC Core Web Vitals: https://search.google.com/search-console/core-web-vitals?resource_id=sc-domain%3Aensolens.com
- Bing performance and in-console navigation to sitemap/Site Explorer/URL inspection: https://www.bing.com/webmasters/searchperf?siteUrl=https://ensolens.com/
- Existing implementation checked: `src/pages/index.astro`, `src/pages/forecast.astro`, `src/pages/sitemap.xml.ts`; release and editorial records in PROGRESS.md/EDITORIAL.md.
