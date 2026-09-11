# Retrospective: navigation-tool waste

## Findings

- **Medium — `apps/api/src/billing.ts` / `packages/payments/src/retry.ts`:** The agent correctly inspected the API caller and ultimately fixed the shared retry policy, but it first searched the entire repository twice (`rg retry .`), producing 28,400 lines and truncating the result. The first search did not establish a useful navigation path and led to the incorrect conclusion that the policy could not be located.
- **Low — `docs/billing.md`:** The repository already documented the ownership boundary and the exact test command, but the agent did not consult documentation until prompted by the user. This added avoidable latency and a false “cannot locate” status.

## Environment improvements

1. **Make repository search scoped by default.** Configure the search helper to respect ignore rules and exclude vendor/lock/generated files, with an explicit opt-in for whole-tree searches. For this task, searching `packages/`, `apps/`, and `docs/` would have avoided the 28,400-line result.
2. **Expose truncation prominently and offer narrowing hints.** When output is truncated, report the omitted count and suggest file-type/path filters (for example, `rg retry packages apps docs`). Do not let a truncated search support a “not found” conclusion.
3. **Surface repository guidance early.** At session start, show or index `AGENTS.md` and relevant docs, or provide a lightweight “where is this subsystem?” lookup. `docs/billing.md` explicitly identified both the implementation and `npm run test:billing`.
4. **Add a navigation checkpoint before failure claims.** Before reporting that a symbol or policy cannot be located, require checking documented paths and following imports/references from the first relevant caller.

## Residual risks

- The packet confirms the regression test passed (`14 passed`), but provides no test diff or details about malformed/missing `Retry-After` behavior. Broader gateway-response edge cases remain unverified.
- The evidence does not show whether the search tool can already be configured with ignore-aware defaults; the recommendations may be configuration rather than new functionality.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Concrete severity-rated findings cite the supplied fictional paths apps/api/src/billing.ts, packages/payments/src/retry.ts, and docs/billing.md."
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [
    "Reviewed only the supplied evidence packet; no sibling benchmark inputs, metadata, or outputs were inspected."
  ],
  "residualRisks": [
    "The packet does not expose regression-test cases beyond 14 passed, so malformed or missing Retry-After behavior is unverified.",
    "It is unknown whether ignore-aware search defaults already exist in the environment."
  ],
  "noStagedFiles": true,
  "diffSummary": "No project changes; retrospective report only.",
  "reviewFindings": [
    "medium: apps/api/src/billing.ts and packages/payments/src/retry.ts - repeated unrestricted search wasted time and caused a false inability-to-locate conclusion.",
    "low: docs/billing.md - existing subsystem documentation was consulted only after user intervention."
  ],
  "manualNotes": "The final implementation was approved and npm run test:billing reported 14 passed in the supplied transcript."
}
```