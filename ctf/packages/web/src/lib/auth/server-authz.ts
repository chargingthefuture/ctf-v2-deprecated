import { auth } from '@clerk/nextjs/server';
import { pluginAuthDeny, type PluginDenyResponse } from './deny-taxonomy';

export type AllowDecision = {
  allowed: true;
  userId: string;
};

export type PluginAuthDecision = AllowDecision | PluginDenyResponse;

function extractRole(claims: unknown): string | null {
  if (!claims || typeof claims !== 'object') {
    return null;
  }

  const sessionClaims = claims as {
    metadata?: { role?: unknown };
    publicMetadata?: { role?: unknown };
  };

  if (typeof sessionClaims.metadata?.role === 'string') {
    return sessionClaims.metadata.role;
  }

  if (typeof sessionClaims.publicMetadata?.role === 'string') {
    return sessionClaims.publicMetadata.role;
  }

  return null;
}

export async function evaluatePluginAccess(
  requiredRoles?: string[],
): Promise<PluginAuthDecision> {
  const session = await auth();

  if (!session.userId) {
    return pluginAuthDeny.unauthorized();
  }

  if (!requiredRoles || requiredRoles.length === 0) {
    return {
      allowed: true,
      userId: session.userId,
    };
  }

  const role = extractRole(session.sessionClaims);

  if (!role || !requiredRoles.includes(role)) {
    return pluginAuthDeny.forbiddenRole(requiredRoles);
  }

  return {
    allowed: true,
    userId: session.userId,
  };
}
