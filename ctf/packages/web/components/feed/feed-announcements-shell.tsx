import { FeedAnnouncements } from '@/components/mockups/survivor-hub/FeedAnnouncements';

type FeedAnnouncementsShellProps = {
  userId: string;
  role: string | null;
  isAdmin: boolean;
};

export async function FeedAnnouncementsShell(props: FeedAnnouncementsShellProps) {
  void props;
  return <FeedAnnouncements />;
}
