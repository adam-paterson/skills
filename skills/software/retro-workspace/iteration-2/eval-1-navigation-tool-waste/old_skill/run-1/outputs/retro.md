# Retrospective: navigation-tool-waste

## 1. Add a navigation pointer for billing work (high)

The session spent two broad searches (`rg retry .`) and 8 minutes before discovering the existing `docs/billing.md` pointer. That document directly identified the shared policy (`packages/payments/src/retry.ts`) and its delegating caller.

Improve the repository navigation surface with a targeted pointer, preferably in the already-loaded `AGENTS.md`:

> For billing, payment retry, gateway status, or `Retry-After` work, read `docs/billing.md` first; the shared policy is in `packages/payments/src/retry.ts` and API billing delegates to it.

This is a good use of an AGENTS pointer because it encodes a task trigger and avoids duplicating general repository documentation. If billing-specific work is common, a small domain navigation index could hold similar pointers; do not add one solely for this case unless more domains have the same discovery problem.

## 2. Make repository search narrow by default (medium)

The first search returned 28,400 lines, including vendor and lock files, was truncated, and was repeated unchanged. This produced no useful new information and obscured the relevant source.

Add a tool-use convention to the coding-agent guidance: start with known documentation and targeted source directories, then use `rg` with repository exclusions and file globs (for example, source extensions and `packages/`/`apps/`), widening only when necessary. A search helper or custom CLI is unnecessary here; concise search guidance is enough.

## 3. Preserve the existing test guidance (low)

No automated-check gap was demonstrated. The agent added a focused regression test and ran `npm run test:billing`; the reviewer confirmed the shared-policy fix. The existing `AGENTS.md` instruction to run relevant tests and `docs/billing.md` test command were sufficient.

## Not recommended from this evidence

- No new coding-standard rule: the reviewer caught no defect.
- No information-access or third-party-service change: the necessary repository evidence was available.
- No global AGENTS rewrite beyond a compact navigation/search pointer; the current file is small and already appropriately minimal.
