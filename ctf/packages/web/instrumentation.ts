import * as Sentry from '@sentry/nextjs';
import { initializeCronJobs } from './src/cron/init-cron';

// Sentry onRequestError hook for Next.js 15+
export function onRequestError(error: unknown, context: Record<string, unknown>) {
  Sentry.withScope((scope) => {
    scope.setContext('next_request_error', context);
    Sentry.captureException(error, {
      mechanism: {
        handled: false,
        type: 'auto.function.nextjs.on_request_error',
      },
    });
  });
}

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
    // Initialize cron jobs after Sentry is configured
    await initializeCronJobs();
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
