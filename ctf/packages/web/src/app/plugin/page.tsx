import { evaluatePluginAccess } from '@/src/lib/auth/server-authz';
import { nonBaselinePlugins } from '@/src/lib/plugins/plugin-catalog';
import { ChymeShell } from '@/src/components/chyme/chyme-shell';

type PluginPageProps = {
  searchParams?: Promise<{
    plugin?: string | string[];
  }>;
};

function getRequestedPluginId(pluginValue: string | string[] | undefined): string | null {
  if (Array.isArray(pluginValue)) {
    return pluginValue[0] ?? null;
  }

  return pluginValue ?? null;
}

type PluginContext = {
  requestedPluginId: string | null;
  selectedPluginName: string | null;
  selectedPluginStartGate: string | null;
  shouldRequireUsername: boolean;
  showChymeView: boolean;
};

function buildPluginContext(pluginValue: string | string[] | undefined): PluginContext {
  const requestedPluginId = getRequestedPluginId(pluginValue);
  const selectedPlugin = requestedPluginId
    ? nonBaselinePlugins.find((plugin) => plugin.id === requestedPluginId)
    : null;

  return {
    requestedPluginId,
    selectedPluginName: selectedPlugin?.name ?? null,
    selectedPluginStartGate: selectedPlugin?.startGate ?? null,
    shouldRequireUsername: selectedPlugin?.id !== 'chyme' && Boolean(requestedPluginId),
    showChymeView: selectedPlugin?.id === 'chyme' || !requestedPluginId,
  };
}

type AccessDeniedProps = {
  status: number;
  code: string;
  reason: string;
  requestedPluginId: string | null;
};

function AccessDeniedView({ status, code, reason, requestedPluginId }: AccessDeniedProps) {
  return (
    <main>
      <h1>Plugin Route Access Denied</h1>
      <p>Status: {status}</p>
      <p>Code: {code}</p>
      <p>Reason: {reason}</p>
      {requestedPluginId ? <p>Requested plugin: {requestedPluginId}</p> : null}
      {reason === 'missing_username' ? (
        <p>
          Username is required for this plugin route. Open your profile avatar and choose
          {' '}
          Update username.
        </p>
      ) : null}
    </main>
  );
}

type GenericPluginViewProps = {
  userId: string;
  username: string | null;
  requestedPluginId: string | null;
  selectedPluginName: string | null;
  selectedPluginStartGate: string | null;
};

function GenericPluginView({
  userId,
  username,
  requestedPluginId,
  selectedPluginName,
  selectedPluginStartGate,
}: GenericPluginViewProps) {
  return (
    <main>
      <h1>Plugin Route</h1>
      <p>Authenticated user: {userId}</p>
      <p>Username handle: {username}</p>
      {selectedPluginName ? (
        <>
          <p>Selected plugin: {selectedPluginName}</p>
          <p>Start gate: {selectedPluginStartGate}</p>
        </>
      ) : (
        <p>Selected plugin id is not recognized: {requestedPluginId}</p>
      )}
      <p>This route is middleware-protected and server-verified.</p>
    </main>
  );
}

export default async function PluginPage({ searchParams }: PluginPageProps) {
  const resolvedSearchParams = await searchParams;
  const pluginContext = buildPluginContext(resolvedSearchParams?.plugin);
  const decision = await evaluatePluginAccess({ requireUsername: pluginContext.shouldRequireUsername });

  if (!decision.allowed) {
    return (
      <AccessDeniedView
        status={decision.status}
        code={decision.code}
        reason={decision.reason}
        requestedPluginId={pluginContext.requestedPluginId}
      />
    );
  }

  if (pluginContext.showChymeView) {
    return <ChymeShell />;
  }

  return (
    <GenericPluginView
      userId={decision.userId}
      username={decision.username}
      requestedPluginId={pluginContext.requestedPluginId}
      selectedPluginName={pluginContext.selectedPluginName}
      selectedPluginStartGate={pluginContext.selectedPluginStartGate}
    />
  );
}
