'use client';

import { useAuthContext } from '../contexts/AuthContext';
import type { AuthUser } from '../types/auth';

/**
 * useUser — returns the currently authenticated user (or null).
 *
 * @example
 * const user = useUser();
 * if (!user) return <p>Not logged in</p>;
 */
export function useUser(): AuthUser | null {
  const { user } = useAuthContext();
  return user;
}
