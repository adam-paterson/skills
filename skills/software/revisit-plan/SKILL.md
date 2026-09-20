---
name: revisit-plan
description: Resolve a specific question in an existing plan, or revise its priorities, dependencies, and scope.
disable-model-invocation: true
---

# Revisit a plan

Use `/revisit-plan <plan> <request>` to investigate one question without waiting for its usual place in the plan, or to revise the plan itself. Ask for the plan's issue link or file path if it is missing.

Work on one request per session. This is planning work by default. Implement only when the plan or user explicitly includes implementation.

## Read the plan

Read its goal, working notes, recorded decisions, and tracker conventions. Use the existing tracker or Markdown files. If the storage or update rules are unclear, ask before creating records.

A plan has a goal, linked tickets, decisions, unresolved questions, and scope exclusions. Each ticket records a question, its type, dependencies, and owner. An assigned ticket is claimed by another worker unless this session's ownership is established.

Existing Wayfinder plans use these section names. Keep them when updating those plans:

| Section | Meaning |
| --- | --- |
| Destination | The goal and completion criteria. |
| Notes | Working instructions and relevant skills. |
| Decisions so far | Short summaries linked to resolved tickets. |
| Not yet specified | In-scope questions that are not precise enough for tickets. |
| Out of scope | Excluded work and the reason for excluding it. |

If tracker documentation has a `Wayfinding operations` section, follow it for child tickets, claims, dependencies, and ordering. Retain existing `wayfinder:<type>` labels where that convention applies.

Choose the workflow from the request:

- A specific question, such as "Can we use SQLite for the queue?", uses **Resolve a question**.
- A change to priorities or scope, such as "Which tickets should we defer?", uses **Revise the plan**.

If the request needs both, ask which to handle first.

## Resolve a question
Follow the workflow as detailed in [resolve-a-question.md](./references/resolve-a-question.md)

## Revise the plan
Follow the workflow as detailed in [revise-the-plan](./references/revise-the-plan.md)

