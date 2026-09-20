# Workflow - Question resolution

### 1. Identify the ticket and method

Read related open tickets. Reuse a ticket that already asks the question rather than creating a duplicate. If another worker owns it, coordinate with them before proceeding. Selecting a question out of order does not remove its dependencies. Establish which parts can be answered now and which remain blocked.

Choose how to answer it:

| Type | Use when | Completion requires |
| --- | --- | --- |
| Discussion | The user must make a decision or clarify requirements. | The user's answer and its reasoning. |
| Research | The answer needs evidence from documentation, external sources, or a knowledge base. | Findings with sources and remaining uncertainty. |
| Prototype | The user needs a concrete example to judge appearance or behaviour. | A linked prototype and the user's assessment. |
| Task | Practical work must happen before a decision can be made. | A record of what was done and what it established. |

For Wayfinder labels, discussion maps to `grilling`; the other types use `research`, `prototype`, and `task`.

Tell the user which method you chose, what question it answers, and how it relates to the goal. Do this before creating a ticket.

### 2. Create or claim the ticket

If no matching ticket exists, create a child ticket with a descriptive title and the user's original request in its body. Record its type and any real dependencies using the tracker's conventions.

Claim the ticket before starting work. Confirm that the claim succeeded and that another worker has not taken it.

### 3. Answer the question

Follow the plan's working notes. Use relevant available skills, such as `grilling` and `domain-modeling` for discussion, `research` for evidence, or `prototype` for a concrete example. Follow the environment's delegation policy if using subagents. If a required skill or tool is unavailable, report the limitation rather than pretending to use it.

For discussions and prototypes, ask the user and wait for their response. Do not invent their decision or approval. For practical work, perform the steps you can and give the user a precise checklist for steps only they can perform.

Stop when the question has an answer supported by the chosen method. If it remains unresolved, record the findings and blocker, leave the ticket open, and report what is needed next.

### 4. Record the result

Post the answer and supporting evidence on the ticket, then close it. Add a short summary linked by ticket title to the plan's decision record. Keep the detailed answer on the ticket.

Create follow-up tickets only for questions you can now state precisely. Add their dependencies after their identifiers exist. Remove the corresponding entries from the plan's unresolved questions so the same work is not recorded twice.

Record newly excluded work with its reason in the scope exclusions. Close affected unclaimed tickets with an explanation. For tickets owned by another worker, comment with the finding and coordinate before changing their state.

Finish with the answer, a link to the ticket, and any changes to the plan.
