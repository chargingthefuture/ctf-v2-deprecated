import {
  getConfiguredAuthProvider,
  isConfiguredAuthSignInExternal,
} from './provider-env';

export { getAppUrl } from './provider-env';

export function getClerkPublishableKey(): string | undefined {
  return getConfiguredAuthProvider()?.publishableKey;
}

export function getClerkSecretKey(): string | undefined {
  return getConfiguredAuthProvider()?.secretKey;
}

export function getClerkSignInUrl(): string | undefined {
  return getConfiguredAuthProvider()?.signInUrl;
}

export function getClerkAfterSignOutUrl(): string | undefined {
  return getConfiguredAuthProvider()?.afterSignOutUrl;
}

export function isSignInUrlExternal(): boolean {
  return isConfiguredAuthSignInExternal();
}

export function getClerkRuntimeOptions(): {
  publishableKey?: string;
  secretKey?: string;
} {
  const configuredProvider = getConfiguredAuthProvider();
  if (!configuredProvider) {
    return {};
  }

  return {
    ...(configuredProvider.publishableKey ? { publishableKey: configuredProvider.publishableKey } : {}),
    ...(configuredProvider.secretKey ? { secretKey: configuredProvider.secretKey } : {}),
  };
}