import { prisma } from '@/lib/prisma';

export async function getMediaList() {
  try {
    const media = await prisma.media.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return media;
  } catch (error) {
    console.error('Error fetching media:', error);
    throw new Error('Failed to fetch media list');
  }
}

export async function getMediaById(id: number) {
  try {
    const media = await prisma.media.findUnique({
      where: { id },
    });
    return media;
  } catch (error) {
    console.error('Error fetching media by id:', error);
    throw new Error('Failed to fetch media');
  }
}

export async function deleteMedia(id: number) {
  try {
    const media = await prisma.media.delete({
      where: { id },
    });
    return media;
  } catch (error) {
    console.error('Error deleting media:', error);
    throw new Error('Failed to delete media');
  }
} 