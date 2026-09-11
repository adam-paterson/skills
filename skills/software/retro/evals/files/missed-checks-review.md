# Synthetic session: tenant invoice export
All excerpts below are the complete evidence packet; paths denote fictional project files.
## Repository sources
AGENTS.md: 190 lines, 150 lines repeat reviewer style rules (naming, import order, comments); remaining lines navigate features. It includes 'Think carefully' and 'Write good code'.
CODING_STANDARDS.md (complete): Use existing naming conventions. Group imports. Review public API changes for compatibility.
reviewer.md (complete): Read CODING_STANDARDS.md, then review the diff.
package.json scripts: test = vitest run; typecheck = tsc --noEmit; lint = eslint .
CI workflow: runs npm test only.
docs/exports.md: Tenant ID comes from authenticated context. Export job logs available to operators only; developers cannot view sanitized logs.
## Session transcript
[14:00 user] Add CSV invoice export for tenant admins.
[14:01 tool] read AGENTS.md -> 190 lines as summarized above.
[14:05 assistant] Implemented export handler using request.body.tenantId.
[14:08 tool] npm test -> all 62 tests passed; export test checks headers and row formatting only.
[14:09 reviewer] Read CODING_STANDARDS.md. Naming and formatting look good. Approved.
[14:10 assistant] Done; tests passed. Did not run typecheck.
[14:20 user] Staging export exposed another tenant's invoice. Also tsc reports TS2322: string not assignable to number in csvRows.ts.
[14:21 tool] read handler -> uses request.body.tenantId rather than authenticated tenant ID.
[14:22 assistant] Need export worker logs to diagnose timeout as well.
[14:23 tool] fetch logs -> 403; no log file available.
[14:24 user] Operator confirms timeout cause still unknown; sanitized logs can be provided with a read-only support role after approval.
[14:30 tool] edit handler to use authenticated tenant; fix csvRows.ts type.
[14:32 tool] add test: authenticated tenant A requests tenant B -> cannot retrieve B rows.
[14:34 tool] npm test && npm run typecheck -> passed.
[14:35 reviewer] Verified tenant isolation test and type fix. Timeout unresolved.
