import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

type CookieToSet = { name: string; value: string; options: Record<string, unknown> };

/**
 * Updates the Supabase session in middleware.
 * Must be called in middleware.ts to keep the session refreshed.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as Parameters<typeof supabaseResponse.cookies.set>[2])
          );
        },
      },
    }
  );

  // Refresh the session — do not write logic between createServerClient and getUser
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes: redirect unauthenticated users to /auth/login
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/chat') ||
    pathname.startsWith('/quiz') ||
    pathname.startsWith('/notes') ||
    pathname.startsWith('/pdf') ||
    pathname.startsWith('/achievements') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/profile');

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/auth/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (user && (pathname === '/auth/login' || pathname === '/auth/register')) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}
