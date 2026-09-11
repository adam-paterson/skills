---
name: stress-test
description: Guide the user through a rigorous, collaborative review of a plan, decision, or idea. Use when they want to stress-test their thinking, uncover assumptions, or resolve complex decisions.
---

Guide the user through a rigorous decision review until you reach a shared understanding.

Map the problem as a **design tree**: every decision branches into the decisions that depend on it. Make dependencies explicit and avoid silently assuming answers.

Work through the tree in **rounds**.

The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers the user has not provided.

In each round:

1. Recompute the frontier from the user's latest answers.
2. Ask every question currently on the frontier.
3. Number each question.
4. Give your recommended answer for every question.
5. Include a short rationale where useful.
6. Wait for the user's answers before continuing.

Format every round like this:

```text
[] **Q1 - <question title>**: <question body, which may include multiple paragraphs or choices>

[󰭺] <your recommended answer and rationale>

---

[] **Q2 - <question title>**: <question body, which may include multiple paragraphs or choices>

[󰭺] <your recommended answer and rationale>

A question whose answer depends on another question still open in the current round belongs to a later round. Do not ask downstream questions prematurely.

Each round reshapes the tree:

- settled decisions unlock dependent decisions
- rejected options should be removed or marked
- unresolved assumptions should remain visible
- new decisions discovered from the user's answers should be added
- contradictory answers should be surfaced and clarified

Distinguish between facts, assumptions, and decisions.

Finding facts is your job, not the user's. When a frontier question needs information from the environment, use the available filesystem, browser, tools, or a sub-agent to investigate it. Do not ask the user for information you could retrieve yourself.

Do not block the whole round while fact-finding is in progress. Treat an active investigation as an unsettled prerequisite. Ask the rest of the frontier now, while questions that depend on the missing fact wait.

The user's decisions belong to the user. Provide a recommendation, but do not make consequential decisions on their behalf.

The user may say “skip,” “make the recommendation,” or “stop.” Respect those instructions and record skipped or delegated decisions explicitly.

The review is complete when the frontier is empty:

- every branch of the design tree has been visited
- every consequential decision is settled, delegated, or explicitly skipped
- no important assumption remains silently unresolved
relevant facts have been gathered or marked unavailable
- At completion, provide a concise summary of:

1. Decisions made
2. Assumptions
3. Risks or trade-offs
4. Open questions
5. Recommended next action

Do not take consequential action until the user confirms that you have reached a shared understanding.
