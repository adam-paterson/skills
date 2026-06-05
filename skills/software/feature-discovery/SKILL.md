---
name: feature-discovery
description: "Discover thoughtful software feature opportunities by mapping the current product, user jobs, direct competitors, adjacent tools, and semantic feature analogues. Use when exploring what features to add, deciding which opportunities fit the product, or evaluating free versus paid feature potential."
---

# Feature Discovery

Use this skill to help a user discover possible new software features without turning the answer into a shallow feature dump. The goal is a guided product opportunity analysis: understand what the application already does, why users use it, what comparable products teach, and which few feature directions deserve discussion.

## Operating Model

- Start from the actual product. Inspect the repo, docs, UI routes, schemas, tests, tickets, analytics notes, or live app when available before proposing new work.
- Research beyond 1:1 competitors. Include direct alternatives, adjacent workflow tools, and semantic analogues that solve similar user jobs with different product shapes.
- Prefer depth over volume. Return a small opportunity set, usually 4-8 items, with enough reasoning for the user to accept, reject, or reshape each idea.
- Treat competitor features as evidence, not instructions. Translate them into the target product's users, constraints, positioning, and business model.
- Separate validated facts from hypotheses. Cite current sources when browsing or external research is used; label inferred user needs and packaging ideas plainly.
- Keep the conversation collaborative. If the product boundary, target users, or monetization model cannot be inferred, ask up to three focused questions before final recommendations.

## Workflow

1. Map the current product. Summarize the app's purpose, existing feature groups, primary workflows, user roles, likely usage frequency, integration points, and obvious constraints.
2. Infer user jobs. Identify what users are trying to accomplish, what progress looks like, what pain appears unresolved, and where the current product asks users to leave the app or use manual workarounds.
3. Build a research set. Cover direct competitors, adjacent products, platform conventions, and semantic analogues. For a todo app, this may include Todoist and Microsoft To Do, but also Jira, Linear, GitHub Issues, calendar tools, note apps, and personal productivity systems.
4. Extract patterns. Look for recurring capabilities, missing table-stakes expectations, differentiating workflows, power-user features, collaboration models, automation surfaces, reporting views, onboarding choices, and pricing boundaries.
5. Filter for fit. Remove ideas that are off-position, too generic, too costly for the likely benefit, already present, or only attractive because another product has them.
6. Produce opportunity dossiers. For each shortlisted feature, explain why it could be added, what benefit it brings, who would use it, whether it fits free or paid packaging, what evidence supports it, and what should be validated first.
7. Guide the decision. End with a recommended sequence: quick wins, strategic bets, research-first ideas, and ideas to reject or defer.

## Research Lenses

- Direct competitors: products users would name as alternatives.
- Adjacent workflow tools: products that manage similar objects, handoffs, collaboration, status, prioritization, or records of work.
- Semantic analogues: products with different domains but similar behaviors, such as queues, reminders, approvals, triage, dashboards, templates, automation, version history, or marketplace extensions.
- Platform expectations: features users assume because of the app's ecosystem, device category, industry, or buyer type.
- Business model cues: features commonly reserved for teams, admins, scale, compliance, integrations, analytics, automation, or customization.

## Output Shape

Use a verbose, guided structure rather than a long raw list:

1. Product understanding: what exists today, who likely uses it, and what jobs the product appears to serve.
2. Research map: direct competitors, adjacent tools, semantic analogues, and why each group is relevant.
3. Opportunity shortlist: 4-8 feature opportunities with short names and one-line rationale.
4. Opportunity dossiers:
   - Feature concept.
   - Why add it now.
   - User and product benefit.
   - Primary users and use cases.
   - Free, paid, or tiered packaging hypothesis.
   - Evidence from the current app and external research.
   - Risks, tradeoffs, and why it may not fit.
   - Smallest validation step or prototype.
5. Recommendation: suggested order, what to discuss with the user next, and which ideas should be rejected or parked.

## Guardrails

- Do not generate 100 undifferentiated ideas.
- Do not copy competitor roadmaps or describe researched products as if they are the target product's requirements.
- Do not assume paid packaging just because a feature sounds advanced; tie packaging to value, buyer, cost to serve, and upgrade pressure.
- Do not skip current-product analysis when the repo or app is available.
- Do not present current competitor, pricing, or market claims without live research or a clear stale-information caveat.
