# Synthetic evidence packet: output flooding

This packet is the complete available evidence. Names and project paths are fictional. Do not search this machine or the web for them.

## Operator and environment

The operator owns an open-source coding environment used across many repositories and can build plugins or change its source.

The supplied configuration reference documents an existing global tool-output setting:
- Bounded mode retains the full output locally and supplies only a bounded excerpt plus a file reference to the model.
- The user can retrieve further ranges from the file when needed.
- It respects existing file permissions, offers retention controls, and preserves command exit status.
- Passthrough mode sends all output directly to the model.
- The current user configuration selects passthrough mode. No custom plugin changes this behavior.
- Exact option names and API identifiers are not provided in this packet.

## Session excerpts

Session A, documentation generator:
[09:10] Generator failed. Its output contained 8,000 repeated progress lines before an error.
[09:11] Tool output filled the context. Agent repeated the command to locate the error.
[09:13] A targeted read found the error; agent fixed the missing template and verified the build.

Session B, test suite in another repository:
[12:10] Tests passed, but verbose fixture output consumed most of the remaining context.
[12:11] Session compacted. Agent reread files it had already inspected.
[12:13] User asked why a passing test run had caused so much repeated work.

## Existing guidance

Project docs already list focused build and test commands. The observed output comes from tools invoked through the coding environment, not just search commands. The task does not require changing those projects. Build and test logs may contain private data. No evidence shows that the existing bounded mode is insufficient.
