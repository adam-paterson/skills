---
name: property-testing
description: Use when TEST-PLAN.md selects property testing as an optional verification technique: identify invariants, generators, shrinking behavior, seeds, edge cases, and replayable randomized checks with tools such as fast-check, Hypothesis, jqwik, ScalaCheck, or proptest.
---

# Property Testing

Use property-based testing when examples alone are too narrow for a domain with many valid inputs, state transitions, or invariants. A property test should state what must always hold, then generate many cases that try to falsify it.

## Workflow

1. Check whether the user named a spec package under `docs/specs/<spec-id>/`. If present, read `WORKFLOW.md`, `REQUIREMENTS.md`, `SPEC.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, `VERIFY.md`, and `docs/agents/spec-workflow.md`.
2. Identify the domain rule, invariant, algebraic law, parser contract, state machine rule, or round-trip behavior that should hold across many inputs.
3. Choose a property-testing library for the stack. Common defaults include fast-check for JavaScript and TypeScript, Hypothesis for Python, jqwik for JVM, ScalaCheck for Scala, and proptest or quickcheck for Rust.
4. Start with one property. State it in plain language before writing code.
5. Build generators that produce valid domain inputs. Include edge cases, invalid inputs when relevant, and realistic constraints.
6. Add shrinking-friendly assertions. A failing property should reduce to a minimal reproducible case.
7. Run the property test with a fixed or reported seed. Capture seed, counterexample, and shrink output for failures.
8. Fix the implementation or the property. If the property was too broad or invalid, refine it and explain why.
9. When using a spec package, update `TEST-PLAN.md` with property candidates, append observed property-test results to `EVIDENCE.md`, and update `VERIFY.md` if the evidence proves acceptance criteria.
10. Keep example tests for important named cases even when the property covers the general rule.

## Good Property Shapes

- Round trip: encoding then decoding returns the original value.
- Idempotence: applying an operation twice has the same result as once.
- Ordering: sorted output respects the comparator and preserves elements.
- Conservation: transformation does not lose or duplicate entities.
- Model agreement: implementation matches a simpler reference model.
- State machine: every command sequence preserves the allowed invariants.

## Guardrails

- Do not generate arbitrary data when the domain requires constrained valid inputs.
- Do not assert private implementation details.
- Do not hide flaky random failures; record the seed and make the failure replayable.
- Do not replace focused example tests with properties. Use both when each adds signal.

## Output Shape

When handing work back, include:

- Property statement.
- Generator strategy.
- Tool and command.
- Seed or replay instructions.
- Counterexample and shrink result when a failure is found.
- Example tests retained for named edge cases.
- Spec package test-plan or evidence updates, when applicable.
