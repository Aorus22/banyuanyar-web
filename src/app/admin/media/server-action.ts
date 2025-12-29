'use server';

import { prisma } from '@/lib/prisma';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';

export async function uploadMediaAction(formData: FormData) {
  await requireAuth();

  try {
    const file = formData.get('file') as File;
    const entityType = formData.get('entityType') as string;
    const entityId = formData.get('entityId') as string;

    if (!file) {
      throw new Error('No file provided');
    }

    // Upload to Cloudinary first
    const uploadResult = await uploadImage(file, {
      folder: 'media',
      allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      maxFileSize: 10 * 1024 * 1024, // 10MB
      transformation: {
        quality: 'auto:good',
      },
    });

    // Save to database
    const media = await prisma.media.create({
      data: {
        fileName: file.name,
        fileSize: file.size,
        fileUrl: uploadResult.url,
        mimeType: file.type,
        entityType: entityType || 'general',
        entityId: entityId ? parseInt(entityId) : 0,
      },
    });

    revalidatePath('/admin/media');
    return { success: true, data: media };
  } catch (error) {
    console.error('Error uploading media:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload media'
    };
  }
}

export async function deleteMediaAction(id: number) {
  await requireAuth();

  try {
    // Get media info first
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw new Error('Media not found');
    }

    // Extract public ID from Cloudinary URL
    const urlParts = media.fileUrl.split('/');
    const publicId = urlParts.slice(-2).join('/').split('.')[0];

    // Delete from Cloudinary
    await deleteImage(publicId);

    // Delete from database
    await prisma.media.delete({
      where: { id },
    });

    revalidatePath('/admin/media');
    return { success: true };
  } catch (error) {
    console.error('Error deleting media:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete media'
    };
  }
}

export async function updateMediaEntityAction(
  id: number,
  entityType: string,
  entityId: number
) {
  await requireAuth();

  try {
    const media = await prisma.media.update({
      where: { id },
      data: {
        entityType,
        entityId,
      },
    });

    revalidatePath('/admin/media');
    return { success: true, data: media };
  } catch (error) {
    console.error('Error updating media entity:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update media'
    };
  }
} 