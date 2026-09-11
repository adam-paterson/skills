# Teaching workspace formats

Create only the files needed for the current engagement. Keep them short enough to guide decisions.

## `TEACHING-MISSION.md`

```md
# Teaching mission: {subject or programme}

## Why
{The real-world reason this teaching exists and what should change.}

## Learners
{Who they are and the relevant context in which they will use the learning.}

## Success looks like
- {Observable performance and evidence}

## Constraints
- {Time, format, cohort, environment, accessibility, budget, safety, or technology}

## Out of scope
- {Adjacent material intentionally excluded}
```

Use one coherent mission per workspace. Confirm before materially changing it.

## `LEARNER-MODEL.md`

```md
# Learner model

## Starting point
- {Relevant knowledge, experience, and demonstrated capability}

## Motivation and context
- {Why learners care and where they will apply this}

## Likely misconceptions or bottlenecks
- {Misconception, missing prerequisite, or known difficulty}

## Accessibility and participation
- {Needs that affect materials, pacing, interaction, or environment}

## Important unknowns
- {Questions to diagnose rather than assume}
```

Record evidence and uncertainty. Do not turn the learner model into demographic stereotyping.

## `SOURCES.md`

```md
# Sources

## Core sources
- [{Title — author or organisation}]({URL})
  Supports: {claims, demonstrations, examples, or reference material}.
  Limits: {date, scope, disagreement, bias, or required expertise}.

## Practitioner judgment
- [{Person, community, or case}]({URL})
  Use for: {real-world experience or cases not established as universal fact}.

## Gaps and freshness checks
- {Claim or area still needing verification}
```

Remove weak or irrelevant sources instead of accumulating links.

## `CURRICULUM.md`

```md
# Curriculum

## Teaching mission
{One sentence linked to TEACHING-MISSION.md}

## Outcomes and evidence
| Outcome | Evidence | Prerequisites |
| --- | --- | --- |

## Sequence
| Session or block | Learner change | Practice | Assessment | Duration |
| --- | --- | --- | --- | ---: |

## Transfer and follow-up
{How learners apply and revisit the capability outside the teaching session.}
```

## `sessions/NNNN-<slug>.md`

Use the full structure in `output-contract.md`: purpose, learner starting point, timed plan, slides and talking points, activities, assessment, materials, contingencies, and sources.

## `teaching-records/NNNN-<slug>.md`

```md
# {Decision-grade finding}

{What the learners demonstrated or where the design failed, the evidence, and why it changes future teaching.}

## Implication
{Update to learner model, curriculum, materials, or facilitation.}
```

Write a record when evidence changes a future decision: demonstrated mastery, a persistent misconception, an incorrect starting assumption, a failed activity, or a shifted mission. Do not write records merely because a topic was covered.

When later evidence contradicts a record, mark the old record as superseded by the new record rather than deleting it.

