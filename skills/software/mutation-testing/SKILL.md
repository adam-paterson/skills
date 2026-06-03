---
name: mutation-testing
description: Use when TEST-PLAN.md selects mutation testing as an optional verification technique: select the right tool, establish a baseline, interpret surviving mutants, add behavior-focused tests, and report mutation score evidence.
---

# Mutation Testing

Use mutation testing when ordinary coverage is not enough to show that tests would catch meaningful defects. Treat surviving mutants as test-design feedback, not as a mandate to chase every possible mutation.

## Workflow

1. Check whether the user named a spec package under `docs/specs/<spec-id>/`. If present, read `WORKFLOW.md`, `REQUIREMENTS.md`, `SPEC.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, `VERIFY.md`, and `docs/agents/spec-workflow.md`.
2. Identify the language, test runner, target modules, and existing coverage or risk area.
3. Choose a mutation tool that fits the stack. Common defaults include Stryker for JavaScript and TypeScript, PIT for JVM projects, mutmut or Cosmic Ray for Python, Infection for PHP, and cargo-mutants for Rust.
4. Start with a narrow target. Run mutation testing against the changed or high-risk module before attempting a full suite.
5. Capture the baseline: command, runtime, mutation score, killed mutants, survived mutants, no-coverage mutants, and timed-out mutants.
6. Triage survivors:
   - Equivalent mutant: behavior is unchanged; document and exclude only when justified.
   - Untested behavior: add or improve a behavior-focused test.
   - Overbroad mutant target: narrow the tool configuration.
   - Fragile test design: improve assertions or fixtures.
7. Add tests that would catch real behavioral defects. Avoid assertions that merely lock implementation details.
8. Rerun the same mutation command and compare score and surviving mutants.
9. When using a spec package, update `TEST-PLAN.md` with mutation targets, append baseline/final mutation evidence to `EVIDENCE.md`, and update `VERIFY.md` if the evidence proves acceptance criteria.
10. Report the final score, meaningful survivors, exclusions, and remaining risk.

## Guardrails

- Do not run a whole-repo mutation suite first unless the repo is known to be fast enough.
- Do not edit production code solely to kill a mutant unless the mutant exposed a real defect.
- Do not treat coverage percentage as a substitute for mutation evidence.
- Preserve deterministic seeds and tool configuration so failures can be reproduced.
- Timebox mutation runs and report when runtime prevents exhaustive checking.

## Output Shape

When reporting results, include:

- Tool and command.
- Target files or modules.
- Baseline mutation score.
- Final mutation score.
- Tests added or strengthened.
- Surviving mutants and whether they are equivalent, low risk, or still actionable.
- Spec package test-plan or evidence updates, when applicable.
