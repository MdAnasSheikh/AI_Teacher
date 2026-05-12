'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * This page handles the browser-side part of the OAuth callback.
 * The actual code exchange happens in /api/auth/callback (Route Handler).
 * Users land here only if JavaScript is needed to detect the redirect.
 */
export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // After OAuth, Next.js middleware (via updateSession) handles the session.
    // Redirect to dashboard after a brief pause to allow cookie propagation.
    const timer = setTimeout(() => router.replace('/dashboard'), 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      <div className="bg-slate-900/80 border border-slate-700 p-10 rounded-xl shadow-xl text-center">
        <div className="text-4xl mb-4 animate-spin inline-block">⚙️</div>
        <h1 className="text-xl font-bold mb-2">Authenticating…</h1>
        <p className="text-slate-400">Processing your login, please wait.</p>
      </div>
    </div>
  );
}