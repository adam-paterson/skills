# Handoff: sling refactor

**Destination:** Local review

Two destinations were equally available. I chose local review so the refactor can be checked before implementation work moves to another ticket.

## Current state

- `skills/software/agent-handoff/SKILL.md` is deleted.
- `skills/software/agent-handoff/agents/openai.yaml` is deleted.
- `skills/software/sling/SKILL.md` is new and untracked (54 lines).
- `skills/software/sling/agents/openai.yaml` is new and untracked (4 lines).
- The branch is `add-stakeholder-translation-skill`, one commit ahead of and one behind its upstream.
- No files are staged.

## Review request

Confirm that the move from `agent-handoff` to `sling` preserves the intended behavior, that metadata and references use the new name/path, and that the deletion/addition should be recorded as the intended refactor. Run the repository's relevant validation before staging or committing.

## Delivery

No question was needed. This handoff contains no secrets. Receipt by the local reviewer is unverified.
