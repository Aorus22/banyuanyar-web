'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createTourismCategory(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    const category = await prisma.tourismCategory.create({
      data: {
        name,
        description: description || null
      }
    });

    revalidatePath('/admin/tourism-category');
    revalidatePath('/admin/tourism-package');
    return { success: true, data: category };
  } catch (error) {
    console.error('Error creating tourism category:', error);
    return { success: false, error: 'Failed to create tourism category' };
  }
} 