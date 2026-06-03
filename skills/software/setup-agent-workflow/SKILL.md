---
name: setup-agent-workflow
description: Use when preparing a repository to use this catalog's enterprise software workflow: create docs/agents/spec-workflow.md, docs/specs/INDEX.md, and agent instructions so delivery-workflow, requirements-intake, requirements-capture, spec-generation, acceptance-design, to-gherkin, implement-spec, verify-spec, release-readiness, and changelog share one repo-local spec package convention.
---

# Setup Agent Workflow

Use this skill once per repository before the software workflow skills are used heavily, or when a repo's spec workflow docs are missing or stale. It records the repo-local convention that the other skills should read first.

This setup improves consistency, but `requirements-intake` and `spec-generation` can still initialize packages without it by using their bundled fallback assets.

## Workflow

1. Explore the target repo before writing. Check `AGENTS.md`, `CLAUDE.md`, `docs/agents/`, `docs/specs/`, `CONTEXT.md`, `CONTEXT-MAP.md`, and `docs/adr/`.
2. If the repo already has a stronger planning or spec convention, preserve it and record how the skills should map to it in `docs/agents/spec-workflow.md`.
3. Pick the agent instruction file:
   - If `CLAUDE.md` exists, update it.
   - Else if `AGENTS.md` exists, update it.
   - Else ask the user whether to create `AGENTS.md` or `CLAUDE.md`.
4. Create or update `docs/agents/spec-workflow.md` from [references/spec-workflow.md](references/spec-workflow.md).
5. Ensure `docs/specs/INDEX.md` exists.
6. Add an agent-instructions block that points future agents at `docs/agents/spec-workflow.md`, `external/skill-sources.json`, and the software workflow skill chain.

## Scripted Setup

After confirming the target instruction file, run from the target repo root:

```bash
node <path-to-this-skill>/scripts/setup-agent-workflow.mjs \
  --root . \
  --agent-file AGENTS.md
```

Use `--force` only when the user wants to replace an existing `docs/agents/spec-workflow.md` with this catalog's default.

## Guardrails

- Do not silently overwrite an existing project convention. Record mappings instead.
- Do not create both `AGENTS.md` and `CLAUDE.md`.
- Do not mark setup complete until `docs/agents/spec-workflow.md` and `docs/specs/INDEX.md` exist.
- Keep setup focused on workflow conventions. Actual feature requirements belong in `docs/specs/<spec-id>/REQUIREMENTS.md`.
