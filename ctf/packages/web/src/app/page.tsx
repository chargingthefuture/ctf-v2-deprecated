"use client";

import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { user, isLoaded } = useUser();

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to TI Skills Economy</h1>

      <SignedOut>
        <div style={{ marginTop: "2rem" }}>
          <p>Please sign in to continue</p>
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        {isLoaded && (
          <div style={{ marginTop: "2rem" }}>
            <p>Welcome, {user?.firstName || user?.username || "User"}!</p>
            <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
          </div>
        )}
      </SignedIn>
    </main>
  );
}
