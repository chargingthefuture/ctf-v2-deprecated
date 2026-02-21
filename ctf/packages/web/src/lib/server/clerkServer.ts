const webProvider = process.env.VERCEL === "1" ? "VERCEL" : "RAILWAY";

const hydrateClerkServerEnv = () => {
  const providerSecretKey = process.env[`${webProvider}_CLERK_SECRET_KEY`];

  if (!process.env.CLERK_SECRET_KEY && providerSecretKey?.trim()) {
    process.env.CLERK_SECRET_KEY = providerSecretKey.trim();
  }
};

let clerkServerModulePromise: Promise<typeof import("@clerk/nextjs/server")> | null = null;

export const getClerkServerModule = async () => {
  hydrateClerkServerEnv();

  if (!clerkServerModulePromise) {
    clerkServerModulePromise = import("@clerk/nextjs/server");
  }

  return clerkServerModulePromise;
};
