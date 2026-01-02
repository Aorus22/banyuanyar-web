'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { generateUniqueSlug } from '@/lib/slug';

export async function updateNews(id: number, formData: FormData) {
  await requireAuth();

  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as "DRAFT" | "PUBLISHED" | "ARCHIVED";

    const slug = await generateUniqueSlug(title, async (slug) => {
      const existing = await prisma.news.findFirst({
        where: {
          slug,
          NOT: { id }
        }
      });
      return !!existing;
    });

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        categoryId: categoryId ? parseInt(categoryId) : null,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null
      }
    });

    revalidatePath('/admin/news');
    return { success: true, data: news };
  } catch (error) {
    console.error('Error updating news:', error);
    return { success: false, error: 'Failed to update news' };
  }
} 