---
name: verify-spec
description: "Use after implement-spec to verify an enterprise spec package: read ACCEPTANCE.md, TEST-PLAN.md, scenarios, EVIDENCE.md, and VERIFY.md; run or inspect real checks; map observed evidence to every acceptance criterion; and update WORKFLOW.md to verified only when proof is complete."
---

# Verify Spec

Prove that implementation evidence satisfies the acceptance criteria. This is not a generic "run tests" skill; it is the acceptance-to-evidence gate for the enterprise workflow.

## Workflow

1. Locate the target `docs/specs/<spec-id>/` package. Read `WORKFLOW.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, `scenarios/acceptance.feature`, `IMPLEMENTATION.md`, `EVIDENCE.md`, `VERIFY.md`, and `docs/agents/spec-workflow.md`.
2. List every acceptance criterion from `ACCEPTANCE.md`.
3. Inspect existing `EVIDENCE.md` entries. Evidence must be observed command output, test results, artifact inspection, runtime behavior, or live readback.
4. Run missing verification commands when feasible. If a command cannot be run, record the blocker in `VERIFY.md` rather than inventing proof.
5. Map each acceptance criterion to one or more evidence entries in `VERIFY.md`.
6. If optional verification techniques were selected in `TEST-PLAN.md`, confirm property or mutation evidence exists or mark the gap.
7. Update `WORKFLOW.md`:
   - `verify-spec` -> `complete` only when every acceptance criterion has evidence.
   - `package_lifecycle` -> `verified` only when evidence is complete.
   - `current_stage` -> `release-readiness` when verified.
   - If gaps remain, mark `verify-spec` as `blocked` or `in-progress`.

## Guardrails

- Do not count planned checks as evidence.
- Do not mark a package verified because tests are green unless the green tests map to acceptance criteria.
- Do not hide unverified acceptance criteria in the summary.
- Do not require property or mutation testing unless `TEST-PLAN.md` selected them.

## Output Shape

When handing back progress, include:

- Spec package path.
- Acceptance criteria proven.
- Evidence entries added or reused.
- Commands run.
- Remaining verification gaps.
- Whether the package lifecycle moved to `verified`.
