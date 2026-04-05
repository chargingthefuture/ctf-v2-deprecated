type MaybeEnv = string | undefined;

export type AuthProviderRuntimeConfig = {
  providerName: 'clerk';
  publishableKey?: string;
  secretKey?: string;
  signInUrl?: string;
  afterSignOutUrl?: string;
};

function firstNonEmpty(...values: MaybeEnv[]): string | undefined {
  return values.find((value) => typeof value === 'string' && value.length > 0);
}

function parseUrl(value: string | undefined): URL | null {
  if (!value) {
    return null;
  }

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function normalizeUrl(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value.startsWith('/')) {
    return value;
  }

  const parsed = parseUrl(value);
  return parsed ? parsed.toString() : undefined;
}

function getClerkPublishableKey(): string | undefined {
  return firstNonEmpty(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    process.env.RAILWAY_STAGING_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    process.env.RAILWAY_PROD_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );
}

function getClerkSecretKey(): string | undefined {
  return firstNonEmpty(
    process.env.CLERK_SECRET_KEY,
    process.env.RAILWAY_STAGING_CLERK_SECRET_KEY,
    process.env.RAILWAY_PROD_CLERK_SECRET_KEY,
  );
}

function getClerkSignInUrl(): string | undefined {
  return normalizeUrl(firstNonEmpty(
    process.env.CLERK_SIGN_IN_URL,
    process.env.RAILWAY_STAGING_CLERK_SIGN_IN_URL,
    process.env.RAILWAY_PROD_CLERK_SIGN_IN_URL,
  ));
}

function getClerkAfterSignOutUrl(): string | undefined {
  return normalizeUrl(firstNonEmpty(
    process.env.CLERK_AFTER_SIGN_OUT_URL,
    process.env.RAILWAY_STAGING_CLERK_AFTER_SIGN_OUT_URL,
    process.env.RAILWAY_PROD_CLERK_AFTER_SIGN_OUT_URL,
    getClerkSignInUrl(),
  ));
}

export function getAppUrl(): string | undefined {
  return firstNonEmpty(
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.RAILWAY_NEXT_PUBLIC_APP_URL,
  );
}

export function getConfiguredAuthProvider(): AuthProviderRuntimeConfig | null {
  const publishableKey = getClerkPublishableKey();
  const secretKey = getClerkSecretKey();
  const signInUrl = getClerkSignInUrl();
  const afterSignOutUrl = getClerkAfterSignOutUrl();

  if (!publishableKey && !secretKey && !signInUrl && !afterSignOutUrl) {
    return null;
  }

  return {
    providerName: 'clerk',
    ...(publishableKey ? { publishableKey } : {}),
    ...(secretKey ? { secretKey } : {}),
    ...(signInUrl ? { signInUrl } : {}),
    ...(afterSignOutUrl ? { afterSignOutUrl } : {}),
  };
}

export function isConfiguredAuthSignInExternal(): boolean {
  const provider = getConfiguredAuthProvider();
  const signInUrl = provider?.signInUrl;
  if (!signInUrl) {
    return false;
  }

  if (signInUrl.startsWith('/')) {
    return false;
  }

  const parsedSignIn = parseUrl(signInUrl);
  if (!parsedSignIn) {
    return false;
  }

  const appUrl = getAppUrl();
  const parsedApp = parseUrl(appUrl);
  if (!parsedApp) {
    return true;
  }

  return parsedSignIn.hostname !== parsedApp.hostname;
}