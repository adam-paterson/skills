---
name: skill-distillation
description: Use when creating, updating, or auditing an agent skill from source materials, expert traces, user corrections, prior outputs, or repeated failure patterns: distill bounded capability rules, behavior constraints, evidence limits, correction records, and validation prompts before editing skill artifacts.
---

# Skill Distillation

Use this skill before or alongside skill creation when a skill should be derived from evidence rather than generic best practice. The target is an inspectable skill artifact that improves other skills through bounded procedures, explicit source limits, and correctable behavior.

## Operating Model

- Distill selected traces into reusable skill instructions, not a hidden memory or a simulation of a person.
- Default to capability-only output. Add behavior constraints only when the user's request, domain, or repeated output failures show they are useful.
- Keep source boundaries, evidence gaps, and corrections visible in files the user can inspect.
- Make updates rollback-safe by checking the current worktree first and keeping edits scoped to the target skill and catalog indexes.

## Workflow

1. Scope the target. Identify the skill to create, update, or audit; the user-visible job it should improve; host/runtime constraints; source materials; and any privacy, consent, or publication limits.
2. Build a source inventory. List the files, URLs, traces, examples, corrections, or failure cases used; note excluded materials; and mark evidence quality as direct, inferred, thin, or contested.
3. Extract the capability track. Pull out durable workflows, heuristics, decision thresholds, checklists, examples, anti-patterns, tool choices, validation gates, and known failure modes.
4. Extract a bounded behavior track only when needed. Capture communication posture, pushback rules, question habits, output shape, and correction preferences as constraints. Do not write identity claims, unrestricted persona instructions, or claims that the skill represents a real person.
5. Separate facts from inferences. Convert direct evidence into rules, mark inferred patterns plainly, and downgrade or omit material when evidence is thin.
6. Design the artifact with progressive disclosure. Keep `SKILL.md` focused on triggers, workflow, guardrails, and output checks; move detailed source-specific guidance to one-level-deep `references/`; use `scripts/` for deterministic repeated operations; use `assets/` only for reusable output material.
7. Apply corrections deliberately. Classify feedback as capability, behavior, source-boundary, or validation feedback; patch the matching section; preserve prior behavior through git history; and mention behavior-changing corrections in the final handoff.
8. Validate with variants. Test capability-only prompts, behavior-constrained prompts when applicable, boundary prompts, and regression prompts from prior failures. Check that private or sensitive source content is not leaked into ordinary output.
9. Report the result. Summarize source scope, durable rules added, behavior constraints added or intentionally omitted, evidence gaps, validation performed, and the next correction path.

## Existing Skill Audit

When improving an existing skill, read its `SKILL.md`, `agents/openai.yaml`, linked references, scripts, and current catalog entries before editing. Look for:

- Trigger drift: the frontmatter description no longer matches when the skill should be used.
- Conflation: facts, procedures, style preferences, and project-specific assumptions are mixed together.
- Hidden evidence: rules appear without source scope, examples, or a visible reason.
- Excess context: details that belong in references, scripts, or assets are embedded in `SKILL.md`.
- Missing correction path: prior user feedback changed expectations but is not represented as durable guidance.
- Weak validation: the skill has no realistic prompt, failure-case, or boundary check.

## Guardrails

- Do not invent source evidence or present inferred patterns as facts.
- Do not add persona or tone transfer when capability rules solve the problem.
- Do not publish private, copyrighted, or sensitive source material inside a reusable skill.
- Do not use skill updates as a substitute for consent, access control, redaction, or legal review.
- Do not bloat every downstream skill with this entire workflow; use it as a distillation pass and keep the target skill lean.

## References

Add detailed reference material under `references/` only when it is needed to preserve source-specific guidance without bloating `SKILL.md`.
