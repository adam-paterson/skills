# Retrospective: billing retry fix

## Findings and recommendations

### High — navigation pointer was too weak for the task

- **Evidence:** `AGENTS.md` only says to use npm and run relevant tests. The authoritative location was documented in `docs/billing.md`, but the agent spent time searching broadly, then reported it could not locate the policy until the user supplied the docs pointer.
- **Recommendation:** Add a compact task-oriented pointer to `AGENTS.md`: for billing/retry changes, read `docs/billing.md` first; the shared policy is `packages/payments/src/retry.ts`, while `apps/api/src/billing.ts` delegates to it. Keep the implementation detail in the doc rather than expanding `AGENTS.md`.
- **Expected effect:** Prevents edits or investigations in the delegating API layer and removes the user intervention needed to find the shared policy.

### Medium — broad search caused avoidable tool waste

- **Evidence:** `rg retry .` searched vendor and lock files, returned 28,400 lines, was truncated, and was repeated unchanged. Neither call surfaced the relevant file.
- **Recommendation:** Add a repository search convention or wrapper that excludes generated/dependency/lock content by default, and prefer the documented billing path before repository-wide search. If a broad search is necessary, use targeted globs such as source and docs directories and search for the policy symbol (`retryPayment`) rather than the generic word `retry`.
- **Expected effect:** Smaller outputs, fewer repeated calls, and faster convergence under context pressure.

### Low — no additional automated-check change indicated

- **Evidence:** The agent added a regression test for 429 with `Retry-After`; `npm run test:billing` passed with 14 tests, and the reviewer approved the shared-policy fix. The supplied evidence shows no missed defect that a new check would catch.
- **Recommendation:** Keep `npm run test:billing` as the prescribed focused check. Do not add a speculative lint/type-check rule based on this session alone.

## Areas with no supported change

- **Coding standards:** The reviewer caught/approved the correct shared-policy change; no standards failure is evidenced.
- **Global `AGENTS.md` sprawl/no-ops:** The supplied file is short. The useful change is a single navigation pointer, not a larger instruction set.
- **Information access:** The needed information already existed in `docs/billing.md`; this was a routing failure, not a missing-access problem.

## Residual risks

- A pointer can become stale if billing ownership moves; keep it limited to the authoritative doc and update it when that doc moves.
- Excluding dependency and lock files by default could hide an intentional search target; retain an explicit opt-in for full-tree searches.
- The evidence covers one successful retry fix only; it does not establish whether the environment has a general search wrapper or whether other domains need navigation pointers.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Concrete severity-ranked findings cite AGENTS.md, docs/billing.md, apps/api/src/billing.ts, packages/payments/src/retry.ts, and the repeated broad rg search; recommendations are environment-focused."
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [
    "Reviewed only the supplied complete evidence packet and the required skill/style guidance; no project commands were run."
  ],
  "residualRisks": [
    "Navigation pointers may become stale when billing ownership moves.",
    "Default search exclusions need an explicit full-tree opt-in for exceptional searches.",
    "The packet does not show whether a reusable repository search wrapper already exists."
  ],
  "noStagedFiles": true,
  "diffSummary": "No repository changes; retrospective report only.",
  "reviewFindings": [
    "high: AGENTS.md - lacks a task-oriented pointer to docs/billing.md and the shared retry policy.",
    "medium: session transcript - repeated rg retry . searched 28,400 lines including vendor and lock files and produced truncated output.",
    "low: no automated-check gap evidenced; focused billing tests passed and review approved the fix."
  ],
  "manualNotes": "Report recommendations are based exclusively on the supplied packet; fictional paths were not inspected on disk."
}
```