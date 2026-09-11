# Retrospective: output flooding

## Highest priority: make bounded tool output the default

**Evidence:** Session A emitted 8,000 repeated progress lines, filled the context, and caused the agent to rerun the command. Session B consumed most of the remaining context with verbose fixture output, triggered compaction, and led to rereading already-inspected files. The environment already provides bounded mode with local retention, range retrieval, permission handling, retention controls, and preserved exit status; the operator currently selects passthrough.

**Recommendation:** Change the global default (or this operator’s default profile) from passthrough to bounded mode. Keep passthrough as an explicit opt-in for small, intentionally inspected output. This addresses both observed failures without requiring project changes or a new tool.

## Medium priority: make the bounded excerpt useful for diagnostics

Configure the bounded presentation to retain enough beginning and ending output to expose command setup and the final error/summary, while keeping the complete log available by reference. For long-running commands, prefer a concise live tail rather than streaming every repeated progress line. Preserve the command’s exit status prominently so truncation cannot be mistaken for success.

Exact thresholds and option identifiers are not in the evidence packet, so they should be selected from the environment’s existing bounded-mode configuration rather than invented here.

## Low priority: improve the recovery path’s discoverability

When output is bounded, expose a clear file reference and a simple way to request a line range or the tail. This lets an agent investigate the retained log once, instead of repeating the command. A short tool-result hint should state that the output is truncated and how to retrieve more.

## Not recommended from this evidence

- Do not modify project build/test commands: existing docs already provide focused commands, and the problem is environment-level output handling.
- Do not add a new plugin or custom output pipeline: existing bounded mode covers the demonstrated need, and no evidence shows it is insufficient.
- Do not add linting or coding-standard rules: the failures concern tool-output transport, not code correctness.
- Do not expose logs indiscriminately: build/test output may contain private data; retain the existing permission and retention safeguards.

Success criterion: verbose commands no longer consume the agent’s context wholesale, while an agent can retrieve the full retained output and identify the command’s failure or final result without rerunning it.
