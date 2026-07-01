---
name: feature-discovery
description: "Feature discovery for product opportunities. Use when the user asks what features or capabilities to add, wants product-plus-market research, needs commercial canvas hypotheses, or asks to evaluate and sequence opportunity ideas."
---

# Feature Discovery

Discover a small set of fit-tested feature opportunities. Treat **feature** through the domain adapters below. Produce **dossiers**, not idea dumps: each recommendation must connect product truth, a user job, an outside pattern, fit reasoning, a commercial canvas, evidence grades, and validation step.

## Workflow

1. Scope the discovery using [references/intake-worksheet.md](references/intake-worksheet.md). Determine the domain, product or service boundary, target users, value model, and decision the user wants to make. If these cannot be inferred, ask up to three focused questions before recommending features. Complete when the domain, boundary, audience, available evidence, and unknowns are explicit.
2. Map product truth. Inspect available source material before proposing work: repo, docs, UI routes, schemas, tests, tickets, analytics notes, live app, website, offer pages, sales materials, support logs, service journey, or customer research. Use the domain adapter to summarize the purpose, existing feature groups, primary workflows, user roles, usage frequency, integration points, and obvious constraints. Complete when every later opportunity can cite something found or a clearly labeled gap.
3. Infer user jobs. Identify what users are trying to accomplish, what progress looks like, unresolved pain, and where the current experience sends users to manual workarounds or other tools/services. Complete when each job has a user, trigger, desired outcome, and friction point.
4. Build the research set using [references/research-map-template.md](references/research-map-template.md). Cover direct competitors, adjacent workflow tools or services, platform conventions, commercial model cues, and semantic analogues that solve similar behaviors with different shapes. Complete when each source group has a reason for inclusion and no group is only a list of names.
5. Extract patterns. Look for recurring capabilities, table-stakes expectations, differentiating workflows, power-user features, collaboration models, automation surfaces, reporting views, onboarding choices, trust builders, service layers, and commercial boundaries. Complete when patterns are tied to research-map source groups rather than isolated trivia.
6. Run the fit screen using [references/fit-screen-decision-log.md](references/fit-screen-decision-log.md). Remove candidates that are already present, off-position, too generic, too costly for the likely benefit, unsupported by a user job, or attractive only because another organization has them. Complete when shortlisted, rejected, research-first, and deferred ideas have explicit reasons and next moves.
7. Write 4-8 opportunity dossiers using [references/dossier-template.md](references/dossier-template.md). Complete when every dossier separates facts from hypotheses with evidence grades and covers concept, why now, benefit, users/use cases, commercial canvas, evidence, risks/tradeoffs, fit concerns, and smallest validation step.
8. Sequence the decision with the fit rubric. Group the shortlist into quick wins, strategic bets, research-first ideas, and reject/defer items. Complete when every shortlisted and rejected/deferred idea has a next move, not just a ranked list.

## Domain Adapters

Translate **feature** into the domain's native unit before mapping product truth or writing dossiers:

- Software/product: capability, workflow, integration, automation, admin/control, reporting, data model, or developer surface.
- Service business: package, process, guarantee, onboarding step, handoff, concierge layer, support model, or delivery standard.
- Content/media: format, series, template, channel, distribution mechanic, editorial promise, or audience ritual.
- Community: member journey, role, ritual, moderation policy, event, contribution path, recognition, or governance mechanic.
- Marketplace: supply tool, demand tool, trust mechanism, matching flow, reputation signal, liquidity lever, or fee model.
- Internal operations: process, dashboard, approval, automation, policy, training, escalation path, or operating cadence.

## Research Lenses

- Direct competitors: products or services users would name as alternatives.
- Adjacent workflow tools or services: offerings that manage similar objects, handoffs, collaboration, status, prioritization, service moments, or records of work.
- Semantic analogues: different domains with similar behaviors, such as queues, reminders, approvals, triage, dashboards, templates, automation, version history, concierge layers, memberships, marketplaces, or extension ecosystems.
- Platform expectations: features users assume because of the ecosystem, channel, device category, industry, buyer type, or service format.
- Commercial model cues: capabilities commonly tied to acquisition, activation, retention, expansion, referrals, support deflection, cost-to-serve reduction, trust, compliance, integrations, analytics, automation, or customization.

## Commercial Canvas

Do not collapse the model to free versus paid. When writing dossiers, fill the commercial canvas in [references/dossier-template.md](references/dossier-template.md): value path, buyer/payer/user split, packaging mechanism, value metric or limit, cost-to-serve impact, and validation question.

## Evidence Grades

Grade evidence wherever a dossier relies on it:

- Observed: found in inspected product, service, customer, analytics, support, repo, or other source material.
- Researched: found in current cited external research.
- Inferred: plausible from user jobs, patterns, analogues, or business logic, but not directly proven.
- Unverified: worth considering, but needs validation before being treated as true.

## Fit Rubric

Use qualitative ratings, not numeric scores, to sequence opportunities:

- User pain: High / Medium / Low.
- Evidence strength: High / Medium / Low.
- Strategic fit: High / Medium / Low.
- Commercial leverage: High / Medium / Low.
- Effort/cost: High / Medium / Low.
- Risk: High / Medium / Low.
- Next move: ship, prototype, research, defer, or reject.

## Output Shape

1. Product understanding: what exists today, who likely uses it, and what jobs the product or service appears to serve.
2. Research map: direct competitors, adjacent offerings, semantic analogues, platform expectations, commercial model cues, and why each group is relevant.
3. Opportunity shortlist: 4-8 feature opportunities with short names and one-line rationales.
4. Dossiers for each shortlisted opportunity, following [references/dossier-template.md](references/dossier-template.md).
5. Fit screen: concise decision log for the most important shortlisted, research-first, rejected, already-present, or deferred candidates.
6. Recommendation: fit-rubric summary, suggested order, next discussion or validation step, and ideas to reject or park.

## Guardrails

- Do not generate a large undifferentiated idea list.
- Do not copy competitor roadmaps or turn researched offerings into target-product requirements.
- Do not assume direct monetization because a feature sounds advanced; tie the commercial canvas to value, buyer, cost to serve, upgrade pressure, retention, acquisition, or strategic value.
- Do not skip product-truth mapping when source material is available.
- Do not present current competitor, pricing, or market claims without live research or an Unverified evidence grade.
