import { CommunityShell } from '@/src/components/community-shell/community-shell';
import { listPluginRegistry } from '@/src/lib/plugins/repository';

export default async function HomePage() {
  const plugins = await listPluginRegistry();
  return <CommunityShell initialPlugins={plugins} />;
}
