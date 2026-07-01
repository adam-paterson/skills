# Research Map Template

Use this template when building the research set for a feature-discovery run. Its purpose is to make source selection, source-group rationale, current research, evidence grades, and extracted patterns auditable before opportunities are shortlisted.

Keep the map concise. Prefer a small set of relevant sources over a long list of names.

## Source Groups

| Source group | Why this group is relevant | Sources inspected | Key findings | Evidence grade |
| --- | --- | --- | --- | --- |
| Direct competitors | Products or services users would name as alternatives. | Names, URLs, docs, pages, repos, reviews, or source notes. | Capabilities, gaps, commercial boundaries, trust signals, onboarding choices, or workflow patterns. | Researched / Observed / Inferred / Unverified |
| Adjacent offerings | Tools or services that manage similar objects, handoffs, collaboration, status, prioritization, or records of work. | Names, URLs, docs, pages, repos, reviews, or source notes. | Reusable workflow patterns that may transfer without copying roadmap choices. | Researched / Observed / Inferred / Unverified |
| Semantic analogues | Different domains with similar behavior shapes such as queues, reminders, approvals, triage, templates, automation, version history, concierge layers, memberships, marketplaces, or extension ecosystems. | Names, URLs, docs, pages, repos, reviews, or source notes. | Abstract pattern, not a direct requirement. | Researched / Observed / Inferred / Unverified |
| Platform expectations | Ecosystem, channel, device, industry, buyer, or service-format expectations users may assume. | Platform docs, app-store conventions, integration docs, procurement/compliance norms, or buyer expectations. | Table-stakes behaviors, integration expectations, permission models, accessibility/security norms. | Researched / Observed / Inferred / Unverified |
| Commercial model cues | Capabilities tied to acquisition, activation, retention, expansion, referrals, support deflection, cost-to-serve reduction, trust, compliance, integrations, analytics, automation, or customization. | Pricing pages, packaging docs, case studies, public plans, analyst notes, or observed business model. | Packaging mechanisms, value metrics, expansion paths, or cost-to-serve implications. | Researched / Observed / Inferred / Unverified |

## Pattern Extraction

Convert sources into patterns before proposing opportunities. A pattern should recur across a source group, explain a user job, or reveal a transferable mechanism.

| Pattern | Source groups supporting it | User job or friction it relates to | Product fit implication | Evidence grade |
| --- | --- | --- | --- | --- |
| `<pattern>` | Direct competitors / adjacent offerings / semantic analogues / platform expectations / commercial cues | `<job or friction>` | `<why it may or may not fit this product>` | Observed / Researched / Inferred / Unverified |

## Evidence and Citation Guidance

- Use **Observed** for product-truth material inspected inside the target product, repo, docs, analytics, tickets, sales/support material, customer research, or live app.
- Use **Researched** for current external sources inspected during the discovery run. Cite the source in prose or include the URL/source name in the map.
- Use **Inferred** when a pattern is plausible from jobs, analogues, or business logic but not directly proven.
- Use **Unverified** for market, pricing, competitor, or customer claims that are worth considering but not validated.
- Do not present current competitor, pricing, or market claims without live research or an **Unverified** label.
- Do not copy a competitor roadmap. Extract the underlying behavior, user job, or commercial boundary, then screen it for product fit.

## Completion Criteria

The research map is complete when:

- Each source group included has a reason for inclusion.
- No source group is only a list of names.
- Patterns are tied to source groups, not isolated trivia.
- Evidence grades are visible for research-dependent claims.
- Source gaps are explicit when research access is unavailable or incomplete.
