# Chyme Remediation Checkpoint

Created: 2026-04-05

## Review Findings To Fix

1. Chyme room/chat/join routes do not enforce the documented `approved user or admin` access gate.
2. Android parity is not complete; the mobile Chyme implementation uses a mock fallback and mock success messaging.
3. Full-account deletion only records a Chyme deletion request and does not enqueue/log the documented Service Credits reclaim dependency.
4. Chyme uses Stream Chat directly from web UI code instead of shared wrappers/adapters and does not provide a true audio/video call surface.
5. Chyme release artifacts are incomplete for Stream requirements: no Chyme quota-impact note, no Chyme degraded-mode validation coverage, no Chyme-specific tests.
6. Chyme testing docs still reference a non-existent migration file instead of the canonical `ctf/schema.sql` flow.
7. Current workspace validation is failing and must be rerun after Chyme fixes.

## Required Outcome

1. Fix backend policy and deletion contract implementation.
2. Replace scaffolded/mock Android Chyme behavior with real parity flows.
3. Move Chyme Stream integration behind shared adapters and support chat plus call join consistently.
4. Update inventory, checklist, testing evidence, and quota-impact artifacts to match implementation.
5. Re-run validation, then delete this temporary checkpoint file.