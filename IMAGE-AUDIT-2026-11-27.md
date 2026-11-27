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

### Deferred asset work (text remains useful, no generic fallback)

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
