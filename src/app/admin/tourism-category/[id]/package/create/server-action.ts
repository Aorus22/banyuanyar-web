'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CreateTourismPackageData {
  name: string;
  description: string;
  price: number | null;
  duration: string;
  isActive: boolean;
  categoryId: number;
}

export async function createTourismPackage(data: CreateTourismPackageData) {
  try {
    // Validate required fields
    if (!data.name.trim()) {
      return { success: false, error: 'Nama paket wisata harus diisi' };
    }

    if (!data.categoryId) {
      return { success: false, error: 'Kategori harus dipilih' };
    }

    // Check if category exists
    const category = await prisma.tourismCategory.findUnique({
      where: { id: data.categoryId }
    });

    if (!category) {
      return { success: false, error: 'Kategori tidak ditemukan' };
    }

    // Create the tourism package
    const tourismPackage = await prisma.tourismPackage.create({
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
      data: tourismPackage
    };
  } catch (error) {
    console.error('Error creating tourism package:', error);
    return {
      success: false,
      error: 'Terjadi kesalahan saat membuat paket wisata'
    };
  }
}
