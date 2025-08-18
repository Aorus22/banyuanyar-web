import { PrismaClient } from '../db';

export async function seedUmkm(prisma: PrismaClient) {
  console.log('🌱 Seeding UMKM...');

  // UMKM 1: Kopi Banyuanyar
  const umkm1 = await prisma.umkm.create({
    data: {
      name: "Kopi Banyuanyar",
      ownerName: "Pak Ahmad",
      description: "Produksi kopi berkualitas tinggi dari perkebunan lokal",
      address: "Dusun I, Desa Banyuanyar",
      phone: "081234567895",
      email: "kopi@banyuanyar.com",
      socialMedia: {
        instagram: "kopi_banyuanyar",
        facebook: "KopiBanyuanyar"
      },
      latitude: -7.123456,
      longitude: 110.654321
    }
  });

  // Media untuk UMKM 1
  await prisma.media.createMany({
    data: [
      {
        fileName: 'kopi-banyuanyar-logo.jpg',
        fileSize: 1536000,
        fileUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Logo dan tempat produksi Kopi Banyuanyar',
        entityType: 'umkm',
        entityId: umkm1.id,
      },
      {
        fileName: 'kopi-banyuanyar-kebun.jpg',
        fileSize: 2048000,
        fileUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Kebun kopi milik UMKM Kopi Banyuanyar',
        entityType: 'umkm',
        entityId: umkm1.id,
      }
    ],
    skipDuplicates: true
  });

  // UMKM 2: Susu Segar Banyuanyar
  const umkm2 = await prisma.umkm.create({
    data: {
      name: "Susu Segar Banyuanyar",
      ownerName: "Bu Sari",
      description: "Susu segar dari sapi perah lokal",
      address: "Dusun II, Desa Banyuanyar",
      phone: "081234567896",
      socialMedia: {
        instagram: "susu_banyuanyar"
      },
      latitude: -7.123789,
      longitude: 110.654789
    }
  });

  // Media untuk UMKM 2
  await prisma.media.createMany({
    data: [
      {
        fileName: 'susu-banyuanyar-sapi.jpg',
        fileSize: 1792000,
        fileUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Sapi perah milik UMKM Susu Segar Banyuanyar',
        entityType: 'umkm',
        entityId: umkm2.id,
      },
      {
        fileName: 'susu-banyuanyar-produk.jpg',
        fileSize: 1280000,
        fileUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Produk susu segar kemasan UMKM Banyuanyar',
        entityType: 'umkm',
        entityId: umkm2.id,
      }
    ],
    skipDuplicates: true
  });

  // UMKM 3: Kerajinan Bambu Banyuanyar
  const umkm3 = await prisma.umkm.create({
    data: {
      name: "Kerajinan Bambu Banyuanyar",
      ownerName: "Pak Joko",
      description: "Kerajinan tangan dari bambu berkualitas tinggi",
      address: "Dusun III, Desa Banyuanyar",
      phone: "081234567897",
      email: "kerajinan@banyuanyar.com",
      socialMedia: {
        instagram: "kerajinan_bambu_banyuanyar"
      },
      latitude: -7.124123,
      longitude: 110.655123
    }
  });

  // Media untuk UMKM 3
  await prisma.media.createMany({
    data: [
      {
        fileName: 'kerajinan-bambu-workshop.jpg',
        fileSize: 1650000,
        fileUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Workshop kerajinan bambu Banyuanyar',
        entityType: 'umkm',
        entityId: umkm3.id,
      },
      {
        fileName: 'kerajinan-bambu-produk.jpg',
        fileSize: 1920000,
        fileUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Berbagai produk kerajinan bambu Banyuanyar',
        entityType: 'umkm',
        entityId: umkm3.id,
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ UMKM seeded: 3 records with their media`);
  return { umkm1, umkm2, umkm3 };
} 