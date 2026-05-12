'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';

export default function LoginPage() {
  const { login, loginWithOAuth, loading } = useAuth();
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(urlError ?? null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await login(email, password);
    if (error) setError(error);
    setSubmitting(false);
  }

  async function handleOAuth(provider: 'google' | 'github') {
    setError(null);
    const { error } = await loginWithOAuth(provider);
    if (error) setError(error);
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      <div className="bg-slate-900/80 border border-slate-700 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1">Sign in</h1>
        <p className="text-slate-400 mb-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-purple-400 hover:underline">
            Register
          </Link>
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded bg-red-900/60 border border-red-700 text-red-300 text-sm">
            {error === 'auth_callback_failed'
              ? 'Authentication failed. Please try again.'
              : error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-1 text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg bg-purple-700 hover:bg-purple-600 font-semibold transition disabled:opacity-50"
          >
            {submitting ? 'Signing in…' : 'Sign in with Email'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <span className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-500 text-sm">or continue with</span>
          <span className="flex-1 h-px bg-slate-700" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleOAuth('google')}
            className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-slate-600 font-medium text-sm transition flex items-center justify-center gap-2"
          >
            <span>🌐</span> Continue with Google
          </button>
          <button
            onClick={() => handleOAuth('github')}
            className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-slate-600 font-medium text-sm transition flex items-center justify-center gap-2"
          >
            <span>🐙</span> Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}