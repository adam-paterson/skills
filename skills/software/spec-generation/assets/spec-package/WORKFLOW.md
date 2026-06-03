---
id: {{SPEC_ID}}
title: "{{TITLE}}"
package_lifecycle: {{PACKAGE_LIFECYCLE}}
current_stage: {{CURRENT_STAGE}}
created: {{CREATED}}
updated: {{UPDATED}}
---

# Workflow: {{TITLE}}

## Stage State

| Stage | Status | Owner | Updated |
| --- | --- | --- | --- |
| requirements-intake | in-progress | requirements-intake | {{UPDATED}} |
| project-language-review | pending | external:grill-with-docs |  |
| requirements-capture | pending | requirements-capture |  |
| spec-generation | pending | spec-generation |  |
| acceptance-design | pending | acceptance-design |  |
| gherkin-generation | pending | gherkin-generation |  |
| implement-spec | pending | implement-spec |  |
| verify-spec | pending | verify-spec |  |
| release-readiness | pending | release-readiness |  |

## Current Blocker

None recorded yet.

## Next Stage

Run `requirements-intake` to complete [Intake](./INTAKE.md), then use external `grill-with-docs` for project-language review.

## Optional Verification Techniques

| Technique | Needed | Reason |
| --- | --- | --- |
| property-testing | TBD | Decide in [Test Plan](./TEST-PLAN.md). |
| mutation-testing | TBD | Decide in [Test Plan](./TEST-PLAN.md). |
