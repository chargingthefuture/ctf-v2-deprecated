import Link from 'next/link';
import {
  getLighthouseAdminStats,
  getProfile,
  listAnnouncementsForLighthouseUser,
  listBlocks,
  listMatches,
  listMyProperties,
  listProperties,
} from '@/src/lib/lighthouse/repository';

type LighthouseShellProps = {
  userId: string;
  isAdmin: boolean;
  role: string | null;
};

export async function LighthouseShell({ userId, isAdmin, role }: LighthouseShellProps) {
  const [profile, properties, myProperties, matches, blocks, announcements] = await Promise.all([
    getProfile(userId),
    listProperties({ page: 1, pageSize: 8 }),
    listMyProperties(userId),
    listMatches(userId),
    listBlocks(userId),
    listAnnouncementsForLighthouseUser({ userId, role, page: 1, pageSize: 8 }),
  ]);

  const adminStats = isAdmin ? await getLighthouseAdminStats() : null;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">LightHouse</h1>
        <p className="text-sm text-muted-foreground">
          Housing profile, property listing, matching, blocking, and announcement visibility flows.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Public properties</p>
          <p className="text-2xl font-semibold">{properties.total}</p>
        </article>
        <article className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">My properties</p>
          <p className="text-2xl font-semibold">{myProperties.length}</p>
        </article>
        <article className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">My matches</p>
          <p className="text-2xl font-semibold">{matches.length}</p>
        </article>
        <article className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">My blocks</p>
          <p className="text-2xl font-semibold">{blocks.length}</p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border bg-card p-5 space-y-3">
          <h2 className="text-lg font-medium">My profile</h2>
          {profile ? (
            <div className="text-sm space-y-1">
              <p>Type: {profile.profileType}</p>
              <p>Active: {profile.isActive ? 'yes' : 'no'}</p>
              <p>Has property: {profile.hasProperty ? 'yes' : 'no'}</p>
              <p className="text-muted-foreground">{profile.bio ?? 'No bio set.'}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No profile created yet.</p>
          )}
        </article>

        <article className="rounded-lg border bg-card p-5 space-y-3">
          <h2 className="text-lg font-medium">Announcements</h2>
          <ul className="space-y-2 text-sm">
            {announcements.items.map((item) => (
              <li key={item.id} className="rounded border p-2">
                <p className="font-medium">{item.title}</p>
                <p className="text-muted-foreground">{item.body}</p>
              </li>
            ))}
            {announcements.items.length === 0 ? <li className="text-muted-foreground">No announcements.</li> : null}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border bg-card p-5 space-y-3">
          <h2 className="text-lg font-medium">Property browse</h2>
          <ul className="space-y-2 text-sm">
            {properties.items.map((property) => (
              <li key={property.id} className="rounded border p-2">
                <p className="font-medium">{property.title}</p>
                <p className="text-muted-foreground">{property.city ?? 'Unknown city'}, {property.country ?? 'Unknown country'}</p>
              </li>
            ))}
            {properties.items.length === 0 ? <li className="text-muted-foreground">No active properties listed.</li> : null}
          </ul>
        </article>

        <article className="rounded-lg border bg-card p-5 space-y-3">
          <h2 className="text-lg font-medium">Matches</h2>
          <ul className="space-y-2 text-sm">
            {matches.map((match) => (
              <li key={match.id} className="rounded border p-2">
                <p className="font-medium">Match {match.id.slice(0, 8)}…</p>
                <p className="text-muted-foreground">Status: {match.status}</p>
              </li>
            ))}
            {matches.length === 0 ? <li className="text-muted-foreground">No matches yet.</li> : null}
          </ul>
        </article>
      </section>

      {adminStats ? (
        <section className="rounded-lg border bg-card p-5 text-sm space-y-2">
          <h2 className="text-lg font-medium">Admin snapshot</h2>
          <p>Total seekers: {adminStats.seekers}</p>
          <p>Total hosts: {adminStats.hosts}</p>
          <p>Total properties: {adminStats.properties}</p>
          <p>Active matches: {adminStats.activeMatches}</p>
          <p>Completed matches: {adminStats.completedMatches}</p>
          <p>
            <Link className="underline underline-offset-4" href="/admin/lighthouse">Open /admin/lighthouse</Link>
          </p>
        </section>
      ) : null}

      <p className="text-sm">
        <Link className="underline underline-offset-4" href="/">Return to home</Link>
      </p>
    </main>
  );
}