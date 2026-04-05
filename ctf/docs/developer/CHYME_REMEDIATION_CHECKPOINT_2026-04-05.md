# Chyme Remediation Checkpoint — 2026-04-05

## Why This File Exists

Temporary checkpoint file to preserve the Chyme review findings and remediation scope in case the current Codespace crashes before the work is complete. This file must be deleted before the task is finalized.

## Confirmed Gaps

1. Chyme route access policy is weaker than the documented contract.
   - `packages/web/app/api/chyme/_lib.ts` does not require approved-user-or-admin access for room, message, and join routes.
2. Android parity is not real.
   - `packages/mobile/src/features/chyme/ChymeApi.ts` falls back to in-memory mock data.
   - `packages/mobile/src/features/chyme/ChymeRoom.tsx` surfaces mock success states.
3. Web Chyme surface is still a mock shell.
   - `packages/web/components/chyme/chyme-shell.tsx` renders `components/mockups/survivor-hub/Chyme.tsx` instead of a real feature shell.
4. Full-account deletion artifacts overstate the implementation.
   - Current code records a Chyme deletion event but does not enqueue a real Service Credits reclaim dependency.
5. Stream architecture is not aligned to the repo rule.
   - Chyme Stream integration lives under `packages/web/lib/chyme/stream.ts` instead of shared adapters under `packages/shared`.
   - The web client imports `stream-chat` directly in `packages/web/components/community-shell/use-home-chat.ts`.
6. Stream quota artifacts for Chyme are missing.
   - No Chyme quota-impact note exists under `docs/quota-impact/`.
7. Testing/docs are out of sync.
   - `docs/testing/CHYME_FIRST_TEST_PASS.md` references a migration file that does not exist while the repo rules require `ctf/schema.sql` as the canonical schema source.
8. Mobile package validation is currently broken independently of Chyme.
   - `@ctf/mobile` typecheck/build configuration needs correction before Android parity can be validated.

## Required Remediation Scope

1. Fix backend contract enforcement.
2. Replace the mock web Chyme screen with a real API-backed shell.
3. Remove mobile mock behavior and implement real Chyme room/chat/join/deletion flows.
4. Move Chyme Stream adapter logic into `packages/shared` and consume it from the web package.
5. Record a real downstream Service Credits reclaim dependency during full-account deletion request creation.
6. Update inventory, checklist, testing docs, and quota-impact artifacts to match the implementation.
7. Re-run relevant validation and delete this checkpoint file at the end.

## Open Technical Ambiguity

The mobile app currently has no real auth integration and no existing Stream audio/video client stack. If the repository does not already support a preferred mobile auth/call path, a narrow user decision may still be required on whether to add Clerk Expo plus a native Stream mobile client stack or to scope parity to the shipped room/chat/join/deletion behaviors without an in-app live audio UI.