# Retrospective: output flooding

## Evidence and limits

The packet shows two sessions where tool output consumed useful context:

- Session A emitted 8,000 repeated progress lines before the actual error. The agent then repeated the command, although a targeted read located the error at 09:13.
- Session B passed its tests, but verbose fixture output consumed most of the remaining context. Compaction caused the agent to reread files and repeat work.

The environment already has a bounded output mode that retains complete output locally, returns a bounded excerpt and file reference, supports retrieving ranges, preserves permissions and exit status, and has retention controls. The current configuration uses passthrough. The packet does not provide exact option/API names, and it provides no evidence that bounded mode is insufficient. Logs can contain private data.

## Changes

### High — make bounded tool output the default

- **Type:** Cross-project environment/configuration change.
- **Evidence:** Passthrough output caused context flooding in both sessions, repeated commands in A, and compaction/rereading in B. The existing bounded mode directly addresses this and preserves retrieval and exit status.
- **Smallest change:** Change the operator's global tool-output setting from passthrough to bounded mode. Keep full output in the existing local reference mechanism rather than adding a new plugin or project rule.
- **Verification:** Run a deliberately noisy command and confirm the model receives only the bounded excerpt plus a usable file reference; retrieve the error range and confirm the command's original exit status is still visible. Repeat with a verbose test run.
- **Control/privacy:** Preserve the existing file permissions and retention controls. Confirm the user can opt into passthrough for an exceptional debugging run, and define/verify retention behavior for logs containing private data.

### Medium — add an output-aware recovery behavior if configuration alone is not enough

- **Type:** Cross-project process/environment change; hypothesis to test.
- **Evidence:** In A the agent reran the noisy command to find the error, and in B context compaction triggered redundant rereading. Bounded mode should reduce both risks, but the packet does not show behavior after switching modes.
- **Smallest change:** First test bounded mode. If agents still rerun commands or fail to use the file reference, add a short global instruction or environment affordance for tool output: inspect the bounded excerpt/reference and retrieve a narrow range before rerunning a command. Put this in the global agent guidance only if the experiment demonstrates a gap; do not duplicate project build/test instructions.
- **Verification:** Compare equivalent noisy runs before/after the change for reruns, unnecessary rereads, and task completion. Treat benefit as unproven until observed.

## Not recommended

- No project-specific build/test changes: existing project docs already provide focused commands, while flooding originates in the coding environment's tool-output handling.
- No new output plugin: an existing bounded capability covers the observed problem, and no evidence shows it is inadequate.
- No blanket rule to suppress all logs: agents need targeted ranges for diagnosis, and build/test output may contain private data.

## Unknowns

The packet does not establish the bounded excerpt size, how the file reference is presented to agents, whether the global setting can be changed without source edits, or whether agents reliably retrieve ranges. Those should be checked during the verification experiment rather than guessed in documentation.
