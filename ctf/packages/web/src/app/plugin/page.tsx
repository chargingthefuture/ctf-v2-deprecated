import { evaluatePluginAccess } from '@/src/lib/auth/server-authz';

export default async function PluginPage() {
  const decision = await evaluatePluginAccess({ requireUsername: true });

  if (!decision.allowed) {
    return (
      <main>
        <h1>Plugin Route Access Denied</h1>
        <p>Status: {decision.status}</p>
        <p>Code: {decision.code}</p>
        <p>Reason: {decision.reason}</p>
        {decision.reason === 'missing_username' ? (
          <p>
            Username is required for this plugin route. Open your profile avatar and choose
            {' '}
            Update username.
          </p>
        ) : null}
      </main>
    );
  }

  return (
    <main>
      <h1>Plugin Route</h1>
      <p>Authenticated user: {decision.userId}</p>
      <p>Username handle: {decision.username}</p>
      <p>This route is middleware-protected and server-verified.</p>
    </main>
  );
}
