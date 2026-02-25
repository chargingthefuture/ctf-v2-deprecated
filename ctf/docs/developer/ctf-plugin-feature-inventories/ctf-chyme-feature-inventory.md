# Chyme Plugin Feature Inventory (CTF Rewrite)

## Scope and Boundary

- Rewrite target only: `ctf/`
- Legacy `platform/` remains reference-only and must not be modified.
- Unified plugin scope slug: `chyme`
- This document captures the **implemented baseline** plus remaining rewrite hardening items.

## Intent and Outcome

Chyme delivers a lightweight social-audio room with companion text chat, Stream-backed room join flow, and plugin-scoped deletion behavior under the CTF plugin-first architecture.

Lifecycle/governance references applied:

1. Inventory/checklist lifecycle follows `.claude/rules/120-plugin-feature-inventory-lifecycle-rules.mdc`.
2. Profile/deletion boundaries follow `.claude/rules/114-single-profile-and-plugin-extension-rules.mdc` and `ctf/docs/contracts/CHYME_PROFILE_AND_DELETION_CONTRACT.md`.
3. Current implementation evidence comes from `ctf/migrations/2026-02-19-create-chyme-core-tables.sql` and Chyme routes/repository in `packages/web`.

## Implemented User Features

1. Authenticated room bootstrap via `GET /api/chyme/room` with deterministic room provisioning (`chyme-main-room`) and participant upsert.
2. Companion text chat read/send via `GET /api/chyme/messages` and `POST /api/chyme/messages`.
3. Stream-backed room join/token flow via `POST /api/chyme/join`.
4. Service-scoped deletion request via `DELETE /api/account/chyme-profile`.
5. Full-account deletion request initiation via `DELETE /api/account/full-account` (request recording and Service Credits reclaim enqueue).
6. Web UI surface includes participant list, join-call action, chat panel, and deletion actions.

## Implemented Admin Features

1. No Chyme-specific admin UI or admin-only Chyme route family is currently implemented.
2. Eligibility gate currently reuses shared access approval model (`approved user` or `admin` can access room/chat/join routes).

## API Surface and Route Map (Implemented)

Chyme plugin routes:

- `GET /api/chyme/room`
- `GET /api/chyme/messages`
- `POST /api/chyme/messages`
- `POST /api/chyme/join`

Deletion/account routes used by Chyme UI:

- `DELETE /api/account/chyme-profile`
- `DELETE /api/account/full-account`

Current command-contract note:

- Chyme is currently implemented as route + repository flows.
- Plugin command/access/audit YAML triplet artifacts are present:
   - `ctf/docs/contracts/CHYME_PLUGIN_COMMAND_CONTRACTS.yaml`
   - `ctf/docs/contracts/CHYME_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml`
   - `ctf/docs/contracts/CHYME_PLUGIN_AUDIT_CONTRACTS.yaml`

## Data Model and Storage Contracts (Implemented)

Canonical migration: `ctf/migrations/2026-02-19-create-chyme-core-tables.sql`

1. `chyme_rooms`
   - Shared room metadata (`service_name='chyme'`, `call_active`).
2. `chyme_service_profiles`
   - Plugin extension lifecycle per user (`active|deleted`, timestamps).
3. `chyme_room_members`
   - Membership roster keyed by `(room_id, user_id)`, role enum (`speaker|listener`), last-seen updates.
4. `chyme_messages`
   - Message history with DB-level text constraint (`1..1000` chars).
5. `chyme_deletion_events`
   - Service/account deletion event log.

## Security, Privacy, and Compliance Controls (Implemented)

1. Clerk-authenticated access is required on Chyme routes; unauthenticated requests are denied (`401`).
2. Access gate enforces approved-user or admin eligibility (`403` for non-approved non-admin users).
3. Message payloads are trimmed server-side and rejected when empty.
4. Service deletion runs in transaction and records deletion event for audit trail.
5. Full-account endpoint currently records request and enqueues Service Credits reclaim dependency.

## Web and Android Delivery Status

1. Web implementation is present for room/chat/join/deletion workflows.
2. Android parity is not yet implemented for Chyme surfaces/flows.
3. Current parity status is **web-first baseline implemented; Android follow-up required**.

## Seed Coverage Status

Rule requirement: deterministic plugin seed script for manual validation in dev environments.

Current status:

- Migration exists, and manual validation checklist exists (`ctf/docs/testing/CHYME_FIRST_TEST_PASS.md`).
- No dedicated deterministic Chyme seed script is present yet under `ctf/scripts/`.

## Gaps, Ambiguities, and Known Technical Debt

1. No Chyme deterministic seed script for repeatable dev bootstrap.
2. Android parity for Chyme plugin is pending.
3. Full-account delete endpoint is request-recording + reclaim enqueue, not full orchestrated status lifecycle.
4. Chyme-specific admin tooling and moderation controls are not implemented.

## Delivery Follow-up Phasing (Post-baseline)

1. Phase A — Governance hardening:
   - add command/access/audit YAML contracts,
   - map deny taxonomy explicitly.
2. Phase B — Deterministic dev/test readiness:
   - add Chyme seed script,
   - wire checklist evidence references.
3. Phase C — Android parity:
   - implement mobile room/chat/join/deletion parity with matching policy outcomes.
4. Phase D — Deletion orchestration closure:
   - align full-account lifecycle statuses with global orchestrator.

## Change Log

- 2026-02-25: Created initial Chyme CTF rewrite inventory from existing implemented baseline (routes, repository, migration, and web UI) and documented remaining governance/parity gaps.
- 2026-02-25: Added Chyme command/access/audit YAML triplet references and removed contract-triplet gap from known technical debt.
