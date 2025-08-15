'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteEvent(id: number) {
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