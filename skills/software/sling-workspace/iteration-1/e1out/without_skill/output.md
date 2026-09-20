# Implementation handoff: CSV export

## Goal
Continue the feature-branch implementation of CSV export while protecting PII and loading the required API key from the environment.

## Current state
- The supplied context says the feature branch adds CSV export with PII handling.
- The API key must come from an environment variable; never hard-code, commit, log, or include its value in CSV output.
- Staging verification is blocked because the staging database is down.
- The feature branch name, changed files, test results, environment-variable name, and exact PII policy were not supplied and could not be verified from the current checkout.
- The current checkout has unrelated pre-existing changes. Do not modify or discard them.

## Continue from here
1. Open the correct repository/worktree and confirm the intended feature branch before editing.
2. Review the branch diff and existing tests to identify what remains incomplete.
3. Confirm the CSV schema and which PII fields must be omitted, masked, or authorized. Default to excluding PII until the policy is confirmed.
4. Confirm the documented environment-variable name for the API key. Fail safely when it is absent, and keep the secret out of errors and logs.
5. Add or finish focused tests for CSV quoting/escaping, headers, empty data, authorization, PII redaction/exclusion, and missing API-key behavior.
6. Run local unit/integration checks that do not depend on staging.
7. When the staging database is restored, run the blocked staging verification and record the command and result before merge.

## Blocker
**Staging database unavailable.** This prevents staging-backed end-to-end verification. It should not be represented as passed or skipped silently.

## Security notes
- No API key value was included in this handoff.
- Treat exported data as sensitive: avoid logging rows or attaching real-data CSV files to tickets or CI artifacts.
- Use synthetic fixtures for local tests.

## Receipt / verification
This handoff was written for the next session, but receipt by a new session was **not verified**.
