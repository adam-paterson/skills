---
name: retro
description: "Conduct a retrospective on a coding session."
disable-model-invocation: true
---

Review a coding session and suggest changes to the agent's environment that would help future sessions. Recommend changes rather than implementing them.

## Steps

1. Read `writing-for-agents` for guidance on agent instructions and documentation.
2. Read the primary sources for the session the user specifies. Search session logs if needed. Default to the current session when none is specified. Distinguish what the sources show from what remains unknown.
3. Look for environment changes that address problems shown in the session. Use the categories below to guide the review, not as a quota of findings. Recommend changes that would help similar work, rather than adding rules for the details of one task.
4. Present a Changes section with supported recommendations in severity order. Distinguish project changes from process changes that could apply across projects and sessions. For each, cite the evidence, explain the problem, and name the smallest change and where it belongs. Label uncertain benefits as hypotheses to test. If the evidence supports no changes, say so.

## Review categories

- Navigation. Where did the agent struggle to find information? Check whether a pointer to existing docs would help before proposing new docs.
- Automated checks. Which mistakes could a test, type check, linter, or other automated check catch? Check for existing checks that were skipped or not enforced before proposing new ones.
- Coding standards. What did review miss? Consider whether reviewer guidance needs a rule added, clarified, or removed.
- Steering files. Which instructions in project or global `AGENTS.md` belong in review guidance, reference docs, or automated checks? Keep always-loaded instructions short.
- Tool economy. Which calls produced excessive output or repeated work? Suggest a narrower call or existing tool before proposing custom tooling.
- Session workflow. Which problems come from how the coding environment manages tools, context, permissions, handoffs, or completion? Consider plugins, extensions, hooks, or changes to an open-source coding environment that could improve the process across projects. A project-specific symptom may reveal a process problem; explain that connection rather than assuming it recurs everywhere.
- No-ops. For each steering instruction under review, ask what the agent would do differently without it. Flag instructions with no identifiable effect as removal candidates. Check repeated rules separately. When the effect is uncertain, compare behavior with and without the instruction before treating it as unnecessary.
- Information access. What missing information blocked progress? Consider logs, documentation, or approved read-only access. Preserve access controls and keep sensitive data out of agent context unless the task requires it.

## Cross-session changes

When the user controls their coding environment, consider changes to its behavior alongside changes to instructions. Look for work the environment could handle consistently instead of making each agent remember or repeat it. These changes should work across projects, while reading project-specific policy or configuration where needed.

Check the environment's existing features and extension points before recommending a new plugin or extension. Prefer configuration or an existing capability when it solves the problem. If the environment is unknown, describe the required capability and identify what needs checking rather than inventing an API.

For each proposed process change, describe when it runs, what it does, and how the user could verify its benefit in future sessions. State any permission, privacy, or user-control requirements. Recommend building an extension when the evidence supports it, but leave implementation for the user's approval.

## Where changes belong

Implementation agents spend context on exploration, coding, and debugging. Reviewers can focus on the diff and relevant standards, though they may still need to inspect surrounding code. Put review policy in reviewer guidance rather than repeating it in implementation instructions.

- `CLAUDE.md` and `AGENTS.md` load into every session. Use them sparingly, mainly for short pointers that say when to read another file. Keep implementation details in the referenced docs.
- `CODING_STANDARDS.md` holds review rules. Check that reviewer instructions point to it. If it grows beyond 1,000 lines, move detailed guidance into docs and link to it.
- Reference docs hold information needed for particular tasks. Check existing docs before adding another file.
- Skills hold reusable workflows or references. Follow `writing-for-agents` when deciding whether a skill should be discovered by the agent or invoked by the user.
- Plugins, extensions, and hooks change how the coding environment runs sessions. Use them for reusable process behavior rather than embedding one project's rules. Consider a change to the environment itself when the user can modify it and its extension points cannot support the behavior.
