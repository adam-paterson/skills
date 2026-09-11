---
name: retro
description: "Conduct a retrospective on a coding session."
disable-model-invocation: true
---

Review a coding session and recommend changes to the agent's environment that would help future sessions. Leave implementation for the user's approval.

## Steps

1. Read `writing-for-agents` for guidance on agent instructions and documentation.
2. Read the primary sources for the requested session. Search session logs if needed. Use the current session if the user names none. Separate what the sources show from what remains unknown.
3. Use the review categories below to find changes that address observed problems. A category need not produce a finding. Look for changes that would help similar work without adding rules for the details of one task.
4. Write the report using the structure below. Check that it covers both project changes and cross-session process changes.

## Report structure

Include these headings in every report, even when the evidence supports no changes:

```markdown
## Changes
### Project changes
### Cross-session process changes
```

List recommendations by severity within each subsection. For each recommendation, cite the session evidence and explain the problem. Name the smallest change and where it belongs.

Put repository-specific rules in Project changes. Put reusable workflow changes in Cross-session process changes. These may include plugins, extensions, hooks, or changes to the coding environment itself.

If a subsection has no supported recommendations, write "No changes supported by this session" and explain why. This tells the reader that you considered it. When a benefit is uncertain, state what needs testing. Do not invent recommendations to fill a subsection.

## Review categories

- Navigation. Where did the agent struggle to find information? Check whether a pointer to existing docs would help before proposing new docs.
- Automated checks. Which mistakes could a test, type check, linter, or other check catch? Check whether the agent skipped an existing check or the workflow failed to enforce it before proposing another.
- Coding standards. What did review miss? Consider whether to add, clarify, or remove a rule in reviewer guidance.
- Steering files. Which instructions in project or global `AGENTS.md` belong in review guidance, reference docs, or automated checks? Keep instructions loaded into every session short.
- Tool economy. Which calls produced excessive output or repeated work? Check whether a narrower call or existing tool would solve the problem before proposing custom tooling.
- Session workflow. Which problems come from how the coding environment manages tools, context, permissions, handoffs, or completion? Use the cross-session guidance below to assess changes to the environment. Explain how the observed problem could affect other projects. Do not assume it occurs everywhere.
- No-ops. For each steering instruction under review, ask what the agent would do differently without it. If you cannot identify an effect, flag the instruction as a removal candidate. Check repeated rules separately. If the effect is uncertain, compare behavior with and without the instruction before deciding it is unnecessary.
- Information access. What missing information blocked progress? Consider logs, documentation, or approved read-only access. Preserve access controls. Keep sensitive data out of agent context unless the task requires it.

## Cross-session changes

When the user controls their coding environment, look for work it could handle consistently instead of making each agent remember or repeat it. Propose changes that work across projects and read project-specific policy or configuration when needed.

Check existing features and extension points first. Use configuration or an existing feature when it solves the problem. If the environment is unknown, describe the behavior needed and what to check. Do not invent an API.

For each proposed process change, describe when it runs and what it does. Explain how the user could test its benefit in future sessions. State any permission, privacy, or user-control requirements.

## Where changes belong

Implementation agents need context for exploration, coding, and debugging. Reviewers focus on the diff and relevant standards, though they may need surrounding code. Put review policy in reviewer guidance to avoid repeating it in implementation instructions.

- `CLAUDE.md` and `AGENTS.md` load into every session. Use them mainly for short pointers that say when to read another file. Keep implementation details in the referenced docs.
- `CODING_STANDARDS.md` holds review rules. Check that reviewer instructions point to it. If it grows beyond 1,000 lines, move detailed guidance into docs and link to it.
- Reference docs hold information needed for particular tasks. Check existing docs before adding another file.
- Skills hold reusable workflows or references. Follow `writing-for-agents` when choosing whether the agent or the user should invoke a skill.
- Plugins, extensions, and hooks control how the coding environment runs sessions. Use them for reusable process behavior and keep project rules in project configuration. If the extension points cannot support the behavior and the user can modify the environment, consider a change to the environment itself.
