import { prisma } from '@/lib/prisma';

export async function getGalleryList() {
  try {
    const galleries = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Get media for all galleries
    const galleryIds = galleries.map(g => g.id);
    const allMedia = await prisma.media.findMany({
      where: {
        entityType: 'gallery',
        entityId: { in: galleryIds }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Create map of gallery ID to media URLs
    const galleryIdToMedia = new Map<number, string[]>();
    for (const m of allMedia) {
      if (!galleryIdToMedia.has(m.entityId)) {
        galleryIdToMedia.set(m.entityId, []);
      }
      galleryIdToMedia.get(m.entityId)!.push(m.fileUrl);
    }

    // Add media URLs to each gallery
    return galleries.map(gallery => ({
      ...gallery,
      imageUrls: galleryIdToMedia.get(gallery.id) || []
    }));
  } catch (error) {
    console.error('Error fetching gallery list:', error);
    throw new Error('Gagal mengambil daftar galeri');
  }
}

export async function getGalleryById(id: number) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id }
    });
    return gallery;
  } catch (error) {
    console.error('Error fetching gallery by id:', error);
    throw new Error('Gagal mengambil data galeri');
  }
}

export async function getMediaByGalleryId(galleryId: number) {
  try {
    const media = await prisma.media.findMany({
      where: {
        entityType: 'gallery',
        entityId: galleryId
      },
      orderBy: { createdAt: 'desc' }
    });
    return media;
  } catch (error) {
    console.error('Error fetching media by gallery id:', error);
    throw new Error('Gagal mengambil media galeri');
  }
}

export async function deleteGallery(id: number) {
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

    return { success: true, data: deletedGallery };
  } catch (error) {
    console.error('Error deleting gallery:', error);
    throw new Error('Gagal menghapus galeri');
  }
} 