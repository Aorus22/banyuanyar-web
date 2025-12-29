'use server';

import { clearAuthCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function logout(): Promise<void> {
    await clearAuthCookie();
    redirect('/auth/sign-in');
}
