# Requirements Workflow

Use this reference when discussing requirements for a spec package.

## Package Contract

Requirements live at:

```text
docs/specs/<spec-id>/REQUIREMENTS.md
```

The package also includes:

- `SPEC.md`
- `ACCEPTANCE.md`
- `TEST-PLAN.md`
- `DECISIONS.md`
- `EVIDENCE.md`
- `scenarios/acceptance.feature`

`discuss-requirements` owns `REQUIREMENTS.md` and may append local decisions to `DECISIONS.md`.

## Requirement Shape

Each requirement should have a stable id:

```text
R1, R2, R3
```

Each requirement should capture:

- Actor
- Trigger
- Outcome
- Business rule
- Edge cases
- Failure behavior
- Related terms
- Acceptance-criteria mapping

## Question Taxonomy

Use one high-value question at a time:

- Actor: who needs this?
- Outcome: what changes for them?
- Trigger: when does it happen?
- State: what lifecycle or state matters?
- Rule: what must always be true?
- Boundary: what is explicitly out of scope?
- Data: what is created, changed, deleted, or derived?
- Permission: who can and cannot do it?
- Failure: what happens when it cannot complete?
- Integration: what other system or module is involved?
- Evidence: how will we know it works?
- Language: what terms must be used consistently?

Each question must include the recommended answer and the consequence of choosing differently.

## Readiness Gate

Finish with this report:

```markdown
## Requirements Readiness

- Language conflicts resolved: yes/no
- Requirements identified:
- Requirements mapped to acceptance criteria:
- Blocking questions:
- Needs ADR: yes/no
- Ready for spec-generation: yes/no
```

`Ready for spec-generation` is `yes` only when each key term is defined or marked unresolved, each requirement has enough structure to map into acceptance criteria, and every blocking question is explicit.
