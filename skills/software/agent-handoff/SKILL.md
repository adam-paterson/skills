---
name: agent-handoff
description: Select, prepare, execute, and verify a context-preserving transfer to a new agent session.
argument-hint: "[Where should the work continue, and what should the next session focus on?]"
disable-model-invocation: true
---

Transfer the current work to a **new** agent session without requiring it to reread this conversation.

## Route

Apply preferences in this order: invocation arguments, repository instructions, user instructions. Inspect the environment and active skill registry for harness or multiplexer integrations. Use the highest-level relevant integration and follow its skill for detection and transport mechanics.

If no suitable integration is active, create the handoff document, report that no transfer was attempted, and stop. Never reuse or interrupt an existing agent session.

Choose a harness and model as follows:

1. Prefer verified subscription capacity over metered API usage.
2. Apply the configured harness and model priority.
3. Classify the work as routine, implementation, or high-reasoning.
4. Choose the lowest-cost available model capable of the work.

Do not guess prices, quotas, subscriptions, or capabilities. Without sufficient evidence, keep the current harness and model and report that cost-aware routing was unavailable.

Ask one concise question for tied or ambiguous destinations. Ask before metered spending, changing terminal layout, or another consequential action not authorized by the invocation.

## Handoff

Write one descriptive Markdown file to the operating system's temporary directory unless the user requests another location. Keep it after delivery.

```md
# Handoff: <short title>
## Objective
## Current status
## Decisions
## Constraints
## Evidence and references
## Blockers
## Next steps
## Suggested skills
```

Treat invocation arguments as the next session's focus. Reference existing artifacts instead of duplicating them. Redact secrets and unnecessary personal information.

Before delivery, verify the destination directory, access to referenced artifacts, and required capabilities. Include essential content when local paths will be inaccessible.

## Transfer

Use the selected integration skill to create the destination and deliver the handoff. Follow its safety and confirmation rules.

Ask the destination to acknowledge its understood objective, first action, and any immediate blocker. Completion requires that acknowledgement. If it cannot be observed, report **delivered but unverified** and preserve the handoff file.
