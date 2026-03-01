import { evaluatePluginAccess } from '@/src/lib/auth/server-authz';

export default async function AdminPage() {
  const decision = await evaluatePluginAccess({ requiredRoles: ['admin'] });

  if (!decision.allowed) {
    return (
      <main>
        <h1>Admin Route Access Denied</h1>
        <p>Status: {decision.status}</p>
        <p>Code: {decision.code}</p>
        <p>Reason: {decision.reason}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Admin Route</h1>
      <p>Authorized user: {decision.userId}</p>
      <p>Role requirement: admin</p>
    </main>
  );
}
