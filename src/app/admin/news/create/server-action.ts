'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createNews(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const featuredImage = formData.get('featuredImage') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as "DRAFT" | "PUBLISHED" | "ARCHIVED";
    const authorId = formData.get('authorId') as string;

    const news = await prisma.news.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        content,
        featuredImage: featuredImage || null,
        categoryId: categoryId ? parseInt(categoryId) : null,
        status,
        authorId: authorId ? parseInt(authorId) : null,
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