import { evaluatePluginAccess } from '@/src/lib/auth/server-authz';

export default async function PluginPage() {
  const decision = await evaluatePluginAccess();

  if (!decision.allowed) {
    return (
      <main>
        <h1>Plugin Route Access Denied</h1>
        <p>Status: {decision.status}</p>
        <p>Code: {decision.code}</p>
        <p>Reason: {decision.reason}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Plugin Route</h1>
      <p>Authenticated user: {decision.userId}</p>
      <p>This route is middleware-protected and server-verified.</p>
    </main>
  );
}
