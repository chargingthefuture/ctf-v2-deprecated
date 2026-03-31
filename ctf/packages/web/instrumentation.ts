// Sentry onRequestError hook for Next.js 15+
import * as Sentry from '@sentry/nextjs';

export function onRequestError(error: unknown, context: any) {
  Sentry.captureException(error, {
    mechanism: {
      handled: false,
      type: 'auto.function.nextjs.on_request_error',
    },
    extra: context,
  });
}
import { initializeCronJobs } from './src/cron/init-cron';

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
