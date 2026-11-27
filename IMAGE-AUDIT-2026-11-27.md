# Search image audit — November 27, 2026

## Observed before changes

Astro 7 / Cloudflare Worker SSR, shared Layout.astro, ten typed learning guides with Article JSON-LD; other editorial pages use WebSite/FAQ markup. Deploy gate includes types, unit tests, build, a real local NOAA refresh and Chrome 1440/390 checks. Worktree was clean.

Live HTTP checks: homepage, forecast, Kelvin guide, Northwest and winter returned 200; 404 stayed 404/noindex. All sampled pages lacked og:image; shared template has no twitter:image. Kelvin Article had no image. Indexable pages sent index,follow without max-image-preview. Existing Northwest JPEG (1400×877), NOAA circulation JPEG (1600×766), and November winter GIFs (3300×2550) return 200 with correct image MIME and no indexing restriction on production. Robots allows / except /api/.

Homepage's visible sea-temperature image uses /api/ocean-map?version=..., within the robots disallow. Worker also marks API responses noindex. This is an observed obstacle for that image URL, not proof of why any Google result lacks a thumbnail. API map img lacks width/height. Learning diagrams are inline SVG or HTML rather than independently fetchable image files. Existing SVG/HTML explanatory value should be retained, not replaced with generic posters.

## Plan and limits

Use one page-image registry for available representative images, body references, OG/Twitter and applicable Article/WebPage image. Export existing original geographic, Kelvin, plume and Sierra diagrams as standard images, keeping explanations and captions. Reuse existing reliable regional photography/maps, retaining issue and attribution. Give homepage's same validated map a public /images/ route, keeping API restrictions and preview/404 noindex. Add large-preview permission only for intentionally indexable successful production responses.

No evidence was collected about Google's actual thumbnail selections or crawler logs. Missing markup alone is not a diagnosis. Selection is automatic and no thumbnail, Discover eligibility or CTR outcome is promised. No universal 1200px threshold: native vector render sizes and actual file dimensions govern.

Google primary documentation checked in background browser November 27:
- https://developers.google.com/search/docs/appearance/google-images (displayed update March 3, 2026): standard img, descriptive alt, responsive images, representative preferred images, automatic selection from multiple sources, avoid generic logos/text posters/extreme ratios.
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#max-image-preview : large permits larger previews; default is possible without the rule. This is permission, not a display command.

Coverage and remaining asset gaps will be recorded with the final implementation. No article or sitemap dates should change for exports, template changes or metadata alone.

## Implemented coverage and decisions

Ten existing content pages now have body representative images with matching preferred-image metadata:

| Page | Representative image / editorial purpose |
|---|---|
| `/` | Same validated NOAA SST anomaly figure, now a public versioned GIF URL outside `/api/`; source issue and observation legend retained |
| `/learn/nino-regions-explained/` | Original overlapping geographic boxes, 760×310 |
| `/learn/kelvin-waves-and-enso/` | Original eastward thermocline propagation schematic, 760×340 |
| `/learn/enso-model-plumes-and-probabilities/` | Original invented three-path teaching plume, 760×360; explicitly not a current forecast |
| `/impacts/california-snow-vs-rain/` | Original Sierra snow-level cross-section, 760×320 |
| `/forecast/` | Preserved November RONI ranges and common numeric axis, 1000×500 |
| `/historical/` | Original overlapping three-month calendar windows, 1000×500 |
| `/impacts/pacific-northwest-winter/` | Existing attributed USDA/USFS location photograph with responsive WebP variants |
| `/forecast/enso-neutral/` | Existing NOAA circulation comparison, caption explicitly identifies two event phases and its limits for neutral |
| `/winter-outlook/` | Existing unmodified November 19 temperature map; precipitation map remains visible separately |

The first four exports preserve existing vector geometry; six PNGs are approximately 19–52 KB each. The two previously HTML-only diagrams retain textual values, source dates and caveats. No unrelated content expansion or stock-image acquisition. Large-preview permission is conditional on successful intentionally indexable production output; preview/API/404 restrictions remain. API URL retained for compatibility. Metadata changes and exports do not change article/sitemap dates.

### Initial deferred work (first release; extension below completes the main-page gaps)

| Existing page group | Gap / replacement plan |
|---|---|
| Neutral explainer | Existing event-phase comparison is relevant but not a neutral illustration. Replace only when an original three-phase circulation comparison can accurately explain neutral variability; retain current explicit caption meanwhile. |
| Seven other learning guides: `soi-vs-ocean-indices`, `enso-and-climate-change`, `marine-heatwaves-vs-el-nino`, `el-nino-and-drought-recovery`, `enso-jet-stream-teleconnections`, `climate-normals-and-anomalies`, `how-enso-is-observed` | Existing text/tables/flows remain; future editorial edits can export a reviewed index-method comparison, marine-heatwave spatial comparison, climate-trend distinction, wind/circulation schematic, observing-system diagram or drought storage diagram where it materially helps. Do not assign all seven the same Niño image. |
| `/forecast/when-will-it-end/` | A three-clock timeline could explain peak, phase and impact timing; create on its next substantive revision, using dated targets rather than a fabricated transition forecast. |
| `/methodology/` | A sourced index/baseline calculation diagram could improve the existing worked example; prepare on next method revision. |
| `/impacts/` | A regional navigation map is optional; current answer cards remain sufficient. Add only if it makes regional choice clearer. |
| `/learn/`, `/faq/`, about/privacy/error pages | No forced hero image; utility pages and the library are not treated as illustrated articles. FAQ remains text-first. |

The neutral image is an identified quality improvement opportunity, not a technically broken asset. No claim is made that deferred images would increase traffic. Asset selection/rights evidence remains a manual responsibility; automated existence of a provenance string does not prove permission.

Rights-policy primary check November 27: NOAA Library, “Copyright of NOAA’s published works”, published May 13, 2026, https://library.noaa.gov/blogs/news-research-highlights/question-of-the-quarter-noaacopyright . NOAA/federal-only works generally public domain in the United States with attribution; third-party authorship requires checking potential rights holders. This is not a blanket license for all government-hosted material. Existing photo credit is retained from the project’s dated source record; no new photo was acquired.

USDA original-photo source rechecked November 27 in the background browser: source above still captions “A skier descends an unnamed peak near Yellow Pine, Idaho” and “USDA Forest Service photo by Todd Leeds.” The article discusses winter 2024–25; no publication date for the photo itself was visible. Its old weather outlook is not republished as current conditions. Credit and location match the retained file and caption.

Initial image gate: 1440×1000 and 390×1000 passed. The new 320×1000 check caught an existing homepage provenance/footer-row link overflowing by about 9px. Enabled wrapping in that row; release remained blocked before upload until the fix could be retested. Independent code/interpretation review checked image routing, index boundaries and six diagrams against retained source records, found mobile label readability and malformed GIF header risks; both addressed. Review did not repeat external browser source checks or rendered layout QA.

## Integration checkpoint

GitHub had six newer commits through bc3decd when this image work was ready. Paused upload, fetched and rebased the image commit onto that baseline, preserving the November 25–27 shared UI/content releases and their sitemap dates. Image application commit is ec101f8. Re-ran the complete gate on the combined source; no force-push. The earlier 320px footer wrap is also present in the newer UI baseline. Final deployment/live verification is recorded below.

## First-release verification and release

- Application ec101f8 pushed to GitHub master; full `npm run deploy` gate passed on the merged baseline: 77-file type check (zero errors/warnings, two existing hints), 26 tests, nine static image files, build, real NOAA refresh/KV/RSS, image checks at 1440×1000 / 390×1000 / 320×1000 CSS px, existing four-width shared UI/no-JavaScript checks, full desktop/mobile interactions and retained-data failure behavior.
- Actual Cloudflare version d8e090aa-2c49-438e-8c9e-d3888e5f0626; deployment 6c9860fc-7b51-4bd9-9364-eda9718e5371; November 27, 2026 at 11:18:58 Asia/Shanghai, 100% traffic.
- Postrelease `ENSOLENS_EXPECT_INDEXING=true node scripts/verify-production.mjs` passed all 25 routes plus health/RSS/source/canonical/sitemap/404 checks. Public robots allows / and does not disallow /images/; /api/ stays disallowed.
- `node scripts/verify-image-production.mjs` passed all ten representative pages at each of the three actual CSS viewports above: body images decode with real dimensions, OG/Twitter/WebPage/Article images agree, correct MIME/HTTP accessibility, conditional preview permission, preview/error/API indexing boundaries and no horizontal page overflow. Public versioned NOAA GIF returns successfully; invalid public versions stay noindex. Googlebot-Image UA probes are simulated requests, not evidence of an actual Google crawl.
- Visually inspected live desktop forecast, 390px Niño region and 320px forecast images. Complex diagrams retain local horizontal scrolling and accessible text. Screenshots: `.playwright/search-images-live-forecast-1440.png`, `.playwright/search-images-live-nino-390.png`, `.playwright/search-images-live-forecast-320.png`. These are actual production page captures, not mockups or search-result screenshots; ignored local files are available in this workspace.
- The seven guide gaps, lifecycle/methodology opportunities and neutral illustration improvement above remain deferred. No purchases, low-resolution upscaling, article/sitemap date refresh or indexing submission was made by this image release. Relevance, scientific truth and rights require continuing human editorial review; automated passes do not guarantee search thumbnails or clicks.

## Whole-site extension — November 27, second release

The owner approved broader useful-image coverage after the first release. Started from clean `c60b896`, with no remote changes at the pre-edit check. Expanded body/OG/Twitter/Article-or-WebPage alignment from ten to nineteen major content pages: all ten learning guides, dashboard, forecast, lifecycle, neutral, historical, methodology, California, Northwest and winter outlook. This is eligible-image configuration, not observed Google thumbnail inclusion.

New original families cover SOI/ocean quantities, climate timescales, marine heatwave versus ENSO scope, water stores, boreal-winter teleconnections, baseline arithmetic, observing-system processing, lifecycle clocks, product windows and three ENSO phases. All use already sourced explanations and retain hypothetical/conceptual boundaries. The neutral guide now uses a three-phase comparison instead of a two-event winter map. Ten new families plus existing forecast ranges and seasonal windows have separately composed 480px mobile sources, with true source dimensions and identical substantive facts. Four earlier detailed geographic/process diagrams retain a keyboard-accessible local scroll region and mobile text equivalent rather than illegibly shrinking coordinate labels.

The learning directory has ten destination-specific thumbnails and the regional directory has three. Whole images are contained, not cropped; the USFS photo retains visible credit and a not-current-conditions note. Utility/legal/about/FAQ/hurricane text pages and navigation directories have no invented page-level representative asset. They remain candidates for a useful future visual only if reader needs justify one; no stock/keyword-image replacement backlog is imposed. No external assets or purchases are needed for this extension. Existing reliable photos/maps remain appropriate; inspect per-asset rights before replacing or reusing them.

Source record: NWS https://www.weather.gov/mhx/ensowhat read in the background in-app browser November 27, 2026; no publication date displayed. Confirmed coupled warm/cold definitions and neutral's possible ocean–atmosphere mismatch. Other scientific references in the new asset registry are retained from the page's existing sourced text, not claimed as newly reverified current publications. All illustrative source, credit and rights records are in the registry; editable SVG and reproducible generator are retained. No new current forecast or observation is inferred from the figures.

Titles/descriptions in the November 17 experiment, scientific article dates and sitemap lastmod remain unchanged: this release visualizes existing content and improves navigation/presentation. Maintenance remains within the existing edited-page review rather than adding a recurring content quota. Independent review and full release/live checks are recorded below after completion.

Independent review found two mobile text overlaps, a missing per-use photo credit, the need for a conceptual label inside the lifecycle raster, and duplicate long flow presentation. All were corrected; the reviewer rechecked the PNGs and all 28 SVG label bounds/overlaps with no remaining blockers. External primary-source rechecking and site-layout release acceptance were outside that review's scope. An automatic Chrome text-bound/overlap check now covers the twenty new canonical/mobile artwork sources; file checks include all twelve mobile assets. Page-image checks also compare served canonical/mobile bytes with reviewed local files, so a successful response with an older asset is insufficient.

Pre-release local check passed: 80 type-checked files, no errors/warnings (two existing deprecated CircleHelp hints); 26 unit tests; 19 registered assets including all variant dimension/MIME/size/provenance checks; build; real NOAA scheduled refresh/KV; image pages at 1440×1000, 390×1000 and 320×1000; shared UI at 320/390/768/1440 plus no-JavaScript data table; full desktop/mobile 1440/390 interaction checks and simulated historical source-failure path. Desktop water-store, mobile neutral and 320px range screenshots inspected. This was the pre-release checkpoint; final release and production results follow.


### Second-release completion

- Application `827b4113293dfc27c3ec19fd11d35750ae7e210f` was pushed to GitHub master and its exact remote SHA verified. Full `npm run deploy` passed: 81 type files, zero errors/warnings (two existing hints), 26 tests, 19 registered assets / 31 canonical and mobile files, build, real NOAA refresh/KV, twenty original artwork text checks, image/browser interaction suites and source-failure retention.
- Actual Cloudflare version `f5b5de2e-3c76-46a6-a052-fbc45836f517`, deployment `40c22b53-933c-475a-9c13-cfe1c0b4e17b`, created November 27, 2026 at 16:00:33 Asia/Shanghai; 100% traffic. Existing custom domains, schedule, production indexing and unpublished contact configuration retained.
- `ENSOLENS_EXPECT_INDEXING=true node scripts/verify-production.mjs` passed all 25 routes plus health/RSS/source records, canonical/indexing boundaries, unchanged sitemap dates, redirects/404 and read-only correction endpoint.
- `node scripts/verify-image-production.mjs` passed nineteen representative pages and two directories at each actual viewport: **1440×1000, 390×1000 and 320×1000 CSS px**. Checks include canonical/mobile decoding and real dimensions, source selection, served bytes matching reviewed assets, body/OG/Twitter/applicable structured image agreement, HTTP/MIME accessibility, image-preview permission, indexing restrictions and no horizontal page overflow. Simulated Googlebot-Image requests are not evidence of an actual Google crawl.
- Inspected actual live neutral desktop/mobile comparison and 320px forecast image; labels, captions and proportional layout remain readable. Local screenshots: `.playwright/whole-site-images-live-neutral-1440.png`, `.playwright/whole-site-images-live-neutral-390.png`, `.playwright/whole-site-images-live-forecast-320.png`; side-by-side production screenshot composite `.playwright/whole-site-images-live-preview.png`. These are production page captures, not Google search-result captures; viewport emulation is not physical-device certification.
- The first release's seven guide, lifecycle/methodology and neutral illustration gaps are now completed. Six remaining sitemap routes (learning/regional directories, FAQ, hurricane context, about and privacy) intentionally have no forced page-level representative metadata; directories do have useful card thumbnails. No essential material acquisition or owner assistance is currently needed. Future asset replacements must follow EDITORIAL.md rights, relevance, truthful dimensions, caption/alt, source and release acceptance requirements.
- Google thumbnail selection, indexing changes and CTR effects have not been measured or promised. Final documentation records this completed release and is pushed separately without another application deployment.
