import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-change-this-in-production'
);

const COOKIE_NAME = 'auth_token';
const EXPIRY_TIME = '1h'; // 1 hour

export interface JWTPayload {
    id: number;
    username: string;
    email: string;
    name: string;
    role: string;
    [key: string]: unknown; // Index signature for jose compatibility
}

export interface SessionUser {
    id: number;
    username: string;
    email: string;
    name: string;
    role: string;
}

/**
 * Generate a JWT token with 1 hour expiry
 */
export async function signToken(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(EXPIRY_TIME)
        .sign(JWT_SECRET);
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as JWTPayload;
    } catch {
        return null;
    }
}

/**
 * Get current session from cookie
 * Returns null if not authenticated or token is invalid/expired
 */
export async function getSession(): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    const payload = await verifyToken(token);
    if (!payload) {
        return null;
    }

    return {
        id: payload.id,
        username: payload.username,
        email: payload.email,
        name: payload.name,
        role: payload.role,
    };
}

/**
 * Set auth cookie with JWT token
 */
export async function setAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour in seconds
        path: '/',
    });
}

/**
 * Clear auth cookie (logout)
 */
export async function clearAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

/**
 * Require authentication for server components/actions
 * Throws redirect if not authenticated
 */
export async function requireAuth(): Promise<SessionUser> {
    const session = await getSession();

    if (!session) {
        redirect('/auth/sign-in');
    }

    return session;
}

/**
 * Check if token exists in cookie (for middleware use)
 * This is a lightweight check - full verification should use verifyToken
 */
export function getTokenFromCookie(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    return cookies[COOKIE_NAME] || null;
}
