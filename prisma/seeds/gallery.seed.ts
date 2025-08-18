import { PrismaClient } from '../db';

export async function seedGallery(prisma: PrismaClient) {
  console.log('🌱 Seeding galleries...');

  // Gallery 1: Foto Kegiatan 17 Agustus 2024
  const gallery1 = await prisma.gallery.create({
    data: {
      title: "Foto Kegiatan 17 Agustus 2024",
      description: "Dokumentasi perayaan Hari Kemerdekaan RI ke-79 di Desa Banyuanyar",
      eventDate: new Date("2024-08-17"),
    }
  });

  // Media untuk Gallery 1
  await prisma.media.createMany({
    data: [
      {
        fileName: '17-agustus-upacara.jpg',
        fileSize: 2048000,
        fileUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Upacara Bendera 17 Agustus di Desa Banyuanyar',
        entityType: 'gallery',
        entityId: gallery1.id,
      },
      {
        fileName: '17-agustus-lomba.jpg',
        fileSize: 1824000,
        fileUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Lomba kemerdekaan di Desa Banyuanyar',
        entityType: 'gallery',
        entityId: gallery1.id,
      }
    ],
    skipDuplicates: true
  });

  // Gallery 2: Kunjungan MNC Peduli
  const gallery2 = await prisma.gallery.create({
    data: {
      title: "Kunjungan MNC Peduli",
      description: "Dokumentasi kunjungan dan program MNC Peduli di Desa Banyuanyar",
      eventDate: new Date("2024-11-05"),
    }
  });

  // Media untuk Gallery 2
  await prisma.media.createMany({
    data: [
      {
        fileName: 'mnc-peduli-kunjungan.jpg',
        fileSize: 1792000,
        fileUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Kunjungan tim MNC Peduli ke Desa Banyuanyar',
        entityType: 'gallery',
        entityId: gallery2.id,
      },
      {
        fileName: 'mnc-peduli-bantuan.jpg',
        fileSize: 1650000,
        fileUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Penyerahan bantuan dari MNC Peduli',
        entityType: 'gallery',
        entityId: gallery2.id,
      }
    ],
    skipDuplicates: true
  });

  // Gallery 3: Wisata Kampus Kopi
  const gallery3 = await prisma.gallery.create({
    data: {
      title: "Wisata Kampus Kopi",
      description: "Galeri foto destinasi wisata Kampus Kopi Banyuanyar",
      eventDate: new Date("2024-11-05"),
    }
  });

  // Media untuk Gallery 3
  await prisma.media.createMany({
    data: [
      {
        fileName: 'kampus-kopi-view.jpg',
        fileSize: 2256000,
        fileUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Pemandangan indah Kampus Kopi Banyuanyar',
        entityType: 'gallery',
        entityId: gallery3.id,
      },
      {
        fileName: 'kampus-kopi-kebun.jpg',
        fileSize: 1980000,
        fileUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Kebun kopi di area wisata Kampus Kopi',
        entityType: 'gallery',
        entityId: gallery3.id,
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Galleries seeded: 3 records with their media`);
  return { gallery1, gallery2, gallery3 };
} 