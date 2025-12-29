'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';

export async function deleteTourismPackage(id: number) {
  await requireAuth();

  try {
    await prisma.tourismPackage.delete({
      where: { id }
    });

    revalidatePath('/admin/tourism-package');
    return { success: true };
  } catch (error) {
    console.error('Error deleting tourism package:', error);
    return { success: false, error: 'Failed to delete tourism package' };
  }
} 