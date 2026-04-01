#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const pluginCatalogPath = path.join(root, 'packages', 'web', 'lib', 'plugins', 'plugin-catalog.ts');

const pluginCatalogText = fs.readFileSync(pluginCatalogPath, 'utf8');

const pluginIds = [];
const pluginIdRegex = /id:\s*'([^']+)'/g;
let match;

while ((match = pluginIdRegex.exec(pluginCatalogText)) !== null) {
  pluginIds.push(match[1]);
}

const pluginIdsForParity = pluginIds.filter((id) => !id.startsWith('bf-'));

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
};

const missing = [];

for (const pluginId of pluginIdsForParity) {
  const requiredMobileDirs = parityAliasToMobileDir[pluginId] ?? [pluginId];
  const allPresent = requiredMobileDirs.every((dir) => mobileFeatureDirs.has(dir));

  if (!allPresent) {
    missing.push({ pluginId, requiredMobileDirs });
  }
}

if (missing.length > 0) {
  console.error('Web/Android parity check failed. Missing Android feature surface(s):');
  for (const item of missing) {
    console.error(`- ${item.pluginId} -> expected mobile dirs: ${item.requiredMobileDirs.join(', ')}`);
  }
  process.exit(1);
}

console.log('Web/Android parity check passed.');
