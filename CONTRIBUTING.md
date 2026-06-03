# Contributing

This repository stores Agent Skills by work domain. Keep each contribution focused on one skill or one catalog tooling change.

## Add A Skill

Create a draft skill:

```bash
npm run new-skill -- --domain software --name example-name
```

Then edit:

- `skills/<domain>/<skill-name>/SKILL.md`
- `skills/<domain>/<skill-name>/agents/openai.yaml`
- Optional `references/`, `scripts/`, and `assets/`

## Skill Rules

- Keep the folder name and `SKILL.md` frontmatter `name` identical.
- Use lowercase kebab-case names with no spaces.
- Put trigger guidance in the `description` field, because agents read that before the skill body.
- Keep `SKILL.md` concise and move detailed material into one-level-deep `references/` files.
- Do not add a real `SKILL.md` under `templates/`, `fixtures/`, or any non-skill path.
- Do not commit generated `dist/` output.
- If a skill creates a persistent workflow artifact, include reusable templates under `assets/`, detailed rules under `references/`, and deterministic helpers under `scripts/`.

## Validate

Run:

```bash
npm test
```

The test command validates the catalog and runs generated fixture checks for valid skills, duplicate names, folder/name mismatches, missing descriptions, invalid domains, and broken references.
