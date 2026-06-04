---
name: requirements-intake
description: "Use when starting an enterprise software workflow from a new request: create a docs/specs/<spec-id>/ package, record INTAKE.md with source request, source links, actors, constraints, and unknowns, initialize WORKFLOW.md, then route to external grill-with-docs for project-language review."
---

# Requirements Intake

Create the durable spec package before requirements are refined. This stage captures the source request and initial context only; it does not replace `grill-with-docs` or `requirements-capture`.

## Workflow

1. Explore enough repo context to choose a clear title and avoid duplicate packages. Check `docs/specs/INDEX.md`, existing `docs/specs/`, `CONTEXT.md`, and `docs/agents/spec-workflow.md`.
2. If no package exists, initialize one with `scripts/init-requirements-intake.mjs`.
3. Read `docs/agents/spec-workflow.md` when present; otherwise read [references/spec-workflow.md](references/spec-workflow.md).
4. Fill `INTAKE.md` with the original request, source links, initial actors, constraints, and unknowns. Do not turn this into full requirements analysis.
5. Update `WORKFLOW.md`:
   - `requirements-intake` -> `complete`
   - `project-language-review` -> `pending`
   - `current_stage` -> `project-language-review`
   - `package_lifecycle` remains `draft`
6. Route to external `grill-with-docs` for project-language review before `requirements-capture`.

## Initializing A Package

From the target repo root, run:

```bash
node <path-to-this-skill>/scripts/init-requirements-intake.mjs \
  --root . \
  --title "Add billing events"
```

The script creates the full enterprise package shape under `docs/specs/<spec-id>/` and initializes `docs/agents/spec-workflow.md` if missing.

## Guardrails

- Do not update `CONTEXT.md`; that is owned by `grill-with-docs` during project-language review.
- Do not write final requirements in `INTAKE.md`; use `REQUIREMENTS.md` after project-language review.
- Do not skip source links just because they are informal. Conversations, designs, issues, PRs, and customer requests are all valid source links.
- Do not mark the package ready for implementation during intake.
