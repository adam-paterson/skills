---
name: spec-generation
description: Use when converting a software change request into a git-tracked spec package under docs/specs/<spec-id>/: inspect current state, read or initialize REQUIREMENTS.md, create or update SPEC.md, ACCEPTANCE.md, TEST-PLAN.md, DECISIONS.md, EVIDENCE.md, and prepare later BDD, Gherkin, TDD, property, and mutation-testing work.
---

# Spec Generation

Create or update a repo-tracked spec package. The output should be durable, reviewable in Git, and usable by the other workflow skills.

## Workflow

1. Explore before writing. Inspect relevant code, tests, routes, schemas, docs, config, `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`, `docs/agents/spec-workflow.md`, and existing `docs/specs/`.
2. Decide whether to update an existing spec package or create a new one. If creating, use `scripts/init-spec-package.mjs` from this skill.
3. Read [references/spec-workflow.md](references/spec-workflow.md) for the package contract and file ownership rules.
4. Read `REQUIREMENTS.md` when present. If it is missing or empty, initialize it and record the source request, actors, open questions, and traceability gaps.
5. Write or update `SPEC.md` with current state, goal, non-goals, target behavior, interfaces, data flow, failure modes, compatibility, rollout, and open questions.
6. Write or update `ACCEPTANCE.md` with numbered acceptance criteria, examples, edge cases, out-of-scope behavior, and criteria-to-test mapping.
7. Write or update `TEST-PLAN.md` with existing test seams, TDD sequence, BDD/Gherkin coverage, property-test candidates, mutation-test targets, and completion commands.
8. Initialize `DECISIONS.md` for spec-local decisions and promote only hard-to-reverse, surprising trade-offs to `docs/adr/`.
9. Initialize `EVIDENCE.md`, but do not add planned checks as evidence. Later skills append observed command results.
10. Update `docs/specs/INDEX.md` so the package can be found in future sessions.

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
  REQUIREMENTS.md
  SPEC.md
  ACCEPTANCE.md
  TEST-PLAN.md
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
