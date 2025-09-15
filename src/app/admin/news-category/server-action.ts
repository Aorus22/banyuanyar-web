'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteNewsCategory(id: number) {
  try {
    // Check if category has news
    const categoryWithNews = await prisma.newsCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            news: true
          }
        }
      }
    });

    if (categoryWithNews && categoryWithNews._count.news > 0) {
      return {
        success: false,
        error: `Kategori ini memiliki ${categoryWithNews._count.news} berita. Hapus semua berita terlebih dahulu.`
      };
    }

    await prisma.newsCategory.delete({
      where: { id }
    });

    revalidatePath('/admin/news-category');
    revalidatePath('/admin/news'); // Revalidate news page juga
    return { success: true };
  } catch (error) {
    console.error('Error deleting news category:', error);
    return { success: false, error: 'Failed to delete news category' };
  }
}
