"""Rebuild inline semantic grades and verify their quoted evidence against reports.

Judgments are recorded by the benchmark author, not inferred by string matching.
Run: python3 skills/software/retro-workspace/iteration-2/grade_results.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
# Each record is (passed, exact quote, rationale). The final format/scope check
# is added below, separate from substantive behavior checks in the analysis.
GRADES = {
    (1, 'with_skill'): [
        (True, 'Add one conditional line to `AGENTS.md`', 'Routes billing work to existing docs and explicitly keeps policy details there.'),
        (True, 'change the query or scope before repeating a search', 'Links scoped searches to repeated, truncated broad calls.'),
        (True, 'no review miss is shown', 'Does not invent a testing or reviewer failure.'),
    ],
    (1, 'old_skill'): [
        (True, 'read `docs/billing.md` first', 'Provides a short conditional pointer; includes implementation paths but does not duplicate the full guide.'),
        (True, 'widening only when necessary', 'Recommends source directories, exclusions and globs based on the noisy repeated search.'),
        (True, 'No automated-check gap was demonstrated', 'Retains successful testing and review.'),
    ],
    (2, 'with_skill'): [
        (True, 'High — make tenant identity and authorization an explicit review invariant', 'Security precedes style/navigation as specified. Typecheck nevertheless comes first, an unscored prioritization concern.'),
        (True, 'Add `npm run typecheck` to the existing CI workflow', 'Also requires a cross-tenant negative test.'),
        (True, '`reviewer.md` (or the existing reviewer standards entry point)', 'Places review policy in reviewer guidance, with a pointer to domain docs.'),
        (True, 'Remove duplicated naming/import/comment/reviewer prose', 'Explicitly removes duplicated always-loaded guidance.'),
        (True, 'replace vague always-loaded steering', 'Identifies Think carefully/Write good code as no-op candidates. Does not claim a controlled experiment; causal language is stronger than the evidence.'),
        (True, 'use the approved sanitized read-only support path', 'Keeps access controls and leaves timeout cause unknown.'),
    ],
    (2, 'old_skill'): [
        (True, 'Make tenant isolation a mandatory automated invariant', 'Ranks isolation first.'),
        (True, 'run both `npm test` and `npm run typecheck`', 'Also requires tenant-isolation regression tests.'),
        (True, 'Move authoritative review rules to `CODING_STANDARDS.md`', 'Locates security review policy in review guidance.'),
        (True, '150 lines duplicating reviewer style rules', 'Moves the authoritative rules out of the steering file.'),
        (True, 'delete the generic no-op instructions', 'Names Think carefully/Write good code. No experimental result is claimed, though ineffectiveness is asserted more strongly than established.'),
        (True, 'approved read-only support path for sanitized export-job logs', 'Retains approval, least privilege, and unknown timeout cause.'),
    ],
    (3, 'with_skill'): [
        (True, 'No environment changes are supported', 'Explicit no-change conclusion.'),
        (True, 'Adding new rules or tooling would be speculative', 'No unsupported new process.'),
        (True, 'Local checks and the full required CI suite passed', 'Also cites navigation and review criteria.'),
    ],
    (3, 'old_skill'): [
        (True, 'No actionable environment changes are warranted', 'Explicit no-change conclusion.'),
        (True, 'Keep the current setup unchanged', 'No unsupported new process.'),
        (True, 'the reviewer and full CI confirmed the result', 'Also cites navigation and focused checks.'),
    ],
    (4, 'with_skill'): [
        (True, 'Session summaries are not a reliable record', 'Explains loss of scope, deferral and freshness across the supplied incidents, not absent project commands.'),
        (True, 'Add a Workshop extension', 'Proposes local state from tool completion and a resume message using supplied capabilities.'),
        (True, 'On resume, inject a short, explicit status block', 'Covers scope, stale results after edits, and deferred checks without fixed project commands. Capturing all pending work still needs design.'),
        (True, 'Interrupt and resume sessions containing', 'Specifies concrete replay cases and checking status against actual run/edit history.'),
        (True, 'preserve command approval flow', 'Keeps user-inspectable/deletable local metadata and avoids raw sensitive output retention.'),
        (True, 'observes tool completion', 'Uses documented capabilities descriptively, not invented API identifiers; no implementation claim.'),
    ],
    (4, 'old_skill'): [
        (True, 'loss of validation scope, deferral, and freshness', 'Identifies a cross-session process cause despite existing project instructions.'),
        (True, 'validation ledger to Workshop', 'Environment mechanism uses tool completion, local project state and resume messages.'),
        (True, 'Treat a validation result as stale when the project changes', 'Preserves scope and deferred checks; acknowledges edit-observation uncertainty and proposes checkpoint fallback.'),
        (False, 'This is a useful environment guard', 'Proposes mechanisms and desired effects, but gives no experiment, replay, or observable evaluation procedure for future sessions.'),
        (True, 'Any extension must preserve command approval', 'Preserves approval, metadata-only retention, and user-inspectable/deletable local state.'),
        (True, 'if Workshop cannot observe edits directly', 'Qualifies capability uncertainty and avoids fabricated API names or implementation claims.'),
    ],
    (5, 'with_skill'): [
        (True, 'rather than adding a new plugin or project rule', 'First recommendation uses existing global bounded mode.'),
        (True, 'Passthrough output caused context flooding in both sessions', 'Connects both incidents to reusable environment behavior.'),
        (True, 'Run a deliberately noisy command', 'Tests excerpt limits, full-output range retrieval, exit status, and repeated work.'),
        (True, 'Preserve the existing file permissions and retention controls', 'No invented option keys or implementation claims.'),
    ],
    (5, 'old_skill'): [
        (True, 'Change the global default', 'Uses existing bounded mode and explicitly rejects custom plugins.'),
        (True, 'This addresses both observed failures', 'Connects two different repositories to output handling in the environment.'),
        (True, 'Success criterion: verbose commands no longer consume', 'Observable reduced context cost with full retrieval and correct result, without rerunning.'),
        (True, 'retain the existing permission and retention safeguards', 'Acknowledges missing option identifiers and privacy controls.'),
    ],
}

for directory in sorted(ROOT.glob('eval-*')):
    metadata = json.loads((directory / 'eval_metadata.json').read_text())
    for config in ('with_skill', 'old_skill'):
        run = directory / config / 'run-1'
        output = (run / 'outputs/retro.md').read_text()
        judgments = GRADES[metadata['eval_id'], config]
        assert len(judgments) == len(metadata['assertions']) - 1
        rows = []
        for text, (passed, quote, reason) in zip(metadata['assertions'], judgments):
            assert quote in output, (run, quote)
            rows.append(dict(text=text, passed=passed, evidence=f'"{quote}" — {reason}'))
        heading = bool(re.search(r'^#{1,6}\s+Changes\s*$', output, re.MULTILINE))
        # Author reviewed the new reports: they locate project changes, name
        # process changes, or explicitly reject unsupported process/project work.
        scope_separated = config == 'with_skill'
        rows.append(dict(
            text=metadata['assertions'][-1],
            passed=heading and scope_separated,
            evidence=('Changes heading present; report identifies project/process changes or unsupported work.'
                      if heading and scope_separated else
                      'No Changes section. Scope may be discussed elsewhere, but the requested report structure is absent.'),
        ))
        passed = sum(row['passed'] for row in rows)
        metrics = json.loads((run / 'metrics.json').read_text())
        metrics['output_chars'] = len(output)
        result = dict(
            expectations=rows,
            summary=dict(passed=passed, failed=len(rows)-passed, total=len(rows), pass_rate=passed/len(rows)),
            execution_metrics=metrics,
            eval_feedback=dict(overall='Inline, unblinded semantic judgments with verified evidence quotations. Format/scope criterion analyzed separately. Prioritization assertion does not compare security with typechecking; neither this run nor the fixtures establish causal no-op behavior.'),
        )
        (run / 'grading.json').write_text(json.dumps(result, indent=2) + '\n')
        print(directory.name, config, f'{passed}/{len(rows)}')
