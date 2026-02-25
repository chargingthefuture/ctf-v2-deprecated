# Chyme Rewrite Checklist (CTF)

## Scope and Boundary

- [x] Confirm implementation scope is `ctf/` only.
  - Acceptance criteria:
    - Existing Chyme implementation lives under `ctf/packages/web`, `ctf/packages/shared`, and `ctf/migrations`.
- [x] Confirm plugin ID and room key stability.
  - Acceptance criteria:
    - Plugin slug remains `chyme`.
    - Default room remains `chyme-main-room` unless an explicit migration plan is approved.
- [x] Confirm profile/deletion contract exists.
  - Acceptance criteria:
    - `ctf/docs/contracts/CHYME_PROFILE_AND_DELETION_CONTRACT.md` exists and maps current behavior.

## Phase 0 — Baseline Inventory and Contract Alignment

- [x] Create CTF rewrite inventory for implemented Chyme baseline.
  - Acceptance criteria:
    - `ctf-chyme-feature-inventory.md` exists in Rule 120 folder with required sections.
- [x] Add/align Chyme command schema contract artifact.
  - Acceptance criteria:
    - Chyme command contract is documented using Rule 201 template conventions.
- [x] Add/align Chyme access policy contract artifact.
  - Acceptance criteria:
    - Chyme access/deny conditions are documented using Rule 202 template conventions.
- [x] Add/align Chyme audit contract artifact.
  - Acceptance criteria:
    - Chyme allow/deny decision evidence fields are documented using Rule 203 template conventions.

## Phase 1 — Implemented Route and Data Validation

- [x] Validate room bootstrap route behavior.
  - Acceptance criteria:
    - `GET /api/chyme/room` upserts profile/member and returns room state for approved users.
- [x] Validate chat list/send route behavior.
  - Acceptance criteria:
    - `GET /api/chyme/messages` returns bounded room history.
    - `POST /api/chyme/messages` rejects empty text and persists successful sends.
- [x] Validate Stream join route behavior.
  - Acceptance criteria:
    - `POST /api/chyme/join` returns Stream credentials when server config is present.
    - Route returns `503` when Stream server config is unavailable.
- [x] Validate migration/data model coverage.
  - Acceptance criteria:
    - Core tables and indexes from `2026-02-19-create-chyme-core-tables.sql` exist and match route assumptions.

## Phase 2 — Deletion and Compliance Validation

- [x] Validate service-scoped deletion flow.
  - Acceptance criteria:
    - `DELETE /api/account/chyme-profile` marks profile deleted, removes user room membership/messages, records service deletion event.
- [x] Validate full-account request behavior.
  - Acceptance criteria:
    - `DELETE /api/account/full-account` records account-scope deletion request and enqueues Service Credits reclaim dependency.
- [ ] Align full-account lifecycle statuses with global orchestrator model.
  - Acceptance criteria:
    - Status model (`requested`/`processing`/`completed`/`failed`) is represented consistently in account deletion workflow.

## Phase 3 — Seed and Deterministic Dev Validation

- [ ] Add deterministic Chyme seed script.
  - Acceptance criteria:
    - Seed script under `ctf/scripts/` creates predictable Chyme baseline test data for local/dev validation.
- [x] Maintain manual validation checklist.
  - Acceptance criteria:
    - `ctf/docs/testing/CHYME_FIRST_TEST_PASS.md` covers migration, room/chat/join, and deletion checks.

## Phase 4 — Web/Android Parity

- [x] Confirm web Chyme baseline is implemented.
  - Acceptance criteria:
    - Web UI and API support room, chat, join, and deletion actions.
- [ ] Implement Android parity for Chyme plugin flows.
  - Acceptance criteria:
    - Android delivers equivalent room/chat/join/deletion behavior and policy outcomes.
- [ ] Close platform parity deferment with owner/date.
  - Acceptance criteria:
    - Deferred Android items have explicit owner, target milestone, and validation evidence.

## Phase 5 — Release Gates and Lifecycle Maintenance

- [x] Close Chyme release-gate documentation debt.
  - Acceptance criteria:
    - Command/access/audit contract artifacts are present and reviewed.
- [ ] Capture evidence links for every completed item.
  - Acceptance criteria:
    - Completed checklist entries reference concrete PR/commit/test evidence.
- [ ] Keep Chyme inventory/checklist synchronized with accepted changes.
  - Acceptance criteria:
    - Feature/behavior changes update both Chyme docs in the same PR.

## Change Log

- 2026-02-25: Created initial Chyme rewrite checklist from implemented baseline; marked completed baseline checks and captured remaining governance/seed/parity gaps.
- 2026-02-25: Added Chyme command/access/audit YAML triplet artifacts and marked contract/release-gate documentation items complete.
