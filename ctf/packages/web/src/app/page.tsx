import { defaultMakerTierBudget } from "@ctf/shared";
import { AccessGate } from "../components/access/AccessGate";
import { webErrorReporter, webObservabilityProvider } from "../lib/observability";

webErrorReporter.capture({
  message: "web_bootstrap_initialized",
  level: "info",
  tags: {
    runtime: "web",
  },
  timestampIso: new Date().toISOString(),
});

export default function HomePage() {
  return (
    <AccessGate
      streamChatMauLimit={defaultMakerTierBudget.monthlyChatMauLimit}
      observabilityProvider={webObservabilityProvider}
    />
  );
}
