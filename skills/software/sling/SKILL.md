---
name: sling
description: Hand off current work to a new agent session and verify receipt.
disable-model-invocation: true
---

Transfer the current work to a new agent session. Give it enough context to continue without rereading this conversation.

## Choose a destination

Apply preferences in this order: invocation arguments, repository instructions, user instructions.

Inspect the environment and active skill registry for agent runtime or terminal multiplexer integrations. Use the highest-level relevant integration. Follow its skill to detect availability and transfer the handoff.

If no suitable integration is active, create the handoff document, report that no transfer was attempted, and stop. Never reuse or interrupt an existing agent session.

Choose an agent runtime and model as follows:

1. Prefer verified subscription capacity over metered API usage.
2. Follow the configured runtime and model priority.
3. Classify the work as routine, implementation, or high-reasoning.
4. Choose the lowest-cost available model capable of the work.

Do not guess prices, quotas, subscriptions, or capabilities. If evidence is insufficient, keep the current runtime and model. Report that cost-aware routing was unavailable.

Ask one concise question if destinations are tied or the choice is unclear. Ask before metered spending, terminal layout changes, or any other consequential action the invocation has not authorized.

## Prepare the handoff

Write one descriptively named Markdown file in the operating system's temporary directory unless the user requests another location. Keep the file after delivery.

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

Use invocation arguments to set the next session's focus. Reference existing artifacts rather than copying them. Redact secrets and unnecessary personal information.

Before delivery, check the destination directory, access to referenced artifacts, and required capabilities. Include essential content in the handoff if the destination cannot access local paths.

## Transfer and verify

Use the selected integration skill to create the new session and deliver the handoff. Follow its safety and confirmation rules.

Ask the new session to acknowledge its objective, first action, and any immediate blocker. The transfer is complete only when you observe that acknowledgement.

If you cannot observe it, report "delivered but unverified" and preserve the handoff file.
