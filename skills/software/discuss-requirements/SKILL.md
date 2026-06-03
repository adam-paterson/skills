---
name: discuss-requirements
description: Use when extracting real software requirements through a rigorous discussion that explores repo truth first, challenges domain language against CONTEXT.md, updates glossary and ADR docs inline, writes REQUIREMENTS.md in a git-tracked spec package, and gates readiness before spec-generation, BDD, Gherkin, TDD, property, or mutation testing.
---

# Discuss Requirements

Use this skill to turn fuzzy product or engineering intent into durable, repo-tracked requirements and project language. This skill includes the full `grill-with-docs` style behavior: interrogate the plan, challenge terminology against project docs, cross-check claims against code, update `CONTEXT.md` as language crystallizes, and suggest ADRs only for serious architectural decisions.

## Workflow

1. Explore before asking. Read relevant code, tests, docs, `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`, `docs/agents/spec-workflow.md`, and existing `docs/specs/`.
2. If no spec package exists for the topic, initialize one with `scripts/init-requirements-session.mjs`.
3. Read [references/requirements-workflow.md](references/requirements-workflow.md) for the requirements package contract.
4. Read [references/language-workflow.md](references/language-workflow.md) for glossary, context, and ADR rules.
5. Interview the user one decision at a time. Each question must explain why it matters, offer a recommended answer, and state what changes if the answer differs.
6. Prefer concrete scenario probes over vague questions. Stress states, actors, permissions, invalid input, integrations, failure modes, and edge cases.
7. When a question can be answered from repo truth, answer it by inspecting the repo instead of asking.
8. When a term is resolved, update the right document immediately:
   - Durable domain language goes in `CONTEXT.md` or the relevant mapped context.
   - Spec-local wording goes in `REQUIREMENTS.md`.
   - Serious architectural decisions are proposed as ADRs only when justified.
9. Maintain `REQUIREMENTS.md` as a ledger of requirements, terms, scenarios, open questions, non-requirements, and traceability.
10. End with a readiness report: language conflicts, requirement count, acceptance mapping, blocking questions, ADR needs, and whether the package is ready for `spec-generation`.

## Initialization

From the target repo root, run:

```bash
node <path-to-this-skill>/scripts/init-requirements-session.mjs \
  --root . \
  --title "Add billing events"
```

The script creates `docs/agents/spec-workflow.md` when missing and a full package under `docs/specs/<spec-id>/` with `REQUIREMENTS.md` as the primary file.

## Guardrails

- Do not ask broad catch-all questions like "anything else?" until the structured probes are exhausted.
- Do not batch resolved terminology until the end. Update docs as language is settled.
- Do not put implementation details in `CONTEXT.md`; it is for project language, not design notes.
- Do not create ADRs for easy-to-reverse, obvious, or no-trade-off decisions.
- Do not mark requirements ready while blocking questions remain hidden or unmapped.
- Do not overwrite existing package files without reading and preserving user changes.

## Output Shape

When handing back progress, include:

- Spec package path.
- Requirements added or changed.
- Terms added, changed, or challenged.
- ADRs created or proposed.
- Open questions still blocking readiness.
- Recommended next skill, usually `spec-generation` when requirements are ready.
