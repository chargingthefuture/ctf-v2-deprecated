export type PluginName = "chyme";

export interface PluginProfileRecord {
  userId: string;
  pluginName: PluginName;
  createdAtIso: string;
  updatedAtIso: string;
  deletedAtIso?: string;
}

export interface PluginDeletionRequest {
  userId: string;
  pluginName: PluginName;
  reason: "user_requested" | "policy_enforcement";
  requestedAtIso: string;
}
