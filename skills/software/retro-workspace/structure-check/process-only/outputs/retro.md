## Changes
### Project changes
No changes supported by this session. The evidence spans two repositories and identifies behavior in the shared coding environment, not a project-specific command, test, or documentation gap. Existing project docs already provide focused build and test commands; changing either project is outside the demonstrated cause.

### Cross-session process changes
1. **Make bounded tool-output mode the default for sessions.**
   - **Evidence:** In Session A, 8,000 repeated progress lines filled context and caused the agent to rerun the command before a targeted read found the error. In Session B, verbose fixture output consumed context, triggered compaction, and led to rereading files. The configuration reference says bounded mode retains complete output locally, supplies an excerpt and file reference, supports retrieving ranges, preserves exit status, and respects permissions and retention controls. The current configuration instead selects passthrough mode.
   - **Problem:** Passthrough output turns noisy build/test logs into model context, increasing compaction and repeated work while making the actual failure harder to locate.
   - **Smallest change:** Change the operator’s global tool-output setting from passthrough to the existing bounded mode. Do not add project rules or a custom plugin unless the built-in setting cannot be selected or proves insufficient.
   - **When and verification:** Apply at session startup for all repositories and tool invocations. Run one noisy build/test command and confirm the model receives only a bounded excerpt plus a retrievable file reference, while the full output remains available, exit status is unchanged, and permissions/retention behavior remains intact. Compare whether sessions avoid compaction and duplicate reads. This is a hypothesis to test; the packet provides no evidence that bounded mode itself is insufficient.
   - **Controls:** Preserve the existing retrieval and retention controls. Because logs may contain private data, keep local output files under existing file permissions and require explicit retrieval rather than automatically sending the full log to the model.
