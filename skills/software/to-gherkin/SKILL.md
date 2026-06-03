---
name: to-gherkin
description: Use after acceptance-design to turn acceptance criteria and examples into stakeholder-readable Gherkin, update docs/specs/<spec-id>/scenarios/acceptance.feature, and assess whether the current project's language has a supported BDD test-suite tool to offer initialization.
---

# To Gherkin

Convert behavior examples into Gherkin that business stakeholders can read and automation can execute. Preserve project language, write about observable behavior, and keep implementation mechanics in step definitions.

Use [references/cucumber-gherkin-guidance.md](references/cucumber-gherkin-guidance.md) for Cucumber/Gherkin syntax, quality gates, anti-patterns, and project tool detection.

## Workflow

1. If the user named `docs/specs/<spec-id>/`, read `WORKFLOW.md`, `REQUIREMENTS.md`, `ACCEPTANCE.md`, `SPEC.md`, `TEST-PLAN.md`, and `docs/agents/spec-workflow.md`.
2. Read relevant project language from `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`, existing `.feature` files, and test conventions.
3. Confirm `acceptance-design` is complete. If examples or rules are missing, stop and ask for discovery/example-mapping rather than inventing behavior.
4. Identify the feature boundary, actor, business capability, rules, concrete examples, edge cases, permissions, invalid input, and state transitions.
5. Choose the smallest useful Gherkin structure: one `Feature`, optional `Rule`, optional short `Background`, then `Scenario`/`Example` or `Scenario Outline` with `Examples`.
6. Apply the Gherkin quality gates in the reference: declarative behavior, concrete examples, 3-5 steps where practical, observable outcomes, consistent wording, no hidden implementation detail.
7. Required BDD suite check:
   - Inspect manifests and existing tests (`package.json`, `pom.xml`, `build.gradle`, `Gemfile`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `*.csproj`, `composer.json`, `features/`, `src/test/resources/`, etc.).
   - Map the detected language/platform to a Cucumber/Gherkin-compatible tool from the reference.
   - If a suite exists, align feature location, tags, and step vocabulary; do not duplicate step definitions.
   - If no suite exists and a supported tool is clear, offer to initialize it with proposed dependencies, folders, smoke scenario, and run command. Do not install dependencies or write scaffold files without explicit confirmation.
8. When updating a spec package, write or update `scenarios/acceptance.feature`, reflect scenario coverage or automation targets in `ACCEPTANCE.md`/`TEST-PLAN.md`, and update `WORKFLOW.md` so `to-gherkin` is `complete` and `implement-spec` is pending when ready.
9. Review for ambiguity, duplicate step text, conjunction steps, oversized scenarios, brittle selectors, endpoint/class names, database assertions, and scenarios that test more than one rule.

## Style Rules

- Describe what the system should do, not how the UI/API/code does it. Ask: “Would this wording change if the implementation changed?”
- `Given` establishes meaningful context, `When` describes the event/action, and `Then` asserts an observable result.
- Prefer concrete domain examples over abstract placeholders; avoid technical details unless the actor is technical and the detail is the contract.
- Keep each scenario focused on one business rule or outcome. Use `And`/`But` instead of conjunction steps.
- Use `Background` only for short, client-relevant shared context; otherwise use fixtures, helpers, or hooks.
- Use `Scenario Outline` only when the same rule is exercised by multiple input/output rows.
- Add tags only for filtering, ownership, risk, environment, or automation routing.

## Output Shape

Return the Gherkin first, then a short note:

```gherkin
Feature: <capability>

  Rule: <business rule>

    Scenario: <observable outcome>
      Given <context>
      When <action>
      Then <result>
```

Then list assumptions, suggested automation level, BDD suite assessment, and any initialization offer. When updating a spec package, list the package path and files changed.
