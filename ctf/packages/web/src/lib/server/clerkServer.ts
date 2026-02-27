import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Get Clerk's server-side auth and currentUser modules.
 * This helper abstracts the Clerk initialization pattern for API routes.
 * @param _request - The incoming request object (not used directly, but kept for signature compatibility)
 * @returns An object containing auth() and currentUser() functions from Clerk
 */
export async function getClerkServerModule(
  _request: Request
): Promise<{
  auth: typeof auth;
  currentUser: typeof currentUser;
}> {
  return {
    auth,
    currentUser,
  };
}
