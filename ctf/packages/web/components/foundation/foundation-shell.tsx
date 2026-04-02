import { Foundation } from '@/components/mockups/survivor-hub/Foundation';

type FoundationShellProps = {
  userId: string;
  isAdmin: boolean;
};

export async function FoundationShell(props: FoundationShellProps) {
  void props;
  return <Foundation />;
}
