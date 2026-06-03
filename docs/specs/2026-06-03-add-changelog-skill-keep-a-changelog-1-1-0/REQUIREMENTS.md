---
spec_id: 2026-06-03-add-changelog-skill-keep-a-changelog-1-1-0
status: draft
created: 2026-06-03
updated: 2026-06-03
---

# Requirements: Add changelog skill (Keep a Changelog 1.1.0)

## Source Request

> "We need a changelog skill which follows https://keepachangelog.com/en/1.1.0/"

Deliver a new Agent Skill (a `SKILL.md` + `agents/openai.yaml` under `skills/<domain>/<skill-name>/`) that guides an agent to create and maintain a project `CHANGELOG.md` according to Keep a Changelog 1.1.0. The skill is catalog content in this repo, not a CHANGELOG for this repo itself.

## Requirement Summary

A new Agent Skill that guides an agent to create and maintain a project `CHANGELOG.md` conforming to Keep a Changelog 1.1.0. Scope is changelog authoring and maintenance only; release mechanics (git tags, version bumps, publishing) are out of scope.

## Actors

- **Agent**: executes the skill to create or update a changelog.
- **Maintainer**: the human whose project owns the `CHANGELOG.md` and consumes its entries.

## Canonical Language

| Term | Meaning | Source | Status |
| --- | --- | --- | --- |
| Skill | A catalog entry at `skills/<domain>/<skill-name>/` with `SKILL.md` (YAML `name`/`description` frontmatter) plus `agents/openai.yaml`. | code (validate-skills.mjs) | accepted |
| Changelog | A single `CHANGELOG.md` of all notable, human-readable changes, newest first, per Keep a Changelog 1.1.0. | keepachangelog.com | accepted |
| Unreleased | The top section holding changes not yet in a tagged release. | keepachangelog.com | accepted |
| Change Group | One of the fixed sections under a version: Added, Changed, Deprecated, Removed, Fixed, Security — shown in that order, only when non-empty. | keepachangelog.com | accepted |
| Yanked Release | A pulled release, marked `## [x.y.z] - YYYY-MM-DD [YANKED]`. | keepachangelog.com | accepted |

## Requirements

### R1: Changelog authoring and maintenance only

- Actor: Agent
- Trigger: User asks to start, update, or maintain a changelog following Keep a Changelog 1.1.0.
- Outcome: The skill creates or edits `CHANGELOG.md` content; it never tags releases, bumps package versions, or publishes.
- Business rule: The skill may *recommend* a SemVer bump from pending entries and *consume* a version the user supplies, but performing the release is out of scope.
- Edge cases: Project has no version source; user asks the skill to "release" — skill explains the boundary and stops at changelog edits.
- Failure behavior: If asked to perform release mechanics, decline and point to the changelog-only scope.
- Related terms: Changelog, Unreleased
- Maps to acceptance criteria: TBD

### R2: Skill lives at skills/software/changelog

- Actor: Agent (author of the skill in this repo)
- Trigger: Implementing this requirement package.
- Outcome: A skill exists at `skills/software/changelog/SKILL.md` with `name: changelog` frontmatter and `agents/openai.yaml`, passing `npm run validate`.
- Business rule: Domain must be `software` (an allowed domain); skill name must match the kebab-case `skillNamePattern`.
- Edge cases: Name collision with an existing skill (none today named `changelog`).
- Failure behavior: `validate-skills.mjs` fails the build if path, domain, name, or frontmatter is wrong.
- Related terms: Skill
- Maps to acceptance criteria: TBD

### R3: Enforce Keep a Changelog 1.1.0 structure (strict, auto-correct)

- Actor: Agent
- Trigger: Creating or editing a `CHANGELOG.md`.
- Outcome: The changelog conforms to KaC 1.1.0; the skill normalizes deviations and explains each correction.
- Business rule:
  - File header includes the "All notable changes" line plus KaC 1.1.0 and SemVer notices.
  - `[Unreleased]` section sits at the top.
  - Versions appear newest-first as `## [x.y.z] - YYYY-MM-DD` (ISO dates required).
  - Change groups are exactly Added, Changed, Deprecated, Removed, Fixed, Security, in that order, and only rendered when non-empty.
  - Pulled releases are marked `[YANKED]`.
  - Entries are human-readable and grouped; raw git-log dumps are rejected.
- Edge cases: Wrong/extra group names, unsorted versions, non-ISO dates, missing `[Unreleased]`, empty groups, duplicate versions.
- Failure behavior: When a deviation cannot be safely auto-corrected (e.g. ambiguous date, unknown custom section), the skill flags it and asks rather than guessing.
- Related terms: Changelog, Unreleased, Change Group, Yanked Release
- Maps to acceptance criteria: TBD

### R4: Entries are curated, not copied from git

- Actor: Agent
- Trigger: Drafting or adding changelog entries.
- Outcome: Each entry is a human-readable, user-facing sentence placed under the correct change group.
- Business rule:
  - The skill may read git history, diffs, and PRs as raw material for drafting candidate entries.
  - It must translate them into plain-language, user-facing descriptions — never paste commit subjects, hashes, or git-log output verbatim.
  - Non-notable changes (pure formatting, no-user-impact internal refactors) are excluded.
- Edge cases: Commit-only context with no obvious user impact; many trivial commits; a single commit spanning several notable changes.
- Failure behavior: If the user-facing meaning of a change is unclear from context, the skill asks rather than copying the commit text.
- Related terms: Changelog, Change Group
- Maps to acceptance criteria: TBD

### R5: Promote Unreleased into a dated release section

- Actor: Agent
- Trigger: User asks to release version `x.y.z` (changelog-side only).
- Outcome: The curated `[Unreleased]` content becomes a dated, versioned section and a fresh empty `[Unreleased]` is created.
- Business rule:
  - Rename `## [Unreleased]` → `## [x.y.z] - YYYY-MM-DD`, using today's date or a date the user supplies; keep the curated groups in canonical order.
  - Insert a new empty `## [Unreleased]` at the top.
  - Maintain the bottom comparison links (`[Unreleased]` → `x.y.z...HEAD`, add `[x.y.z]` → `prev...x.y.z`) when a comparable remote/link base exists; tolerate projects that omit links.
  - Recommend (advisory only) a SemVer level from the pending groups: `Removed`/breaking `Changed` → major, `Added`/`Deprecated` → minor, only `Fixed`/`Security` → patch. A user-supplied version always wins.
- Edge cases: Empty `[Unreleased]` at release time; no prior version; no remote/compare base for links; user-supplied date or version overriding recommendation; yanked release needing `[YANKED]`.
- Failure behavior: If `[Unreleased]` has no entries, the skill warns rather than cutting an empty release. If no link base exists, it skips links and notes why.
- Related terms: Unreleased, Change Group, Yanked Release
- Maps to acceptance criteria: TBD

### R6: Ship bundled reference and template

- Actor: Agent (author of the skill)
- Trigger: Implementing the skill.
- Outcome: The skill bundles a condensed rules reference and a starter template; `SKILL.md` stays a lean workflow + guardrails doc.
- Business rule:
  - `skills/software/changelog/references/keep-a-changelog-1.1.0.md` holds the condensed canonical rules (groups, order, date format, `[YANKED]`, links).
  - `skills/software/changelog/assets/CHANGELOG.template.md` holds the empty starter (header, KaC + SemVer notices, `[Unreleased]`).
  - `SKILL.md` references these via relative paths and does not duplicate their full content.
- Edge cases: Reference and spec drift over time (pin to 1.1.0).
- Failure behavior: Validator (`validate-skills.mjs`) still passes; bundled files live under the skill directory.
- Related terms: Skill, Changelog
- Maps to acceptance criteria: TBD

## Scenarios To Probe

- No `CHANGELOG.md` exists yet → create with header, notices, and empty `[Unreleased]`.
- Existing changelog with non-canonical group names or unsorted versions → normalize and explain.
- Release requested while `[Unreleased]` is empty → warn, do not cut.
- Project has no git remote / compare base → skip comparison links, note why.
- Pulled release → mark `[YANKED]`.
- Only `Fixed`/`Security` pending → recommend patch bump (advisory).

## Open Questions

None blocking. All core decisions (scope, location, strictness, entry sourcing, release-promotion, bundling) are resolved.

## Traceability

| Requirement | Acceptance Criteria | Gherkin Scenario | Tests | Evidence |
| --- | --- | --- | --- | --- |
| R1 Authoring-only scope | TBD | TBD | TBD | TBD |
| R2 Lives at skills/software/changelog | TBD | TBD | TBD | TBD |
| R3 Strict KaC 1.1.0 structure | TBD | TBD | TBD | TBD |
| R4 Curated, non-copied entries | TBD | TBD | TBD | TBD |
| R5 Promote Unreleased to release | TBD | TBD | TBD | TBD |
| R6 Bundled reference + template | TBD | TBD | TBD | TBD |

## Requirements Readiness

- Language conflicts resolved: yes
- Requirements identified: 6 (R1–R6)
- Requirements mapped to acceptance criteria: 0 (deferred to spec-generation)
- Blocking questions: none
- Needs ADR: no (no hard-to-reverse, surprising, trade-off decision — strictness and scope follow the spec directly)
- Ready for spec-generation: yes

## Non-Requirements

- Cutting releases: git tagging, version-bumping package files, publishing artifacts.
- Auto-generating entries from raw git logs (the spec explicitly discourages git-log dumps); git history is draft *input* only.
