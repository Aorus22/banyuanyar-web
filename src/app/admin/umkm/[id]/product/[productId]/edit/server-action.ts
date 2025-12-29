'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';

export async function createUmkmProduct(umkmId: number, formData: FormData) {
  await requireAuth();

  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const unit = formData.get('unit') as string;
    const isActive = formData.get('isActive') === 'true';

    const product = await prisma.umkmProduct.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        unit,
        isActive,
        umkmId
      }
    });

    revalidatePath('/admin/umkm');
    revalidatePath(`/admin/umkm/${umkmId}`);
    return { success: true, data: product };
  } catch (error) {
    console.error('Error creating UMKM product:', error);
    return { success: false, error: 'Failed to create UMKM product' };
  }
}

export async function updateUmkmProduct(id: number, formData: FormData) {
  await requireAuth();

  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const unit = formData.get('unit') as string;
    const isActive = formData.get('isActive') === 'true';

    const product = await prisma.umkmProduct.update({
      where: { id },
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        unit,
        isActive
      }
    });

    revalidatePath('/admin/umkm');
    revalidatePath(`/admin/umkm/${product.umkmId}`);
    revalidatePath(`/admin/umkm/${product.umkmId}/product/${id}`);
    return { success: true, data: product };
  } catch (error) {
    console.error('Error updating UMKM product:', error);
    return { success: false, error: 'Failed to update UMKM product' };
  }
}

export async function deleteUmkmProduct(id: number) {
  await requireAuth();

  try {
    const product = await prisma.umkmProduct.findUnique({
      where: { id },
      select: { umkmId: true }
    });

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    await prisma.umkmProduct.delete({
      where: { id }
    });

    revalidatePath('/admin/umkm');
    revalidatePath(`/admin/umkm/${product.umkmId}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting UMKM product:', error);
    return { success: false, error: 'Failed to delete UMKM product' };
  }
} 