import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';
import { AppLayout } from '../../components/ui/AppLayout';

/**
 * Profile page — server-rendered, protected.
 * If the user is not authenticated the middleware redirects them to /auth/login.
 * This page demonstrates server-side user retrieval with Supabase.
 */
export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Double-check in case middleware is not configured
  if (!user) redirect('/auth/login');

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-1">Profile</h1>
      <p className="text-slate-400 mb-8">Your account information.</p>

      <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-6 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-purple-700 flex items-center justify-center text-2xl font-bold">
            {(user.email?.[0] ?? '?').toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-lg">{user.email}</p>
            <p className="text-slate-400 text-sm">ID: {user.id}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <dt className="text-slate-400">Provider</dt>
          <dd className="text-white font-medium capitalize">
            {user.app_metadata?.provider ?? 'email'}
          </dd>

          <dt className="text-slate-400">Email verified</dt>
          <dd className={user.email_confirmed_at ? 'text-green-400' : 'text-yellow-400'}>
            {user.email_confirmed_at ? '✓ Verified' : '⚠ Unverified'}
          </dd>

          <dt className="text-slate-400">Account created</dt>
          <dd className="text-white">
            {new Date(user.created_at).toLocaleDateString()}
          </dd>

          <dt className="text-slate-400">Last sign-in</dt>
          <dd className="text-white">
            {user.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleString()
              : '—'}
          </dd>
        </dl>
      </div>
    </AppLayout>
  );
}
