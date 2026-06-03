# Spec Workflow

Use this reference when creating, updating, or consuming a repo-tracked spec package.

## Workspace

Specs live under:

```text
docs/specs/<spec-id>/
```

Use this id format:

```text
YYYY-MM-DD-short-change-name
```

`docs/specs/INDEX.md` lists active and historical specs.

## Required Files

Each spec package contains:

- `REQUIREMENTS.md` — requirements ledger, canonical language, scenario probes, open questions, and traceability.
- `SPEC.md` — product and engineering target behavior.
- `ACCEPTANCE.md` — acceptance criteria, examples, edge cases, and criteria-to-test map.
- `TEST-PLAN.md` — testing strategy and completion commands.
- `DECISIONS.md` — spec-local decisions and ADR promotion notes.
- `EVIDENCE.md` — observed proof, never planned proof.
- `scenarios/acceptance.feature` — Gherkin generated or refined by the Gherkin skill.

## Statuses

Use one of these statuses in `SPEC.md` frontmatter and `docs/specs/INDEX.md`:

- `draft` — still being shaped.
- `reviewed` — reviewed by the user or maintainer.
- `ready-for-implementation` — enough detail exists for an agent to implement.
- `in-progress` — implementation has started.
- `verified` — evidence proves the acceptance criteria.
- `archived` — no longer active.

## Skill Ownership

- `discuss-requirements` creates or updates `REQUIREMENTS.md`, updates durable project language in `CONTEXT.md`, and proposes ADRs when discussion uncovers hard-to-reverse trade-offs.
- `spec-generation` creates the package and owns `SPEC.md`, initial `ACCEPTANCE.md`, initial `TEST-PLAN.md`, initial `DECISIONS.md`, and index updates.
- `bdd` refines behavior examples and acceptance criteria in `ACCEPTANCE.md`.
- `gherkin-generation` writes or updates `scenarios/acceptance.feature`.
- `tdd` implements against the package and appends red/green/refactor evidence to `EVIDENCE.md`.
- `property-testing` adds invariant checks to `TEST-PLAN.md` and appends property-test evidence to `EVIDENCE.md`.
- `mutation-testing` adds mutation targets to `TEST-PLAN.md` and appends mutation score evidence to `EVIDENCE.md`.

## Completion Rule

A spec package is complete only when `EVIDENCE.md` proves every acceptance criterion in `ACCEPTANCE.md`. Green tests alone are not enough unless the evidence maps them to the criteria they prove.

Requirements are ready for spec generation only when `REQUIREMENTS.md` records the key actors, triggers, outcomes, business rules, edge cases, failure behavior, open questions, and traceability status.

## ADR Boundary

Use `DECISIONS.md` for local implementation choices. Create or suggest an ADR under `docs/adr/` only when a decision is hard to reverse, surprising without context, and the result of a real trade-off.

## Existing Project Docs

Before writing a spec, read relevant project docs:

- `CONTEXT.md` for project language.
- `CONTEXT-MAP.md` for multi-context repos.
- `docs/adr/` for architectural decisions.
- `docs/agents/spec-workflow.md` for repo-local overrides.

If a repo already has a stronger spec convention, follow it and record the mapping in the handoff.
