# Release Readiness

Use this file after verification to decide whether the change is safe to ship or hand off.

## User-Facing Change

Adds a `changelog` software skill that helps agents create and maintain Keep a Changelog 1.1.0 changelogs.

## Changelog

- Needed: no
- Entry:
- Skill used: changelog
- Reason if not needed: This repository's own changelog policy is not yet part of this spec; the change is catalog content.

## Documentation

| Document | Update Needed | Status |
| --- | --- | --- |
| README.md | yes | pending |

## Migration Or Rollout

| Item | Plan | Rollback |
| --- | --- | --- |
| Catalog publication | Regenerate `skills.sh.json` and well-known output. | Remove the skill and rebuild generated catalog artifacts. |

## Feature Flags Or Config

| Flag Or Config | Default | Rollout Notes |
| --- | --- | --- |

## Observability

| Signal | Purpose | How Checked |
| --- | --- | --- |
| Catalog validation | Confirms skill shape and references. | `npm run validate` |

## Review Notes

- Summary: Adds a changelog skill with reference and template assets.
- Risk areas: Keep a Changelog rules may drift if the upstream spec changes beyond 1.1.0.
- How to review: Read `SKILL.md`, reference, and template; run validation and build.
- Evidence: Pending.
- Follow-ups: Finish acceptance and verification mapping.

## Release Decision

- Verified in [Verification](./VERIFY.md): no
- Release-ready: no
- Blockers: acceptance criteria and evidence are incomplete.
