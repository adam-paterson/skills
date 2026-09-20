# Spec package integration

Read this reference when updating a repo-tracked spec package. Use `docs/agents/spec-workflow.md` for repo-local conventions. If the repo uses a different layout, record the file and stage mapping in the handoff.

## Inputs and ownership

The default package path is `docs/specs/<spec-id>/`.

| File | Use in this stage |
| --- | --- |
| `WORKFLOW.md` | Check upstream completion, stage identifiers, blockers, and the next stage. |
| `REQUIREMENTS.md` | Identify requirements and traceability. |
| `SPEC.md` | Confirm target behavior and scope. |
| `ACCEPTANCE.md` | Read the agreed criteria and examples; update their scenario mapping. |
| `TEST-PLAN.md` | Read the test strategy; update automation targets. |
| `scenarios/acceptance.feature` | Write or refine the acceptance scenarios. |

`acceptance-design` owns the agreed criteria and examples. Resolve gaps there before converting them into Gherkin. `to-acceptance` owns the feature file and BDD suite assessment. `implement-spec` owns implementation.

Existing workflow templates use `to-gherkin` as the stage identifier. Preserve that key when updating those packages; the skill's name is `to-acceptance`. Use `to-acceptance` as the stage key only when the repo's workflow defines it.

## Completion gate

Mark the Gherkin stage `complete` only when:

- Every in-scope acceptance criterion maps to a scenario with an agreed expected outcome.
- The scenarios pass the Gherkin quality gates.
- `ACCEPTANCE.md` and `TEST-PLAN.md` reflect the scenario coverage and intended automation.
- The BDD suite assessment records the detected setup or why detection was blocked.

If unresolved behavior prevents completion, mark the stage `blocked` and record the missing decision. An unanswered optional suite-initialization offer does not block scenario completion unless the repo's stage gate requires a suite.

When requirements, acceptance criteria, risks, and test strategy are ready, set `implement-spec` to `pending` and route to it using the repo's workflow fields. Use `ready-for-implementation` for the package lifecycle if the repo follows the default convention. Preserve implementation or verification progress already recorded in an existing package.

Generated scenarios are planned checks, not observed evidence. Leave verification to `verify-spec`, which maps observed entries in `EVIDENCE.md` to every acceptance criterion in `VERIFY.md`.
