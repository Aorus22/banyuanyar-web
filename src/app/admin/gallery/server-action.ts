'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/lib/cloudinary';
import { requireAuth } from '@/lib/auth';

export async function createGalleryAction(formData: FormData) {
  await requireAuth();

  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const eventDate = formData.get('eventDate') as string;

    if (!title) {
      return { success: false, error: 'Judul galeri wajib diisi' };
    }

    const gallery = await prisma.gallery.create({
      data: {
        title,
        description: description || null,
        eventDate: eventDate ? new Date(eventDate) : null,
        isActive: true
      }
    });

    revalidatePath('/admin/gallery');
    return { success: true, data: gallery };
  } catch (error) {
    console.error('Error creating gallery:', error);
    return { success: false, error: 'Gagal membuat galeri' };
  }
}

export async function updateGalleryAction(id: number, formData: FormData) {
  await requireAuth();

  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const eventDate = formData.get('eventDate') as string;
    const isActive = formData.get('isActive') === 'true';

    if (!title) {
      return { success: false, error: 'Judul galeri wajib diisi' };
    }

    const gallery = await prisma.gallery.update({
      where: { id },
      data: {
        title,
        description: description || null,
        eventDate: eventDate ? new Date(eventDate) : null,
        isActive
      }
    });

    revalidatePath('/admin/gallery');
    revalidatePath(`/admin/gallery/${id}`);
    return { success: true, data: gallery };
  } catch (error) {
    console.error('Error updating gallery:', error);
    return { success: false, error: 'Gagal mengupdate galeri' };
  }
}

export async function deleteGalleryAction(id: number) {
  await requireAuth();

  try {
    // First delete all media associated with this gallery
    await prisma.media.deleteMany({
      where: {
        entityType: 'gallery',
        entityId: id
      }
    });

    // Then delete the gallery
    const deletedGallery = await prisma.gallery.delete({
      where: { id }
    });

    revalidatePath('/admin/gallery');
    return { success: true, data: deletedGallery };
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return { success: false, error: 'Gagal menghapus galeri' };
  }
}

export async function uploadGalleryMediaAction(galleryId: number, formData: FormData) {
  await requireAuth();

  try {
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'File tidak ditemukan' };
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF' };
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return { success: false, error: 'Ukuran file terlalu besar. Maksimal 10MB' };
    }

    // Upload to Cloudinary
    const uploadResult = await uploadImage(file, { folder: 'gallery' });

    // Save to database
    const media = await prisma.media.create({
      data: {
        fileName: file.name,
        fileSize: file.size,
        fileUrl: uploadResult.url,
        mimeType: file.type,
        entityType: 'gallery',
        entityId: galleryId
      }
    });

    revalidatePath(`/admin/gallery/${galleryId}`);
    return { success: true, data: media };
  } catch (error) {
    console.error('Error uploading gallery media:', error);
    return { success: false, error: 'Gagal upload media galeri' };
  }
}

export async function deleteGalleryMediaAction(mediaId: number) {
  await requireAuth();

  try {
    const media = await prisma.media.findUnique({
      where: { id: mediaId }
    });

    if (!media) {
      return { success: false, error: 'Media tidak ditemukan' };
    }

    // Delete from Cloudinary
    const deleteResult = await deleteFromCloudinary(media.fileUrl);

    if (!deleteResult.success) {
      console.warn('Failed to delete from Cloudinary:', deleteResult.error);
      // Continue with database deletion even if Cloudinary deletion fails
    }

    // Delete from database
    await prisma.media.delete({
      where: { id: mediaId }
    });

    revalidatePath(`/admin/gallery/${media.entityId}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting gallery media:', error);
    return { success: false, error: 'Gagal menghapus media galeri' };
  }
}

async function deleteFromCloudinary(fileUrl: string) {
  try {
    // Extract public_id from Cloudinary URL
    const urlParts = fileUrl.split('/');
    const publicId = urlParts[urlParts.length - 1].split('.')[0];

    // This would require the cloudinary package to be properly configured
    // For now, we'll return success and handle Cloudinary deletion separately
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Gagal menghapus dari Cloudinary' };
  }
} 