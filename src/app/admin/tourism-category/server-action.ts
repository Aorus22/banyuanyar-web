'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createTourismCategory(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const mediaIds = formData.getAll('mediaIds[]') as string[]

    if (!name || !name.trim()) {
      return { success: false, error: 'Nama kategori harus diisi' }
    }

    const category = await prisma.tourismCategory.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null
      }
    })

    // Associate media with the category if provided
    if (mediaIds.length > 0) {
      await prisma.media.updateMany({
        where: {
          id: { in: mediaIds.map(id => parseInt(id)) }
        },
        data: {
          entityType: 'tourism_category',
          entityId: category.id
        }
      })
    }

    revalidatePath('/admin/tourism-category')
    return { success: true, data: category }
  } catch (error) {
    console.error('Error creating tourism category:', error)
    return { success: false, error: 'Gagal membuat kategori' }
  }
}

export async function updateTourismCategory(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const mediaIds = formData.getAll('mediaIds[]') as string[]

    if (!name || !name.trim()) {
      return { success: false, error: 'Nama kategori harus diisi' }
    }

    const category = await prisma.tourismCategory.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null
      }
    })

    // Update media associations
    if (mediaIds.length > 0) {
      // First, remove existing associations
      await prisma.media.updateMany({
        where: {
          entityType: 'tourism_category',
          entityId: id
        },
        data: {
          entityType: 'tourism_category',
          entityId: undefined
        }
      })

      // Then, add new associations
      await prisma.media.updateMany({
        where: {
          id: { in: mediaIds.map(id => parseInt(id)) }
        },
        data: {
          entityType: 'tourism_category',
          entityId: id
        }
      })
    }

    revalidatePath('/admin/tourism-category')
    revalidatePath(`/admin/tourism-category/${id}`)
    return { success: true, data: category }
  } catch (error) {
    console.error('Error updating tourism category:', error)
    return { success: false, error: 'Gagal mengupdate kategori' }
  }
}

export async function deleteTourismCategory(id: number) {
  try {
    // Check if category has packages
    const categoryWithPackages = await prisma.tourismCategory.findUnique({
      where: { id },
      include: { _count: { select: { packages: true } } }
    })

    if (categoryWithPackages && categoryWithPackages._count.packages > 0) {
      return { success: false, error: 'Kategori tidak dapat dihapus karena masih memiliki paket wisata' }
    }

    // Remove media associations
    await prisma.media.updateMany({
      where: {
        entityType: 'tourism_category',
        entityId: id
      },
      data: {
        entityType: 'tourism_category',
        entityId: undefined
      }
    })

    await prisma.tourismCategory.delete({
      where: { id }
    })

    revalidatePath('/admin/tourism-category')
    return { success: true }
  } catch (error) {
    console.error('Error deleting tourism category:', error)
    return { success: false, error: 'Gagal menghapus kategori' }
  }
} 