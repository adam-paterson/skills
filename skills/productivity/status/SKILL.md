---
name: status
description: Show the current task's progress as a compact terminal status board.
argument-hint: "[]"
---

Build a read-only snapshot of the current task from the conversation and available evidence. The task may be software work, a general task list, or a discussion.

## Assemble the snapshot

1. Identify the current objective from the latest active thread.
2. Reconcile claims against available evidence. For software work, inspect relevant task state, changed files, and existing check results when they are readily available. Keep inspection lightweight; this command reports work rather than continuing it.
3. Classify each material item:
   - **Done** — completed with supporting evidence.
   - **Now** — started but incomplete, including work awaiting verification.
   - **Next** — the immediate unstarted actions, in dependency order.
   - **Blockers** — anything preventing progress, including a decision the user must make.
4. Preserve explicit task links:
   - **Parent/child** is containment. Nest children beneath their parent.
   - **Blocks/blocked by** is dependency. Annotate the blocked task; do not nest it beneath its blocker.
   - Show each task once. Do not infer that a blocked parent also blocks every child.
5. State uncertainty instead of filling gaps. If no active task is visible, show that as the state and ask for task context in **Next**.

## Render the board

Return only one fenced `text` block. Keep it scannable in a terminal: short lines, no tables, and roughly 80 columns or fewer. Omit empty optional lines and keep each section to material items.

For flat work, use this shape:

```text
╭─ STATUS · <short task title>
│ State: <DONE | ON TRACK | BLOCKED | NEEDS DECISION | NO ACTIVE TASK>
│ Progress: <completed>/<total> (<percent>%)
├─ Done
│ ✓ <completed outcome>
├─ Now
│ ● <current work>
├─ Next
│ ○ <immediate next action>
├─ Blockers
│ ! <blocker or "None known">
├─ Evidence
│ • <decisive file, command result, decision, or observed fact>
╰─
```

When tasks have links, replace **Done** and **Now** with a single hierarchy. Keep dependency labels on the affected task:

```text
╭─ STATUS · <short task title>
│ State: BLOCKED
│ Progress: <completed>/<total> (<percent>%)
├─ Tasks
│ ● X · NOW
│ ⛔ Y · BLOCKED BY X
│   └─ ○ Z · NOT STARTED
├─ Next
│ ○ Complete X to unblock Y
├─ Blockers
│ ! X blocks Y
├─ Evidence
│ • <decisive fact>
╰─
```

Show `Progress` only when the source has a finite task list with a defensible denominator. Include **Evidence** when it materially supports the status, especially for software work; report missing checks as not run. Use `— None` when a required section would otherwise be empty so terminal state remains explicit.
