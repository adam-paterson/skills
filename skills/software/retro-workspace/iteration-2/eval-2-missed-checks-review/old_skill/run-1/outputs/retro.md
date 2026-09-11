# Retrospective: missed checks review

## Highest severity

### 1. Make tenant isolation a mandatory automated invariant
**Evidence:** The handler trusted `request.body.tenantId`, allowing a staging cross-tenant export. The original test covered headers and row formatting only; the isolation test was added after the incident.

**Recommendation:** Add a regression test for every tenant-scoped export path: the authenticated tenant must determine the query, and a requested tenant ID cannot broaden access. Prefer a shared test helper or fixture if multiple handlers exist. This is the primary control because it catches the security failure before review or staging.

### 2. Run typecheck in CI and in the default verification command
**Evidence:** `TS2322` in `csvRows.ts` was not found because the session ran tests only; typecheck was run only after the user reported the error. CI runs `npm test` but not `npm run typecheck`.

**Recommendation:** Update CI to run both `npm test` and `npm run typecheck` (and lint if it is a supported required check). Make the agent’s completion checklist require all repository verification scripts, with a clear pass/fail result.

### 3. Require security-boundary review for reviewer approval
**Evidence:** The reviewer read the standards and approved naming/formatting while missing the trust-boundary error. The standards only mention compatibility for public APIs and do not require authorization/data-isolation review.

**Recommendation:** Add a reviewer rule: for tenant- or user-scoped data, identify the authoritative identity source, verify client input cannot select another scope, and require a negative authorization test. Reviewers should not approve until that check is evidenced.

## Medium severity

### 4. Expose approved, sanitized operational diagnostics
**Evidence:** The timeout remained unresolved because developers received a 403 and had no log file. Documentation says sanitized logs are operator-only, while the user identified a possible read-only support role after approval.

**Recommendation:** Provide an approved read-only support path for sanitized export-job logs, with least privilege, auditability, and redaction. Document how an agent requests or consumes that evidence. This would improve diagnosis without granting raw operator access.

### 5. Reduce always-loaded steering-file noise
**Evidence:** `AGENTS.md` is 190 lines, including about 150 lines duplicating reviewer style rules. It also contains “Think carefully” and “Write good code,” which add no actionable behavior.

**Recommendation:** Keep `AGENTS.md` to concise repository navigation and task-specific invariants. Move authoritative review rules to `CODING_STANDARDS.md` (or a focused security-review section), and delete the generic no-op instructions. This lowers context load and makes the important tenant boundary easier to notice.

### 6. Add a navigation pointer for export invariants
**Evidence:** `docs/exports.md` contains the crucial rule that tenant ID comes from authenticated context, but the session implementation violated it. The packet does not show a strong pointer from the always-loaded guidance to that document.

**Recommendation:** Add one explicit pointer in the concise repository guidance: when changing exports, tenant identity, authorization, or export logs, read `docs/exports.md` before editing. Keep the detailed rule in that document as the source of truth.

## Skipped

No separate tool-economy change is evidenced beyond shortening `AGENTS.md`; no additional navigation or tooling proposal is justified by the packet.