# Keep a Changelog 1.1.0 — Canonical Rules

Condensed from <https://keepachangelog.com/en/1.1.0/>. Pin to version 1.1.0.

## Guiding Principles

- Changelogs are for humans, not machines.
- Every version gets an entry.
- Group the same types of changes together.
- Versions and sections are linkable.
- The latest version comes first (reverse-chronological order).
- Each version's release date is shown.
- State whether the project follows Semantic Versioning.

## File Header

The file opens with this header (adjust the version links, keep the notices):

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
```

## Sections

- An `## [Unreleased]` section sits at the top, holding changes not yet released.
- Each released version is `## [x.y.z] - YYYY-MM-DD`.
- Dates are ISO 8601: `YYYY-MM-DD`.
- Versions are ordered newest-first.

## Change Groups

Under each version, use only these groups, in this exact order, and only when non-empty:

1. `### Added` — new features.
2. `### Changed` — changes in existing functionality.
3. `### Deprecated` — soon-to-be-removed features.
4. `### Removed` — now-removed features.
5. `### Fixed` — bug fixes.
6. `### Security` — vulnerability fixes.

## Yanked Releases

A release pulled for a serious bug or security issue is marked:

```markdown
## [1.0.1] - 2020-01-15 [YANKED]
```

## Comparison Links (recommended)

At the bottom, link each version to its diff so versions are browsable:

```markdown
[Unreleased]: https://github.com/owner/repo/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/owner/repo/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/owner/repo/releases/tag/v1.0.0
```

Skip these if no compare base (remote/host) is available; do not fabricate URLs.

## Bad Practices to Avoid

- Do not dump commit logs. Commit messages are not changelog entries.
- Do not ignore deprecations — announce them before removing.
- Keep dates consistent (ISO `YYYY-MM-DD`, ideally one timezone).
- Do not let entries be unclear or machine-oriented; write for humans.

## Semantic Versioning Cue (advisory)

When recommending a bump from pending `[Unreleased]` groups:

- Breaking `Changed` or `Removed` → major (`x`).
- `Added` or `Deprecated` → minor (`y`).
- Only `Fixed` / `Security` → patch (`z`).

The user's chosen version always takes precedence.
