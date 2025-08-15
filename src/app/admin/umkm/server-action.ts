'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteUmkm(id: number) {
  try {
    // Check if UMKM has products
    const umkmWithProducts = await prisma.umkm.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    if (umkmWithProducts && umkmWithProducts._count.products > 0) {
      return { 
        success: false, 
        error: `UMKM ini memiliki ${umkmWithProducts._count.products} produk. Hapus semua produk terlebih dahulu.` 
      };
    }

    await prisma.umkm.delete({
      where: { id }
    });

    revalidatePath('/admin/umkm');
    return { success: true };
  } catch (error) {
    console.error('Error deleting UMKM:', error);
    return { success: false, error: 'Failed to delete UMKM' };
  }
} 