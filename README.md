# Agent Skills Directory

Work-domain Agent Skills catalog for software, marketing, sales, operations, and research agents.

[![skills.sh](https://skills.sh/b/adam-paterson/skills)](https://skills.sh/adam-paterson/skills)

This repository stores Agent Skills in Git and publishes the same catalog through three surfaces:

- GitHub source folders installable by compatible skills CLIs.
- skills.sh discovery after skills from this repository are installed.
- A Cloudflare Pages `/.well-known/agent-skills/` index generated from the repo.

The initial catalog includes software workflow skills that can be used individually or composed into an enterprise delivery flow: intake, external project-language review, requirements capture, specification, acceptance design, to-Gherkin scenario writing, scoped implementation, verification, release readiness, and changelog maintenance.

## Layout

```text
kits/
  spec-package/
    spec-workflow.md
    templates/
    scripts/
external/
  skill-sources.json
skills/
  software/
    <skill-name>/
      SKILL.md
      agents/openai.yaml
      references/
      scripts/
      assets/
  marketing/
  sales/
  operations/
  research/
```

Every real skill must live at `skills/<domain>/<skill-name>/SKILL.md`. Domain README files and templates are safe placeholders and are not discoverable skills.

## Install

List skills from the public GitHub repository:

```bash
npx skills add adam-paterson/skills --list
```

Install a specific skill:

```bash
npx skills add adam-paterson/skills --skill <skill-name> --agent codex --yes
```

After install telemetry and cache refresh, skills from this repository become available on:

```text
https://skills.sh/adam-paterson/skills
```

## Domains

| Domain | Purpose |
| --- | --- |
| Software | Engineering, architecture, testing, release work, and developer operations. |
| Marketing | Campaigns, positioning, content strategy, SEO, analytics, and go-to-market work. |
| Sales | Pipeline work, account research, CRM hygiene, prospecting, and sales operations. |
| Operations | Business operations, process design, reporting, vendor workflows, and internal systems. |
| Research | Evidence gathering, synthesis, competitive research, and decision support. |

## Software Workflow Skills

| Skill | Use |
| --- | --- |
| `delivery-workflow` | Inspect the current repo/spec package and route to the next owned or external workflow stage. |
| `setup-agent-workflow` | Configure a target repo with `docs/agents/spec-workflow.md`, `docs/specs/INDEX.md`, and agent instructions. |
| `requirements-intake` | Create the initial enterprise spec package and capture source request, source links, actors, constraints, and unknowns. |
| External `grill-with-docs` | Challenge project language, update `CONTEXT.md`, and propose ADRs from the upstream `mattpocock/skills` catalog. |
| `requirements-capture` | Persist clarified change requirements into `REQUIREMENTS.md` after project-language review. |
| `spec-generation` | Create or update implementation-ready `SPEC.md` under `docs/specs/<spec-id>/`. |
| `acceptance-design` | Refine package acceptance criteria with examples and automation targets before implementation. |
| `to-gherkin` | Write package Gherkin scenarios under `scenarios/acceptance.feature` and assess BDD suite setup. |
| `implement-spec` | Implement one ready spec package or slice with TDD and append command evidence. |
| `verify-spec` | Map observed evidence to every acceptance criterion before marking the package verified. |
| `release-readiness` | Check changelog, docs, rollout, rollback, observability, and review notes before shipping. |
| `property-testing` | Optional verification technique for invariants, generators, state machines, and broad input spaces. |
| `mutation-testing` | Optional verification technique for measuring test strength. |
| `changelog` | Create and maintain a `CHANGELOG.md` to the Keep a Changelog 1.1.0 format. |

A typical enterprise software workflow is:

```text
delivery-workflow
-> setup-agent-workflow
-> requirements-intake
-> external:grill-with-docs
-> requirements-capture
-> spec-generation
-> acceptance-design
-> to-gherkin
-> implement-spec
-> verify-spec
-> release-readiness
-> changelog when needed
```

Use only the skills needed for the task. `setup-agent-workflow` is recommended once per repo, but the package-creating skills remain standalone. `property-testing` and `mutation-testing` are optional verification techniques selected by `TEST-PLAN.md`, not mandatory stages for every change.

## Research Skills

| Skill | Use |
| --- | --- |
| `skill-distillation` | Distill source materials, expert traces, corrections, and failure patterns into bounded, auditable skill updates before editing skill artifacts. |

The shared package shape is:

```text
docs/
  agents/
    spec-workflow.md
  specs/
    INDEX.md
    <spec-id>/
      WORKFLOW.md
      INTAKE.md
      REQUIREMENTS.md
      SPEC.md
      ACCEPTANCE.md
      TEST-PLAN.md
      IMPLEMENTATION.md
      VERIFY.md
      RELEASE.md
      DECISIONS.md
      EVIDENCE.md
      scenarios/
        acceptance.feature
```

Initialize a package with the helper bundled in `spec-generation`:

```bash
node skills/software/spec-generation/scripts/init-spec-package.mjs \
  --root . \
  --title "Add agent skill catalog"
```

Or start with requirements intake:

```bash
node skills/software/requirements-intake/scripts/init-requirements-intake.mjs \
  --root . \
  --title "Add agent skill catalog"
```

Inspect workflow state:

```bash
node skills/software/delivery-workflow/scripts/inspect-workflow.mjs \
  --root . \
  --spec 2026-06-03-example
```

Set up a target repo for the full workflow:

```bash
node skills/software/setup-agent-workflow/scripts/setup-agent-workflow.mjs \
  --root . \
  --agent-file AGENTS.md
```

## Codex Plugin

The root `.codex-plugin/plugin.json` exposes the catalog as a local Codex plugin with `skills: "./skills/"`. The repo-local marketplace entry is in `.agents/plugins/marketplace.json`.

## Cloudflare Pages

Build the well-known discovery output:

```bash
npm run build:well-known
```

The generated index is written to:

```text
dist/public/.well-known/agent-skills/index.json
```

Deploy with the GitHub Actions workflow after adding these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Development

The canonical spec package source lives in `kits/spec-package/`. Generated copies are committed inside individual skills so each skill remains installable by itself.

External upstream skills are tracked in `external/skill-sources.json`. The v1 enterprise workflow treats `grill-with-docs` from `mattpocock/skills` as the project-language review stage instead of copying that skill into this catalog.

Sync generated skill assets:

```bash
npm run sync:skill-assets
```

Create a draft skill:

```bash
npm run new-skill -- --domain software --name example-name
```

Validate the catalog:

```bash
npm run validate
```

Build all generated public artifacts:

```bash
npm run build
```

Run validation plus fixture tests:

```bash
npm test
```

`skills.sh.json` is generated from real skills and should stay committed whenever the catalog contains discoverable skills.
