---
name: tdd
description: Use when building or changing software with a test-driven development loop: write or select a focused failing test, prove the red state, make the smallest production change, prove green, refactor safely, and report test evidence.
---

# TDD

Use test-driven development when the request involves implementing behavior, fixing a reproducible bug, or tightening code with executable examples. Treat the test as the change contract and keep each loop small enough that failures remain diagnostic.

## Workflow

1. Check whether the user named a spec package under `docs/specs/<spec-id>/`. If present, read `REQUIREMENTS.md`, `SPEC.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, and `docs/agents/spec-workflow.md`.
2. Ground the change in the current codebase. Inspect existing tests, contracts, fixtures, and local test commands before adding anything.
3. Define the next observable behavior in one sentence. Prefer public behavior, API output, persisted state, emitted events, or user-visible effects over implementation details.
4. Write or update the smallest test that should fail for the missing behavior. For a bug fix, reproduce the bug first.
5. Run the narrowest relevant test command and capture the red evidence. If the test passes unexpectedly, stop and reassess the behavior or fixture.
6. Implement the smallest production change that can make the failing test pass. Avoid broad refactors while the test is red.
7. Rerun the same test and then the nearest broader validation command. Keep the command output tied to the behavior under change.
8. Refactor only after the test is green. Preserve behavior and rerun the relevant tests after refactoring.
9. When using a spec package, append observed red/green/refactor command results to `EVIDENCE.md` and map them to acceptance criteria.
10. Report the red command, green command, production change, and any residual gap that remains untested.

## Guardrails

- Do not write multiple unrelated failing tests before making progress on the first one.
- Do not change production code before proving the failing test unless the current system has no viable test seam; when that happens, create the seam as the first tested behavior.
- Prefer deterministic tests over snapshots or timing-sensitive checks.
- Keep broad suite runs for completion gates, not for every inner loop.
- If the user explicitly asks for implementation without tests, still identify the test gap in the final report.

## Output Shape

When handing work back, include:

- Behavior covered.
- Red evidence: command and failure summary.
- Green evidence: command and pass summary.
- Files changed.
- Test gaps or follow-up tests that were intentionally deferred.
- Spec package evidence appended, when applicable.
