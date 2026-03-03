import { queryDb } from '@/src/lib/db/postgres';

export type PluginPhase = 'phase-0' | 'phase-1' | 'phase-2' | 'phase-3';
export type PluginAvailabilityState = 'implemented_shell' | 'planned';

export type PluginRegistryItem = {
  slug: string;
  name: string;
  phase: PluginPhase;
  startGate: string;
  summary: string;
  availabilityState: PluginAvailabilityState;
  navRank: number;
  isVisible: boolean;
};

export type PluginRegistrySummary = {
  total: number;
  implementedShells: number;
  planned: number;
};

type PluginRegistryRow = {
  plugin_slug: string;
  display_name: string;
  phase: PluginPhase;
  start_gate: string;
  summary: string;
  availability_state: PluginAvailabilityState;
  nav_rank: number;
  is_visible: boolean;
};

const pluginAliasMap: Record<string, string> = {
  announcements: 'feed-announcements',
  feed: 'feed-announcements',
  'gross-domestic-product': 'gdp',
  servicecredits: 'service-credits',
  'socket-relay': 'socketrelay',
  'trust-transport': 'trusttransport',
};

export function canonicalizePluginSlug(input: string): string {
  const normalized = input.trim().toLowerCase();
  return pluginAliasMap[normalized] ?? normalized;
}

export function getPluginRoute(slug: string): string {
  return `/apps/${encodeURIComponent(slug)}`;
}

function mapPluginRegistryRow(row: PluginRegistryRow): PluginRegistryItem {
  return {
    slug: row.plugin_slug,
    name: row.display_name,
    phase: row.phase,
    startGate: row.start_gate,
    summary: row.summary,
    availabilityState: row.availability_state,
    navRank: row.nav_rank,
    isVisible: row.is_visible,
  };
}

function buildSummary(items: PluginRegistryItem[]): PluginRegistrySummary {
  let implementedShells = 0;
  let planned = 0;

  for (const item of items) {
    if (item.availabilityState === 'implemented_shell') {
      implementedShells += 1;
      continue;
    }

    planned += 1;
  }

  return {
    total: items.length,
    implementedShells,
    planned,
  };
}

export async function listPluginRegistry(options?: { includeHidden?: boolean }): Promise<PluginRegistryItem[]> {
  const includeHidden = Boolean(options?.includeHidden);

  const result = await queryDb<PluginRegistryRow>(
    `SELECT
       plugin_slug,
       display_name,
       phase,
       start_gate,
       summary,
       availability_state,
       nav_rank,
       is_visible
     FROM ctf_plugin_registry
     WHERE ($1::boolean OR is_visible = TRUE)
     ORDER BY
       CASE phase
         WHEN 'phase-0' THEN 0
         WHEN 'phase-1' THEN 1
         WHEN 'phase-2' THEN 2
         WHEN 'phase-3' THEN 3
       END,
       nav_rank ASC,
       display_name ASC`,
    [includeHidden],
  );

  return result.rows.map(mapPluginRegistryRow);
}

export async function getPluginBySlug(slug: string): Promise<PluginRegistryItem | null> {
  const canonicalSlug = canonicalizePluginSlug(slug);

  const result = await queryDb<PluginRegistryRow>(
    `SELECT
       plugin_slug,
       display_name,
       phase,
       start_gate,
       summary,
       availability_state,
       nav_rank,
       is_visible
     FROM ctf_plugin_registry
     WHERE plugin_slug = $1
     LIMIT 1`,
    [canonicalSlug],
  );

  if (result.rowCount === 0) {
    return null;
  }

  return mapPluginRegistryRow(result.rows[0]);
}

export async function listPluginRegistryWithSummary(options?: { includeHidden?: boolean }) {
  const plugins = await listPluginRegistry(options);
  return {
    plugins,
    summary: buildSummary(plugins),
  };
}
