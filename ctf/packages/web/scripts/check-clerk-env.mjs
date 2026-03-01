const ENV_TARGET = process.env.CLERK_ENV_TARGET;

const targetDefinitions = {
  'railway-staging': [
    'RAILWAY_STAGING_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'RAILWAY_STAGING_CLERK_SECRET_KEY',
    'RAILWAY_STAGING_CLERK_SIGN_IN_URL',
    'RAILWAY_NEXT_PUBLIC_APP_URL',
  ],
  'vercel-staging': [
    'VERCEL_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'VERCEL_CLERK_SECRET_KEY',
    'VERCEL_CLERK_SIGN_IN_URL',
    'VERCEL_NEXT_PUBLIC_APP_URL',
  ],
  'railway-production': [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'CLERK_SIGN_IN_URL',
    'RAILWAY_NEXT_PUBLIC_APP_URL',
  ],
};

if (!ENV_TARGET || !(ENV_TARGET in targetDefinitions)) {
  console.error(
    'Missing or invalid CLERK_ENV_TARGET. Use one of: railway-staging, vercel-staging, railway-production.',
  );
  process.exit(1);
}

const requiredKeys = targetDefinitions[ENV_TARGET];
const missingKeys = requiredKeys.filter((key) => !process.env[key]);

if (missingKeys.length > 0) {
  console.error('Clerk environment validation failed. Missing keys:');
  for (const key of missingKeys) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

console.log(`Clerk environment validation passed for target: ${ENV_TARGET}`);
