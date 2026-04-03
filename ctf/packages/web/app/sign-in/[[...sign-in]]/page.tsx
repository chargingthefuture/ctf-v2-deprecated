import { redirect } from 'next/navigation';
import { SignIn } from 'lib/auth/clerk-wrapper';
import { getClerkSignInUrl } from 'lib/auth/clerk-env';

type SignInPageProps = {
  searchParams?: Promise<{
    redirect_url?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const signInUrl = getClerkSignInUrl();
  if (signInUrl && /^https?:\/\//.test(signInUrl)) {
    const hostedSignInUrl = new URL(signInUrl);
    if (resolvedSearchParams?.redirect_url) {
      hostedSignInUrl.searchParams.set('redirect_url', resolvedSearchParams.redirect_url);
    }
    redirect(hostedSignInUrl.toString());
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F1117',
      }}
    >
      <SignIn />
    </div>
  );
}
