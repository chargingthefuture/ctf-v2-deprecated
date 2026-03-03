BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS socketrelay_user_extension (
  user_id TEXT PRIMARY KEY,
  display_name TEXT NULL,
  bio TEXT NULL,
  relay_preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
  presence_opt_in BOOLEAN NOT NULL DEFAULT TRUE,
  service_deleted_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS socketrelay_requests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'claimed', 'closed', 'cancelled')),
  idempotency_key TEXT NOT NULL,
  reopened_count INTEGER NOT NULL DEFAULT 0,
  claimed_fulfillment_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (owner_user_id, idempotency_key)
);

CREATE TABLE IF NOT EXISTS socketrelay_request_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  request_id TEXT NOT NULL REFERENCES socketrelay_requests(id) ON DELETE CASCADE,
  actor_user_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS socketrelay_fulfillments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  request_id TEXT NOT NULL REFERENCES socketrelay_requests(id) ON DELETE CASCADE,
  requester_user_id TEXT NOT NULL,
  fulfiller_user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'cancelled')),
  close_reason TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (request_id, fulfiller_user_id)
);

CREATE TABLE IF NOT EXISTS socketrelay_fulfillment_participants (
  fulfillment_id TEXT NOT NULL REFERENCES socketrelay_fulfillments(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  participant_role TEXT NOT NULL CHECK (participant_role IN ('requester', 'fulfiller')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (fulfillment_id, user_id)
);

CREATE TABLE IF NOT EXISTS socketrelay_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  fulfillment_id TEXT NOT NULL REFERENCES socketrelay_fulfillments(id) ON DELETE CASCADE,
  sender_user_id TEXT NOT NULL,
  message_text TEXT NOT NULL,
  client_message_id TEXT NOT NULL,
  moderation_status TEXT NOT NULL DEFAULT 'accepted' CHECK (moderation_status IN ('accepted', 'flagged')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (fulfillment_id, sender_user_id, client_message_id)
);

CREATE TABLE IF NOT EXISTS socketrelay_admin_audit_trail (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  actor_id TEXT NOT NULL,
  command TEXT NOT NULL,
  policy_status TEXT NOT NULL CHECK (policy_status IN ('allow', 'deny')),
  reason TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_socketrelay_requests_owner ON socketrelay_requests (owner_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_socketrelay_requests_public ON socketrelay_requests (is_public, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_socketrelay_fulfillments_request ON socketrelay_fulfillments (request_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_socketrelay_fulfillments_user ON socketrelay_fulfillments (fulfiller_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_socketrelay_messages_fulfillment ON socketrelay_messages (fulfillment_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_socketrelay_audit_created ON socketrelay_admin_audit_trail (created_at DESC, actor_id, command);

COMMIT;
