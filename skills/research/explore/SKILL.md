---
name: explore
description: "Explore ideas as a graph. Use for open-ended questions where breadth and selective depth both matter."
---

# Explore

Choose the method, state it, then delegate the exploration.

## Workflow

1. **Frame.** State the question, outcome, constraints, assumptions, and budget. Default to 20 nodes and depth 4. Complete when each item is explicit or marked unknown.
2. **Route.** Choose the method that best matches the problem and requested output. Combine methods only when one cannot supply the required structure. Read its section in [references/methods.md](references/methods.md). Complete when the primary method and trigger are explicit.

   | Method | Use when |
   | --- | --- |
   | General graph | No stronger structure below fits. |
   | Design space | Possibilities vary across independent dimensions. |
   | Decision map | Positions, trade-offs, or stakeholders conflict. |
   | Portfolio map | The user needs several strong, distinct alternatives. |
   | Dependency graph | Alternatives have jointly required subgoals. |
   | Feedback search | Repeated trials produce objective feedback. |

3. **Declare.** Before launching any background agent, show the route in Simplified Technical English: common words, active voice, and one idea per sentence.

   ```text
   Method: <plain-language method name>.
   Reason: <one short sentence tied to the problem shape>.
   ```

   Add a technical name in parentheses only when useful, such as `Decision map (IBIS)`. Complete when both lines are visible to the user.
4. **Delegate.** Launch one background agent when supported; otherwise work inline. Pass the root, method, constraints, budget, context, method instructions, and output path. Use more agents only for independent branches, with one owner for the final synthesis. Complete when the worker has the full payload or inline work has started.
5. **Traverse.** Keep one ledger: `ID | from/edge | node | evidence | status | reason`. Use atomic nodes and the statuses `frontier`, `expanded`, `merged`, and `pruned`. Mark factual nodes `unverified` until checked against a cited primary source. First create a distinct frontier without ranking it. Then evaluate nodes by outcome, constraints, evidence, and information gain. Follow the top two plus the strongest counterpoint; break ties by relevance, information gain, distinctness, then cost. Backtrack, cross-link, merge, and refine as needed. Complete when every seed is expanded or pruned and each selected branch reaches a result, decisive unknown, contradiction, or limit.
6. **Hand off.** Stop at the budget, a decisive result, or a full frontier pass with no distinct new node. Save the root, method and reason, ledger, synthesis, unresolved frontier, and 3-5 next moves as one Markdown file. Follow the repo's notes convention; otherwise use `docs/explorations/<topic>.md`. If files are unavailable, return the same structure in the response. Complete when every node is accounted for, every conclusion traces to the ledger, and the user has the artifact location and next moves.
