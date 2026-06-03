---
name: bdd
description: Use when shaping software behavior from user-visible outcomes and examples: identify actors, rules, acceptance criteria, scenario examples, automation targets, and implementation evidence before or during delivery.
---

# BDD

Use behavior-driven development when the work needs shared understanding across product, engineering, QA, or stakeholders. Start from observable behavior and examples, then map those examples to tests or acceptance checks.

## Workflow

1. Check whether the user named a spec package under `docs/specs/<spec-id>/`. If present, read `REQUIREMENTS.md`, `SPEC.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, and `docs/agents/spec-workflow.md` before writing.
2. Identify the capability, actor, business outcome, and current system boundary. Use repo truth when product wording conflicts with implementation.
3. Extract concrete examples. Include normal flow, boundary cases, error handling, permissions, and state transitions that matter to the user.
4. Convert examples into acceptance criteria. Prefer precise inputs, actions, and observable outcomes over implementation language.
5. Choose the automation level for each behavior: unit, integration, API, component, browser, contract, or manual acceptance check.
6. When using a spec package, update `ACCEPTANCE.md` with refined criteria, examples, edge cases, and criteria-to-test mapping. Preserve requirement ids from `REQUIREMENTS.md` in the mapping. Update `TEST-PLAN.md` only when the automation target changes.
7. Implement or request the missing executable checks before changing behavior when the repo supports it.
8. Validate the completed behavior with the agreed checks and summarize which scenarios are covered.

## Scenario Quality

- Each scenario should describe one rule or outcome.
- Use the language of the domain, not selectors, method names, or database columns unless the user-facing contract is technical.
- Keep examples concrete enough that a different implementer would reach the same result.
- Separate acceptance criteria from solution design when both are needed.
- Mark ambiguous or conflicting examples explicitly instead of smoothing them over.

## Output Shape

When producing a BDD artifact, include:

- Capability and actor.
- Business outcome.
- Acceptance criteria.
- Scenario examples.
- Automation target for each scenario.
- Evidence needed to prove completion.
- Spec package files updated, when applicable.
