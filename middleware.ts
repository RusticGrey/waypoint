import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const isPublicRoute = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/api/auth') || pathname.startsWith('/_next') || pathname.startsWith('/static');

  // If not authenticated and trying to access protected route
  if (!token && !isPublicRoute) {
    const landingUrl = new URL('/', request.url);
    return NextResponse.redirect(landingUrl);
  }

  // 1. Redirect root to dashboard if authenticated
  if (token && pathname === '/') {
    const dashboardUrl = new URL(`/${token.role === 'student' ? 'student' : 'counselor'}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 2. Student access control
  if (token?.role === 'student') {
    if (pathname.startsWith('/counselor')) {
      return NextResponse.redirect(new URL('/student', request.url));
    }
  }

  // 3. Counselor access control
  if (token?.role === 'counselor') {
    if (pathname.startsWith('/student')) {
      return NextResponse.redirect(new URL('/counselor', request.url));
    }

    // Restriction: Manage Users is only for Admins
    if (pathname.startsWith('/counselor/manage-users') && !token.isAdmin) {
      return NextResponse.redirect(new URL('/counselor', request.url));
    }
  }

  // Feature Flag: Meeting Management
  const meetingsEnabled = process.env.NEXT_PUBLIC_ENABLE_MEETINGS === 'true';
  const isMeetingRoute = pathname.includes('/meetings') || 
                         pathname.startsWith('/api/meetings') || 
                         pathname.startsWith('/api/integrations') ||
                         pathname.startsWith('/api/auth/google') ||
                         pathname.startsWith('/api/auth/zoom');

  if (!meetingsEnabled && isMeetingRoute) {
    // If it's an API route, return 404 or 403
    if (pathname.startsWith('/api/')) {
      return new NextResponse(null, { status: 404 });
    }
    // For UI routes, redirect to the user's dashboard "softly"
    const role = token?.role || 'login';
    const dashboardUrl = new URL(`/${role}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
