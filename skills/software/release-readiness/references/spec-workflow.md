# Enterprise Spec Workflow

Use this reference when creating, updating, routing, implementing, verifying, or releasing a repo-tracked spec package.

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

- `WORKFLOW.md` - router-readable workflow state, package lifecycle, current blocker, and next stage.
- `INTAKE.md` - source request, source links, initial actors, constraints, and unknowns.
- `REQUIREMENTS.md` - change-specific requirements, scenario probes, open questions, and traceability.
- `SPEC.md` - product and engineering target behavior.
- `ACCEPTANCE.md` - acceptance criteria, examples, edge cases, and criteria-to-test map.
- `TEST-PLAN.md` - testing strategy and completion commands.
- `IMPLEMENTATION.md` - implementation slices, touched areas, non-goals preserved, and implementation notes.
- `VERIFY.md` - acceptance-to-evidence mapping and verification decision.
- `RELEASE.md` - release readiness, changelog decision, rollout, rollback, observability, and review notes.
- `DECISIONS.md` - spec-local decisions and ADR promotion notes.
- `EVIDENCE.md` - observed proof, never planned proof.
- `scenarios/acceptance.feature` - Gherkin generated or refined by the Gherkin skill.

## Package Lifecycle

Use one of these values in `WORKFLOW.md` frontmatter and `docs/specs/INDEX.md`:

- `draft` - intake, language review, requirements, acceptance design, or spec generation is still incomplete.
- `ready-for-implementation` - requirements, acceptance criteria, risks, and test strategy are clear enough for an agent to implement.
- `in-progress` - implementation has started.
- `implemented` - code is written, but verification is incomplete.
- `verified` - evidence maps to every acceptance criterion.
- `release-ready` - verified and ready to ship or hand off.
- `archived` - closed, superseded, shipped, cancelled, or no longer active.

## Stage Statuses

Use one of these values for each stage row in `WORKFLOW.md`:

- `pending` - not started.
- `in-progress` - started but not complete.
- `complete` - stage output exists and meets the stage gate.
- `blocked` - cannot proceed without user input or an external change.
- `skipped` - intentionally not needed for this package.

## Skill Ownership

- `setup-agent-workflow` sets up `docs/agents/spec-workflow.md`, `docs/specs/INDEX.md`, and agent instructions in the target repo.
- `delivery-workflow` inspects `WORKFLOW.md` and routes to the next owned or external stage.
- `requirements-intake` creates the package and owns `INTAKE.md` plus initial `WORKFLOW.md`.
- External `grill-with-docs` updates durable project language in `CONTEXT.md` and proposes ADRs when discussion uncovers hard-to-reverse trade-offs.
- `requirements-capture` owns change-specific `REQUIREMENTS.md` after upstream project-language review.
- `spec-generation` creates the package and owns `SPEC.md`, initial `ACCEPTANCE.md`, initial `TEST-PLAN.md`, initial `DECISIONS.md`, and index updates.
- `acceptance-design` refines behavior examples and acceptance criteria in `ACCEPTANCE.md`.
- `gherkin-generation` writes or updates `scenarios/acceptance.feature`.
- `implement-spec` implements one ready package or slice at a time and owns `IMPLEMENTATION.md`.
- `verify-spec` owns `VERIFY.md` and maps observed evidence to every acceptance criterion.
- `release-readiness` owns `RELEASE.md` and decides whether `changelog` is needed.
- `property-testing` and `mutation-testing` are optional verification techniques selected by `TEST-PLAN.md`.

## Completion Rule

A spec package is verified only when `VERIFY.md` maps observed entries in `EVIDENCE.md` to every acceptance criterion in `ACCEPTANCE.md`. Green tests alone are not enough unless the evidence maps them to the criteria they prove.

Requirements are ready for spec generation only when `REQUIREMENTS.md` records the key actors, triggers, outcomes, business rules, edge cases, failure behavior, open questions, and traceability status.

A verified package is release-ready only when `RELEASE.md` covers changelog need, rollout, rollback, observability, documentation, review notes, and remaining follow-ups.

## ADR Boundary

Use `DECISIONS.md` for local implementation choices. Create or suggest an ADR under `docs/adr/` only when a decision is hard to reverse, surprising without context, and the result of a real trade-off.

## Existing Project Docs

Before writing a spec, read relevant project docs:

- `CONTEXT.md` for project language.
- `CONTEXT-MAP.md` for multi-context repos.
- `docs/adr/` for architectural decisions.
- `docs/agents/spec-workflow.md` for repo-local overrides.

If a repo already has a stronger spec convention, follow it and record the mapping in the handoff.
