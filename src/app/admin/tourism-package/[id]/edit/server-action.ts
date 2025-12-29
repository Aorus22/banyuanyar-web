'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';

export async function updateTourismPackage(id: number, formData: FormData) {
  await requireAuth();

  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('categoryId') as string;
    const price = formData.get('price') as string;
    const duration = formData.get('duration') as string;
    const maxParticipants = formData.get('maxParticipants') as string;

    const package_ = await prisma.tourismPackage.update({
      where: { id },
      data: {
        name,
        description: description || null,
        categoryId: categoryId && !isNaN(parseInt(categoryId)) ? parseInt(categoryId) : undefined,
        price: price && !isNaN(parseFloat(price)) ? parseFloat(price) : null,
        duration: duration || null,
        maxParticipants: maxParticipants && !isNaN(parseInt(maxParticipants)) ? parseInt(maxParticipants) : null
      }
    });

    revalidatePath('/admin/tourism-package');

    // Convert Decimal to number for response
    return {
      success: true,
      data: {
        ...package_,
        price: package_.price ? Number(package_.price) : null
      }
    };
  } catch (error) {
    console.error('Error updating tourism package:', error);
    return { success: false, error: 'Failed to update tourism package' };
  }
} 