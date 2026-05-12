import { NextResponse } from 'next/server';

/**
 * OAuth Callback Route Handler
 *
 * Supabase redirects users here after OAuth sign-in (Google, GitHub, etc.)
 * and after email confirmation. It exchanges the `code` query param for a
 * session and then redirects the user to the intended destination.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // `next` is the page the user was trying to access, or /dashboard by default
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const { createClient } = await import('../../../../lib/supabase/server');
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If code exchange fails, redirect to an error page
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`);
}
