import { PrismaClient } from '../db';

export async function seedTourismPackage(prisma: PrismaClient) {
  console.log('🌱 Seeding tourism packages...');

  // Get category IDs
  const pelajarCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Pelajar" } });
  const outboundCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Outbound" } });
  const jeepCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Jeep Tour" } });

  // Package 1: Paket Pelajar
  const package1 = await prisma.tourismPackage.create({
    data: {
      name: "Paket Pelajar",
      description: "Paket wisata edukasi untuk pelajar dengan harga terjangkau",
      price: 50000,
      duration: "4 jam",
      maxParticipants: 50,
      categoryId: pelajarCategory?.id || 1
    }
  });

  await prisma.media.createMany({
    data: [
      {
        fileName: 'paket-pelajar-edukasi.jpg',
        fileSize: 1680000,
        fileUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Kegiatan edukasi dalam Paket Pelajar di Kampus Kopi',
        entityType: 'tourism_package',
        entityId: package1.id,
      },
      {
        fileName: 'paket-pelajar-kopi.jpg',
        fileSize: 1420000,
        fileUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Pelajar mempelajari proses pembuatan kopi',
        entityType: 'tourism_package',
        entityId: package1.id,
      }
    ],
    skipDuplicates: true
  });

  // Package 2: Paket Outbound
  const package2 = await prisma.tourismPackage.create({
    data: {
      name: "Paket Outbound",
      description: "Paket outbound untuk team building dan refreshing",
      price: 150000,
      duration: "8 jam",
      maxParticipants: 30,
      categoryId: outboundCategory?.id || 2
    }
  });

  await prisma.media.createMany({
    data: [
      {
        fileName: 'paket-outbound-team.jpg',
        fileSize: 1920000,
        fileUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Aktivitas team building dalam Paket Outbound',
        entityType: 'tourism_package',
        entityId: package2.id,
      },
      {
        fileName: 'paket-outbound-games.jpg',
        fileSize: 1584000,
        fileUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Permainan seru dalam paket outbound',
        entityType: 'tourism_package',
        entityId: package2.id,
      }
    ],
    skipDuplicates: true
  });

  // Package 3: Paket Jeep Tour
  const package3 = await prisma.tourismPackage.create({
    data: {
      name: "Paket Jeep Tour",
      description: "Petualangan dengan jeep mengelilingi desa dan perkebunan",
      price: 200000,
      duration: "6 jam",
      maxParticipants: 8,
      categoryId: jeepCategory?.id || 3
    }
  });

  await prisma.media.createMany({
    data: [
      {
        fileName: 'jeep-tour-adventure.jpg',
        fileSize: 2128000,
        fileUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Petualangan seru dengan jeep tour di Banyuanyar',
        entityType: 'tourism_package',
        entityId: package3.id,
      },
      {
        fileName: 'jeep-tour-landscape.jpg',
        fileSize: 1856000,
        fileUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Pemandangan indah dari jeep tour',
        entityType: 'tourism_package',
        entityId: package3.id,
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Tourism packages seeded: 3 records with their media`);
  return { package1, package2, package3 };
} 