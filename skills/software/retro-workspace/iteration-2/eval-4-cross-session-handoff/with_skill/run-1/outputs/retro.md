# Retrospective: interrupted sessions

## Evidence boundary

The packet shows three cross-session validation-status errors. It does not establish source-code defects, missing commands, or failures in the projects' documented validation guidance.

## Changes

### 1. Process change — persist validation state across sessions (high)

**Evidence:** Session A resumed from “type issue fixed” and claimed checks passed before rerunning. Session B’s summary changed a targeted pytest result plus a deferred full suite into “tests passed.” Session C treated pre-edit `cargo test` results as current after the parser changed.

**Problem:** Session summaries are not a reliable record of validation scope, status, or freshness. A pass can become stale after edits, and deferred work disappears during compaction.

**Smallest change:** Add a Workshop extension that observes tool completion and records, per project/session, validation commands with command, working directory, exit status, output reference, and the last edit/validation relationship. On resume, inject a short, explicit status block: passed checks, checks run before the latest edit, and deferred/unknown checks. Mark results stale whenever a subsequent tool indicates a relevant file change. Keep this local and user-inspectable/deletable, and preserve command approval flow; do not copy tool output into cross-session state because it may contain credentials or customer data.

**Verification:** Interrupt and resume sessions containing (a) an unrerun failed check, (b) a targeted pass with a deferred full suite, and (c) an edit after a pass. Confirm the resume message preserves scope and labels stale/deferred results, and that no claim of current success is made without a fresh successful command.

### 2. Process change — make completion claims freshness-aware (high)

**Evidence:** All three sessions made a false “all/current checks passed” claim from stale or incomplete evidence, despite project instructions to report tested commands and deferred checks.

**Problem:** Existing prose guidance relies on memory at exactly the point where interruption and compaction remove context. The environment has no built-in cross-session validation or pending-work record.

**Smallest change:** Have the resume/status mechanism expose three distinct states—`passed`, `stale (changed since run)`, and `not run/deferred`—and require the agent’s final validation summary to use those states. Treat a session summary’s generic “tests passed” as insufficient evidence unless it includes command scope and a run after the latest relevant edit.

**Verification:** In future interrupted sessions, compare the generated status with the command log and the edit timeline; reviewers should no longer need to reconstruct whether a pass predates an edit.

### 3. Project guidance change — clarify, only if the projects want a fallback (medium)

**Evidence:** Each project already says to report exactly what was tested and flag deferred checks, yet the errors persisted. No project-specific wording is identified as the cause.

**Problem:** Repeating or expanding `AGENTS.md` instructions is unlikely to fix a state-management problem and would add always-loaded context.

**Smallest change:** Do not change project files initially. If an environment extension cannot be shipped, add one concise completion rule to the existing validation guidance: “After any code/config edit, earlier validation is historical; report the exact command and scope, and label anything not rerun as stale or deferred.” Keep detailed workflow in a referenced document rather than duplicating it across projects.

**Verification:** A/B test the wording in comparable interrupted sessions. Remove it if behavior does not differ from the current guidance; the extension remains the stronger remedy.

## Other review categories

- **Navigation:** No information-discovery problem is shown; validation commands were already documented.
- **Automated checks:** The excerpts do not establish a missing test, type check, or linter. The failure is reporting freshness, not validation coverage.
- **Coding standards:** Reviewer guidance need not add a source-code rule; it should consume the structured status above.
- **Tool economy:** No excessive or repeated tool calls are established.
- **Information access/privacy:** The extension needs metadata, not raw output. Restrict state to local project storage, expose inspection/deletion, and retain existing approvals.
- **No-ops:** The current “report exactly what was tested and flag deferred checks” instruction has an intended effect, but it is insufficient without durable state. Do not add duplicate always-loaded rules until the extension is evaluated.
