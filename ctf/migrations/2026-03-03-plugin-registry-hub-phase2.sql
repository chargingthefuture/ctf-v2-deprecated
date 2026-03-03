BEGIN;

CREATE TABLE IF NOT EXISTS ctf_plugin_registry (
  plugin_slug TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  phase TEXT NOT NULL CHECK (phase IN ('phase-0', 'phase-1', 'phase-2', 'phase-3')),
  start_gate TEXT NOT NULL,
  summary TEXT NOT NULL,
  availability_state TEXT NOT NULL CHECK (availability_state IN ('implemented_shell', 'planned')),
  nav_rank INTEGER NOT NULL DEFAULT 100,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO ctf_plugin_registry (
  plugin_slug,
  display_name,
  phase,
  start_gate,
  summary,
  availability_state,
  nav_rank,
  is_visible
)
VALUES
  ('chyme', 'Chyme', 'phase-0', 'Phase 0', 'Room bootstrap, chat, join flow, and deletion behavior with policy/audit.', 'implemented_shell', 10, TRUE),
  ('skills-taxonomy', 'Skills Taxonomy', 'phase-0', 'Phase 0', 'Hierarchy and CRUD for sectors, job titles, and skills with impact preview.', 'planned', 20, TRUE),
  ('directory', 'Directory', 'phase-0', 'Phase 0', 'Unified user/admin profile surface with claimed/unclaimed policy controls.', 'implemented_shell', 30, TRUE),
  ('feed-announcements', 'Feed + Announcements', 'phase-0', 'Phase 0', 'Timeline and announcement lifecycle in a coupled admin surface.', 'implemented_shell', 40, TRUE),
  ('workforce', 'Workforce', 'phase-1', 'Phase 1', 'Dashboard reporting and recruited-state derivation from upstream data.', 'implemented_shell', 50, TRUE),
  ('skills-hunt', 'Skills Hunt', 'phase-1', 'Phase 1', 'Rounds, moderation, scoring, leaderboards, and governed profile generation.', 'implemented_shell', 60, TRUE),
  ('foundation', 'Foundation', 'phase-1', 'Phase 1', 'Provider search and quote lifecycle using read-only Directory projections.', 'implemented_shell', 70, TRUE),
  ('lighthouse', 'LightHouse', 'phase-2', 'Phase 2', 'Profile/property/match parity scope with blocks lifecycle controls.', 'planned', 80, TRUE),
  ('socketrelay', 'SocketRelay', 'phase-2', 'Phase 2', 'Request and fulfillment flows with privacy-minimized public projections.', 'planned', 90, TRUE),
  ('trusttransport', 'TrustTransport', 'phase-2', 'Phase 2', 'Ride/package/food fulfillment with safety-first and dispute controls.', 'planned', 100, TRUE),
  ('peer-programming', 'Peer Programming', 'phase-2', 'Phase 2', 'Weekly cohort assignments with deterministic fallback-open behavior.', 'planned', 110, TRUE),
  ('mood', 'Mood', 'phase-2', 'Phase 2', 'Mood submissions with 7-day cooldown and anonymous clientId persistence.', 'planned', 120, TRUE),
  ('gentlepulse', 'GentlePulse', 'phase-2', 'Phase 2', 'Library listing/playback, ratings, favorites, and support route behavior.', 'planned', 130, TRUE),
  ('weekly-performance', 'Weekly Performance', 'phase-2', 'Phase 2', 'Week selection/guardrails with metrics, comparisons, and export gate checks.', 'planned', 140, TRUE),
  ('gdp', 'GDP', 'phase-3', 'Phase 3', 'Aggregate transparency and admin publish flows with compliance controls.', 'planned', 150, TRUE),
  ('service-credits', 'Service Credits', 'phase-3', 'Phase 3', 'Wallet/transfers/escrow/disputes and treasury governance workflows.', 'planned', 160, TRUE)
ON CONFLICT (plugin_slug) DO UPDATE
SET
  display_name = EXCLUDED.display_name,
  phase = EXCLUDED.phase,
  start_gate = EXCLUDED.start_gate,
  summary = EXCLUDED.summary,
  availability_state = EXCLUDED.availability_state,
  nav_rank = EXCLUDED.nav_rank,
  is_visible = EXCLUDED.is_visible,
  updated_at = NOW();

COMMIT;