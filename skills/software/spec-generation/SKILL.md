---
name: spec-generation
description: Use after requirements-capture to create or update implementation-ready SPEC.md inside docs/specs/<spec-id>/: inspect current state, preserve requirements, define target behavior, interfaces, data flow, risks, initial acceptance/test strategy, and update WORKFLOW.md toward ready-for-implementation.
---

# Spec Generation

Create or update the implementation-ready design inside an enterprise spec package. The output should be durable, reviewable in Git, and usable by acceptance, implementation, verification, and release skills.

## Workflow

1. Explore before writing. Inspect relevant code, tests, routes, schemas, docs, config, `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`, `docs/agents/spec-workflow.md`, and the target `docs/specs/<spec-id>/`.
2. Prefer an existing package created by `requirements-intake`. If none exists and the user wants to proceed, use `scripts/init-spec-package.mjs` as a fallback scaffold.
3. Use `docs/agents/spec-workflow.md` as the repo-local contract when present; otherwise read [references/spec-workflow.md](references/spec-workflow.md) for the default package contract and file ownership rules.
4. Read `WORKFLOW.md`, `INTAKE.md`, and `REQUIREMENTS.md`. If requirements are missing or blocked, route back to `requirements-capture`.
5. Write or update `SPEC.md` with current state, goal, non-goals, target behavior, interfaces, data flow, failure modes, compatibility, rollout, and open questions.
6. Write or update `ACCEPTANCE.md` with numbered acceptance criteria, examples, edge cases, out-of-scope behavior, and criteria-to-test mapping.
7. Write or update `TEST-PLAN.md` with existing test seams, TDD sequence, BDD/Gherkin coverage, property-test candidates, mutation-test targets, and completion commands.
8. Update `DECISIONS.md` for spec-local decisions and promote only hard-to-reverse, surprising trade-offs to `docs/adr/`.
9. Do not add planned checks to `EVIDENCE.md`. Later skills append observed command results.
10. Update `WORKFLOW.md`: mark `spec-generation` complete, route to `acceptance-design`, and set `package_lifecycle` to `ready-for-implementation` only after acceptance design, Gherkin, and test strategy are clear.
11. Update `docs/specs/INDEX.md` so the package can be found in future sessions.

## Initializing A Package

From a target repo root, run:

```bash
node <path-to-this-skill>/scripts/init-spec-package.mjs \
  --root . \
  --title "Add agent skill catalog"
```

The script creates:

```text
docs/agents/spec-workflow.md
docs/specs/<spec-id>/
  WORKFLOW.md
  INTAKE.md
  REQUIREMENTS.md
  SPEC.md
  ACCEPTANCE.md
  TEST-PLAN.md
  IMPLEMENTATION.md
  VERIFY.md
  RELEASE.md
  DECISIONS.md
  EVIDENCE.md
  scenarios/
    acceptance.feature
```

Use `--id YYYY-MM-DD-short-slug` when the user already has a specific spec id. The script refuses to overwrite an existing package unless `--force` is passed.

## Guardrails

- Do not leave the spec only in chat when the user wants a persistent workflow.
- Do not invent evidence. Evidence is only command output, test results, generated artifact inspection, runtime behavior, or live readback actually observed.
- Do not ask questions that repo exploration can answer.
- Keep unresolved ambiguity visible in `SPEC.md` open questions or `DECISIONS.md`; do not hide it in prose.
- Keep all later workflow handoff instructions tied to concrete files in the package.
