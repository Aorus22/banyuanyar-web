import { PrismaClient } from '../db';

export async function seedMedia(prisma: PrismaClient) {
  console.log('🌱 Seeding media...');

  // Get entities for media relationships
  const tourismPackages = await prisma.tourismPackage.findMany();
  const galleries = await prisma.gallery.findMany();
  const umkms = await prisma.umkm.findMany();
  const umkmProducts = await prisma.umkmProduct.findMany();

  const mediaData = [
    // Media untuk tourism packages
    {
      fileName: "paket-pelajar.jpg",
      fileSize: 800000,
      mimeType: "image/jpeg",
      entityType: "tourism_package",
      entityId: tourismPackages[0]?.id || 1
    },
    {
      fileName: "paket-outbound.jpg",
      fileSize: 850000,
      mimeType: "image/jpeg",
      entityType: "tourism_package",
      entityId: tourismPackages[1]?.id || 2
    },
    {
      fileName: "paket-jeep.jpg",
      fileSize: 900000,
      mimeType: "image/jpeg",
      entityType: "tourism_package",
      entityId: tourismPackages[2]?.id || 3
    },

    // Media untuk galleries
    {
      fileName: "upacara-1.jpg",
      fileSize: 1024000,
      mimeType: "image/jpeg",
      entityType: "gallery",
      entityId: galleries[0]?.id || 1
    },
    {
      fileName: "lomba-kerupuk.jpg",
      fileSize: 850000,
      mimeType: "image/jpeg",
      entityType: "gallery",
      entityId: galleries[0]?.id || 1
    },
    {
      fileName: "sambutan-kades.jpg",
      fileSize: 1200000,
      mimeType: "image/jpeg",
      entityType: "gallery",
      entityId: galleries[1]?.id || 2
    },
    {
      fileName: "gerbang.jpg",
      fileSize: 980000,
      mimeType: "image/jpeg",
      entityType: "gallery",
      entityId: galleries[2]?.id || 3
    },

    // Media untuk UMKM
    {
      fileName: "kopi-banyuanyar.jpg",
      fileSize: 800000,
      mimeType: "image/jpeg",
      entityType: "umkm",
      entityId: umkms[0]?.id || 1
    },
    {
      fileName: "susu-banyuanyar.jpg",
      fileSize: 750000,
      mimeType: "image/jpeg",
      entityType: "umkm",
      entityId: umkms[1]?.id || 2
    },
    {
      fileName: "kerajinan-bambu.jpg",
      fileSize: 900000,
      mimeType: "image/jpeg",
      entityType: "umkm",
      entityId: umkms[2]?.id || 3
    },

    // Media untuk UMKM products
    {
      fileName: "kopi-arabika.jpg",
      fileSize: 600000,
      mimeType: "image/jpeg",
      entityType: "umkm_product",
      entityId: umkmProducts[0]?.id || 1
    },
    {
      fileName: "kopi-robusta.jpg",
      fileSize: 550000,
      mimeType: "image/jpeg",
      entityType: "umkm_product",
      entityId: umkmProducts[1]?.id || 2
    },
    {
      fileName: "susu-segar.jpg",
      fileSize: 500000,
      mimeType: "image/jpeg",
      entityType: "umkm_product",
      entityId: umkmProducts[4]?.id || 5
    },
    {
      fileName: "tas-bambu.jpg",
      fileSize: 650000,
      mimeType: "image/jpeg",
      entityType: "umkm_product",
      entityId: umkmProducts[7]?.id || 8
    }
  ];

  const result = await prisma.media.createMany({
    data: mediaData,
    skipDuplicates: true
  });

  console.log(`✅ Media seeded: ${result.count} records`);
  return result;
} 