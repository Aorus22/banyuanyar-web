'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteTourismHouse(id: number) {
  try {
    await prisma.tourismHouse.delete({
      where: { id }
    });

    revalidatePath('/admin/tourism-house');
    return { success: true };
  } catch (error) {
    console.error('Error deleting tourism house:', error);
    return { success: false, error: 'Failed to delete tourism house' };
  }
}
