---
name: changelog
description: "Use when starting or maintaining a project CHANGELOG.md to the Keep a Changelog 1.1.0 format: create the file, add curated human-readable entries under the canonical change groups, normalize deviations strictly, and promote the Unreleased section into a dated release. Authoring and maintenance only — never tags releases, bumps versions, or publishes."
---

# Changelog

Use this skill when the request involves creating or maintaining a `CHANGELOG.md` that follows [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/). The skill owns changelog content only. It never tags releases, bumps package versions, or publishes; it may recommend a Semantic Versioning level but the user's chosen version always wins.

Read [references/keep-a-changelog-1.1.0.md](references/keep-a-changelog-1.1.0.md) for the canonical rules before editing. Use [assets/CHANGELOG.template.md](assets/CHANGELOG.template.md) as the starter when no changelog exists.

## Workflow

1. Locate the changelog. Look for `CHANGELOG.md` at the repository root. If none exists, create it from `assets/CHANGELOG.template.md` (header, Keep a Changelog + Semantic Versioning notices, an empty `[Unreleased]` section).
2. Read the existing changelog and confirm it matches the 1.1.0 structure. If it deviates (non-canonical group names, unsorted versions, non-ISO dates, missing `[Unreleased]`, empty rendered groups), normalize it and tell the user each correction you made.
3. Gather context for entries. You may read git history, diffs, and pull requests as raw material, but treat them as input only. Never paste commit subjects, hashes, or git-log output as entries.
4. Draft each entry as a plain-language, user-facing sentence describing a notable change. Drop non-notable noise such as pure formatting or no-user-impact internal refactors.
5. Place each entry under the correct change group in `[Unreleased]`: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`. Render groups in that order and only when non-empty.
6. To release a version on request: rename `## [Unreleased]` to `## [x.y.z] - YYYY-MM-DD` (today's date or a date the user supplies), insert a fresh empty `## [Unreleased]` at the top, and update the bottom comparison links when a compare base exists.
7. When releasing, recommend a Semantic Versioning level from the pending groups (`Removed` or breaking `Changed` → major; `Added` or `Deprecated` → minor; only `Fixed`/`Security` → patch). The user's explicit version always wins.
8. Mark a pulled release by appending `[YANKED]` to its heading: `## [x.y.z] - YYYY-MM-DD [YANKED]`.
9. Report what changed: entries added, group placements, any normalization corrections, the released version (if any), and any recommendation the user overrode.

## Guardrails

- Do not perform release mechanics: no git tags, no version bumps in package files, no publishing. If asked, explain the changelog-only scope and stop at changelog edits.
- Do not dump git logs into the changelog. Git history is draft input only; every entry must be human-readable and user-facing.
- Do not invent change groups or reorder them. The six canonical groups and their order are fixed; omit any group that is empty.
- Do not use non-ISO dates. All release dates are `YYYY-MM-DD`.
- Do not cut an empty release. If `[Unreleased]` has no entries when a release is requested, warn and stop.
- Do not guess when meaning is unclear. If a change's user-facing impact, date, or version is ambiguous, ask rather than assume.
- When no git remote or compare base exists, skip the comparison links and note why instead of fabricating URLs.

## References

- [references/keep-a-changelog-1.1.0.md](references/keep-a-changelog-1.1.0.md) — condensed canonical rules.
- [assets/CHANGELOG.template.md](assets/CHANGELOG.template.md) — empty starter file.
