---
name: to-acceptance
description: Turn acceptance criteria and behavior examples into Gherkin scenarios and assess BDD suite setup. Use when asked to write acceptance scenarios or convert behavior examples into .feature files.
---

# To acceptance

Write Gherkin that stakeholders can review and a BDD suite can execute. Use the project's domain language and describe observable behavior.

## Workflow

### 1. Establish the inputs

Use relevant project documentation, existing `.feature` files, and test conventions to establish domain language and scope.

If behavior is unresolved, identify the missing rule or expected outcome and ask for clarification before drafting the affected scenarios.

Proceed when each in-scope criterion has a business rule and a concrete example with an expected outcome. Account for relevant permissions, invalid input, edge cases, and state transitions in the agreed examples.

### 2. Draft and review the scenarios

Read [Gherkin syntax and quality gates](references/cucumber-gherkin-guidance.md#gherkin-syntax-and-quality-gates). Choose the smallest structure that expresses the examples, with one `Feature` per file and optional `Rule`, `Background`, or `Scenario Outline` sections.

Map every in-scope criterion to scenarios. Check each scenario against the quality gates and existing step vocabulary. Resolve ambiguity and duplicate step text before treating the draft as complete.

### 3. Assess BDD automation

In a repository, follow [the BDD suite check](references/cucumber-gherkin-guidance.md#bdd-suite-check). Report the detected platform and evidence files, existing suite or candidate tool, and suggested automation level.

If a suite exists, follow its feature locations, tags, and step vocabulary. If none exists, offer initialization only when a compatible tool is clear. Include the proposed dependencies, files, smoke scenario, and run command. Wait for explicit confirmation before installing dependencies or creating suite scaffolding.

Without repository access, report that suite detection could not be performed.

### 4. Save the result

Return the Gherkin or save it to the requested path. When updating existing feature files, follow the repository's layout and report the files changed.

## Response

Return the Gherkin first, followed by a short note with any assumptions, the automation level, BDD suite assessment, and initialization offer. Report unresolved behavior as a blocker rather than an assumed outcome.
