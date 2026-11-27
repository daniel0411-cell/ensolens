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

## Integration checkpoint

GitHub had six newer commits through bc3decd when this image work was ready. Paused upload, fetched and rebased the image commit onto that baseline, preserving the November 25–27 shared UI/content releases and their sitemap dates. Image application commit is ec101f8. Re-ran the complete gate on the combined source; no force-push. The earlier 320px footer wrap is also present in the newer UI baseline. Final deployment/live verification is recorded below.

## Final verification and release

- Application ec101f8 pushed to GitHub master; full `npm run deploy` gate passed on the merged baseline: 77-file type check (zero errors/warnings, two existing hints), 26 tests, nine static image files, build, real NOAA refresh/KV/RSS, image checks at 1440×1000 / 390×1000 / 320×1000 CSS px, existing four-width shared UI/no-JavaScript checks, full desktop/mobile interactions and retained-data failure behavior.
- Actual Cloudflare version d8e090aa-2c49-438e-8c9e-d3888e5f0626; deployment 6c9860fc-7b51-4bd9-9364-eda9718e5371; November 27, 2026 at 11:18:58 Asia/Shanghai, 100% traffic.
- Postrelease `ENSOLENS_EXPECT_INDEXING=true node scripts/verify-production.mjs` passed all 25 routes plus health/RSS/source/canonical/sitemap/404 checks. Public robots allows / and does not disallow /images/; /api/ stays disallowed.
- `node scripts/verify-image-production.mjs` passed all ten representative pages at each of the three actual CSS viewports above: body images decode with real dimensions, OG/Twitter/WebPage/Article images agree, correct MIME/HTTP accessibility, conditional preview permission, preview/error/API indexing boundaries and no horizontal page overflow. Public versioned NOAA GIF returns successfully; invalid public versions stay noindex. Googlebot-Image UA probes are simulated requests, not evidence of an actual Google crawl.
- Visually inspected live desktop forecast, 390px Niño region and 320px forecast images. Complex diagrams retain local horizontal scrolling and accessible text. Screenshots: `.playwright/search-images-live-forecast-1440.png`, `.playwright/search-images-live-nino-390.png`, `.playwright/search-images-live-forecast-320.png`. These are actual production page captures, not mockups or search-result screenshots; ignored local files are available in this workspace.
- The seven guide gaps, lifecycle/methodology opportunities and neutral illustration improvement above remain deferred. No purchases, low-resolution upscaling, article/sitemap date refresh or indexing submission was made by this image release. Relevance, scientific truth and rights require continuing human editorial review; automated passes do not guarantee search thumbnails or clicks.
