export type WebDeploymentEnvironment =
  | "railway-production"
  | "railway-staging"
  | "vercel-staging"
  | "development";

type ClerkRouting = {
  signInUrl: string;
  signUpUrl: string;
  afterSignOutUrl: string;
  signInFallbackRedirectUrl: string;
};

const PROD_APP_DOMAIN = "chargingthefuture.com";
const RAILWAY_STAGING_APP_DOMAIN = "the-comic.com";
const VERCEL_STAGING_APP_DOMAIN = "the-comic.net";

const PROD_ACCOUNTS_DOMAIN = "accounts.chargingthefuture.com";
const RAILWAY_STAGING_ACCOUNTS_DOMAIN = "accounts.the-comic.com";
const VERCEL_STAGING_ACCOUNTS_DOMAIN = "accounts.the-comic.net";
const DEV_ACCOUNTS_DOMAIN = "sure-oarfish-90.accounts.dev";

const normalizeHostname = (hostname?: string): string => {
  if (!hostname) {
    return "";
  }

  return hostname.trim().toLowerCase().replace(/^https?:\/\//, "").split(":")[0] ?? "";
};

export const getWebDeploymentEnvironment = (hostname?: string): WebDeploymentEnvironment => {
  const normalizedHostname = normalizeHostname(hostname);

  if (
    normalizedHostname === PROD_APP_DOMAIN ||
    normalizedHostname.endsWith(`.${PROD_APP_DOMAIN}`)
  ) {
    return "railway-production";
  }

  if (
    normalizedHostname === RAILWAY_STAGING_APP_DOMAIN ||
    normalizedHostname.endsWith(`.${RAILWAY_STAGING_APP_DOMAIN}`) ||
    normalizedHostname.includes("railway.app") ||
    normalizedHostname.includes("up.railway.app")
  ) {
    return "railway-staging";
  }

  if (
    normalizedHostname === VERCEL_STAGING_APP_DOMAIN ||
    normalizedHostname.endsWith(`.${VERCEL_STAGING_APP_DOMAIN}`) ||
    normalizedHostname.includes("vercel.app")
  ) {
    return "vercel-staging";
  }

  return "development";
};

const getClerkAccountsDomain = (environment: WebDeploymentEnvironment): string => {
  if (environment === "railway-production") {
    return process.env.NEXT_PUBLIC_CLERK_PRODUCTION_DOMAIN || PROD_ACCOUNTS_DOMAIN;
  }

  if (environment === "railway-staging") {
    return (
      process.env.NEXT_PUBLIC_CLERK_RAILWAY_STAGING_DOMAIN ||
      process.env.NEXT_PUBLIC_CLERK_STAGING_DOMAIN ||
      RAILWAY_STAGING_ACCOUNTS_DOMAIN
    );
  }

  if (environment === "vercel-staging") {
    return process.env.NEXT_PUBLIC_CLERK_VERCEL_STAGING_DOMAIN || VERCEL_STAGING_ACCOUNTS_DOMAIN;
  }

  return process.env.NEXT_PUBLIC_CLERK_DEV_DOMAIN || DEV_ACCOUNTS_DOMAIN;
};

const getAppOrigin = (environment: WebDeploymentEnvironment, hostname?: string): string => {
  const normalizedHostname = normalizeHostname(hostname);
  if (normalizedHostname) {
    const protocol = normalizedHostname.includes("localhost") ? "http" : "https";
    return `${protocol}://${normalizedHostname}`;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (environment === "railway-staging") {
    return `https://${RAILWAY_STAGING_APP_DOMAIN}`;
  }

  if (environment === "vercel-staging") {
    return `https://${VERCEL_STAGING_APP_DOMAIN}`;
  }

  return `https://${PROD_APP_DOMAIN}`;
};

export const getClerkRoutingForHost = (hostname?: string): ClerkRouting => {
  const environment = getWebDeploymentEnvironment(hostname);
  const accountsDomain = getClerkAccountsDomain(environment);
  const appOrigin = getAppOrigin(environment, hostname);
  const accountsOrigin = `https://${accountsDomain}`;

  return {
    signInUrl: `${accountsOrigin}/sign-in`,
    signUpUrl: `${accountsOrigin}/sign-up`,
    afterSignOutUrl: `${accountsOrigin}/sign-in`,
    signInFallbackRedirectUrl: `${appOrigin}/`,
  };
};
