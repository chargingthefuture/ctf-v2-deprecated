import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { getClerkRuntimeOptions } from './lib/auth/clerk-env';

const isProtectedWebRoute = createRouteMatcher(['/apps(.*)', '/plugin(.*)', '/admin(.*)']);
const clerkRuntimeOptions = getClerkRuntimeOptions();

import { NextResponse } from 'next/server';

if (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true') {
  // Skip Clerk middleware when auth is disabled for local/dev testing
  export default function middleware(req: any) {
    return NextResponse.next();
  }
} else {
  export default clerkMiddleware((auth, req) => {
    if (isProtectedWebRoute(req)) {
      auth().protect();
    }
  }, clerkRuntimeOptions);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
