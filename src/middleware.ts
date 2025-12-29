import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-change-this-in-production'
);

const COOKIE_NAME = 'auth_token';

// Routes that don't require authentication
const publicRoutes = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/logout',
];

// Routes that should be completely public (landing pages, etc)
const publicPrefixes = [
    '/_next',
    '/api/public',
    '/favicon.ico',
];

async function verifyJWT(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public prefixes
    for (const prefix of publicPrefixes) {
        if (pathname.startsWith(prefix)) {
            return NextResponse.next();
        }
    }

    // Allow public routes
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Allow landing pages (not /admin)
    if (!pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // Check for auth token in protected routes (/admin/*)
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
        // No token, redirect to sign-in
        const signInUrl = new URL('/auth/sign-in', request.url);
        signInUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Verify token
    const isValid = await verifyJWT(token);

    if (!isValid) {
        // Invalid/expired token, clear cookie and redirect
        const signInUrl = new URL('/auth/sign-in', request.url);
        signInUrl.searchParams.set('callbackUrl', pathname);
        const response = NextResponse.redirect(signInUrl);
        response.cookies.delete(COOKIE_NAME);
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
