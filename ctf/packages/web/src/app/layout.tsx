import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { getClerkRoutingForHost } from "../lib/clerkEnvironment";
import "./globals.css";

export const metadata: Metadata = {
  title: "TI Skills Economy",
  description: "A trauma-informed skills economy for survivors.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const requestHeaders = await headers();
  const requestHost =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    process.env.NEXT_PUBLIC_APP_URL;
  const clerkRouting = getClerkRoutingForHost(requestHost);

  return (
    <html lang="en">
      <body>
        {publishableKey ? (
          <ClerkProvider
            publishableKey={publishableKey}
            signInUrl={clerkRouting.signInUrl}
            signUpUrl={clerkRouting.signUpUrl}
            afterSignOutUrl={clerkRouting.afterSignOutUrl}
            signInFallbackRedirectUrl={clerkRouting.signInFallbackRedirectUrl}
          >
            {children}
          </ClerkProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
