# BF-02 Railway Baseline

Date: 2026-03-01
Scope: Railway deployment baseline for `ctf/packages/web`

## What was changed

1. Railway startup now includes an auth/environment prestart gate.
2. Clerk env checker can auto-detect Railway environment target.
3. Railway failures for bad domain/URL auth wiring now fail fast at startup with explicit diagnostics.

## Deployment config

- File: `ctf/railway.toml`
- Start command now runs:
  1. `pnpm --filter @ctf/web run check:clerk-env`
  2. `pnpm --filter @ctf/web start`

This guarantees Railway won't start with misconfigured Clerk domain/env values.

## Environment/secret mapping assumptions

### Railway staging
- Required auth vars:
  - `RAILWAY_STAGING_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` or `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `RAILWAY_STAGING_CLERK_SECRET_KEY` or `CLERK_SECRET_KEY`
  - `RAILWAY_STAGING_CLERK_SIGN_IN_URL` or `CLERK_SIGN_IN_URL`
- Required app URL var:
  - `RAILWAY_NEXT_PUBLIC_APP_URL`

### Railway production
- Required auth vars:
  - `RAILWAY_PROD_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` or `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `RAILWAY_PROD_CLERK_SECRET_KEY` or `CLERK_SECRET_KEY`
  - `RAILWAY_PROD_CLERK_SIGN_IN_URL` or `CLERK_SIGN_IN_URL`
- Required app URL var:
  - `RAILWAY_NEXT_PUBLIC_APP_URL`

## Auto-target behavior

`check:clerk-env` resolution order:
1. `CLERK_ENV_TARGET` (explicit)
2. Railway inference from `RAILWAY_ENVIRONMENT_NAME`/related Railway env metadata:
   - contains `prod` => `railway-production`
   - otherwise => `railway-staging`

## Known Railway-specific failure that is now caught

- App URL host mismatch with sign-in URL host (for example apex vs `www`) now blocks startup with a clear message.

## Validation evidence

- `pnpm --filter @ctf/web run lint` passed.
- `pnpm --filter @ctf/web run build` passed.
- Host mismatch simulation fails as expected with explicit diagnostic.

## What plugin teams can assume as stable

- Railway baseline now enforces Clerk/domain env correctness before app startup.
- Railway auth/runtime failures should surface as deterministic deploy/start errors rather than opaque runtime 500s.

## Remaining risks

1. Railway service must have correct custom domain DNS records (apex + optional `www` if used).
2. Clerk dashboard redirect/sign-in domain must exactly match active Railway domain.
3. If Railway metadata vars are unavailable in some environments, set `CLERK_ENV_TARGET` explicitly.
