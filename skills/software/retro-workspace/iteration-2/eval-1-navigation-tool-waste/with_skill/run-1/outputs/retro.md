# Retrospective: navigation-tool-waste

## Evidence boundary

This review uses only the supplied session packet. It shows two identical, repository-wide `rg retry .` searches (28,400 truncated lines), followed by a claim that the policy could not be located. The user then pointed to `docs/billing.md`, which identified the shared policy and test command. The fix was made in the shared policy, and `npm run test:billing` passed (14 tests).

## Changes

### 1. Make the billing documentation pointer discoverable before source search

- **Severity:** High
- **Type:** Project guidance
- **Evidence:** `docs/billing.md` already mapped billing retry work to `packages/payments/src/retry.ts`, but the agent did not read it until the user intervened.
- **Problem:** The session spent two broad searches and still reached the wrong conclusion, despite an existing authoritative pointer.
- **Smallest change:** Add one conditional line to `AGENTS.md`: “For billing, payment, or retry changes, read `docs/billing.md` before searching source.” Keep the policy details in `docs/billing.md`; do not duplicate them in `AGENTS.md`.
- **Why this wording:** It is a narrow context pointer with a clear trigger, rather than an always-loaded billing procedure.

### 2. Prefer scoped searches and do not repeat an unchanged search

- **Severity:** Medium
- **Type:** Cross-project process
- **Evidence:** `rg retry .` searched vendor and lock files, produced truncated output, and was run again unchanged at 09:05.
- **Problem:** The search was high-noise and the repeated call added no information.
- **Smallest change:** Add a general workflow rule to the agent’s process guidance: inspect repository guidance/docs first; when searching, exclude generated, vendor, and lock paths or scope to likely source directories; change the query or scope before repeating a search.
- **Verification:** In a similar session, compare whether the first source-navigation attempt reaches the documented owner without a duplicate full-tree search. This is a process recommendation, not a request for custom tooling.

## What does not need changing

- **Automated checks:** No new check is supported by this evidence. The existing `npm run test:billing` caught/validated the regression, and it was run successfully.
- **Coding standards or review guidance:** The reviewer explicitly approved the shared-policy fix and regression test; no review miss is shown.
- **Information access:** The needed information was available in `docs/billing.md`; the failure was navigation, not missing access.
- **No-ops:** “Use npm” and “run relevant tests before finishing” affected behavior: the agent used `npm run test:billing`. No removal is supported.

## Unknowns

The packet does not show whether the environment can automatically rank repository docs, filter `rg` defaults, or detect duplicate tool calls. Those capabilities should be checked before considering an extension; the evidence supports the two instruction-level changes above, not new tooling.
