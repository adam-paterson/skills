---
id: 2026-06-03-add-changelog-skill-keep-a-changelog-1-1-0
title: "Add changelog skill (Keep a Changelog 1.1.0)"
created: 2026-06-03
updated: 2026-06-03
---

# Intake: Add changelog skill (Keep a Changelog 1.1.0)

## Source Request

> "We need a changelog skill which follows https://keepachangelog.com/en/1.1.0/"

## Source Links

- Keep a Changelog 1.1.0: https://keepachangelog.com/en/1.1.0/

## Initial Actors

| Actor | Goal | Notes |
| --- | --- | --- |
| Agent | Create or maintain a changelog skill. | Acts inside a target project after the skill is installed. |
| Maintainer | Keep a human-readable changelog. | Owns final version/date decisions. |

## Initial Constraints

| Constraint | Source | Impact |
| --- | --- | --- |
| Follow Keep a Changelog 1.1.0. | Source request | Skill must encode the canonical sections, release heading shape, and changelog-only boundary. |
| Do not perform release mechanics. | Requirements capture | Skill may edit changelog content but not tag, bump versions, or publish. |

## Initial Unknowns

| Question | Why It Matters | Blocking |
| --- | --- | --- |
| None recorded. |  | no |

## Intake Decision

- Ready for project-language review: skipped for this small catalog skill.
