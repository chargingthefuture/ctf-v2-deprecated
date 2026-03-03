"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import type { PluginRegistryItem } from '@/src/lib/plugins/repository';
import styles from './community-shell.module.css';

type CommunityShellProps = {
  initialPlugins: PluginRegistryItem[];
};

type PluginsApiPayload = {
  plugins?: PluginRegistryItem[];
};

type PluginCardsSectionProps = {
  title: string;
  actionLabel: string;
  actionHref: string;
  plugins: PluginRegistryItem[];
};

type RightRailProps = {
  implementedPlugins: number;
  activePlugins: PluginRegistryItem[];
};

function getAvailabilityLabel(state: PluginRegistryItem['availabilityState']): string {
  return state === 'implemented_shell' ? 'implemented' : 'planned';
}

function getPluginHref(pluginSlug: string): string {
  return `/apps/${encodeURIComponent(pluginSlug)}`;
}

function ServerRail() {
  return (
    <aside className={`${styles.panel} ${styles.serverRail}`}>
      <Link className={`${styles.serverButton} ${styles.serverButtonActive}`} href="/apps/chyme" aria-label="Core community">✦</Link>
      <Link className={styles.serverButton} href="/apps/foundation" aria-label="Crisis support">🛟</Link>
      <Link className={styles.serverButton} href="/apps/directory" aria-label="Trusted providers">🧭</Link>
      <Link className={styles.serverButton} href="/apps/skills-hunt" aria-label="Learning programs">🎓</Link>
      <div className={styles.serverSpacer} />
      <Link className={styles.serverButton} href="/admin" aria-label="Open admin">+</Link>
    </aside>
  );
}

function PluginCardsSection({ title, actionLabel, actionHref, plugins }: PluginCardsSectionProps) {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <Link href={actionHref}>{actionLabel}</Link>
      </div>
      <section className={styles.cardGrid}>
        {plugins.map((plugin) => (
          <article className={styles.featureCard} key={plugin.slug}>
            <h3>{plugin.name}</h3>
            <p>{plugin.summary}</p>
            <p>{plugin.startGate} · {getAvailabilityLabel(plugin.availabilityState)}</p>
            <Link className={styles.cardAction} href={getPluginHref(plugin.slug)}>
              Open plugin
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}

function RightRail({ implementedPlugins, activePlugins }: RightRailProps) {
  return (
    <aside className={`${styles.panel} ${styles.rightRail}`}>
      <section className={styles.profileCard}>
        <p className={styles.sectionTitle}>Coordinator</p>
        <p className={styles.profileName}>Community Operations</p>
        <p className={styles.profileMeta}>Safety-first mode · Dark theme enabled · {implementedPlugins} live plugins</p>
      </section>

      <section>
        <p className={styles.sectionTitle}>Active Plugins</p>
        <ul className={styles.memberList}>
          {activePlugins.map((plugin) => (
            <li className={styles.memberItem} key={plugin.slug}>
              {plugin.name} · {plugin.startGate}
            </li>
          ))}
          {activePlugins.length === 0 ? <li className={styles.memberItem}>No active plugins available.</li> : null}
        </ul>
      </section>

      <div className={styles.authActions}>
        <SignedOut>
          <SignInButton mode="modal">
            <button className={styles.authButton} type="button">Sign in</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link className={styles.subtleButton} href="/apps/chyme">
          Open plugin route
        </Link>
      </div>
    </aside>
  );
}

export function CommunityShell({ initialPlugins }: CommunityShellProps) {
  const [query, setQuery] = useState('');
  const [plugins, setPlugins] = useState(initialPlugins);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { isLoaded, user } = useUser();

  useEffect(() => {
    let isCancelled = false;

    async function loadPlugins() {
      try {
        const response = await fetch('/api/plugins', { method: 'GET', cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Unable to load plugin registry.');
        }

        const payload = (await response.json()) as PluginsApiPayload;
        if (!Array.isArray(payload.plugins)) {
          throw new Error('Plugin registry payload is invalid.');
        }

        if (!isCancelled) {
          setPlugins(payload.plugins);
          setLoadError(null);
        }
      } catch {
        if (!isCancelled) {
          setLoadError('Live plugin data is temporarily unavailable. Showing last known registry snapshot.');
        }
      }
    }

    void loadPlugins();
    return () => {
      isCancelled = true;
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPlugins = useMemo(() => {
    if (!normalizedQuery) {
      return plugins;
    }

    return plugins.filter((plugin) => {
      const haystack = `${plugin.name} ${plugin.summary} ${plugin.phase} ${plugin.startGate}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, plugins]);

  const sidebarPlugins = filteredPlugins.slice(0, 8);
  const featuredPlugins = filteredPlugins.slice(0, 4);
  const pluginActivity = filteredPlugins.slice(4, 8);
  const activePlugins = filteredPlugins.filter((plugin) => plugin.availabilityState === 'implemented_shell').slice(0, 4);
  const requiresUsername = Boolean(isLoaded && user && (!user.username || user.username.trim().length === 0));
  const selectedPluginSlug = 'chyme';
  const defaultPluginHref = featuredPlugins[0] ? getPluginHref(featuredPlugins[0].slug) : '/apps/chyme';
  const implementedPlugins = plugins.filter((plugin) => plugin.availabilityState === 'implemented_shell').length;

  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <ServerRail />

        <aside className={`${styles.panel} ${styles.leftNav}`}>
          <p className={styles.appTitle}>CTF Survivor Hub</p>
          <div>
            <p className={styles.sectionTitle}>Plugins</p>
            <ul className={styles.pluginList}>
              {sidebarPlugins.map((plugin) => (
                <li key={plugin.slug}>
                  <Link className={`${styles.pluginButton}${plugin.slug === selectedPluginSlug ? ` ${styles.pluginButtonActive}` : ''}`} href={getPluginHref(plugin.slug)}>
                    {plugin.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.statusCard}>
            <p>Designed for scale: 5M survivors, one secure community surface.</p>
            <p>{plugins.length} plugin streams · {implementedPlugins} implemented.</p>
          </div>
        </aside>

        <main className={`${styles.panel} ${styles.content}`}>
          <SignedIn>
            {requiresUsername ? <section className={styles.usernameAlert} role="alert">Username required: open your profile avatar and choose Update username to continue using username-required plugins.</section> : null}
          </SignedIn>
          {loadError ? <section className={styles.usernameAlert} role="alert">{loadError}</section> : null}

          <div className={styles.toolbar}>
            <label className={styles.visuallyHidden} htmlFor="community-search">Search survivors, plugins, and spaces</label>
            <input
              className={styles.search}
              id="community-search"
              name="communitySearch"
              placeholder="Search plugins, spaces, and support resources"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Link className={styles.toolbarButton} href={defaultPluginHref}>Explore</Link>
            <Link className={styles.toolbarButton} href="/admin/feed-announcements">Alerts</Link>
          </div>

          <section className={styles.hero}>
            <h1>One survivor-centered network.</h1>
            <p>Discord-style collaboration for support, healing, and opportunity through plugins.</p>
          </section>

          <PluginCardsSection title="Featured Plugin Streams" actionLabel="See all" actionHref={defaultPluginHref} plugins={featuredPlugins} />
          {featuredPlugins.length === 0 ? (
            <section className={styles.featureCard}>
              <h3>No matching plugin streams</h3>
              <p>Try a different search term to explore active plugin streams.</p>
            </section>
          ) : null}

          <PluginCardsSection title="Plugin Activity" actionLabel="View timeline" actionHref="/admin/feed-announcements" plugins={pluginActivity} />
        </main>

        <RightRail implementedPlugins={implementedPlugins} activePlugins={activePlugins} />
      </div>
    </div>
  );
}
