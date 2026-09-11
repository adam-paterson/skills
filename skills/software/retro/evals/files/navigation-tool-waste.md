# Synthetic session: billing retry fix
All excerpts below are the complete evidence packet; paths denote fictional project files.
## Repository sources
AGENTS.md (complete): Use npm. Run relevant tests before finishing.
docs/billing.md (existing): Retry policy lives in packages/payments/src/retry.ts; apps/api/src/billing.ts delegates to it. Run npm run test:billing.
package.json scripts: test:billing = vitest run packages/payments; test = vitest run.
## Session transcript
[09:00 user] Fix billing retries when the gateway returns 429.
[09:01 tool] rg retry . -> 28,400 lines including vendor and lock files, truncated.
[09:03 tool] read apps/api/src/billing.ts -> delegates retryPayment imported from @payments/retry.
[09:05 tool] rg retry . -> same truncated 28,400 lines.
[09:08 assistant] Cannot locate retry policy.
[09:10 user] See docs/billing.md.
[09:11 tool] read docs/billing.md -> packages/payments/src/retry.ts.
[09:12 tool] read packages/payments/src/retry.ts -> rate-limit branch ignores Retry-After.
[09:15 tool] edit policy and add test for 429 with Retry-After.
[09:16 tool] npm run test:billing -> 14 passed.
[09:18 reviewer] Correct shared-policy fix; tests cover regression. Approved.
[09:19 assistant] Fixed and verified.
