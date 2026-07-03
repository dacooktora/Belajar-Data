// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Daftar path yang membutuhkan auth (opsional)
const protectedPaths = [
  '/dashboard',
  '/learning',
  '/daily',
  '/progress',
  '/analytics',
  '/projects',
  '/settings',
];

// Daftar path yang sudah login tidak boleh akses
const authPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Cek session dari cookie (opsional)
  const session = request.cookies.get('session');

  // Jika path adalah auth dan sudah login, redirect ke dashboard
  if (authPaths.includes(path) && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Jika path adalah protected dan tidak login, redirect ke login
  if (protectedPaths.some(p => path.startsWith(p)) && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match semua path kecuali:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
