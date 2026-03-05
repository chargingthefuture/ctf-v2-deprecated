-- Directory profile payment address fields migration
-- Adds optional fields for Venmo, Monero, Bitcoin, and ServiceCredits addresses

ALTER TABLE directory_profiles
  ADD COLUMN venmo_address TEXT NULL,
  ADD COLUMN monero_address TEXT NULL,
  ADD COLUMN bitcoin_address TEXT NULL,
  ADD COLUMN service_credits_address TEXT NULL;
