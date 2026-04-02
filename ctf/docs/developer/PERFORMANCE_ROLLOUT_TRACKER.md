# Performance Rollout Tracker

Owner: AI agent (handoff-ready)
Status: In progress
Mode: Balanced thresholds, low CI overhead, warning-only gating

## Objective

Ship a repeatable, low-overhead performance program for web and Android with mobile-web coverage on iOS Safari. Track startup, responsiveness, smoothness, memory, and size, and prevent silent regressions.

## Device Matrix

- Low-end Chromebook: web
- Low-end Android device: native app and mobile web
- iOS device: mobile web (Safari)

## Scope Decisions

- Keep checks inside `ctf/` only.
- Keep CI overhead low by reusing existing build outputs in `rewrite-ci`.
- Start with warning-mode budgets to gather baseline without blocking merges.
- Do not reference or depend on `/platform`.

## Implementation Log

### Step 1: Persistent tracker created

- Created this tracker so work can resume without context loss.

### Step 2: Budget config and audit script created

- Added `ctf/config/performance-budgets.json` with balanced thresholds and warning-first policy.
- Added `ctf/scripts/performanceBudgetAudit.mjs`.
- Script computes low-overhead build footprint metrics using existing build outputs:
	- `web.jsBytes`
	- `web.cssBytes`
	- `android.totalBytes`
	- `android.jsBundleBytes`
- Script supports modes:
	- `warn`: never blocks
	- `block`: exits non-zero on blocked thresholds
- Script supports JSON output for CI artifact retention.

### Step 3: CI wiring (warning mode) completed

- Added package scripts:
	- `pnpm --dir ctf run perf:budgets`
	- `pnpm --dir ctf run perf:budgets:ci`
- Updated `.github/workflows/rewrite-ci.yml` to:
	- run budget audit after existing web/mobile build gates
	- upload budget JSON artifact
- This preserves low overhead by reusing already-built outputs.

## Work Backlog

- [x] Create durable tracker document
- [x] Add machine-readable performance budget config
- [x] Add low-overhead web/mobile size audit script
- [x] Add benchmark runbook for manual device runs
- [x] Add npm scripts for local and CI warning mode
- [x] Wire warning-mode check into `.github/workflows/rewrite-ci.yml`
- [ ] Run required local validation (`pnpm build`, lint/typecheck as needed)
- [ ] Run Codacy analysis for every edited file
- [ ] Update tracker with final outputs and follow-up actions

## Handoff Notes

If session ends abruptly, continue from the first unchecked backlog item and keep this file updated after each completed change.
