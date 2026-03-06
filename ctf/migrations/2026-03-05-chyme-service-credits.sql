-- Add chyme_service_credits_transactions table for service credits support in Chyme
CREATE TABLE IF NOT EXISTS chyme_service_credits_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id UUID NOT NULL,
    to_user_id UUID NOT NULL,
    amount NUMERIC(20, 8) NOT NULL CHECK (amount > 0),
    message TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chyme_service_credits_from_user ON chyme_service_credits_transactions (from_user_id);
CREATE INDEX IF NOT EXISTS idx_chyme_service_credits_to_user ON chyme_service_credits_transactions (to_user_id);
