import { Workforce } from '@/components/mockups/survivor-hub/Workforce';

type WorkforceShellProps = {
  isAdmin: boolean;
};

export async function WorkforceShell(props: WorkforceShellProps) {
  void props;
  return <Workforce />;
}
