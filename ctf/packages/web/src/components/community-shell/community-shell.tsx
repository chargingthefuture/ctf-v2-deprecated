"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import {
  baselinePluginCount,
  nonBaselinePlugins,
  pluginCatalog,
} from '@/src/lib/plugins/plugin-catalog';
import styles from './community-shell.module.css';

const selectedPluginId = 'chyme';

const members = [
  'Amina J. · Support navigator',
  'Luis R. · Legal advocate',
  'Nia K. · Community mentor',
  'Jordan P. · Safety specialist',
];

function getPluginHref(pluginId: string): string {
  return `/plugin?plugin=${encodeURIComponent(pluginId)}`;
}

export function CommunityShell() {
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const { isLoaded, user } = useUser();
  const selectedPluginId = useMemo(() => {
    const requestedPluginId = searchParams.get('plugin');

    if (!requestedPluginId) {
      return 'chyme';
    }

    const isKnownPlugin = nonBaselinePlugins.some((plugin) => plugin.id === requestedPluginId);
    return isKnownPlugin ? requestedPluginId : 'chyme';
  }, [searchParams]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPlugins = useMemo(() => {
    if (!normalizedQuery) {
      return nonBaselinePlugins;
    }

    return nonBaselinePlugins.filter((plugin) => {
      const haystack = `${plugin.name} ${plugin.summary} ${plugin.phase} ${plugin.startGate}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const sidebarPlugins = filteredPlugins.slice(0, 8);
  const featuredPlugins = filteredPlugins.slice(0, 4);
  const pluginActivity = filteredPlugins.slice(4, 8);
  const requiresUsername = Boolean(isLoaded && user && (!user.username || user.username.trim().length === 0));

  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <aside className={`${styles.panel} ${styles.serverRail}`}>
          <button className={`${styles.serverButton} ${styles.serverButtonActive}`} type="button" aria-label="Core community">
            ✦
          </button>
          <button className={styles.serverButton} type="button" aria-label="Crisis support">
            🛟
          </button>
          <button className={styles.serverButton} type="button" aria-label="Trusted providers">
            🧭
          </button>
          <button className={styles.serverButton} type="button" aria-label="Learning programs">
            🎓
          </button>
          <div className={styles.serverSpacer} />
          <button className={styles.serverButton} type="button" aria-label="Add plugin">
            +
          </button>
        </aside>

        <aside className={`${styles.panel} ${styles.leftNav}`}>
          <p className={styles.appTitle}>CTF Survivor Hub</p>
          <div>
            <p className={styles.sectionTitle}>Plugins</p>
            <ul className={styles.pluginList}>
              {sidebarPlugins.map((plugin) => (
                <li key={plugin.id}>
                  <Link
                    className={`${styles.pluginButton}${plugin.id === selectedPluginId ? ` ${styles.pluginButtonActive}` : ''}`}
                    href={getPluginHref(plugin.id)}
                  >
                    {plugin.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.statusCard}>
            <p>Designed for scale: 5M survivors, one secure community surface.</p>
            <p>{pluginCatalog.length} planned workstreams · {baselinePluginCount} baseline gates.</p>
          </div>
        </aside>

        <main className={`${styles.panel} ${styles.content}`}>
          <SignedIn>
            {requiresUsername ? (
              <section className={styles.usernameAlert} role="alert">
                Username required: open your profile avatar and choose Update username to continue using username-required plugins.
              </section>
            ) : null}
          </SignedIn>

          <div className={styles.toolbar}>
            <label className={styles.visuallyHidden} htmlFor="community-search">
              Search survivors, plugins, and spaces
            </label>
            <input
              className={styles.search}
              id="community-search"
              name="communitySearch"
              placeholder="Search plugins, spaces, and support resources"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className={styles.toolbarButton} type="button">
              Explore
            </button>
            <button className={styles.toolbarButton} type="button">
              Alerts
            </button>
          </div>

          <section className={styles.hero}>
            <h1>One survivor-centered network.</h1>
            <p>Discord-style collaboration for support, healing, and opportunity through plugins.</p>
          </section>

          <div className={styles.sectionHeader}>
            <h2>Featured Plugin Streams</h2>
            <button type="button">See all</button>
          </div>
          <section className={styles.cardGrid}>
            {featuredPlugins.map((plugin) => (
              <article className={styles.featureCard} key={plugin.id}>
                <h3>{plugin.name}</h3>
                <p>{plugin.summary}</p>
                <p>{plugin.startGate}</p>
                <Link className={styles.cardAction} href={getPluginHref(plugin.id)}>
                  Open plugin
                </Link>
              </article>
            ))}
          </section>
          {featuredPlugins.length === 0 ? (
            <section className={styles.featureCard}>
              <h3>No matching plugin streams</h3>
              <p>Try a different search term to explore planned plugin workstreams.</p>
            </section>
          ) : null}

          <div className={styles.sectionHeader}>
            <h2>Plugin Activity</h2>
            <button type="button">View timeline</button>
          </div>
          <section className={styles.cardGrid}>
            {pluginActivity.map((plugin) => (
              <article className={styles.featureCard} key={plugin.id}>
                <h3>{plugin.name}</h3>
                <p>{plugin.summary}</p>
                <p>{plugin.startGate}</p>
                <Link className={styles.cardAction} href={getPluginHref(plugin.id)}>
                  Open plugin
                </Link>
              </article>
            ))}
          </section>
        </main>

        <aside className={`${styles.panel} ${styles.rightRail}`}>
          <section className={styles.profileCard}>
            <p className={styles.sectionTitle}>Coordinator</p>
            <p className={styles.profileName}>Community Operations</p>
            <p className={styles.profileMeta}>Safety-first mode · Dark theme enabled · {pluginCatalog.length} plugins mapped</p>
          </section>

          <section>
            <p className={styles.sectionTitle}>Active Members</p>
            <ul className={styles.memberList}>
              {members.map((member) => (
                <li className={styles.memberItem} key={member}>
                  {member}
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.authActions}>
            <SignedOut>
              <SignInButton mode="modal">
                <button className={styles.authButton} type="button">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <a className={styles.subtleButton} href="/plugin">
              Open plugin route
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}