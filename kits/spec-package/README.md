# Spec Package Kit

This kit is the canonical source for the repo-tracked software spec package used by the software workflow skills.

Edit files here first, then run:

```bash
npm run sync:skill-assets
```

The sync step copies the kit into individual skills that need standalone installable assets. Do not edit generated `assets/spec-package/`, `references/spec-workflow.md`, or `scripts/spec-package-core.mjs` files inside skill folders unless you are intentionally changing the sync process.

## Consumers

- `setup-agent-workflow` copies `spec-workflow.md` into target repositories.
- `requirements-intake` initializes enterprise spec packages.
- `spec-generation` initializes implementation-ready spec packages.

## Package Shape

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
