# Software Skills

Software agent skills live in `skills/software/<skill-name>/`.

## Current Skills

| Skill | Purpose |
| --- | --- |
| `delivery-workflow` | Route a spec package to the next owned or external workflow stage. |
| `setup-agent-workflow` | Prepare a repository with the enterprise spec-package convention. |
| `feature-discovery` | Discover feature opportunities from current product fit, user jobs, and adjacent product research. |
| `requirements-intake` | Create the initial spec package and capture source request context. |
| `requirements-capture` | Persist clarified change requirements after external project-language review. |
| `spec-generation` | Create or update implementation-ready design in `SPEC.md`. |
| `acceptance-design` | Refine acceptance criteria and examples before implementation. |
| `to-gherkin` | Write package Gherkin scenarios from acceptance criteria and assess BDD suite setup. |
| `implement-spec` | Implement one ready spec package or slice with TDD and evidence. |
| `verify-spec` | Map observed evidence to every acceptance criterion. |
| `release-readiness` | Check verified packages for changelog, docs, rollout, rollback, observability, and review readiness. |
| `property-testing` | Optional verification technique for invariants and broad input spaces. |
| `mutation-testing` | Optional verification technique for test strength. |
| `changelog` | Maintain `CHANGELOG.md` to Keep a Changelog 1.1.0. |

These skills are intentionally separate so agents can invoke one workflow step without loading the whole lifecycle. When a spec package exists, workflow skills use it as their shared git-tracked workspace.
