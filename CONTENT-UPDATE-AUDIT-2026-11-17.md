# High-value content update audit — November 17, 2026

## Highest-value opportunity: prepare the dated winter outlook for the next issue

The live `/winter-outlook/` page presents the CPC issue issued October 15, 2026 and saved October 2026 GIFs for DJF 2026–27. The CPC index observed November 17 exposes rolling target labels, but those labels do not establish a new issue date for the saved DJF maps. The official 2026 release schedule identifies November 19, 2026 as the next DJF 2026–27 long-lead release. Until that issue is published and its maps, legend and discussion agree, the October product should remain dated and intact.

Official sources observed November 17, 2026 (Asia/Shanghai):

- Seasonal outlook index: https://www.cpc.ncep.noaa.gov/products/predictions/long_range/
- Current prognostic discussion: https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html (header observed as October 15, 2026)
- 2026 release schedule: https://www.cpc.ncep.noaa.gov/products/predictions/schedule.php (next DJF release observed as November 19, 2026)

The discussion page currently displays an October 15, 2026 issue header while the seasonal index exposes rolling November target labels. Therefore the next implementation must verify the exact current map issue, valid period, legend and discussion before changing the page. Do not call a November map “the November discussion” until the source pages agree.

### Proposed implementation after the scheduled release (priority P0, about 60–100 minutes)

1. Retrieve and preserve the current CPC temperature and precipitation map assets for the exact DJF target, with source filenames and issue date.
2. Update the page eyebrow, title/description, map alt text, regional notes, figure note and source callout together. Keep the current map as a dated archive only if the page structure makes the comparison clear; otherwise do not leave two competing “current” maps.
3. Add a short “what changed since October” paragraph only when the two verified issues can be compared for the same target season. Describe category shifts, not invented local outcomes.
4. Keep the existing distinctions: seasonal categories are not daily storm forecasts, equal chances is not near-normal, and seasonal precipitation is not resort snowfall.
5. Update `src/pages/sitemap.xml.ts` only after the source issue and target period are verified. Run the full deployment gate because this is a meaningful public-content change.

Expected benefit: freshness and stronger alignment for queries around the current U.S. winter outlook, California precipitation and El Niño winter impacts. This is a planning hypothesis; search lift is unverified. Maintenance: one monthly 20–30 minute product check, within the existing budget.

## Secondary content opportunities

### P1 — strengthen the existing winter-to-region path (30–45 minutes)

The `/impacts/` page already receives the largest share of recent Google impressions (46 in the November 16–17 snapshot, average position 8.7, zero clicks). After the winter page is refreshed, update its card text and internal links to point to the current dated outlook and the California/Sierra explanation. Avoid adding city pages. Measure page/query CTR after 14–28 days.

### P1 — add one compact answer block, not another article (20–35 minutes)

The strongest observed query themes were `enso status` and `enso neutral meaning`; the latter already has a dedicated page. A compact FAQ or answer block can clarify “What does a strong El Niño winter outlook actually tell me?” with three boundaries: category probability, three-month target, and local forecast limits. Reuse existing forecast and winter content, with visible CPC attribution. Do not duplicate the ten-guide library.

### Hold — protect pages already earning clicks

The Kelvin-wave and drought-recovery guides were the only two pages with clicks in the small 24-hour GSC sample. Preserve their titles and core copy while collecting a larger comparable window. Add links only when the refreshed winter page supplies a genuinely relevant path.

## Not recommended now

- Ten more generic articles, city pages, language versions or a global-impact expansion: no query/page evidence supports the maintenance cost yet.
- Replacing the dated winter maps with live feed values: the page is an archival, manually reviewed product and must keep issue dates and assets aligned.
- Publishing an “El Niño causes X” briefing from one CPC sentence: distinguish official forecast, observed conditions and local impacts.

## Decision sequence

1. Verify and refresh the dated CPC winter product (P0).
2. Run types, tests, build, local Worker refresh and desktop/mobile checks; deploy and verify all production routes.
3. Observe Google page/query data for 14–28 days and Bing sitemap processing separately.
4. Only then decide whether the compact answer block or another existing-page snippet test is justified.

No application changes were made by this audit. No independent reviewer participated; source pages were read directly and dates were recorded above.
