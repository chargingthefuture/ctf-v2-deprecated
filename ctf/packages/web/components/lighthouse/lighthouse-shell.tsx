import { LightHouse } from '@/components/mockups/survivor-hub/LightHouse';

type LighthouseShellProps = {
  userId: string;
  isAdmin: boolean;
  role: string | null;
};

export async function LighthouseShell(props: LighthouseShellProps) {
  void props;
  return <LightHouse />;
}
