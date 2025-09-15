'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface UpdateTourismPackageData {
  id: number;
  name: string;
  description: string;
  price: number | null;
  duration: string;
  isActive: boolean;
  categoryId: number;
}

export async function updateTourismPackage(data: UpdateTourismPackageData) {
  try {
    // Validate required fields
    if (!data.name.trim()) {
      return { success: false, error: 'Nama paket wisata harus diisi' };
    }

    if (!data.categoryId) {
      return { success: false, error: 'Kategori harus dipilih' };
    }

    // Check if package exists and belongs to the category
    const existingPackage = await prisma.tourismPackage.findFirst({
      where: {
        id: data.id,
        categoryId: data.categoryId
      }
    });

    if (!existingPackage) {
      return { success: false, error: 'Paket wisata tidak ditemukan' };
    }

    // Check if category exists
    const category = await prisma.tourismCategory.findUnique({
      where: { id: data.categoryId }
    });

    if (!category) {
      return { success: false, error: 'Kategori tidak ditemukan' };
    }

    // Update the tourism package
    const updatedPackage = await prisma.tourismPackage.update({
      where: { id: data.id },
      data: {
        name: data.name.trim(),
        description: data.description.trim() || null,
        price: data.price,
        duration: data.duration.trim() || null,
        isActive: data.isActive,
        categoryId: data.categoryId
      }
    });

    // Revalidate the category detail page
    revalidatePath(`/admin/tourism-category/${data.categoryId}`);
    revalidatePath('/admin/tourism-category');

    return {
      success: true,
      data: updatedPackage
    };
  } catch (error) {
    console.error('Error updating tourism package:', error);
    return {
      success: false,
      error: 'Terjadi kesalahan saat memperbarui paket wisata'
    };
  }
}
