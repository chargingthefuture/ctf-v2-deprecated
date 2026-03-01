import { auth, currentUser } from '@clerk/nextjs/server';
import { pluginAuthDeny, type PluginDenyResponse } from './deny-taxonomy';

export type AllowDecision = {
  allowed: true;
  userId: string;
  username: string | null;
};

export type PluginAuthDecision = AllowDecision | PluginDenyResponse;

type EvaluatePluginAccessOptions = {
  requiredRoles?: string[];
  requireUsername?: boolean;
};

function normalizeUsername(username: string | null | undefined): string | null {
  if (!username) {
    return null;
  }

  const trimmedUsername = username.trim();
  return trimmedUsername.length > 0 ? trimmedUsername : null;
}

function buildAllowDecision(userId: string, username: string | null): AllowDecision {
  return {
    allowed: true,
    userId,
    username,
  };
}

function denyIfUsernameRequired(
  requireUsername: boolean,
  username: string | null,
): PluginDenyResponse | null {
  if (requireUsername && !username) {
    return pluginAuthDeny.forbiddenPolicy('missing_username');
  }

  return null;
}

function denyIfRoleMissing(
  requiredRoles: string[] | undefined,
  claims: unknown,
): PluginDenyResponse | null {
  if (!requiredRoles || requiredRoles.length === 0) {
    return null;
  }

  const role = extractRole(claims);
  if (!role || !requiredRoles.includes(role)) {
    return pluginAuthDeny.forbiddenRole(requiredRoles);
  }

  return null;
}

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
  options: EvaluatePluginAccessOptions = {},
): Promise<PluginAuthDecision> {
  const { requiredRoles, requireUsername = false } = options;
  const session = await auth();

  if (!session.userId) {
    return pluginAuthDeny.unauthorized();
  }

  const user = await currentUser();
  const username = normalizeUsername(user?.username);

  const usernameDenyDecision = denyIfUsernameRequired(requireUsername, username);
  if (usernameDenyDecision) {
    return usernameDenyDecision;
  }

  const roleDenyDecision = denyIfRoleMissing(requiredRoles, session.sessionClaims);
  if (roleDenyDecision) {
    return roleDenyDecision;
  }

  return buildAllowDecision(session.userId, username);
}
