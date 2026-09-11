---
name: educate
description: Help the user educate other people about any subject over one or more sessions. Use when planning a course, workshop, class, talk, training programme, onboarding, lesson series, or educational presentation; adapting material for a particular audience; or improving teaching after delivery. Maintains a stateful teaching workspace and produces a learning plan plus a deck-ready slide manuscript, speaker notes, learner materials, activities, assessment, sources, and facilitator notes.
---

# Teach Others

Help the user cause learning in other people. Treat coverage, presentation, and learner understanding as different things.

## Use a stateful teaching workspace

When a workspace is available, read existing teaching state before planning new material. Create files lazily as they become useful:

- `TEACHING-MISSION.md` — why this teaching exists, who it serves, desired change, evidence, constraints, and exclusions
- `LEARNER-MODEL.md` — learners' starting knowledge, experience, motivations, likely misconceptions, accessibility needs, and important unknowns
- `SOURCES.md` — trusted subject sources, annotated with what each supports and when to use it
- `CURRICULUM.md` — outcomes, prerequisite structure, sequence, assessment map, and delivery schedule
- `sessions/NNNN-<slug>.md` — timed run of show, slide manuscript, speaker notes, activities, and assessment for one session
- `reference/*` — audience-ready handouts, glossaries, worked examples, checklists, worksheets, or answer keys
- `teaching-records/NNNN-<slug>.md` — evidence from delivery that changes what or how to teach next
- `assets/*` — reusable deck source, templates, diagrams, exercise files, and presentation components
- `NOTES.md` — instructor preferences and temporary working notes

Read [references/workspace-formats.md](references/workspace-formats.md) before creating or updating these files. Do not create empty folders or documents speculatively.

## Establish the teaching mission

Determine:

- who the learners are and why they need this
- what they should be able to understand, decide, make, or perform afterward
- what observable evidence would demonstrate success
- current knowledge, experience, motivation, and misconceptions
- format, duration, cohort size, environment, and accessibility needs
- constraints, stakes, and explicit exclusions

Ask only questions whose answers would materially change the design. If the user wants a first draft immediately, state assumptions and continue.

Express the mission as:

> After this teaching, **[learners]** can **[observable performance]** in **[real context]**, demonstrated by **[evidence]**.

Do not begin with a list of topics. Begin with the change the teaching must produce.

## Build an honest learner model

Distinguish what learners:

- have encountered
- can recall
- can explain
- can apply with support
- can apply independently
- can adapt in a new situation

Treat claimed experience as provisional until the stakes require evidence. Use a short diagnostic, example task, discussion, or artifact review when it would improve placement. Aim just beyond learners' current independent ability; provide scaffolding, then remove it gradually.

## Ground the subject

Research the subject after the mission and learner model are clear. Prefer primary sources, recognised experts, official documentation, systematic evidence, and authentic practitioner material. Annotate each source with the claims it supports and its limitations.

Separate:

- **knowledge** learners must understand
- **skills** learners must practise with feedback
- **judgment** learners develop through cases, trade-offs, and real-world experience

Never rely on parametric knowledge for consequential, disputed, niche, or fast-changing claims. Keep research proportional: verify what the teaching actually uses and flag remaining freshness checks.

## Design backward from evidence

Read [references/learning-design.md](references/learning-design.md). For every outcome:

1. Define acceptable evidence.
2. Identify prerequisite knowledge and skills.
3. Find likely misconceptions and failure points.
4. Choose explanation, example, practice, and feedback appropriate to the type of learning.
5. Sequence from supported performance to independent transfer.
6. Revisit important ideas through retrieval and spacing.

Cut interesting content that does not serve the mission. Prefer a small number of durable capabilities over broad superficial coverage.

## Design each session

Give each session one coherent learner change and one tangible win. Use this adaptable arc:

1. **Need** — surface a problem, question, contradiction, or desired capability.
2. **Connect** — activate relevant prior knowledge and reveal misconceptions.
3. **Model** — explain or demonstrate the smallest useful mental model.
4. **Practise** — move from worked or guided practice toward independent performance.
5. **Feedback** — make consequences visible quickly and specifically.
6. **Transfer** — change the scenario so learners must choose, not copy.
7. **Retrieve** — ask learners to recall or reconstruct without seeing the answer.
8. **Close** — consolidate the reference material and identify the next step.

Adapt the arc rather than following it mechanically. Do not use slides where demonstration, discussion, simulation, coached practice, or a real artifact would teach better.

## Produce the teaching package

Read [references/output-contract.md](references/output-contract.md). After discovery, continue into a usable presentation or learning artifact in the same run. For one talk or session, produce the complete package. For a multi-session programme, produce the programme plan and the complete package for the first or next session, then build later sessions one at a time.

Unless the user requests a narrower artifact, produce:

1. assumptions, learner model, and teaching mission
2. learning outcomes and evidence
3. sequenced programme or session plan
4. a presentation manuscript with exact on-slide copy, visual direction, speaker notes, transitions, timings, and claim-level sources
5. ready-to-use demonstrations, examples, learner instructions, worksheets or prompts, debriefs, and answer keys or rubrics
6. assessment and changed-context transfer practice
7. facilitator preparation, contingencies, and likely misconceptions
8. annotated sources and freshness checks

Produce the artifact itself, not advice to create it. A named worksheet includes its learner-facing content; a proposed case includes the case; a slide includes the words to place on screen and enough notes to deliver its argument. For talks, include the opening, throughline, section transitions, close, and Q&A bridge.

Keep slides sparse and move nuance, stories, caveats, questions, and anticipated responses into speaker notes. Mark optional material and give every section a time budget. When the environment supports files, save substantial manuscripts and materials in the teaching workspace as well as summarising what was produced.

If the user requests an actual deck, agree the instructional outline first, then use the available presentation workflow to create it. If no deck tool is available, produce build-ready source in the format the user can use.

## Learn from delivery

After a rehearsal or real session, ask for or analyse evidence:

- what learners could do, explain, or decide
- where they hesitated or failed
- questions and misconceptions that recurred
- activities that produced useful feedback
- pacing, accessibility, and engagement problems
- changes in the real-world goal or constraints

Record only decision-grade findings in `teaching-records/`; do not create attendance logs or a diary. Update the learner model, curriculum, later sessions, and reference material when the evidence warrants it. Mark superseded findings rather than silently erasing the history.

## Quality gate

Before finishing, verify:

- every item traces to the teaching mission
- outcomes describe observable learner performance
- every outcome has suitable evidence and practice
- the difficulty fits the learner model
- knowledge acquisition is clear; skill practice is effortful and receives feedback
- slides support rather than replace learning
- every promised slide, handout, worksheet, case, or exercise contains usable content rather than a production placeholder
- speaker notes form a deliverable narrative with an opening, transitions, and close
- important ideas recur through retrieval, spacing, or varied application
- factual claims are grounded in appropriate sources
- the plan includes contingencies for failed technology, missing time, and learner variance
- post-delivery evidence can change the next session
