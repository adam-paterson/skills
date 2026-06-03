---
name: gherkin-generation
description: Use after acceptance-design to write or refine docs/specs/<spec-id>/scenarios/acceptance.feature from acceptance criteria: produce precise Feature, Rule, Background, Scenario, Scenario Outline, tags, and step wording before implementation.
---

# Gherkin Generation

Use this skill to turn behavior requirements into Gherkin that is readable by stakeholders and practical for automation. Preserve domain language and keep scenarios focused on observable outcomes.

## Workflow

1. Check whether the user named a spec package under `docs/specs/<spec-id>/`. If present, read `WORKFLOW.md`, `REQUIREMENTS.md`, `ACCEPTANCE.md`, `SPEC.md`, `TEST-PLAN.md`, and `docs/agents/spec-workflow.md`.
2. Identify the feature boundary and the business capability being described.
3. Gather examples before writing steps. Include happy path, edge cases, permissions, invalid input, and relevant state transitions.
4. Choose the smallest useful structure: `Feature`, optional `Rule`, optional `Background`, then `Scenario` or `Scenario Outline`.
5. Write steps in Given/When/Then form:
   - `Given` establishes meaningful context.
   - `When` performs the action under test.
   - `Then` asserts the observable result.
6. Use `Scenario Outline` only when the same rule is exercised by multiple input/output pairs.
7. Add tags only when they help filtering, ownership, risk, or automation routing.
8. When using a spec package, write or update `scenarios/acceptance.feature`, reflect scenario coverage in `ACCEPTANCE.md` or `TEST-PLAN.md`, and update `WORKFLOW.md` so `gherkin-generation` is complete and `implement-spec` is pending when the package is ready.
9. Review for step reuse, ambiguity, hidden implementation detail, and scenarios that test more than one rule.

## Style Rules

- Name features and scenarios with domain terms, not test mechanics.
- Avoid UI selectors, endpoint names, mocks, database fields, or class names unless the actor is technical and those details are the contract.
- Prefer concrete examples over abstract placeholders.
- Do not combine multiple independent outcomes in a single `Then`.
- Keep `Background` short; move complex setup into fixtures or helper steps.

## Output Shape

Return the Gherkin first, then a short implementation note:

```gherkin
Feature: <capability>

  Rule: <business rule>

    Scenario: <observable outcome>
      Given <context>
      When <action>
      Then <result>
```

After the block, list any assumptions and suggested automation level.

When updating a spec package, also list the package path and files changed.
