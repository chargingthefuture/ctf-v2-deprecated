import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Get Clerk's server-side auth and currentUser modules.
 * This helper abstracts the Clerk initialization pattern for API routes.
 * @returns An object containing auth() and currentUser() functions from Clerk
 */
export async function getClerkServerModule(): Promise<{
  auth: typeof auth;
  currentUser: typeof currentUser;
}> {
  return {
    auth,
    currentUser,
  };
}
