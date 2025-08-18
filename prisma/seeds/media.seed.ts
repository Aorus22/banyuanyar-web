import { PrismaClient } from '../db';

const prisma = new PrismaClient();

export async function seedMedia() {
  console.log('🌱 Seeding media...');

  const mediaData = [
    {
      fileName: 'sample-news-1.jpg',
      fileSize: 1024000,
      fileUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      entityType: 'news',
      entityId: 1,
    },
    {
      fileName: 'sample-gallery-1.jpg',
      fileSize: 2048000,
      fileUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      entityType: 'gallery',
      entityId: 1,
    },
    {
      fileName: 'sample-umkm-1.jpg',
      fileSize: 1536000,
      fileUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      entityType: 'umkm',
      entityId: 1,
    },
    {
      fileName: 'sample-tourism-1.jpg',
      fileSize: 2560000,
      fileUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      entityType: 'tourism',
      entityId: 1,
    },
    {
      fileName: 'sample-event-1.jpg',
      fileSize: 1792000,
      fileUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      entityType: 'event',
      entityId: 1,
    },
    {
      fileName: 'general-image-1.jpg',
      fileSize: 1280000,
      fileUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      entityType: 'general',
      entityId: 0,
    },
    {
      fileName: 'general-image-2.jpg',
      fileSize: 960000,
      fileUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      entityType: 'general',
      entityId: 0,
    },
  ];

  try {
    // Delete existing media
    await prisma.media.deleteMany();

    // Create new media
    const createdMedia = await Promise.all(
      mediaData.map(async (media) => {
        return await prisma.media.create({
          data: media,
        });
      })
    );

    console.log(`✅ Created ${createdMedia.length} media files`);
    return createdMedia;
  } catch (error) {
    console.error('❌ Error seeding media:', error);
    throw error;
  }
} 