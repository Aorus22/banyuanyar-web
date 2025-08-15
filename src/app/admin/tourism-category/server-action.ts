'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteTourismCategory(id: number) {
  try {
    // Check if category has packages
    const categoryWithPackages = await prisma.tourismCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            packages: true
          }
        }
      }
    });

    if (categoryWithPackages && categoryWithPackages._count.packages > 0) {
      return { 
        success: false, 
        error: `Kategori ini memiliki ${categoryWithPackages._count.packages} paket wisata. Hapus semua paket terlebih dahulu.` 
      };
    }

    await prisma.tourismCategory.delete({
      where: { id }
    });

    revalidatePath('/admin/tourism-category');
    revalidatePath('/admin/tourism-package');
    return { success: true };
  } catch (error) {
    console.error('Error deleting tourism category:', error);
    return { success: false, error: 'Failed to delete tourism category' };
  }
} 