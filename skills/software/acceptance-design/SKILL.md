---
name: acceptance-design
description: "Use after spec-generation and before implementation to refine docs/specs/<spec-id>/ACCEPTANCE.md from requirements and SPEC.md: identify actors, rules, examples, edge cases, acceptance criteria, and automation targets without writing production code."
---

# Acceptance Design

Shape acceptance criteria and behavior examples before implementation starts. This is the spec-scoped BDD stage for the enterprise workflow.

## Workflow

1. Locate the target `docs/specs/<spec-id>/` package. Read `WORKFLOW.md`, `REQUIREMENTS.md`, `SPEC.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, and `docs/agents/spec-workflow.md`.
2. Confirm `spec-generation` is complete or ask what remains blocked.
3. Identify the capability, actor, business outcome, and current system boundary. Use repo truth when product wording conflicts with implementation.
4. Extract concrete examples covering normal flow, boundary cases, error handling, permissions, and state transitions.
5. Convert examples into numbered acceptance criteria. Prefer precise inputs, actions, and observable outcomes over implementation language.
6. Choose the automation level for each behavior: unit, integration, API, component, browser, contract, or manual acceptance check.
7. Update `ACCEPTANCE.md` with criteria, examples, edge cases, out-of-scope behavior, and criteria-to-test mapping. Preserve requirement ids from `REQUIREMENTS.md`.
8. Update `TEST-PLAN.md` only when automation targets or optional verification techniques change.
9. Update `WORKFLOW.md`:
   - `acceptance-design` -> `complete`
   - `to-gherkin` -> `pending`
   - `current_stage` -> `to-gherkin`

## Scenario Quality

- Each scenario should describe one rule or outcome.
- Use project language from `CONTEXT.md`, not selectors, method names, or database columns unless the actor is technical.
- Keep examples concrete enough that a different implementer would reach the same result.
- Separate acceptance criteria from solution design.
- Mark ambiguous or conflicting examples explicitly instead of smoothing them over.

## Output Shape

When handing back progress, include:

- Spec package path.
- Acceptance criteria changed.
- Examples or edge cases added.
- Automation targets updated.
- Whether `to-gherkin` is ready.
