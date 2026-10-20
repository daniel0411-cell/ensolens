# ENSOLens Working Rules

- Begin by reading PROGRESS.md, README.md, and git status. Preserve uncommitted work.
- Distinguish local implementation, verified build, deployed version, and indexing state. Do not infer one from another.
- Save completed milestones in PROGRESS.md and Git. Record deployment IDs from actual Wrangler output.
- npm run deploy is the release gate: types, unit tests, build, a real local Worker refresh, and desktop/mobile browser checks must pass before upload.
- Run scripts/verify-production.mjs after deployment. Set ENSOLENS_EXPECT_INDEXING=true only when checking an intentionally indexable release.
- Do not replace dated NOAA data with demo values or silently use new source formats. Preserve the last validated data on upstream failures.
- Keep compatibility_date within the installed workerd version's support. Avoid dependency upgrades unless needed for the task.
- Use npm run preview to inspect the built Worker. Local preview must use localhost as its upstream host to avoid production HTTPS redirect loops.
- Keep unverified contact routes unpublished. Never store private mail destinations, credentials, or browser session data in repository files.
- Keep changes scoped. Runtime defects require regression coverage; editorial updates do not require unrelated tests.
