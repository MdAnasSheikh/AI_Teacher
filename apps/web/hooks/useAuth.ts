'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '../contexts/AuthContext';

/**
 * useAuth — provides auth actions and state from AuthContext.
 *
 * @example
 * const { user, signInWithEmail, signOut } = useAuth();
 */
export function useAuth() {
  const router = useRouter();
  const ctx = useAuthContext();

  async function login(email: string, password: string) {
    const { error } = await ctx.signInWithEmail(email, password);
    if (!error) router.push('/dashboard');
    return { error };
  }

  async function register(email: string, password: string) {
    const { error } = await ctx.signUpWithEmail(email, password);
    return { error };
  }

  async function loginWithOAuth(provider: 'google' | 'github') {
    const { error } = await ctx.signInWithOAuth(provider);
    return { error };
  }

  async function logout() {
    await ctx.signOut();
    router.push('/auth/login');
  }

  return {
    user: ctx.user,
    session: ctx.session,
    loading: ctx.loading,
    login,
    register,
    loginWithOAuth,
    logout,
  };
}
