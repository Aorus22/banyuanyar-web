'use server';

import { prisma } from '@/lib/prisma';
import { signToken, setAuthCookie, type JWTPayload } from '@/lib/auth';
import bcrypt from 'bcrypt';

interface LoginResult {
    success: boolean;
    error?: string;
    user?: {
        id: number;
        username: string;
        email: string;
        name: string;
        role: string;
    };
}

export async function login(
    usernameOrEmail: string,
    password: string
): Promise<LoginResult> {
    try {
        // Find user by username or email
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail },
                ],
            },
        });

        if (!user) {
            return { success: false, error: 'Username atau password salah' };
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return { success: false, error: 'Username atau password salah' };
        }

        // Create JWT payload
        const payload: JWTPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        // Generate token and set cookie
        const token = await signToken(payload);
        await setAuthCookie(token);

        return {
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Terjadi kesalahan saat login' };
    }
}
