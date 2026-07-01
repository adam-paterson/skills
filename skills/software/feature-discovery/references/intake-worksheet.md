# Feature Discovery Intake Worksheet

Use this worksheet before recommending opportunities when the discovery scope is incomplete, ambiguous, or spread across source material. Its purpose is to make the domain, product/service boundary, audience, decision, evidence, and unknowns explicit before feature recommendations begin.

## Worksheet

Fill this from available source material first. Keep entries brief; this is a scoping aid, not the final discovery report.

| Field | What to capture | Status |
| --- | --- | --- |
| Domain | Which domain adapter applies: software/product, service business, content/media, community, marketplace, or internal operations. | Observed / Inferred / Unknown |
| Boundary | The product, service, workflow, repository, business unit, customer journey, or surface area included and excluded. | Observed / Inferred / Unknown |
| Users | Primary users, buyers, admins, operators, contributors, or other audience segments the discovery should serve. | Observed / Inferred / Unknown |
| Value model | How value is created or captured: revenue, retention, activation, cost-to-serve reduction, trust, compliance, community health, network growth, or another path. | Observed / Inferred / Unknown |
| Decision | The decision the user wants to make: what to build next, what to validate, what to package, what to defer, or how to sequence a roadmap. | Observed / Inferred / Unknown |
| Sources | Available product-truth and research inputs: repo, docs, UI, schemas, analytics, tickets, website, sales/support materials, customer research, competitors, or live app. | Observed / Inferred / Unknown |
| Constraints | Limits on scope, timing, team capacity, technical architecture, compliance, positioning, brand, budget, data access, or commercial model. | Observed / Inferred / Unknown |
| Unknowns | Missing facts or assumptions that matter before recommendations are trusted. | Observed / Inferred / Unknown |

## Inference Guidance

- Inspect available source material before asking the user. Check the repo, docs, website, UI routes, schemas, tests, tickets, analytics notes, sales/support material, or research artifacts that are already accessible.
- Prefer **Observed** when the field is directly supported by inspected material.
- Use **Inferred** only when the field is plausible from context but not directly proven. Keep inferred scope narrow and reversible.
- Mark anything material as **Unknown** when it is not proven and cannot be safely inferred.
- Do not hide uncertainty in smooth prose. Carry unknowns into the product understanding, dossiers, and validation steps until resolved.

## Question Guidance

Ask questions only for worksheet fields that cannot be inferred and would change the recommendations. Batch questions together and ask no more than three high-leverage questions before recommending features.

Good question shapes:

1. **Boundary:** “Should this discovery focus on `<specific product/surface>` only, or include adjacent workflows such as `<adjacent area>`?”
2. **Audience/decision:** “Who is the primary decision audience for this shortlist: product leadership, founders, sales, support, operators, or end users—and what decision should it support?”
3. **Value/constraints:** “Which value path or constraint matters most right now: activation, retention, expansion, cost-to-serve, compliance/trust, timeline, budget, or technical feasibility?”

If the user does not answer, proceed only when you can label the missing fields as **Unknown** and make recommendations conditional on those unknowns.

## Completion Criteria

Scoping is complete when the following are explicit, even if some are labeled **Unknown**:

- Domain adapter selected.
- Product/service boundary and exclusions stated.
- Audience or user segments stated.
- Decision the shortlist should support stated.
- Available evidence and source gaps listed.
- Material constraints and unknowns visible.
