import { redirect } from 'next/navigation';

// Sign-in lives on Clerk Account Portal (accounts.the-comic.com), not on the
// app domain. This page only exists as a catch-all for legacy links or
// misconfigured redirects. It always forwards to /apps.
export default function SignInPage() {
  redirect('/apps');
}
