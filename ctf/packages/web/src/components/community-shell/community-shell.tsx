import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import styles from './community-shell.module.css';

type PluginItem = {
  name: string;
  description: string;
  active?: boolean;
};

const plugins: PluginItem[] = [
  {
    name: 'Safe Housing',
    description: 'Trusted shelter pathways and rapid placement support.',
    active: true,
  },
  {
    name: 'Legal Aid',
    description: 'Case triage and rights guidance with verified advocates.',
  },
  {
    name: 'Healing Circle',
    description: 'Peer support rooms moderated by trauma-informed teams.',
  },
  {
    name: 'Job Bridge',
    description: 'Career readiness tracks and vetted employment pathways.',
  },
  {
    name: 'Safety Check',
    description: 'Privacy-first check-ins and trusted contact escalation.',
  },
];

const members = [
  'Amina J. · Support navigator',
  'Luis R. · Legal advocate',
  'Nia K. · Community mentor',
  'Jordan P. · Safety specialist',
];

const featuredSpaces = [
  {
    name: 'Emergency Safe Stay',
    description: 'Immediate placement and survivor-led orientation.',
  },
  {
    name: 'Recovery & Wellness',
    description: 'Counseling, care plans, and long-term support circles.',
  },
  {
    name: 'Education & Skills',
    description: 'Scholarships, training cohorts, and tutoring pathways.',
  },
  {
    name: 'Employment Launch',
    description: 'Interview preparation and fair-work onboarding.',
  },
];

export function CommunityShell() {
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
              {plugins.map((plugin) => (
                <li key={plugin.name}>
                  <button
                    className={`${styles.pluginButton}${plugin.active ? ` ${styles.pluginButtonActive}` : ''}`}
                    type="button"
                  >
                    {plugin.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.statusCard}>
            <p>Designed for scale: 5M survivors, one secure community surface.</p>
          </div>
        </aside>

        <main className={`${styles.panel} ${styles.content}`}>
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
            <h2>Featured Community Spaces</h2>
            <button type="button">See all</button>
          </div>
          <section className={styles.cardGrid}>
            {featuredSpaces.map((space) => (
              <article className={styles.featureCard} key={space.name}>
                <h3>{space.name}</h3>
                <p>{space.description}</p>
              </article>
            ))}
          </section>

          <div className={styles.sectionHeader}>
            <h2>Plugin Activity</h2>
            <button type="button">View timeline</button>
          </div>
          <section className={styles.cardGrid}>
            {plugins.slice(0, 4).map((plugin) => (
              <article className={styles.featureCard} key={plugin.name}>
                <h3>{plugin.name}</h3>
                <p>{plugin.description}</p>
              </article>
            ))}
          </section>
        </main>

        <aside className={`${styles.panel} ${styles.rightRail}`}>
          <section className={styles.profileCard}>
            <p className={styles.sectionTitle}>Coordinator</p>
            <p className={styles.profileName}>Community Operations</p>
            <p className={styles.profileMeta}>Safety-first mode · Dark theme enabled</p>
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