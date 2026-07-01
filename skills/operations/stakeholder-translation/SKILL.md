---
name: stakeholder-translation
description: "Stakeholder translation of one source idea into audience-specific framing. Use when the user asks to reframe the same information for a named stakeholder or needs side-by-side versions for CEO, engineer, customer, investor, designer, marketer, or another audience."
---

# Stakeholder Translation

Translate one source idea into stakeholder-specific framing while keeping the factual kernel invariant. Change the lead, vocabulary, proof, emphasis, and next action; do not change the underlying information.

## Workflow

1. Extract the kernel. Identify the core idea, goal, context, audience-independent facts, evidence, constraints, risks, open questions, and requested action. If the source is too thin to translate responsibly, ask up to three focused questions. Complete when the kernel separates known facts from assumptions and unknowns.
2. Select stakeholder branches. Use the audiences named by the user; if none are named, ask for the target audience or offer the default set: CEO, engineer, customer, investor, designer, and marketer. Complete when every requested branch has a stakeholder label and the decision or reaction that framing should support.
3. Build the invariant ledger. List the facts, evidence, caveats, and asks that must remain true across all translations. Complete when each later version can be checked against the same ledger and any audience-specific hypothesis is clearly marked.
4. Translate by lens. For each stakeholder, choose the opening hook, vocabulary, proof standard, detail level, risk treatment, and next action from the stakeholder lenses below. Complete when every version speaks to that stakeholder's decision without adding unsupported claims.
5. Run the fidelity check. Compare each version back to the kernel and invariant ledger. Complete when the core claim, evidence, caveats, and ask still match the source and no stakeholder version hides decision-relevant risk.
6. Deliver in the user's requested format. If no format is requested, use a side-by-side matrix for multiple stakeholders or a concise brief for one stakeholder. Complete when each output names the stakeholder, frame, proof, caveat or risk, and next action.

## Stakeholder Lenses

- CEO: lead with strategic outcome, business impact, urgency, organizational risk, tradeoff, decision needed, and timing.
- Engineer: lead with problem shape, system boundary, constraints, dependencies, tradeoffs, edge cases, acceptance signal, and implementation next step.
- Customer: lead with their job, pain, practical benefit, experience change, trust signal, limitation, and next action. Avoid internal jargon.
- Investor: lead with market or value-creation thesis, traction or evidence, economics, defensibility, milestone, capital or resource use, and risk.
- Designer: lead with user need, journey moment, interaction implication, state or edge case, constraint, success signal, and emotional effect.
- Marketer: lead with segment, positioning, message, differentiation, proof point, channel angle, objection, and call to action.
- Other stakeholder: identify what they decide, what they value, what they fear, which proof they trust, which vocabulary they use, and what action they can take.

## Translation Moves

Use these moves to alter framing while preserving meaning:

- Reorder the same facts so the stakeholder's decision comes first.
- Swap vocabulary from source-language into stakeholder-language.
- Change proof depth: strategic summary, technical detail, customer evidence, financial logic, design rationale, or campaign proof.
- Change emphasis without omission: benefits, risks, constraints, and unknowns should stay visible when they affect the decision.
- Convert the ask into the stakeholder's available action: approve, scope, adopt, fund, design, position, sell, support, or investigate.

## Output Shapes

For a single stakeholder, use:

```text
Stakeholder: <role>
Frame: <one-sentence framing>
Message: <translated brief>
Proof: <evidence or assumption level>
Risk/Caveat: <decision-relevant limitation>
Next action: <specific ask>
```

For multiple stakeholders, use:

| Stakeholder | Lead frame | What they care about | Proof to use | Risk/caveat | Next action |
| ----------- | ---------- | -------------------- | ------------ | ----------- | ----------- |

## Guardrails

- Do not invent facts, traction, customer value, technical readiness, or financial upside.
- Do not make the idea more certain for one stakeholder than the evidence allows.
- Do not hide risks or caveats just because a stakeholder prefers optimism.
- Do not stereotype individuals; use the role as a decision lens and adapt when the user provides person-specific context.
- Do not output all default stakeholder branches when the user asked for one audience.
