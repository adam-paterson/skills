# Retrospective: missed checks review

## Review findings

1. **Critical — tenant authorization was implemented from untrusted input.** `export handler` used `request.body.tenantId` instead of the authenticated tenant context described in `docs/exports.md`, allowing cross-tenant invoice exposure. Add a reviewer rule for authorization boundaries: identity/tenant scope must come from authenticated context, never request-controlled fields. Require a negative isolation test for every tenant-scoped endpoint.

2. **High — the required type check was omitted.** `csvRows.ts` contained a `string`/`number` mismatch, but the session stopped after `npm test`; the failure was only found later by staging. Make the normal completion check run both `npm test` and `npm run typecheck` (or make CI run both). `package.json` already exposes both checks, so this needs no new tooling.

3. **High — automated tests covered formatting, not the security invariant.** The export test checked headers and row formatting only, so all 62 tests passed despite the authorization defect. Add a review/implementation checklist requiring tests for authenticated scope, attempted scope override, and denial/no data leakage. The later tenant-A/tenant-B test demonstrates the missing check.

4. **High — CI did not enforce type safety.** The CI workflow runs only `npm test`, allowing the `csvRows.ts` defect to merge. Change the CI check to run the existing typecheck alongside tests, preferably through one repository verification script so local and CI completion criteria cannot diverge.

5. **Medium — reviewer guidance was too focused on style and API compatibility.** `CODING_STANDARDS.md` says to use naming conventions, group imports, and review public API compatibility; `reviewer.md` only directs the reviewer to read it. Add concise reviewer standards for authorization/data isolation, trust boundaries, and required validation commands. The reviewer should inspect security-sensitive inputs even when formatting is clean.

6. **Medium — `AGENTS.md` spends most of its 190 lines repeating reviewer style rules.** 150 lines duplicate naming/import/comment guidance, consuming implementation context while failing to surface the more important tenant-boundary and verification requirements. Remove duplicated reviewer rules from `AGENTS.md`; retain short navigation pointers and put review-only rules in `CODING_STANDARDS.md`/`reviewer.md`.

7. **Medium — timeout diagnosis lacked approved observability access.** The agent could not inspect worker logs (`fetch logs` returned 403), leaving the timeout unresolved. Provide a documented, read-only support-role path for sanitized export-worker logs, with explicit approval and redaction controls, and point agents to it when diagnosing operational failures.

## Residual risks

- The timeout cause remains unknown because sanitized worker logs were unavailable during the session.
- The packet does not establish whether CI or staging currently runs the corrected isolation test; this should be verified after the environment changes.
- A single negative test may not cover every tenant-scoped export path or background worker; reviewers should trace all callers and authorization boundaries.

## Prioritized environment changes

1. Enforce `npm test` plus `npm run typecheck` in CI and in the agent's standard completion command.
2. Add reviewer standards/checklist items for authenticated tenant scope and negative cross-tenant tests.
3. Reduce `AGENTS.md` to navigation and unique, implementation-relevant instructions; move review policy to review documentation.
4. Establish approved read-only access to sanitized worker logs for timeout diagnosis.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Concrete severity-ranked findings cite the supplied fictional paths and identify missed authorization, typecheck, test, reviewer, AGENTS.md, CI, and observability checks."
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [
    "Reviewed only the supplied complete evidence packet and the required writing-for-agents guidance; no project files or sibling benchmark artifacts were inspected."
  ],
  "residualRisks": [
    "Timeout cause remains unresolved due to unavailable sanitized worker logs.",
    "Coverage of all tenant-scoped export paths is not established by the packet."
  ],
  "noStagedFiles": true,
  "diffSummary": "No project changes; retrospective report written to the required output path.",
  "reviewFindings": [
    "critical: export handler - request.body.tenantId enabled cross-tenant invoice exposure.",
    "high: csvRows.ts - type error escaped because typecheck was not run and CI runs tests only.",
    "high: export test - formatting-only assertions missed tenant isolation.",
    "medium: AGENTS.md - 150 of 190 lines repeat reviewer style rules.",
    "medium: worker logs - 403 prevented timeout diagnosis."
  ],
  "manualNotes": "Recommendations are environment changes only; no implementation changes were made."
}
```