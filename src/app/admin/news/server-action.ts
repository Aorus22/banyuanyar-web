'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteNews(id: number) {
  try {
    await prisma.news.delete({
      where: { id }
    });

    revalidatePath('/admin/news');
    return { success: true };
  } catch (error) {
    console.error('Error deleting news:', error);
    return { success: false, error: 'Failed to delete news' };
  }
} 