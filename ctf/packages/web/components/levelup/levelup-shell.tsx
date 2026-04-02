import LevelUp from '@/components/mockups/survivor-hub/LevelUp';

type LevelupShellProps = {
  userId: string;
  isAdmin: boolean;
  query: {
    track?: string;
    status?: string;
    startDate?: string;
    cohortId?: string;
  };
};

export async function LevelupShell(props: LevelupShellProps) {
  void props;
  return <LevelUp />;
}
