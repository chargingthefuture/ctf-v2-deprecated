import { LeftNavigation } from "../navigation/LeftNavigation";
import { SocialAudioWorkspace } from "../plugins/SocialAudioWorkspace";
import { SocialAudioChatPanel } from "../chat/SocialAudioChatPanel";

interface AppShellProps {
  streamChatMauLimit: number;
  observabilityProvider: string;
  isAdmin?: boolean;
}

export function AppShell(props: AppShellProps) {
  return (
    <main className="shell" aria-label="TI Skills Economy application shell">
      <section className="shell-nav" aria-label="Primary navigation">
        <LeftNavigation isAdmin={Boolean(props.isAdmin)} />
      </section>

      <section className="shell-main" aria-label="Plugin workspace">
        <SocialAudioWorkspace
          streamChatMauLimit={props.streamChatMauLimit}
          observabilityProvider={props.observabilityProvider}
        />
      </section>

      <section className="shell-chat" aria-label="Social audio room chat">
        <SocialAudioChatPanel />
      </section>
    </main>
  );
}
