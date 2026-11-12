# Regional and neutral-phase source review

Verified November 12, 2026 in the background in-app browser. New evergreen guides, not a current regional weather forecast. No search volume, indexing or traffic gains are asserted.

## Current publication state

- https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml still showed the October 8, 2026 issue at approximately 16:39 Asia/Shanghai. Next discussion scheduled November 12; no November values assumed.
- https://ensolens.com/api/status/ checked approximately 16:48 Asia/Shanghai: healthy, no stale feeds. Latest successful source check November 12 at 06:15:52 UTC; discussion October 8, forecast October, weekly center November 4, seasonal RONI October 31. Healthy source access does not establish a new publication.
- GitHub production origin/master matched local HEAD after fetch. No pre-existing uncommitted changes.

## Primary sources

- https://www.climatehubs.usda.gov/hubs/northwest/topic/el-nino-northwest-what-can-we-expect
  - USDA Northwest Climate Hub: El Nino winters/falls usually warmer and drier in Washington, Oregon, Idaho. Other factors mean typical effects are not certain. Less precipitation and more rain versus snow can reduce later runoff/water availability. Alaska differs.
  - Page includes a 2026-27 outlook and numerical probability. Those values are not reused; general mechanisms and geographic relationships only. No clear publication date observed.
- https://www.climatehubs.usda.gov/hubs/northwest/topic/la-nina-northwest-what-can-we-expect
  - General winter tendency: cooler in WA/OR/ID, sometimes wetter, with precipitation association less strong than temperature. Snow, melt and runoff have different implications. Other drivers matter.
  - Opening outlook is for winter 2024-25, not current. New guide explicitly marks that limitation and does not reuse the old forecast numbers.
  - Photo caption credits USDA Forest Service / Todd Leeds, skier near Yellow Pine, Idaho. Browser downloaded the displayed Ski.jpg; locally resized to 1400x877 at public/images/guides/northwest-snow-usfs.jpg. Location photo, no current condition claim.
  - Original image: https://www.climatehubs.usda.gov/sites/default/files/2024-11/Ski.jpg
- https://www.weather.gov/mhx/ensowhat
  - NWS defines neutral as neither event phase; SST often near average, but ocean and atmosphere may not show matching event behavior. No claim that one weekly threshold alone defines neutral.
  - Typical late-fall through early-spring circulation for moderate/strong event phases; broad northern/southern U.S. tendencies used with qualifications, not numerical/current regional odds.
  - NOAA/Climate.gov circulation illustration displayed on NWS page downloaded via browser, locally resized to 1600x766 at public/images/guides/enso-winter-circulation-noaa.jpg. Caption explicitly says event-phase comparison, not a neutral map or 2026-27 forecast.
  - Original image: https://www.climate.gov/sites/default/files/LosNinoshighpressureHR.jpg

## Existing verified interpretation retained

- CPC probability source: https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/outlook/
- Regional products: https://www.cpc.ncep.noaa.gov/products/predictions/long_range/
- Equal chances versus near-normal and category probabilities follow the November 8 verified seasonal-map review (CONTENT-SOURCES-2026-11-08.md); no new regional probabilities introduced.
- Neutral probabilities refer to target seasons, not share of neutral days or a city's chance of normal weather. No automatic neutral-to-La Nina succession is asserted.

## Follow-up: probability reading and status clocks

- Background browser recheck November 12, 2026, approximately 17:18 Asia/Shanghai: https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/probabilities/ and /enso/roni/outlook/ still show October 2026. The discussion URL above still shows October 8, with November 12 scheduled. No new November values used.
- CPC probabilities: nine overlapping three-month seasons, three alternative phases, expert assessment combining observations and multiple models, RONI verification and 1991-2020 baseline. Published 0% is approximate, not exact.
- New forecast text explains largest category versus majority, overlapping DJF/JFM windows, same-target/year revisions and percentage points. 45/40/15 and 60-to-70 are explicitly teaching examples, never official forecast values or chart inputs. No multiplication of dependent seasonal probabilities.
- Homepage distinguishes official coupled-system assessment, weekly observation, three-month relative index, issue date, retrieval check and scheduled release. Index methodology follows the previously verified CPC RONI review in CONTENT-SOURCES-2026-11-10.md; no calculation or feed change.
- Direction follows the owner's authorized GSC review: visible queries concerned forecasts/status/probabilities, but the sample is too small to establish stable demand or a ranking effect. No new route or recurring editorial workload introduced.

## Regional batch scope

Three new routes: /impacts/, /impacts/pacific-northwest-winter/, /forecast/enso-neutral/. Existing pages get contextual inbound links. Homepage regional card now covers Northwest snowpack. Sitemap dates advance for new pages and substantive homepage edit; link-only edits retain existing content dates.

Quarterly source/link review expected to take about 15-20 minutes for this batch. No new recurring publication schedule, city-page series or automated data product.

## Follow-up: next editorial priorities

Browser verification November 12, 2026; research only, no public-page changes in this follow-up.

- Search: Google query `NOAA CPC ENSO Alert System Advisory criteria Watch`, followed by the original English primary source: https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/enso-alert-readme.shtml
  - Watch: favorable development conditions within six months. Advisory: conditions observed and expected to continue. Final Advisory: conditions have ended. NA: alert system not active.
  - Conditions combine a one-month relative Nino-3.4 anomaly threshold, expected three-month RONI threshold and an observed atmospheric response. The page footer says June 13, 2018 despite the current RONI wording; verification date is distinct from that footer date.
  - Existing FAQ adds a five-overlapping-season persistence requirement to the operational Advisory definition. Correct this distinction from retrospective episode classification. The official definition on this page also does not specify the FAQ's approximate 50% Watch threshold.
- The current discussion URL cited above still displayed the October 8, 2026 issue and a November 12 scheduled release on this recheck. Do not infer publication from the calendar.
- Historical-page code review: the summary table presents +3.0, +2.3, +2.1 and -1.4 C beside three-month season labels, while the benchmark JSON identifies weekly anomalies. Clarify the metric and use actual weekly peak dates, or separately source seasonal values; numerical accuracy and full data provenance still require verification. The page also calls the CPC outlook a model consensus, inconsistent with the verified expert-assessment explanation.
- A useful follow-up section can explain why historical strength comparisons do not determine local impacts. The October 8 discussion itself says stronger-event impacts are more likely but not guaranteed and directs readers to CPC seasonal outlooks. Extend existing historical/winter pages rather than duplicate the recently published strength and probability guides.
- These are editorial priorities, not measured search-volume or ranking forecasts. Previously observed GSC samples are small. No new recurring publication commitment proposed.

## Historical comparison and alert correction implementation

- Primary weekly source opened in the background browser November 12, 2026: https://www.cpc.ncep.noaa.gov/data/indices/wksst9120.for . Subsequently fetched for programmatic comparison of dates, SST and anomalies: all 210 stored observations match (2015: 52; 1997: 53; 2023: 52; 2020: 53). Original retrieval timestamp retained; this is a new verification, not a replacement dataset.
- Calendar-year extremes in the 1991-2020 conventional weekly series: 2015 +3.0 C, centered November 18; 1997 +2.3 C, centered December 17; 2023 +2.1 C, centered November 22; 2020 -1.7 C, centered October 28. Existing metadata dates for 1997/2023 and value/date for 2020 were inconsistent with their own series and corrected. These are not seasonal RONI peaks or full-episode rankings.
- Replaced unsupported record/impact attribution and seasonal classifications with calendar-year coverage and data-derived summaries. 2020 explicitly excludes the later winters of the multi-year episode. Historical analog limitations route readers to existing dated winter and evergreen regional guides. No new impact probability or ranking inferred.
- Corrected chart range to include week 53; current-year positions use January 1 calendar bins rather than index into a potentially partial rolling feed. Month labels remain approximate; tooltip/CSV retain exact observation dates.
- FAQ operational alert definitions follow the primary CPC alert page above; historical five-season classification is explicitly separate. Source checked November 12; no new source publication date inferred. Historical and FAQ sitemap dates reflect substantive edits today.
- No new recurring publishing workload; check historical-source and alert links during existing periodic maintenance.

## Lifecycle evidence, spring predictability and multi-winter La Nina

Background browser research verified November 12, 2026, starting with a Google search for NOAA ENSO spring predictability sources and opening original articles.

- https://www.climate.gov/news-features/blogs/enso/why-making-el-nino-forecasts-spring-especially-anxiety-inducing
  - Michelle L'Heureux, published May 4, 2023. Archived by Climate.gov, no longer maintained. Explains uncertainty about persistent westerly wind anomalies and subsurface warmth during development, including contrasting 1997/2014 evolution. Historical cases support mechanisms only; no old forecast probabilities or historical sample frequencies reused as current odds.
- https://www.climate.gov/news-features/blogs/enso/double-dipping-why-does-la-ni%C3%B1a-often-occur-consecutive-winters
  - Nat Johnson, article publication July 7, 2021 (related-article listing differs). Archived content. Describes asymmetric wind response and equatorial ocean heat discharge/recharge as one explanation for La Nina recurrence, with other mechanisms and scientific uncertainty. Neutral intervals can separate cold winters. Historical counts and the 2021 forecast excluded from current probabilities.
- Expanded the existing lifecycle route with a four-row evidence table, spring uncertainty and multi-winter recurrence. Current CPC probabilities remain the validated live product; neither archived article supplies current forecasts. No new runtime feed or route. Source review fits the existing monthly lifecycle review, with no separate recurring publication commitment.
