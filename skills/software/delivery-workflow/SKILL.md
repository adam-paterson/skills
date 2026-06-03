---
name: delivery-workflow
description: Use as the enterprise software workflow router: inspect docs/agents/spec-workflow.md, external/skill-sources.json, docs/specs/<spec-id>/WORKFLOW.md, and package files; initialize safe setup when needed; then route to requirements-intake, external grill-with-docs, requirements-capture, spec-generation, acceptance-design, to-gherkin, implement-spec, verify-spec, release-readiness, or changelog.
---

# Delivery Workflow

Route the user through the enterprise software workflow without duplicating the dedicated stage skills. This is a hybrid router: it may inspect state and perform deterministic setup, but actual stage work belongs to the relevant owned or external skill.

## Workflow

1. Inspect the repo:
   - `docs/agents/spec-workflow.md`
   - `external/skill-sources.json`
   - `docs/specs/INDEX.md`
   - existing `docs/specs/*/WORKFLOW.md`
   - `CONTEXT.md` or `CONTEXT-MAP.md`
2. If workflow setup is missing, route to `setup-agent-workflow`.
3. If no spec package exists for the request, route to `requirements-intake`.
4. If a package exists, run `scripts/inspect-workflow.mjs --root . --spec <spec-id>` when available or inspect `WORKFLOW.md` directly.
5. Route by `current_stage` and stage status:
   - `requirements-intake` -> `requirements-intake`
   - `project-language-review` -> external `grill-with-docs` from `mattpocock/skills`
   - `requirements-capture` -> `requirements-capture`
   - `spec-generation` -> `spec-generation`
   - `acceptance-design` -> `acceptance-design`
   - `to-gherkin` -> `to-gherkin`
   - `implement-spec` -> `implement-spec`
   - `verify-spec` -> `verify-spec`
   - `release-readiness` -> `release-readiness`
6. If all stages are complete and package lifecycle is `release-ready`, summarize the package and suggest archive or release mechanics only if the user asks.

## External Stage

`project-language-review` is owned by external `grill-with-docs` from `mattpocock/skills`. Do not copy or impersonate that skill. If it is unavailable, tell the user how to install it and stop before requirements capture unless the user explicitly skips the stage.

## Guardrails

- Do not become a mega skill. Route to the dedicated stage skill once the next stage is known.
- Do not mark stages complete without reading their output files.
- Do not skip external `grill-with-docs` silently.
- Do not start implementation before `package_lifecycle` is `ready-for-implementation` unless the user explicitly overrides.

## Scripted Inspection

From a repo root:

```bash
node <path-to-this-skill>/scripts/inspect-workflow.mjs --root . --spec <spec-id>
```
