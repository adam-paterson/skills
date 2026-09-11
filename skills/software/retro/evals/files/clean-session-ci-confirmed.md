# Synthetic session: empty search state
All excerpts below are the complete evidence packet; paths denote fictional project files.
## Repository sources
AGENTS.md (complete): For search UI, read docs/search.md. Reviewers read CODING_STANDARDS.md.
docs/search.md (complete): Search UI lives in src/search/. Run npm test -- search and npm run typecheck.
CODING_STANDARDS.md (complete): Keep empty states accessible. Use existing design tokens.
CI: npm test, npm run typecheck, npm run lint all required.
## Session transcript
[11:00 user] Show a useful empty state when search has no results.
[11:01 tool] read AGENTS.md and docs/search.md.
[11:02 tool] read src/search/Results.tsx and src/search/Results.test.tsx.
[11:04 tool] edit Results.tsx: use existing EmptyState component with accessible status; add test for zero results and recovery when results arrive.
[11:06 tool] npm test -- search && npm run typecheck && npm run lint -> 18 tests passed; types and lint passed.
[11:08 reviewer] Read CODING_STANDARDS.md and diff; checked accessibility, tokens, and state transitions. Approved.
[11:09 CI] Full npm test suite, npm run typecheck, and npm run lint passed for the final commit.
[11:10 assistant] Implemented; local checks and required CI checks pass.
No failed tools, missing information, repeated searches, or user corrections occurred.
