import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicRoutes = ['/login', '/api/auth'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If not authenticated and trying to access protected route
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // student trying to access counselor or coordinator routes - redirect to student dashboard
  if (token && token.role === 'student' && (pathname.startsWith('/coordinator') || pathname.startsWith('/counselor'))) {
    const studentUrl = new URL('/student', request.url);
    return NextResponse.redirect(studentUrl);
  }

  // Coordinator trying to access student routes - redirect to coordinator dashboard
  if (token && token.role === 'coordinator' && (pathname.startsWith('/student') || pathname.startsWith('/counselor'))) {
    const coordinatorUrl = new URL('/coordinator', request.url);
    return NextResponse.redirect(coordinatorUrl);
  }

  // Counselor trying to access student routes - redirect to counselor dashboard
  if (token && token.role === 'counselor' && (pathname.startsWith('/student') || pathname.startsWith('/coordinator'))) {
    const counselorUrl = new URL('/counselor', request.url);
    return NextResponse.redirect(counselorUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
