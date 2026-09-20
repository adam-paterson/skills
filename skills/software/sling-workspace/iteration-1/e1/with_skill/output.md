# Handoff: Continue CSV export with PII safeguards

## Objective
Continue implementing the feature-branch CSV export. Ensure exported personally identifiable information (PII) is handled according to the project's existing privacy rules, and load the required API key from the environment rather than source or configuration committed to Git.

## Current status
- The feature branch adds CSV export; implementation details and completion state were not provided in this handoff request.
- PII handling and environment-based API-key configuration remain required.
- End-to-end staging verification is blocked because the staging database is down.
- No suitable session-transfer integration is available in this session, so no new agent session was created and receipt is unverified.
- Cost-aware runtime/model routing could not be evaluated from the available integrations; retain the current runtime/model if resuming manually.

## Decisions
- Keep API credentials exclusively in environment variables. No credential value is included here.
- Do not weaken or bypass PII protections to complete the CSV export.
- Treat staging validation as outstanding until the staging database is restored.

## Constraints
- Never commit API keys, generated exports containing real PII, or sensitive sample data.
- Reuse the repository's existing authorization, PII-redaction, CSV, and configuration patterns before adding new abstractions or dependencies.
- Preserve CSV correctness for quoting, commas, newlines, encoding, and spreadsheet-formula injection according to existing project policy.
- Do not claim end-to-end completion while staging remains unavailable.

## Evidence and references
- Source request: “Feature branch adds CSV export with PII handling, API key in env, blocker: staging DB down.”
- Inspect the feature branch's Git status, diff, tests, and project instructions before editing; no implementation artifact or branch name was supplied.
- API key value: intentionally omitted/redacted.

## Blockers
- Staging database is down, preventing staging-backed integration or end-to-end verification.
- The environment-variable name, exact PII policy, repository location, and current feature-branch diff were not supplied; derive them from project conventions rather than guessing.

## Next steps
1. Acknowledge the objective, state the first action, and identify any immediate blocker.
2. Inspect repository instructions, the current branch/diff, and all CSV export call sites.
3. Locate and reuse existing PII classification/redaction, authorization, CSV serialization, and environment configuration patterns.
4. Complete the smallest implementation that exports only authorized fields and reads the API key from the established environment variable.
5. Add or update focused tests using synthetic, non-sensitive data for CSV escaping, allowed/redacted PII, authorization, missing API-key behavior, and spreadsheet-formula injection where applicable.
6. Run available unit/static checks locally. Record commands and results.
7. When staging recovers, run the blocked integration/end-to-end checks and record evidence before declaring the feature complete.

## Suggested skills
- Use the repository's implementation and verification skills if installed.
- Re-run `sling` only when a supported new-session integration is available and acknowledgement can be observed.
