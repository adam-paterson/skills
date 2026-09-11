# Retrospective: missed checks review

## Review findings

- **Critical — fictional `handler` source (path not specified in packet):** The implementation trusted `request.body.tenantId` even though `docs/exports.md` explicitly states tenant identity comes from authenticated context. This created a cross-tenant data exposure. Add an environment-level security checklist or task-specific preflight that flags identity/authorization sources and requires a negative authorization test before approval.
- **High — fictional `csvRows.ts`:** The agent did not run the available `typecheck` script, leaving a `TS2322` defect undiscovered. The environment should make the standard verification commands (`npm test`, `npm run typecheck`, and `npm run lint`) discoverable and require or strongly prompt the relevant checks before claiming completion. CI should run typecheck and lint, not only tests.
- **High — fictional export test file (path not specified):** Tests covered headers and formatting but not tenant isolation. For endpoints involving tenant or user boundaries, provide a reusable review prompt/test template requiring an adversarial cross-tenant case (tenant A requesting tenant B) and authenticated-context assertions.
- **Medium — fictional `AGENTS.md`:** 150 of 190 lines repeat reviewer style rules, while the security-relevant navigation is comparatively easy to miss. Reduce duplicated guidance and put short, high-priority trust-boundary rules near the top; link to detailed style rules instead of burying task-critical constraints.
- **Medium — fictional `reviewer.md`:** The review checked naming and formatting but did not verify behavior against `docs/exports.md` or test coverage. Update reviewer instructions to verify requirements documentation, authorization boundaries, negative cases, and all available validation scripts—not just style.
- **Low — fictional `package.json`:** The scripts existed but were not surfaced as a required validation matrix. Add a concise mapping from change type to commands, with a default full local check when the cost is acceptable.

## Environment improvements

1. Add a pre-completion checklist that asks: “What is the trusted source for identity/authorization?”, “What abuse or isolation test fails before the fix?”, and “Which package scripts were not run, and why?”
2. Change CI to run `npm test`, `npm run typecheck`, and `npm run lint` (or explicitly document justified exclusions).
3. Make reviewers inspect the relevant requirements docs and require tests for security boundaries, not only happy-path formatting.
4. Keep high-signal security and validation guidance concise and prominent in `AGENTS.md`; remove repeated style prose.
5. Add a safe support/logging workflow: the timeout remained unresolved because logs were inaccessible. Permit sanitized, read-only logs only after explicit approval, with least-privilege access and documented redaction boundaries.

## Residual risks

- The timeout cause is still unknown; no remediation can be validated from the packet. A future session should obtain approved sanitized logs or add observable, privacy-safe timeout diagnostics.
- The packet does not identify exact source/test paths beyond `csvRows.ts`; findings use the fictional names supplied and do not infer missing paths.
- The transcript does not confirm lint was run after the fix, so lint regressions may remain despite tests and typecheck passing.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Concrete severity-rated findings cite the supplied fictional paths `AGENTS.md`, `CODING_STANDARDS.md`, `reviewer.md`, `package.json`, `docs/exports.md`, `handler`, `csvRows.ts`, and the export test artifact; residual risks are listed separately."
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [
    "Retrospective derived solely from the supplied complete evidence packet; no repository or sibling benchmark files were inspected."
  ],
  "residualRisks": [
    "Timeout cause remains unresolved because logs were inaccessible.",
    "Lint was not reported as run after the fix.",
    "Exact paths for handler and export test are unspecified in the packet."
  ],
  "noStagedFiles": true,
  "diffSummary": "No project changes recommended or implemented; report-only retrospective.",
  "reviewFindings": [
    "critical: handler - request.body.tenantId enabled cross-tenant invoice exposure.",
    "high: csvRows.ts - typecheck was skipped and TS2322 reached staging.",
    "high: export test - lacked a cross-tenant isolation case.",
    "medium: AGENTS.md/reviewer.md - duplicated style guidance obscured security and behavioral review checks."
  ],
  "manualNotes": "The report was written to the authoritative output path by the runtime requirement; no coding-agent environment changes were made."
}
```