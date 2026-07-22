import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value || request.cookies.get('__session')?.value;

  const protectedRoutes = ['/my-list', '/history', '/plans'];
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !sessionCookie) {
    const redirectUrl = new URL('/signin', request.url);
    const originalPath = pathname + request.nextUrl.search;
    redirectUrl.searchParams.set('redirect', originalPath);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-list', '/my-list/:path*', '/history', '/history/:path*', '/plans', '/plans/:path*'],
};
