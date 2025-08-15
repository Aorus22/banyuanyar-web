'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createNewsCategory(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const color = formData.get('color') as string;

    const category = await prisma.newsCategory.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: description || null,
        color: color || '#000000'
      }
    });

    revalidatePath('/admin/news-category');
    revalidatePath('/admin/news'); // Revalidate news page juga
    return { success: true, data: category };
  } catch (error) {
    console.error('Error creating news category:', error);
    return { success: false, error: 'Failed to create news category' };
  }
} 