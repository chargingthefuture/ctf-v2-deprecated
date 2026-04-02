#!/usr/bin/env node
/* eslint-env node */
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const pluginRegistryPath = path.join(root, 'packages', 'web', 'lib', 'plugins', 'repository.ts');
const pluginRoutePath = path.join(root, 'packages', 'web', 'app', 'apps', '[pluginSlug]', 'page.tsx');

const pluginRegistryText = fs.readFileSync(pluginRegistryPath, 'utf8');
const pluginRouteText = fs.readFileSync(pluginRoutePath, 'utf8');

const pluginRegistryEntries = [];
const pluginRegistryEntryRegex = /slug:\s*'([^']+)'[\s\S]*?availabilityState:\s*'(implemented_shell|planned)'[\s\S]*?isVisible:\s*(true|false)/g;
let match;

while ((match = pluginRegistryEntryRegex.exec(pluginRegistryText)) !== null) {
  pluginRegistryEntries.push({
    slug: match[1],
    availabilityState: match[2],
    isVisible: match[3] === 'true',
  });
}

if (pluginRegistryEntries.length === 0) {
  console.error('Web/Android parity check failed. Could not read plugin registry entries.');
  process.exit(1);
}

const pluginIdsForParity = pluginRegistryEntries
  .filter((entry) => entry.availabilityState === 'implemented_shell')
  .map((entry) => entry.slug);

const plannedPluginIds = pluginRegistryEntries
  .filter((entry) => entry.availabilityState === 'planned')
  .map((entry) => entry.slug);

const implementedRouteSlugSet = new Set();
const routeSlugRegex = /selectedPlugin\.slug\s*===\s*'([^']+)'/g;

while ((match = routeSlugRegex.exec(pluginRouteText)) !== null) {
  implementedRouteSlugSet.add(match[1]);
}

const mobileFeatureDir = path.join(root, 'packages', 'mobile', 'src', 'features');
const mobileFeatureDirs = new Set(
  fs
    .readdirSync(mobileFeatureDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name),
);

const parityAliasToMobileDir = {
  'feed-announcements': ['feed', 'announcements'],
  'skills-taxonomy': ['skills-taxonomy'],
  socketrelay: ['socketrelay'],
  trusttransport: ['trusttransport'],
  'peer-programming': ['peer-programming'],
  'weekly-performance': ['weekly-performance'],
  'skills-hunt': ['skills-hunt'],
  'service-credits': ['service-credits'],
  gentlepulse: ['gentlepulse'],
  directory: ['directory'],
  chyme: ['chyme'],
  workforce: ['workforce'],
  foundation: ['foundation'],
  lighthouse: ['lighthouse'],
  mood: ['mood'],
  gdp: ['gdp'],
  levelup: ['levelup'],
  unlock: ['unlock'],
};

const missing = [];
const routeGaps = [];
const plannedBacklog = [];

for (const pluginId of pluginIdsForParity) {
  const requiredMobileDirs = parityAliasToMobileDir[pluginId] ?? [pluginId];
  const allPresent = requiredMobileDirs.every((dir) => mobileFeatureDirs.has(dir));

  if (!allPresent) {
    missing.push({ pluginId, requiredMobileDirs });
  }

  const registryEntry = pluginRegistryEntries.find((entry) => entry.slug === pluginId);
  const isVisible = registryEntry?.isVisible ?? true;

  if (isVisible && !implementedRouteSlugSet.has(pluginId)) {
    routeGaps.push(pluginId);
  }
}

for (const pluginId of plannedPluginIds) {
  const requiredMobileDirs = parityAliasToMobileDir[pluginId] ?? [pluginId];
  const mobileAlreadyHasSurface = requiredMobileDirs.every((dir) => mobileFeatureDirs.has(dir));

  if (mobileAlreadyHasSurface) {
    plannedBacklog.push(pluginId);
  }
}

if (missing.length > 0 || routeGaps.length > 0 || plannedBacklog.length > 0) {
  console.error('Web/Android parity check failed. Missing Android feature surface(s):');
  for (const item of missing) {
    console.error(`- ${item.pluginId} -> expected mobile dirs: ${item.requiredMobileDirs.join(', ')}`);
  }

  if (routeGaps.length > 0) {
    console.error('Behavioral parity route gaps (implemented in registry but not wired in plugin route):');
    for (const pluginId of routeGaps) {
      console.error(`- ${pluginId}`);
    }
  }

  if (plannedBacklog.length > 0) {
    console.error('Behavioral parity backlog (mobile has surface but web registry is still planned):');
    for (const pluginId of plannedBacklog) {
      console.error(`- ${pluginId}`);
    }
  }

  process.exit(1);
}

console.log('Web/Android parity check passed.');
