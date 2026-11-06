# ENSOLens Working Rules

## Start Here

- Begin by reading this file, EDITORIAL.md, PROGRESS.md, README.md, and git status. Preserve uncommitted work.
- These rules apply to all AI collaborators, including Codex and Antigravity. Re-read them after a new session or context reset rather than assuming prior agreement is still in context.
- AGENTS.md defines collaboration and engineering boundaries; EDITORIAL.md defines scientific writing and maintenance practice; PROGRESS.md records observed implementation, verification and release state. Keep each fact in its appropriate document and avoid competing role documents.

## Roles and Decisions

- The owner sets product direction, commercial priorities, maintenance budget and publication authority. Follow the owner's explicit task scope and existing authorization; do not repeatedly request approval for work already authorized.
- AI collaborators may research, explain, design, implement, audit and deploy according to the assigned task. Do not permanently assign capabilities or authority by model name.
- Make recommendations with evidence and tradeoffs. Do not invent business targets or expand the product scope on the owner's behalf.
- For changes to data interpretation, shared runtime behavior or release configuration, seek an independent review where available within the authorized workflow. Self-review and automated checks are useful but are not independent review. If no independent reviewer participated, state that limitation without claiming independent approval or inventing a mandatory approval step.
- Documentation reduces mistakes; it does not guarantee correctness. Verify claims against sources and actual code, and verify deployed behavior after a release.

## Evidence and Scientific Boundaries

- Distinguish observed facts, source forecasts, interpretations and unverified hypotheses. Cite the source, issue or observation date, target period and index or baseline when relevant.
- Do not present unsupported audience percentages, traffic forecasts, advertising rates or revenue estimates as established project facts. Planning hypotheses are allowed when labeled, with their evidence, uncertainty and a practical way to validate them.
- Explain official products in plain language without claiming official institutional authority or certainty beyond the source. Keep CPC probabilities, IRI products, model agreement, weekly observations and seasonal indices distinct; do not silently substitute one for another.
- Seasonal climate probabilities are not deterministic local weather forecasts or emergency warnings. Local safety decisions must point to the relevant official weather service.
- Do not manufacture a trend or a dramatic narrative from unchanged readings. Source failure is not evidence of unchanged conditions. Publish a briefing when there is useful, supported new information, rather than to meet an artificial content quota.

## Product and Maintenance Boundaries

- Build an ENSO explanation and comparison tool across El Nino, neutral and La Nina phases, with North American seasonal questions as the initial focus. Audience and monetization assumptions remain hypotheses until validated.
- The default maintenance budget is 6-10 hours per month. Prefer the dashboard, existing evergreen explanations and automated official-data updates over broad news coverage, city-page expansion or frequent manual publishing.
- Before proposing a recurring workload, describe the expected maintenance cost and benefit. If it exceeds the budget, recommend a smaller option and let the owner decide; the budget is not an AI veto over explicit owner instructions.
- Production source is this ensolens/ Astro and Cloudflare Worker repository. The parent Python generator is an independent research prototype. Never deploy its public/ directory over production or assume its fixed data are synchronized with the validated runtime feed.
- Present ENSOLens independently. Do not add cross-project promotion, shared-operator statements or operator-owned site links to public content. Scientific hurricane context may cite official NOAA/NHC sources, but is not a primary navigation item. Follow EDITORIAL.md for the full brand boundary.

## Engineering and Release

- Distinguish local implementation, verified build, deployed version, and indexing state. Do not infer one from another.
- Save completed milestones in PROGRESS.md and Git. Record deployment IDs from actual Wrangler output.
- npm run deploy is the release gate: types, unit tests, build, a real local Worker refresh, and desktop/mobile browser checks must pass before upload.
- Run scripts/verify-production.mjs after deployment. Set ENSOLENS_EXPECT_INDEXING=true only when checking an intentionally indexable release.
- Do not replace dated NOAA data with demo values or silently use new source formats. Preserve the last validated data on upstream failures.
- Keep compatibility_date within the installed workerd version's support. Avoid dependency upgrades unless needed for the task.
- Use npm run preview to inspect the built Worker. Local preview must use localhost as its upstream host to avoid production HTTPS redirect loops.
- Keep unverified contact routes unpublished. Never store private mail destinations, credentials, or browser session data in repository files.
- Keep changes scoped. Runtime defects require regression coverage; editorial updates do not require unrelated tests.
- A documentation-only update can be committed and pushed without deploying the website or running the application release gate. Report which checks were actually performed; do not imply that a Git push is a deployment.
