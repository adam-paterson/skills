# Handoff: Review the sling skill refactor
## Objective
Perform a local review of the current refactor from `agent-handoff` to `sling`, focusing on behavioral regressions, instruction clarity, and metadata consistency. Do not implement a next ticket.

## Current status
The working tree deletes `skills/software/agent-handoff/` and adds the untracked replacement `skills/software/sling/`. The new skill keeps the original routing, handoff-document, and receipt-verification behavior with revised wording and section names.

No suitable active handoff integration was available, so no new session was created and no transfer was attempted. Receipt is unverified. Cost-aware routing was unavailable because subscription, quota, and model-capability evidence was insufficient.

## Decisions
- Destination: local review, selected after asking the required tie-break question.
- Review the existing work only; preserve its current scope.
- Keep the handoff artifact at this user-requested path.

## Constraints
- Follow `skills/software/sling/SKILL.md` strictly.
- Never reuse or interrupt an existing agent session.
- Do not expose secrets or unnecessary personal information.
- The reviewer needs local filesystem access and Git read access; both the source and requested destination were checked locally.

## Evidence and references
- New skill: `skills/software/sling/SKILL.md`
- New agent metadata: `skills/software/sling/agents/openai.yaml`
- Previous tracked skill: `git show HEAD:skills/software/agent-handoff/SKILL.md`
- Previous tracked metadata: `git show HEAD:skills/software/agent-handoff/agents/openai.yaml`
- `git status --short` currently identifies the old directory as deleted and the new `sling` directory as untracked, alongside unrelated `.worktrees/` state.

## Blockers
- No suitable active agent-runtime or terminal-multiplexer integration was available for creating and verifying a receiving session.
- The handoff is therefore prepared but not delivered; receipt remains unverified.

## Next steps
1. Compare the old tracked files with the new `sling` files.
2. Check frontmatter and `agents/openai.yaml` for naming or invocation inconsistencies.
3. Verify the rewritten instructions preserve routing precedence, safety prompts, artifact retention, and acknowledgement requirements.
4. Report findings by severity with file and line references; explicitly report if no blockers are found.

## Suggested skills
- `sling` for any later transfer after review.
