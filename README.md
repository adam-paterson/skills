# Agent Skills Directory

Work-domain Agent Skills catalog for software, marketing, sales, operations, and research agents.

[![skills.sh](https://skills.sh/b/adam-paterson/skills)](https://skills.sh/adam-paterson/skills)

This repository stores Agent Skills in Git and publishes the same catalog through three surfaces:

- GitHub source folders installable by compatible skills CLIs.
- skills.sh discovery after skills from this repository are installed.
- A Cloudflare Pages `/.well-known/agent-skills/` index generated from the repo.

The initial catalog includes software workflow skills that can be used individually or composed into an OpenSpec-like delivery flow: requirements discussion, spec generation, BDD, Gherkin generation, TDD, property testing, and mutation testing.

## Layout

```text
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
| `discuss-requirements` | Extract real requirements, cement project language, update `CONTEXT.md`, and seed `REQUIREMENTS.md`. |
| `spec-generation` | Create a git-tracked spec package under `docs/specs/<spec-id>/`. |
| `bdd` | Refine package acceptance criteria with examples and automation targets. |
| `gherkin-generation` | Write package Gherkin scenarios under `scenarios/acceptance.feature`. |
| `tdd` | Drive implementation through red-green-refactor and append command evidence. |
| `property-testing` | Add invariant checks and append replayable property-test evidence. |
| `mutation-testing` | Measure test strength and append mutation score evidence. |

A typical OpenSpec-like chain is:

```text
discuss-requirements -> spec-generation -> bdd -> gherkin-generation -> tdd -> property-testing -> mutation-testing
```

Use only the skills needed for the task. For example, a small bug fix may only need `tdd`, while a broad feature may begin with `discuss-requirements` and end with mutation or property checks.

The shared package shape is:

```text
docs/
  agents/
    spec-workflow.md
  specs/
    INDEX.md
    <spec-id>/
      REQUIREMENTS.md
      SPEC.md
      ACCEPTANCE.md
      TEST-PLAN.md
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

Or start with requirements discussion:

```bash
node skills/software/discuss-requirements/scripts/init-requirements-session.mjs \
  --root . \
  --title "Add agent skill catalog"
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
