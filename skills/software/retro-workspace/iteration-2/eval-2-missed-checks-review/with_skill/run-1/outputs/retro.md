# Retrospective: missed checks review

## Summary

The session shipped a tenant-isolation vulnerability and a type error because implementation and review covered formatting, but not the documented tenant identity boundary or the available typecheck. The later fix was effective and verified; the timeout remains unresolved because the available evidence did not include authorized logs.

## Changes

### High — enforce the existing typecheck in CI

- **Evidence:** `npm run typecheck` was explicitly skipped before approval and later reported `TS2322`; the existing script passed after the fix, while CI runs only `npm test`.
- **Problem:** A repository check existed but was neither part of CI nor the session's completion gate.
- **Smallest change:** Add `npm run typecheck` to the existing CI workflow. Keep the implementation workflow's final check aligned with the CI commands.
- **Where:** CI workflow; optionally a short completion checklist in reviewer guidance.
- **Verification:** A future intentionally introduced type mismatch should make CI red.

### High — make tenant identity and authorization an explicit review invariant

- **Evidence:** The handler trusted `request.body.tenantId`, despite `docs/exports.md` stating that tenant ID comes from authenticated context. The initial export test checked only headers and row formatting; a cross-tenant test was added only after staging exposure.
- **Problem:** User-controlled identity data crossed a trust boundary without a negative authorization test.
- **Smallest change:** Add reviewer guidance requiring checks that resource ownership comes from authenticated context, plus a test where an authenticated tenant requests another tenant's rows. Point the guidance to `docs/exports.md` rather than duplicating its details.
- **Where:** `reviewer.md` (or the existing reviewer standards entry point), with the feature documentation as the source of truth.
- **Verification:** Future export changes should show the isolation test before approval; review should reject handlers deriving tenant scope from request payloads.

### Medium — replace vague always-loaded steering with a feature-doc pointer

- **Evidence:** `AGENTS.md` is 190 lines, including roughly 150 lines repeating reviewer style rules and vague instructions such as “Think carefully” and “Write good code.” The session read it, but the relevant export rule in `docs/exports.md` was not consulted.
- **Problem:** Context is spent on repeated/no-op prose while the high-value branch-specific constraint remains undisclosed to the implementation path.
- **Smallest change:** Remove duplicated naming/import/comment/reviewer prose from `AGENTS.md`; retain navigation and add a sharp pointer such as: “For invoice/export work, read `docs/exports.md` before changing tenant selection, access control, or export logging.” Keep detailed review rules in `reviewer.md`/`CODING_STANDARDS.md`.
- **Where:** `AGENTS.md`; preserve the existing docs rather than creating another policy file.
- **Verification:** Compare a future export session's reads and behavior with the pointer present; the agent should consult the export doc before implementation, without carrying the full repeated style block on every turn.

### Medium — add a security-boundary test expectation to the existing export test path

- **Evidence:** The initial test suite passed 62 tests despite the vulnerability because the export test covered only CSV headers and row formatting.
- **Problem:** Tests asserted presentation output but not the core authorization invariant.
- **Smallest change:** Extend the existing export test with one authenticated-tenant/requested-other-tenant case, asserting no rows from the other tenant (or the repository's established authorization error behavior). Do not add a new test framework or abstraction.
- **Where:** Existing export test file.
- **Verification:** Temporarily reverting the handler to use `request.body.tenantId` must fail the test.

### Low — preserve approved, controlled access for timeout diagnosis

- **Evidence:** Developer log access returned 403; documentation says sanitized export logs are operator-only; an operator offered read-only support access after approval. The timeout cause therefore remains unknown.
- **Recommendation:** Do not weaken access controls or expose raw logs. If diagnosis is required, use the approved sanitized read-only support path and record the permission/retention boundary. This is a process/access change, not a code change supported by the current evidence.
- **Verification:** Confirm that approved support access yields enough sanitized evidence to identify the timeout without granting developers broader log access.

## Not recommended from this packet

- No timeout implementation change: its cause is unknown.
- No new logging system or plugin: the packet provides no evidence that existing logging is insufficient, only that access was correctly restricted.
- No additional style rules in `AGENTS.md`: the repeated style guidance did not prevent the defect and belongs in reviewer-oriented documentation or automated checks.
