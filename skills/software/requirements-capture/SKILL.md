---
name: requirements-capture
description: "Use after external grill-with-docs has clarified durable project language: write change-specific requirements into docs/specs/<spec-id>/REQUIREMENTS.md, preserve CONTEXT.md/ADR decisions as references only, update traceability and WORKFLOW.md readiness, and gate spec-generation."
---

# Requirements Capture

Persist clarified change requirements into the enterprise spec package. This skill assumes `requirements-intake` created the package and external `grill-with-docs` handled project-language review.

## Workflow

1. Locate the target `docs/specs/<spec-id>/` package. If none exists, route to `requirements-intake` instead of creating ad hoc files.
2. Read `WORKFLOW.md`, `INTAKE.md`, `REQUIREMENTS.md`, `CONTEXT.md` or `CONTEXT-MAP.md`, relevant ADRs, and `docs/agents/spec-workflow.md`.
3. Confirm `project-language-review` is complete or explicitly skipped. If not, route to external `grill-with-docs`.
4. Write only change-specific requirements to `REQUIREMENTS.md`: actors, triggers, outcomes, business rules, edge cases, failure behavior, non-requirements, open questions, and traceability.
5. Reference durable project terms from `CONTEXT.md`, but do not redefine project language in `REQUIREMENTS.md`.
6. Preserve requirement ids such as `R1`, `R2`, and keep traceability rows ready for acceptance criteria, Gherkin, tests, and evidence.
7. Update `WORKFLOW.md`:
   - `requirements-capture` -> `complete` when requirements are ready for spec generation.
   - `spec-generation` -> `pending`.
   - `current_stage` -> `spec-generation`.
   - Leave `package_lifecycle` as `draft`.
8. If blocking questions remain, mark `requirements-capture` as `blocked` and record the blocker in `WORKFLOW.md`.

## Guardrails

- Do not copy or reimplement `grill-with-docs`; use it as the upstream project-language review stage.
- Do not put implementation design into `REQUIREMENTS.md`; use `SPEC.md`.
- Do not put durable glossary terms into `REQUIREMENTS.md`; update or reference `CONTEXT.md`.
- Do not mark requirements ready while blocking questions are hidden or unmapped.

## Output Shape

When handing back progress, include:

- Spec package path.
- Requirements added or changed.
- Project language or ADRs referenced.
- Blocking questions, if any.
- Whether the package is ready for `spec-generation`.
