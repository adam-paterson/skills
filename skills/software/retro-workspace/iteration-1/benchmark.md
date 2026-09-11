# Skill Benchmark: retro

**Model**: openai-codex/gpt-5.6-luna
**Date**: 2026-09-11T22:11:14Z
**Evals**: 1, 2, 3 (3 runs each per configuration)

## Summary

| Metric | With Skill | Without Skill | Delta |
|--------|------------|---------------|-------|
| Pass Rate | 93% ± 12% | 53% ± 18% | +0.40 |
| Time | 37.8s ± 9.9s | 35.1s ± 5.5s | +2.7s |
| Tokens | 29133 ± 4441 | 18129 ± 518 | +11004 |

## Notes

- Initial synthetic benchmark: 3 cases, 1 run per case/configuration, same gpt-5.6-luna executor. Not a repeated-trial estimate. Reported standard deviations measure differences between cases, not run-to-run reliability.
- Macro-average case pass rate: 93.3% with skill vs 53.3% without. Pooled checks: 10/11 vs 6/11. Criteria partly measure the skill's chosen environment-design policy, not universal correctness.
- Treatment improvements: points to existing billing documentation, places review policy outside always-loaded AGENTS.md, and avoids prescribing changes for the clean session.
- Both arms detect cross-tenant exposure, recommend isolation tests/typecheck, and preserve approval/read-only/sanitized log boundaries. These checks did not discriminate skill benefit.
- Both arms miss generic no-op steering as a pruning candidate. Both identify duplicated style guidance, but the compound assertion requires both.
- Clean-session fixture omits the actual CI result. Baseline interprets required CI checks as a missing full local test run; treatment accepts documented focused local validation. The two failing clean-session checks are interpretation-sensitive, not proof of hallucination. Excluding that case, macro pass rates are 90.0% vs 63.3%.
- With-skill navigation recommendation ambiguously includes implementation paths while saying to keep details in the doc; pointer assertion passed because it explicitly routes to existing docs.
- Pi acceptance scaffolding required concrete findings and residual risks in both arms and appended acceptance-report blocks. This can encourage over-reporting and affects external validity.
- All treatment transcripts read retro, the evidence packet, and writing-for-agents; baseline transcripts read only their packet. Each wrote only its assigned output. No tool errors or cross-case reads observed.
- Legacy Skill tool invocation adapted to file read; this is a Pi-compatible behavior benchmark, not an unmodified Claude invocation or automatic-trigger evaluation.
- Semantic grading performed inline by the benchmark author, not independently blinded. Evidence quote presence and actual tool usage checked programmatically.
- Tokens include cached input across all assistant turns, measured from persisted Pi usage; durations from workflow steps. Timing includes harness/report overhead.