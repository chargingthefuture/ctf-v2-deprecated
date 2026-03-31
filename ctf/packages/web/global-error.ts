import * as Sentry from '@sentry/nextjs';

// Use Sentry's recommended global error boundary for Next.js App Router
export default Sentry.wrapAppErrorBoundary();
