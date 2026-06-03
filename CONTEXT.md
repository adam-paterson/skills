# Agent Skills Catalog

This repository defines a public catalog of agent skills and the workflow language used to compose owned skills with external upstream skills.

## Language

**External Skill**:
A skill maintained outside this repository and installed from its upstream source rather than copied into this catalog.
_Avoid_: vendored skill, copied skill

**Workflow Stage**:
A named step in the agent software-development process, which may be owned by this repository or provided by an external skill.
_Avoid_: skill clone, prompt step

**Requirements Capture**:
The repo-owned stage that persists clarified requirements, traceability, and readiness state into the spec package after upstream interrogation has produced durable language.
_Avoid_: grill-with-docs clone, requirements grilling

**Requirements Intake**:
The repo-owned stage that creates the initial spec package and records the source request, source links, initial actors, constraints, and unknowns before external project-language review.
_Avoid_: full requirements analysis, project-language grilling

**Spec-Scoped Skill**:
A repo-owned software workflow skill whose name and behavior are explicitly tied to the enterprise spec package rather than a broad software practice.
_Avoid_: generic practice skill, upstream skill clone

**Hard Rename**:
The policy for this new catalog that unclear early skill names are replaced directly instead of kept as compatibility aliases.
_Avoid_: deprecated alias, duplicate skill

**Spec Package**:
The durable work object for a meaningful software change. Each workflow stage reads or writes specific files inside one `docs/specs/<spec-id>/` package so the reasoning, requirements, specification, implementation plan, proof, and release state remain reviewable in Git.
_Avoid_: loose chat transcript, one-off planning doc

**Source Link**:
An optional pointer from a spec package to an issue, pull request, conversation, design, customer request, or other origin artifact.
_Avoid_: required issue, work object

**Enterprise Spec Package**:
The expanded spec package shape that gives intake, requirements, specification, acceptance design, implementation, verification, and release readiness their own files.
_Avoid_: minimal spec package, overloaded spec file

**Enterprise Workflow Default**:
The policy that new spec packages use the expanded enterprise shape by default, rather than maintaining separate standard and enterprise profiles.
_Avoid_: optional enterprise profile, legacy package shape

**Project Language**:
Durable domain terminology that applies across changes and belongs in `CONTEXT.md` or a mapped context file, not in a spec package.
_Avoid_: feature notes, implementation details

**Change Requirement**:
A requirement that applies to one specific change and belongs in that change's spec package.
_Avoid_: glossary term, architecture decision

**Ready For Implementation**:
The spec package state where requirements, acceptance criteria, risks, and test strategy are clear enough for an agent to begin implementation.
_Avoid_: draft, good enough, ready-ish

**Acceptance Design**:
The pre-implementation workflow stage where acceptance criteria and executable behavior examples are refined from the spec package.
_Avoid_: post-hoc scenario writing, test documentation

**TDD Implementation**:
The implementation method that drives code changes through failing tests, passing tests, and refactoring after the spec package is ready for implementation.
_Avoid_: acceptance design, requirements discovery

**Spec Implementation**:
The constrained workflow stage that implements one ready spec package or slice at a time, using TDD and recording proof against acceptance criteria.
_Avoid_: generic coding, opportunistic refactor

**Spec Verification**:
The final proof stage that maps observed evidence back to every acceptance criterion before a spec package can be marked verified.
_Avoid_: test run, green checks, informal QA

**Verification Technique**:
An optional testing or proof method, such as property testing or mutation testing, selected by the test plan when the risk or behavior shape justifies it.
_Avoid_: mandatory workflow stage, checklist item

**Release Ready**:
The state where a verified change has the documentation, changelog, rollout notes, observability, rollback path, and review context needed to ship safely.
_Avoid_: verified, tests passed, done

**Review Notes**:
The reviewer-facing summary, risk areas, evidence pointers, and follow-ups captured inside `RELEASE.md` for v1.
_Avoid_: separate PR readiness stage, changelog entry

**Changelog Entry**:
A release-facing description of a user-visible change, maintained by the standalone changelog skill when release readiness determines one is needed.
_Avoid_: release checklist, implementation note

**Workflow Router**:
A small orchestration skill that inspects the current repository and spec package state, then routes the user to the next appropriate workflow stage without duplicating that stage's behavior.
_Avoid_: mega skill, manual checklist

**Hybrid Router**:
A workflow router that may inspect state and perform deterministic setup, but routes actual stage work to dedicated owned or external skills.
_Avoid_: advisory-only checklist, mega skill

**Workflow State**:
The router-readable state of a spec package, stored in `WORKFLOW.md`, that records each stage's status, current blocker, and next recommended stage.
_Avoid_: spec status, scattered state

**Stage Status**:
The per-stage workflow state vocabulary: `pending`, `in-progress`, `complete`, `blocked`, or `skipped`.
_Avoid_: package lifecycle, spec status

**Package Lifecycle**:
The overall spec package state stored in `WORKFLOW.md`: `draft`, `ready-for-implementation`, `in-progress`, `implemented`, `verified`, `release-ready`, or `archived`.
_Avoid_: stage status, file status

**External Skill Manifest**:
A repo-tracked list of upstream skills that this catalog depends on or recommends, including their source repositories, workflow stages, and install policy.
_Avoid_: vendored skill folder, copied upstream skill
