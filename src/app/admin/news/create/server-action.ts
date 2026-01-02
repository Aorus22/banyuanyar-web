'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { generateUniqueSlug } from '@/lib/slug';

export async function createNews(formData: FormData) {
  const session = await requireAuth();

  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as "DRAFT" | "PUBLISHED" | "ARCHIVED";

    const slug = await generateUniqueSlug(title, async (slug) => {
      const existing = await prisma.news.findUnique({
        where: { slug }
      });
      return !!existing;
    });

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        content,
        categoryId: categoryId ? parseInt(categoryId) : null,
        status,
        authorId: session.id,
        publishedAt: status === 'PUBLISHED' ? new Date() : null
      }
    });

    revalidatePath('/admin/news');
    return { success: true, data: news };
  } catch (error) {
    console.error('Error creating news:', error);
    return { success: false, error: 'Failed to create news' };
  }
} 