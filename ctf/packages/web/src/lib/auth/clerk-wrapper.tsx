// Wrapper that conditionally re-exports Clerk or provides lightweight mocks when
// NEXT_PUBLIC_DISABLE_AUTH=true. Keeps import surface stable for components.
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const DISABLE = process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true';

if (!DISABLE) {
  // Re-export the real Clerk client-side package when auth is enabled.
  // eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/consistent-type-imports
  const clerk = require('@clerk/nextjs');
  module.exports = {
    ClerkProvider: clerk.ClerkProvider,
    SignIn: clerk.SignIn,
    SignUp: clerk.SignUp,
    SignedIn: clerk.SignedIn,
    SignedOut: clerk.SignedOut,
    SignInButton: clerk.SignInButton,
    UserButton: clerk.UserButton,
    useUser: clerk.useUser,
  };
} else {
  // Provide simple no-op/mocked implementations so the app can run without Clerk.
  const ClerkProvider = ({ children }: any) => React.createElement(React.Fragment, null, children);
  const SignIn = () => React.createElement('div', { style: { padding: 20 } }, 'Auth disabled (SignIn)');
  const SignUp = () => React.createElement('div', { style: { padding: 20 } }, 'Auth disabled (SignUp)');
  const SignedIn = ({ children }: any) => React.createElement(React.Fragment, null, children);
  const SignedOut = ({ children }: any) => null;
  const SignInButton = ({ children }: any) => React.createElement(React.Fragment, null, children);
  const UserButton = () => React.createElement('button', { type: 'button' }, 'User');
  function useUser() {
    return {
      user: {
        id: 'dev_user',
        firstName: 'Dev',
        username: 'dev',
        imageUrl: null,
      },
    };
  }

  module.exports = {
    ClerkProvider,
    SignIn,
    SignUp,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
  };
}
