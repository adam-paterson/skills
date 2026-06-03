# Language Workflow

Use this reference when updating project language and architectural decision records.

## Context Files

Most repos have one context:

```text
CONTEXT.md
docs/adr/
```

Multi-context repos use:

```text
CONTEXT-MAP.md
<context>/CONTEXT.md
<context>/docs/adr/
```

If `CONTEXT-MAP.md` exists, read it first and update the relevant context. If no context file exists, create one only when a durable term is actually resolved.

## CONTEXT.md Rules

`CONTEXT.md` is a glossary, not a spec and not an implementation plan.

Add a term only when it is:

- Specific to this project or domain.
- Reused beyond one local sentence.
- Important for naming code, tests, docs, or user-facing behavior.
- Likely to be confused with another term.

Use this format:

```markdown
# <Context Name>

One or two sentences about the context.

## Language

**Canonical Term**:
One or two sentences defining the concept.
_Avoid_: Ambiguous Term, Old Term
```

Keep definitions tight. Define what the term is, not every behavior involving it.

## Challenge Language

When user language conflicts with `CONTEXT.md`, stop and resolve it:

- State the existing definition.
- State the apparent new meaning.
- Ask which meaning should win.
- Update `CONTEXT.md` if the canonical language changes.

When a word is fuzzy or overloaded, propose a canonical term and alternatives to avoid.

## Scenario Probes

Use concrete scenarios to force clarity:

- actor already has state X and tries action Y
- two actors race to perform action Y
- the integration returns partial failure
- required data is missing
- permissions differ by role
- a previous request is retried
- a migration contains old and new records

## ADR Rules

Create or suggest an ADR only when all are true:

- Hard to reverse.
- Surprising without context.
- Result of a real trade-off.

Use `DECISIONS.md` for smaller local decisions. Use `docs/adr/0001-short-title.md`, `0002-short-title.md`, and so on for real ADRs.

ADR format:

```markdown
# Short decision title

One to three sentences: context, decision, and why.
```

Optional sections such as status, options, or consequences are allowed only when they add real value.
