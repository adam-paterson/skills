# Software Skills

Software agent skills live in `skills/software/<skill-name>/`.

## Current Skills

| Skill | Purpose |
| --- | --- |
| `discuss-requirements` | Extract requirements, challenge language, update context docs, and seed `REQUIREMENTS.md`. |
| `spec-generation` | Create git-tracked spec packages under `docs/specs/<spec-id>/`. |
| `bdd` | Refine package behavior through examples and acceptance checks. |
| `gherkin-generation` | Write package Gherkin scenarios from requirements. |
| `tdd` | Implement with red-green-refactor test evidence. |
| `property-testing` | Add generated checks for invariants and edge cases. |
| `mutation-testing` | Strengthen test suites by triaging surviving mutants. |

These skills are intentionally separate so agents can invoke one workflow step without loading the whole lifecycle. When a spec package exists, all seven skills use it as their shared git-tracked workspace.
