import { evaluatePluginAccess } from '@/src/lib/auth/server-authz';
import { nonBaselinePlugins } from '@/src/lib/plugins/plugin-catalog';

type PluginPageProps = {
  searchParams?:
    | {
      plugin?: string | string[];
    }
    | Promise<{
      plugin?: string | string[];
    }>;
};

function getRequestedPluginId(pluginValue: string | string[] | undefined): string | null {
  if (Array.isArray(pluginValue)) {
    return pluginValue[0] ?? null;
  }

  return pluginValue ?? null;
}

export default async function PluginPage({ searchParams }: PluginPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedPluginId = getRequestedPluginId(resolvedSearchParams?.plugin);
  const selectedPlugin = requestedPluginId
    ? nonBaselinePlugins.find((plugin) => plugin.id === requestedPluginId)
    : null;

  const decision = await evaluatePluginAccess({ requireUsername: true });

  if (!decision.allowed) {
    return (
      <main>
        <h1>Plugin Route Access Denied</h1>
        <p>Status: {decision.status}</p>
        <p>Code: {decision.code}</p>
        <p>Reason: {decision.reason}</p>
        {requestedPluginId ? <p>Requested plugin: {requestedPluginId}</p> : null}
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
      {selectedPlugin ? (
        <>
          <p>Selected plugin: {selectedPlugin.name}</p>
          <p>Start gate: {selectedPlugin.startGate}</p>
        </>
      ) : requestedPluginId ? (
        <p>Selected plugin id is not recognized: {requestedPluginId}</p>
      ) : (
        <p>No plugin selected. Use the dashboard to open a plugin route.</p>
      )}
      <p>This route is middleware-protected and server-verified.</p>
    </main>
  );
}
