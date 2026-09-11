# Synthetic evidence packet: interrupted sessions

This packet is the complete available evidence. Names and project paths are fictional. Do not search this machine or the web for them.

## Operator and environment

The operator maintains an open-source terminal coding environment called Workshop, used for unrelated JavaScript, Python, and Rust projects. They can install extensions and modify Workshop itself. They want retrospective recommendations only, not implementation.

Workshop's supplied extension reference states:
- Extensions can observe tool completion, session compaction, and session resume.
- A tool completion record includes the command, working directory, exit status, and an output-file reference. Output-file retention defaults to the current session.
- Extensions can store local per-project state and add a short message when a session resumes.
- There is no built-in cross-session record of validation commands or pending work. No installed extension provides it.
- The reference gives capabilities, not API identifiers or code signatures.
- Tool output can include private customer data and credentials. Local extension state can be inspected and deleted by the user. Extensions must respect the existing command approval flow.

## Session excerpts

Session A, JavaScript dashboard:
[10:01] npm run check failed with a type error. Full output saved to a session-local file.
[10:05] Agent patched the type error but had not rerun the command.
[10:06] Session interrupted. Auto-summary said 'type issue fixed', without command status.
[10:30] Resumed agent relied on that summary and said checks passed.
[10:31] User corrected it. npm run check then passed.

Session B, Python data importer:
[14:01] Targeted pytest command passed. Full suite was explicitly deferred until an approved test database was available.
[14:04] Context compacted; summary retained 'tests passed', but omitted scope and the deferred full suite.
[14:20] Resumed agent reported all validation complete.
[14:21] Reviewer requested full-suite evidence. Agent acknowledged it had none and recorded the deferred check.

Session C, Rust CLI:
[16:01] cargo test passed.
[16:02] Agent changed the parser after the test run.
[16:04] Session interrupted. Summary said 'tests green'.
[16:25] Resumed agent treated those results as current. Reviewer noticed the later edit and requested another run; it passed.

## Existing guidance

Each project documents its own validation commands. Those commands differ. Each project already instructs agents to report exactly what was tested and flag deferred checks. The failures occurred despite those instructions. Review eventually corrected each false completion claim. No source-code defects or missing validation commands are established by these excerpts.
