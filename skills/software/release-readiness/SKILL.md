---
name: release-readiness
description: Use after verify-spec to decide whether a verified enterprise spec package is safe to ship or hand off: update RELEASE.md with changelog need, docs, rollout, rollback, observability, review notes, and move WORKFLOW.md to release-ready only when those checks are complete.
---

# Release Readiness

Decide whether a verified package can be shipped, reviewed, or handed off safely. Verification proves behavior; release readiness proves operational and review safety.

## Workflow

1. Locate the target `docs/specs/<spec-id>/` package. Read `WORKFLOW.md`, `SPEC.md`, `ACCEPTANCE.md`, `VERIFY.md`, `EVIDENCE.md`, `RELEASE.md`, and `docs/agents/spec-workflow.md`.
2. Confirm package lifecycle is `verified`. If not, route to `verify-spec`.
3. Fill `RELEASE.md`:
   - user-facing change
   - changelog need and entry draft or reason not needed
   - documentation updates
   - migration or rollout plan
   - feature flags or config
   - observability and how it was checked
   - rollback path
   - review notes: summary, risk areas, how to review, evidence, follow-ups
4. If a changelog entry is needed, route to or use the standalone `changelog` skill. Do not duplicate the changelog format rules here.
5. Update `WORKFLOW.md`:
   - `release-readiness` -> `complete` when release checks are complete.
   - `package_lifecycle` -> `release-ready`.
   - If blocked, record the blocker and keep lifecycle at `verified`.

## Guardrails

- Do not treat verified behavior as release-ready by default.
- Do not invent rollout, rollback, or observability proof.
- Do not force a changelog entry for invisible internal work; record why it is not needed.
- Do not perform release mechanics such as tagging, version bumps, or publishing.

## Output Shape

When handing back progress, include:

- Spec package path.
- Release readiness decision.
- Changelog decision.
- Rollout or rollback notes.
- Observability and docs gaps.
- Review notes.
