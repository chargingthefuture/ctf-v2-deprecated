import type { Metadata } from 'next';
import { ClerkProvider } from '../lib/auth/clerk-wrapper';
import {
  getClerkAfterSignOutUrl,
  getClerkPublishableKey,
} from '../lib/auth/clerk-env';
import './globals.css';

export const metadata: Metadata = {
  title: 'CTF Survivor Hub',
  description: 'Dark theme plugin-first community shell for survivor-centered support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const publishableKey = getClerkPublishableKey();
  const afterSignOutUrl = getClerkAfterSignOutUrl();
  // signInUrl is NOT passed to ClerkProvider. Clerk auto-detects Account
  // Portal from the publishable key and Clerk dashboard Paths config.
  // Passing signInUrl overrides that and redirects to the app domain's
  // /sign-in page, which is not a valid Clerk auth surface.
  const clerkProviderProps = {
    ...(publishableKey ? { publishableKey } : {}),
    ...(afterSignOutUrl ? { afterSignOutUrl } : {}),
    signInFallbackRedirectUrl: '/apps',
  };

  return (
    <html lang="en">
      <body>
        <ClerkProvider {...clerkProviderProps}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
