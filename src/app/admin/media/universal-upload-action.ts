'use server';

import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface UploadResult {
  success: boolean;
  mediaId?: number;
  fileName?: string;
  fileUrl?: string;
  error?: string;
}

export async function uploadImageToCloudinary(
  formData: FormData
): Promise<UploadResult> {
  try {
    const file = formData.get('file') as File;
    const entityType = formData.get('entityType') as string;
    const entityId = formData.get('entityId') as string;

    if (!file) {
      return { success: false, error: 'File tidak ditemukan' };
    }

    if (!entityType) {
      return { success: false, error: 'Entity type tidak ditemukan' };
    }

    if (!entityId) {
      return {
        success: false,
        error: 'Entity ID diperlukan untuk upload media'
      };
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif'
    ];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Tipe file tidak didukung' };
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'Ukuran file terlalu besar (maksimal 10MB)'
      };
    }

    // Upload to Cloudinary
    const uploadResult = await uploadImage(file, {
      folder: `banyuanyar/${entityType}`,
      transformation: {
        quality: 'auto',
        format: 'auto'
      },
      maxFileSize: maxSize,
      allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif']
    });

    // Save to database
    const media = await prisma.media.create({
      data: {
        fileName: file.name,
        fileSize: file.size,
        fileUrl: uploadResult.url,
        mimeType: file.type,
        entityType: entityType,
        entityId: parseInt(entityId)
      }
    });

    // Revalidate relevant paths
    revalidatePath('/admin');
    revalidatePath(`/admin/${entityType}`);

    return {
      success: true,
      mediaId: media.id,
      fileName: media.fileName,
      fileUrl: media.fileUrl
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Terjadi kesalahan saat upload'
    };
  }
}

export async function deleteMedia(
  mediaId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const media = await prisma.media.findUnique({
      where: { id: mediaId }
    });

    if (!media) {
      return { success: false, error: 'Media tidak ditemukan' };
    }

    // Extract public ID from Cloudinary URL
    // Cloudinary URL format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/filename.jpg
    // We need to extract: folder/filename (without extension)
    let publicId = '';
    try {
      const urlParts = media.fileUrl.split('/');
      const uploadIndex = urlParts.findIndex((part) => part === 'upload');
      if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
        // Skip version number and get folder/filename
        const folderAndFile = urlParts.slice(uploadIndex + 2).join('/');
        // Remove file extension
        publicId = folderAndFile.replace(/\.[^/.]+$/, '');
      }
    } catch (error) {
      console.warn('Could not extract public ID from URL:', media.fileUrl);
    }

    // Delete from Cloudinary if we have a public ID
    if (publicId) {
      try {
        await deleteImage(publicId);
        console.log('Successfully deleted from Cloudinary:', publicId);
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError);
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }

    // Delete from database
    await prisma.media.delete({
      where: { id: mediaId }
    });

    // Revalidate relevant paths
    revalidatePath('/admin');
    revalidatePath(`/admin/${media.entityType}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting media:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menghapus media'
    };
  }
}

export async function getMediaByEntity(entityType: string, entityId: number) {
  try {
    const media = await prisma.media.findMany({
      where: {
        entityType: entityType,
        entityId: entityId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return media;
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
}

export async function deleteMultipleMedia(
  mediaIds: number[]
): Promise<{ success: boolean; deletedCount: number; error?: string }> {
  try {
    let deletedCount = 0;
    let errors: string[] = [];

    for (const mediaId of mediaIds) {
      try {
        const result = await deleteMedia(mediaId);
        if (result.success) {
          deletedCount++;
        } else {
          errors.push(`Media ID ${mediaId}: ${result.error}`);
        }
      } catch (error) {
        errors.push(
          `Media ID ${mediaId}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    if (deletedCount === 0) {
      return {
        success: false,
        deletedCount: 0,
        error: `Gagal menghapus semua media: ${errors.join('; ')}`
      };
    }

    if (errors.length > 0) {
      return {
        success: true,
        deletedCount,
        error: `Berhasil hapus ${deletedCount} media, ${errors.length} gagal: ${errors.join('; ')}`
      };
    }

    return { success: true, deletedCount };
  } catch (error) {
    console.error('Error in batch delete:', error);
    return {
      success: false,
      deletedCount: 0,
      error:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat batch delete'
    };
  }
}
