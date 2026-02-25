# CTF Plugin Agent Task Briefs (Copy-Paste Prompts)

Date: 2026-02-25

Use these prompts to dispatch background agents.

Dispatch note:
- Use `Prompt 00 — agent-00-chyme-hardening` only for missing-work validation/hardening on already-implemented Chyme.
- Do not dispatch a full implementation pass for Chyme unless a specific missing capability is first confirmed.

---

## Prompt 00 — `agent-00-chyme-hardening`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-chyme-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-chyme-rewrite-checklist.md
- #file:ctf/docs/contracts/CHYME_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/CHYME_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/CHYME_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/CHYME_PROFILE_AND_DELETION_CONTRACT.md
- #file:ctf/docs/testing/CHYME_FIRST_TEST_PASS.md

You are `agent-00-chyme-hardening` working only under `ctf/`.
Start gate:
- Retrofit hardening track — can start immediately.

Critical non-duplication constraint:
- Chyme is already implemented. Do NOT rebuild existing Chyme room/chat/join/deletion functionality.
- Do NOT rename routes, commands, or tables unless required to fix a verified mismatch.
- Only do missing work from inventory/checklist gaps, validation evidence, and parity/debt closure.

Scope:
- Verify implemented behavior matches inventory/contracts/checklist.
- Close only missing work items (for example: seed determinism, evidence links, parity deferment plan, orchestrator-status alignment notes).
- If no code gap is found for a checklist item, add evidence and mark status instead of changing implementation.

Must follow:
- Rule precedence from #file:index.mdc.
- Plugin command/access/audit templates (201/202/203).

Deliverables:
1) Gap report: implemented vs missing
2) Minimal code/docs changes only for confirmed gaps
3) Validation evidence updates in checklist
4) Explicit no-duplication statement in handoff
5) Test/manual validation evidence (or blocked-by list)

Handoff output:
- List changed files
- What was intentionally NOT changed (already implemented)
- Remaining open gaps with owner recommendation
```

## Prompt 01 — `agent-01-taxonomy-core`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-skills-taxonomy-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-skills-taxonomy-rewrite-checklist.md
- #file:ctf/docs/contracts/SKILLS_TAXONOMY_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/SKILLS_TAXONOMY_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/SKILLS_TAXONOMY_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/SKILLS_TAXONOMY_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-01-taxonomy-core` working only under `ctf/`.
Start gate:
- Phase 0 — start immediately.

Scope:
- Implement `skills-taxonomy` plugin core capabilities.
- Deliver hierarchy + flattened read models, CRUD for sectors/job-titles/skills, dependency-impact preview, and destructive-action safeguards.

Must follow:
- Rule precedence from #file:index.mdc.
- Plugin command/access/audit templates (201/202/203).

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) API + policy enforcement
4) Seed fixtures
5) Test evidence

Handoff output:
- List changed files
- Contract decisions and any open risks
- Compatibility notes for Directory and Workforce consumers
```

## Prompt 02 — `agent-02-directory-core`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-directory-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-directory-rewrite-checklist.md
- #file:ctf/docs/contracts/DIRECTORY_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/DIRECTORY_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/DIRECTORY_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/DIRECTORY_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-02-directory-core` working only under `ctf/`.
Start gate:
- Phase 0 — start immediately; align selector contracts with Skills Taxonomy as they stabilize.

Scope:
- Implement `directory` unified user/admin surface with role-gated controls.
- Implement profile + announcements routes, public projection routes, and claimed/unclaimed policy guardrails.

Must follow:
- Rule precedence from #file:index.mdc.
- Single-profile/plugin-extension boundaries.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) Policy/audit enforcement on write paths
4) Seed updates + parity notes
5) Test evidence

Handoff output:
- List changed files
- Selector compatibility notes with skills-taxonomy
- Any unresolved policy decisions
```

## Prompt 03 — `agent-03-feed-announcements`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-feed-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-feed-rewrite-checklist.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-announcements-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-announcements-rewrite-checklist.md
- #file:ctf/docs/contracts/FEED_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/FEED_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/FEED_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/FEED_PROFILE_AND_DELETION_CONTRACT.md
- #file:ctf/docs/contracts/ANNOUNCEMENTS_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/ANNOUNCEMENTS_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/ANNOUNCEMENTS_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/ANNOUNCEMENTS_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-03-feed-announcements` working only under `ctf/`.
Start gate:
- Phase 0 — start immediately as a combined stream (do not split Feed and Announcements before contract lock).

Scope:
- Implement `feed` and `announcements` together with centralized admin surface `/admin/feed-announcements`.
- Deliver timeline, announcement lifecycle (draft/publish/archive), and membership-event driven visibility updates.

Must follow:
- Rule precedence from #file:index.mdc.
- Keep feed+announcements contracts aligned and avoid split ownership drift.

Deliverables:
1) Updated contracts (both plugins)
2) Migrations + schema-drift evidence
3) API + policy checks + audit coverage
4) Quota-impact note for fan-out changes
5) Test evidence

Handoff output:
- List changed files
- Feed/announcements coupling decisions
- Deferred parity items (if any) with owner/date
```

## Prompt 04 — `agent-04-workforce`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-workforce-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-workforce-rewrite-checklist.md
- #file:ctf/docs/contracts/WORKFORCE_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/WORKFORCE_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/WORKFORCE_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/WORKFORCE_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-04-workforce` working only under `ctf/`.
Start gate:
- Phase 1 — start after Directory contracts/migrations stabilize.

Scope:
- Implement `workforce` dashboard/reporting, occupations/admin flows, export workflow, and recruited-state derivation.
- Respect Directory-upstream inference rules.

Must follow:
- Rule precedence from #file:index.mdc.
- Canonical metric registry requirements.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) Recruited derivation implementation + policy checks
4) Canonical metric update notes
5) Test evidence

Handoff output:
- List changed files
- Directory dependency assumptions
- Remaining open compliance/metric decisions
```

## Prompt 05 — `agent-05-skills-hunt`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-skills-hunt-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-skills-hunt-rewrite-checklist.md
- #file:ctf/docs/contracts/SKILLS_HUNT_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/SKILLS_HUNT_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/SKILLS_HUNT_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/SKILLS_HUNT_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-05-skills-hunt` working only under `ctf/`.
Start gate:
- Phase 1 — start after Directory policy adapters and ownership lifecycle contracts are stable.

Scope:
- Implement round lifecycle, submission moderation/scoring, leaderboards, achievements, notifications, and feature-reward card.
- Implement governed generation of unclaimed Directory profiles only.

Must follow:
- Rule precedence from #file:index.mdc.
- Do not bypass Directory policy controls.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) Anti-spam + moderation policy enforcement
4) Directory adapter governance evidence
5) Test evidence

Handoff output:
- List changed files
- Directory integration behavior summary
- Open policy ambiguities
```

## Prompt 06 — `agent-06-foundation`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-foundation-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-foundation-rewrite-checklist.md
- #file:ctf/docs/contracts/FOUNDATION_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/FOUNDATION_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/FOUNDATION_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/FOUNDATION_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-06-foundation` working only under `ctf/`.
Start gate:
- Phase 1 — start after Directory read-only projections are stable.

Scope:
- Implement Foundation provider search, connection/message/call flows, quote lifecycle, history, notifications, and admin capacity controls.
- Use Directory read-only projections only.

Must follow:
- Rule precedence from #file:index.mdc.
- Enforce no-write boundary to Directory.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) API + policy + audit coverage
4) Read-only boundary validation evidence
5) Test evidence

Handoff output:
- List changed files
- Boundary compliance summary
- Any capacity/rate-limit follow-up tasks
```

## Prompt 07 — `agent-07-lighthouse`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-lighthouse-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-lighthouse-rewrite-checklist.md
- #file:ctf/docs/contracts/LIGHTHOUSE_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/LIGHTHOUSE_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/LIGHTHOUSE_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/LIGHTHOUSE_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-07-lighthouse` working only under `ctf/`.
Start gate:
- Phase 2 — parallel start after Phase 0 kickoff.

Scope:
- Implement profile/property/match/announcements/blocks parity scope for LightHouse.
- Preserve role and ownership policy constraints.

Must follow:
- Rule precedence from #file:index.mdc.
- Blocks are required in v1 parity scope.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) API + policy + CSRF/audit coverage
4) Blocks lifecycle implementation evidence
5) Test evidence

Handoff output:
- List changed files
- Remaining open parity/risk items
- Admin and user flow validation summary
```

## Prompt 08 — `agent-08-socketrelay`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-socketrelay-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-socketrelay-rewrite-checklist.md
- #file:ctf/docs/contracts/SOCKETRELAY_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/SOCKETRELAY_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/SOCKETRELAY_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/SOCKETRELAY_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-08-socketrelay` working only under `ctf/`.
Start gate:
- Phase 2 — parallel start after Phase 0 kickoff.

Scope:
- Implement profile/request/fulfillment/chat/public sharing/admin moderation for SocketRelay.

Must follow:
- Rule precedence from #file:index.mdc.
- Preserve privacy-minimized public DTO projection contracts.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) API + policy + CSRF/admin write checks
4) Public projection privacy evidence
5) Test evidence

Handoff output:
- List changed files
- Public DTO contract summary
- Known debt and mitigation notes
```

## Prompt 09 — `agent-09-trusttransport`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-trusttransport-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-trusttransport-rewrite-checklist.md
- #file:ctf/docs/contracts/TRUSTTRANSPORT_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/TRUSTTRANSPORT_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/TRUSTTRANSPORT_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/TRUSTTRANSPORT_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-09-trusttransport` working only under `ctf/`.
Start gate:
- Phase 2 — parallel start after Phase 0 kickoff.

Scope:
- Implement ride/package/food request-and-fulfillment flows, safety controls, disputes, payouts, and admin market controls.

Must follow:
- Rule precedence from #file:index.mdc.
- Preserve trauma-informed and safety-first constraints.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) Policy + audit coverage for safety/dispute/payout actions
4) Risk/compliance control implementation notes
5) Test evidence

Handoff output:
- List changed files
- Safety/risk decisions taken
- Remaining compliance questions
```

## Prompt 10 — `agent-10-peer-programming`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-peer-programming-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-peer-programming-rewrite-checklist.md
- #file:ctf/docs/contracts/PEER_PROGRAMMING_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/PEER_PROGRAMMING_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/PEER_PROGRAMMING_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/PEER_PROGRAMMING_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-10-peer-programming` working only under `ctf/`.
Start gate:
- Phase 2 — parallel start after Phase 0 kickoff.

Scope:
- Implement weekly cohort assignment, in-app assignment notifications, persistent room/thread interactions, tiered participation, and weekly topic guidance admin.

Must follow:
- Rule precedence from #file:index.mdc.
- Preserve deterministic cohort and fallback-open behaviors.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) Tier/policy enforcement + notification idempotency
4) Persistence and fallback behavior evidence
5) Test evidence

Handoff output:
- List changed files
- Cohort algorithm decisions and edge cases
- Open operational risks
```

## Prompt 11 — `agent-11-mood`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-mood-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-mood-rewrite-checklist.md
- #file:ctf/docs/contracts/MOOD_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/MOOD_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/MOOD_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/MOOD_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-11-mood` working only under `ctf/`.
Start gate:
- Phase 2 — parallel start after Phase 0 kickoff.

Scope:
- Implement mood check submission and eligibility endpoint with 7-day cooldown.
- Keep standalone mood scope (no admin/announcements scope).

Must follow:
- Rule precedence from #file:index.mdc.
- Preserve authenticated routes with anonymous `clientId` persistence contract.

Deliverables:
1) Updated contracts
2) Migrations/schema notes (if changed)
3) API + validation + policy checks
4) Cooldown + multi-device behavior notes
5) Test evidence

Handoff output:
- List changed files
- Anonymity/persistence policy assumptions
- Open product decision points
```

## Prompt 12 — `agent-12-gentlepulse`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-gentlepulse-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-gentlepulse-rewrite-checklist.md
- #file:ctf/docs/contracts/GENTLEPULSE_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/GENTLEPULSE_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/GENTLEPULSE_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/GENTLEPULSE_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-12-gentlepulse` working only under `ctf/`.
Start gate:
- Phase 2 — parallel start after Phase 0 kickoff.

Scope:
- Implement library listing/detail/play, ratings, favorites, and support route behavior.
- Respect exclusions: no in-app admin routes, no plugin-scoped announcements, no progress endpoints.

Must follow:
- Rule precedence from #file:index.mdc.
- Keep app-level settings ownership outside plugin scope.

Deliverables:
1) Updated contracts
2) Migrations/schema notes (if changed)
3) API + validation + policy checks
4) Anonymous-to-auth cutover/backfill notes
5) Test evidence

Handoff output:
- List changed files
- Scope-exclusion checks
- Open migration/cutover risks
```

## Prompt 13 — `agent-13-weekly-performance`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-weekly-performance-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-weekly-performance-rewrite-checklist.md
- #file:ctf/docs/contracts/WEEKLY_PERFORMANCE_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/WEEKLY_PERFORMANCE_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/WEEKLY_PERFORMANCE_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/WEEKLY_PERFORMANCE_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-13-weekly-performance` working only under `ctf/`.
Start gate:
- Phase 2 — parallel start after Phase 0 kickoff.

Scope:
- Implement admin week selection, week navigation guardrails, current-week polling semantics, metrics/comparison routes, and export path (if approved).

Must follow:
- Rule precedence from #file:index.mdc.
- Keep non-financial metric scope.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) API + policy + audit coverage
4) Week-boundary contract validation
5) Test evidence

Handoff output:
- List changed files
- Metric dictionary assumptions
- Export gate status and open decisions
```

## Prompt 14 — `agent-14-gdp`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-gross-domestic-product-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-gross-domestic-product-rewrite-checklist.md
- #file:ctf/docs/contracts/GDP_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/GDP_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/GDP_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/GDP_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-14-gdp` working only under `ctf/`.
Start gate:
- Phase 3 — start after upstream metric/event semantics are stable from Phases 1 and 2.

Scope:
- Implement Gross Domestic Product aggregate transparency/reporting/admin publish flows with compliance controls.

Must follow:
- Rule precedence from #file:index.mdc.
- Preserve DP/suppression and lawful-basis controls.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) API + policy + audit coverage
4) GDP metric governance evidence
5) Test evidence

Handoff output:
- List changed files
- Data-governance/compliance decision summary
- Open legal/compliance dependencies
```

## Prompt 15 — `agent-15-service-credits`

```text
Read this first: #file:index.mdc
Then read:
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-service-credits-feature-inventory.md
- #file:ctf/docs/developer/ctf-plugin-feature-inventories/ctf-service-credits-rewrite-checklist.md
- #file:ctf/docs/contracts/SERVICE_CREDITS_PLUGIN_COMMAND_CONTRACTS.yaml
- #file:ctf/docs/contracts/SERVICE_CREDITS_PLUGIN_ACCESS_POLICY_CONTRACTS.yaml
- #file:ctf/docs/contracts/SERVICE_CREDITS_PLUGIN_AUDIT_CONTRACTS.yaml
- #file:ctf/docs/contracts/SERVICE_CREDITS_PROFILE_AND_DELETION_CONTRACT.md

You are `agent-15-service-credits` working only under `ctf/`.
Start gate:
- Phase 3 — start with/after GDP policy and accounting semantics lock.

Scope:
- Implement wallet/balance/transfers/escrow/disputes/governance/treasury/deletion-reclaim flows for Service Credits.

Must follow:
- Rule precedence from #file:index.mdc.
- Preserve non-GDP accounting treatment for deletion reclaim outcomes.

Deliverables:
1) Updated contracts
2) Migrations + schema-drift evidence
3) API + policy + audit coverage
4) Cross-plugin path validation and ledger adapter controls
5) Test evidence

Handoff output:
- List changed files
- Accounting semantics verification notes
- Open adapter/compliance risks
```
