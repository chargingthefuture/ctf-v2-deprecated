import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { getClerkRuntimeOptions } from './lib/auth/clerk-env';

const isProtectedWebRoute = createRouteMatcher(['/apps(.*)', '/plugin(.*)', '/admin(.*)']);
const clerkRuntimeOptions = getClerkRuntimeOptions();

// No signInUrl is passed to clerkMiddleware (see getClerkRuntimeOptions).
// Clerk auto-detects Account Portal from the publishable key and dashboard
// config. Passing signInUrl would override that and redirect to the app
// domain's /sign-in page instead of Account Portal.
const actualMiddleware = clerkMiddleware((auth, req) => {
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true') {
    return;
  }

  if (isProtectedWebRoute(req)) {
    auth().protect();
  }
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
