# Exploration methods

Use only the selected method section. The common ledger, evidence states, budget, and completion rule remain in `SKILL.md`.

## General graph

Use bounded breadth followed by selective depth.

1. Seed 3-7 nodes that differ by mechanism, assumption, stakeholder, scale, or outcome.
2. Expand every seed once before ranking the frontier.
3. Evaluate the frontier and follow the top two branches plus the strongest counterpoint.
4. Continue each branch until it reaches an actionable direction, decisive unknown, contradiction, or depth limit.
5. Merge complementary branches and refine the leading synthesis once.

## Design space

Use a bounded morphological matrix.

1. Define 2-5 mostly independent dimensions and a short value set for each.
2. Generate combinations that are both unusual and relevant to the outcome.
3. Screen combinations against constraints and record viable combinations as graph nodes.
4. State which combinations were sampled or omitted. Claim exhaustive coverage only when every combination was inspected.
5. Continue the strongest combinations with the general graph method.

## Decision map

Use an issue-based map.

1. Write the root as an `issue` question.
2. Add each candidate answer as a `position`.
3. Connect evidence and reasoning with `supports` or `objects` edges.
4. Preserve the strongest objection and each unresolved issue in the frontier.
5. Compare positions against the desired outcome, constraints, evidence, and trade-offs. Do not select by the number of supporting nodes.

## Portfolio map

Use a small quality-diversity map.

1. Define 2-3 dimensions that describe useful differences, such as cost, risk, speed, audience, or reversibility.
2. Divide each dimension into a few meaningful ranges or categories.
3. Generate candidates across the useful regions and retain the strongest candidate in each represented region.
4. Report gaps and sampled regions. Keep several candidates unless the user asks for one recommendation.

## Dependency graph

Use AND/OR nodes.

1. Use `OR` edges for alternatives where one path can succeed.
2. Use `AND` edges for conditions or subgoals that must all succeed.
3. Expand every required child of an `AND` node before treating its parent as viable.
4. Prune an alternative when a required child fails and no replacement exists.
5. Compare the remaining complete alternatives with the general graph evaluation order.

## Feedback search

Use a lightweight feedback loop. Use this method only when trials produce objective observations.

1. Select a promising action or branch.
2. Run the test, tool, user check, or simulation.
3. Record the observation separately from the prediction.
4. Update the branch status and write one lesson from failure or surprise.
5. Let that lesson change the next selection, then repeat within the declared budget.

Use full Monte Carlo tree search only when the task supplies a meaningful simulator, repeated rollouts, and a defensible reward. Otherwise, this bounded feedback loop is enough.
