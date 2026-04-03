import { clerkMiddleware } from '@clerk/nextjs/server';
import { getClerkRuntimeOptions } from './lib/auth/clerk-env';

const clerkRuntimeOptions = getClerkRuntimeOptions();

import { NextResponse } from 'next/server';

// Clerk middleware runs on every matched request for session detection only.
// It does NOT call auth().protect() — calling protect() triggers a server-side
// redirect that bypasses Clerk's Account Portal session handshake and causes
// redirect loops for authenticated users.
//
// Instead, each protected page calls evaluatePluginAccess() which checks auth
// server-side and redirects to Account Portal when unauthenticated. This matches
// the working platform pattern: Express clerkMiddleware() does session detection
// only; route handlers enforce auth.
const actualMiddleware = clerkMiddleware(() => {
  return NextResponse.next();
}, clerkRuntimeOptions);


import type { NextFetchEvent } from 'next/server';

export default function middleware(req: import('next/server').NextRequest, event: NextFetchEvent) {
  return actualMiddleware(req, event);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
