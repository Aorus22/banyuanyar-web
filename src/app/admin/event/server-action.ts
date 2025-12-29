'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';

export async function deleteEvent(id: number) {
  await requireAuth();

  try {
    await prisma.event.delete({
      where: { id }
    });

    revalidatePath('/admin/event');
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { success: false, error: 'Failed to delete event' };
  }
} 