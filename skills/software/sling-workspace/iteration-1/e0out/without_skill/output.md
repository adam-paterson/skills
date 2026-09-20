# Handoff: auth retry fix follow-up

## Context

An auth retry bug was fixed in `api/auth.ts`. The test suite passes except for a flaky integration test. No credentials, tokens, or other secrets are included in this handoff.

## Remaining work

1. Review the current diff in `api/auth.ts` and confirm the retry behavior matches the intended authentication flow.
2. Re-run the flaky integration test in isolation enough times to distinguish an existing intermittent failure from a regression. Record the exact command and results.
3. Run the relevant auth tests and, if practical, the full test suite. Do not report a clean suite if the integration test still flakes; report pass/fail counts and the flaky test name.
4. If the integration failure is caused by this change, fix it and add or adjust the smallest regression test. Otherwise, leave product code unchanged and document the observed flake.
5. Update the project changelog with a concise entry describing the auth retry fix, following the repository’s existing changelog format.
6. Return the final diff summary, commands run, test results, and any remaining risk.

## Constraints

- Do not expose secrets in logs, patches, or the changelog.
- Keep scope to verification of the auth retry fix and the changelog update.
- Preserve evidence of the flaky integration result rather than silently retrying until green.

## Known status

- Fix location: `api/auth.ts`
- Reported status: tests pass except for a flaky integration test
- Exact test command, flaky test name, repository state, and changelog path were not provided and must be discovered in the new session.
