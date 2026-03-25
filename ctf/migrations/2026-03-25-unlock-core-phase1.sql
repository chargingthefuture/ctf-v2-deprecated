BEGIN;

CREATE TABLE IF NOT EXISTS unlock_runtime_config (
  singleton_id INTEGER PRIMARY KEY CHECK (singleton_id = 1),
  submission_window_hours INTEGER NOT NULL DEFAULT 168,
  reminder_schedule_hours INTEGER[] NOT NULL DEFAULT ARRAY[0, 24, 72, 168],
  incentive_amount NUMERIC(14, 2) NOT NULL DEFAULT 100,
  support_only_after_expiry BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO unlock_runtime_config (singleton_id)
VALUES (1)
ON CONFLICT (singleton_id) DO NOTHING;

CREATE TABLE IF NOT EXISTS unlock_verification_submissions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  quora_profile_url TEXT NOT NULL,
  quora_profile_url_normalized TEXT NOT NULL,
  review_status TEXT NOT NULL DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected', 'spam')),
  access_tier TEXT NOT NULL DEFAULT 'pending_readonly' CHECK (access_tier IN ('pending_readonly', 'locked_support_only', 'approved_full')),
  unlock_window_expires_at TIMESTAMPTZ NOT NULL,
  reminder_stage INTEGER NOT NULL DEFAULT 0,
  reviewed_by_user_id TEXT NULL,
  reviewed_at TIMESTAMPTZ NULL,
  review_note TEXT NULL,
  incentive_granted_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_unlock_verification_submissions_status
  ON unlock_verification_submissions (review_status, unlock_window_expires_at DESC);

CREATE INDEX IF NOT EXISTS idx_unlock_verification_submissions_access_tier
  ON unlock_verification_submissions (access_tier);

CREATE TABLE IF NOT EXISTS unlock_audit_log (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id TEXT NULL,
  command TEXT NOT NULL,
  policy_status TEXT NOT NULL CHECK (policy_status IN ('allow', 'deny')),
  reason TEXT NOT NULL,
  target_user_id TEXT NULL,
  request_id TEXT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_unlock_audit_log_target_user
  ON unlock_audit_log (target_user_id, created_at DESC);

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
VALUES (
  'unlock',
  'Unlock',
  'phase-1',
  'Phase 1',
  'Internal verification and staged unlock orchestration for Quora URL onboarding.',
  'implemented_shell',
  65,
  FALSE
)
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
