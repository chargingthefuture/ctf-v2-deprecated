import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <main>
      <h1>CTF Web</h1>
      <p>Clerk baseline is active for protected plugin and admin routes.</p>
      <SignedOut>
        <SignInButton mode="modal">
          <button type="button">Sign in with Clerk</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <ul>
        <li>
          <a href="/plugin">Plugin protected route</a>
        </li>
        <li>
          <a href="/admin">Admin protected route</a>
        </li>
      </ul>
    </main>
  );
}
