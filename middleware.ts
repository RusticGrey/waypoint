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

  // If authenticated as student
  if (token && token.role === 'student') {
    // Allow access to onboarding and API routes
    const allowedStudentRoutes = [
      '/student/onboarding',
      '/api/onboarding',
      '/api/auth',
      '/api/subjects',
    ];
    
    const isAllowedRoute = allowedStudentRoutes.some(route => pathname.startsWith(route));

    // If trying to access any other student route, check onboarding status
    if (!isAllowedRoute && pathname.startsWith('/student')) {
      try {
        const checkUrl = new URL('/api/onboarding/status', request.url);
        const response = await fetch(checkUrl, {
          headers: {
            cookie: request.headers.get('cookie') || '',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // If onboarding not complete, redirect to onboarding
          if (!data.isComplete) {
            const onboardingUrl = new URL('/student/onboarding', request.url);
            return NextResponse.redirect(onboardingUrl);
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    }
  }

  // Coordinator trying to access student routes - redirect to coordinator dashboard
  if (token && token.role === 'coordinator' && pathname.startsWith('/student')) {
    const coordinatorUrl = new URL('/coordinator', request.url);
    return NextResponse.redirect(coordinatorUrl);
  }

  // Counselor trying to access student routes - redirect to counselor dashboard
  if (token && token.role === 'counselor' && pathname.startsWith('/student')) {
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
