---
name: implement-spec
description: "Use when implementing a ready enterprise spec package one slice at a time: enforce WORKFLOW.md package_lifecycle ready-for-implementation, drive code through TDD, keep scope tight, update IMPLEMENTATION.md, and append real evidence mapped to acceptance criteria."
---

# Implement Spec

Implement one ready spec package or slice at a time. This skill uses TDD as the implementation method, but it is not a general-purpose TDD skill.

## Workflow

1. Locate the target `docs/specs/<spec-id>/` package. Read `WORKFLOW.md`, `SPEC.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, `IMPLEMENTATION.md`, `EVIDENCE.md`, and `docs/agents/spec-workflow.md`.
2. Refuse to start unless `WORKFLOW.md` package lifecycle is `ready-for-implementation`, unless the user explicitly overrides and the risk is recorded in `IMPLEMENTATION.md`.
3. Pick one slice or one small group of related acceptance criteria. Avoid broad opportunistic refactors.
4. Ground the slice in the current codebase. Inspect existing tests, contracts, fixtures, and local commands before editing.
5. Write or select the smallest failing test for the next observable behavior. For a bug fix, reproduce the bug first.
6. Run the narrowest relevant command and capture red evidence.
7. Implement the smallest production change that can make the failing test pass.
8. Rerun the same command and then the nearest broader validation command. Capture green evidence.
9. Refactor only after green, rerunning relevant checks after refactoring.
10. Update `IMPLEMENTATION.md` with slice status and scoped notes. Append observed red/green/refactor results to `EVIDENCE.md`, mapped to acceptance criteria.
11. When implementation is complete but verification is still pending, update `WORKFLOW.md`:
    - `implement-spec` -> `complete`
    - `verify-spec` -> `pending`
    - `package_lifecycle` -> `implemented`
    - `current_stage` -> `verify-spec`

## Guardrails

- Do not implement from a draft package unless the user explicitly accepts the risk.
- Do not write multiple unrelated failing tests before making progress on the first one.
- Do not change production code before proving the failing test unless no viable test seam exists; when that happens, create the seam as the first tested behavior.
- Do not use `EVIDENCE.md` for planned checks. Evidence must be observed.
- Keep broad suite runs for completion gates, not every inner loop.

## Output Shape

When handing work back, include:

- Spec package path and slice implemented.
- Red evidence: command and failure summary.
- Green evidence: command and pass summary.
- Files changed.
- Acceptance criteria covered.
- Remaining implementation or verification gaps.
