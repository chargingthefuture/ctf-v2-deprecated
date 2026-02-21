import * as Sentry from "@sentry/nextjs";
import {
  createSentryNoiseFilterOptions,
  shouldDropSentryEvent,
  shouldDropTransaction,
} from "./src/lib/sentryNoiseFilter";

const webProvider = process.env.VERCEL === "1" ? "VERCEL" : "RAILWAY";
const sentryDsn = process.env[`${webProvider}_SENTRY_DSN`];

if (!sentryDsn) {
  throw new Error(`${webProvider}_SENTRY_DSN is not configured`);
}

const filterOptions = createSentryNoiseFilterOptions({
  allowlistMode: process.env.SENTRY_ROUTE_ALLOWLIST_MODE,
  allowedRoutePrefixes: process.env.SENTRY_ALLOWED_ROUTE_PREFIXES,
});

Sentry.init({
  dsn: sentryDsn,
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.02"),
  sendDefaultPii: false,
  beforeSend: (event) => {
    if (shouldDropSentryEvent(event, filterOptions)) {
      return null;
    }

    return event;
  },
  tracesSampler: (samplingContext) => {
    if (
      shouldDropTransaction({
        name: samplingContext.name,
        attributes: samplingContext.attributes,
      }, filterOptions)
    ) {
      return 0;
    }

    return Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.02");
  },
});
