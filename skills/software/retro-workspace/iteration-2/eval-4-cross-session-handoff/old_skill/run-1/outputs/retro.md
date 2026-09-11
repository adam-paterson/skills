# Retrospective: cross-session handoff

## 1. Persist validation state across sessions (high severity)

Add a local, per-project validation ledger to Workshop, populated from tool-completion events. Each entry should retain:

- command and working directory;
- timestamp and exit status;
- validation scope (for example, targeted test versus full suite);
- output-file reference, subject to the existing retention and privacy controls;
- deferred or unavailable checks.

Expose the ledger in the resume message and make the distinction between **last run**, **passed**, and **currently valid** explicit. The current extension capabilities support local project state and resume messages, while the built-in session-local output retention does not provide this continuity.

Evidence: Session A lost the failed/unrerun `npm run check`; Session B lost that only a targeted pytest command ran and the full suite was deferred; Session C retained a green result from before a parser edit.

## 2. Invalidate validation evidence after subsequent changes (high severity)

Treat a validation result as stale when the project changes after it ran. The handoff should say, for example, “passed before latest edit,” rather than “tests green.” Prefer a change-generation or dirty-state marker tied to the validation record; if Workshop cannot observe edits directly, provide an explicit agent-facing checkpoint that records the current generation and require validation after it changes.

Evidence: Session C relied on `cargo test` from before the parser modification. Session A likewise patched the error without rerunning the check.

## 3. Make resume/compaction summaries structured, not prose-only (medium severity)

Require summaries and resume notices to carry a small status block with separate fields for:

- checks run and exact scope;
- pass/fail status and command status;
- checks not run, including reason and prerequisite;
- changes made after the last check;
- next validation action.

This should be generated or displayed by the environment so an informal phrase such as “tests passed” cannot erase scope or deferred work. It complements, rather than duplicates, the projects’ existing instruction to report tested and deferred checks.

Evidence: compaction converted “targeted pytest passed; full suite deferred” into “tests passed,” and interruption summaries called work fixed or green without current command evidence.

## 4. Add a review-facing stale-evidence warning (medium severity)

When a review starts, surface validation records whose scope is narrower than the project’s documented checks, whose output is unavailable, or whose run predates the latest change. This is a useful environment guard even though reviewers already corrected all three incidents; it prevents false completion claims from reaching review and keeps project-specific validation commands authoritative.

## Scope decisions

No navigation, coding-standard, global `AGENTS.md`, or new project validation-command recommendation is supported by this packet. The projects already document their commands and reporting expectations; the recurring failure is loss of validation scope, deferral, and freshness across interruption/compaction/resume boundaries. Any extension must preserve command approval and avoid copying sensitive tool output into durable state; store metadata and user-inspectable/deletable local state by default.
