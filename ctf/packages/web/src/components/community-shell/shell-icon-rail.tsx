'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import type { ShellSection } from './shell-types';
import styles from './community-shell.module.css';

type IconRailProps = {
  section: ShellSection;
  onSectionChange: (s: ShellSection) => void;
};

export function ShellIconRail({ section, onSectionChange }: IconRailProps) {
  return (
    <aside className={styles.iconRail}>
      <div className={styles.iconRailLogo} aria-hidden="true">SH</div>

      <button
        type="button"
        className={section === 'chat' ? `${styles.iconRailBtn} ${styles.iconRailBtnActive}` : styles.iconRailBtn}
        onClick={() => onSectionChange('chat')}
        aria-label="Chat"
        aria-pressed={section === 'chat'}
      >
        💬
      </button>

      <button
        type="button"
        className={section === 'apps' ? `${styles.iconRailBtn} ${styles.iconRailBtnActive}` : styles.iconRailBtn}
        onClick={() => onSectionChange('apps')}
        aria-label="Apps"
        aria-pressed={section === 'apps'}
      >
        ⚡
      </button>

      <div className={styles.iconRailSpacer} aria-hidden="true" />

      <button type="button" className={styles.iconRailBtn} aria-label="Notifications">🔔</button>
      <button type="button" className={styles.iconRailBtn} aria-label="Settings">⚙️</button>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button type="button" className={styles.iconRailBtn} aria-label="Sign in">👤</button>
        </SignInButton>
      </SignedOut>
    </aside>
  );
}
