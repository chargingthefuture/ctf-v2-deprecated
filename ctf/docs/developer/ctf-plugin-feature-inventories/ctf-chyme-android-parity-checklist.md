# Chyme Plugin Android Parity Checklist

This checklist tracks Android feature parity for the Chyme plugin in the CTF rewrite.

## Parity Audit

| Feature                            | Android Parity Status | Notes / Ticket Link |
| ---------------------------------- | --------------------- | ------------------- |
| Authenticated room bootstrap       | Partially implemented (client-side, needs backend auth) |                     |
| Companion text chat (read/send)    | Implemented (client mock & API fallback) |                     |
| Stream-backed room join/token flow | Not implemented (requires backend token service) |                     |
| Service-scoped deletion request    | Implemented (mock client calls) |                     |
| Full-account deletion request      | Implemented (mock client calls) |                     |
| Participant list UI                | Implemented (UI with mock participants) |                     |
| Join-call action UI                | Partially implemented (Join action wired to mock) |                     |
| Chat panel UI                      | Implemented (messages list + send) |                     |
| Deletion actions UI                | Implemented (mocked delete actions) |                     |

_Last updated: 2026-03-26_
