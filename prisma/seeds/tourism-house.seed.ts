import { PrismaClient } from '../db';

export async function seedTourismHouse(prisma: PrismaClient) {
  console.log('🌱 Seeding tourism houses...');

  // House 1: Omah Tambeng Tawon dan Lanceng
  const house1 = await prisma.tourismHouse.create({
    data: {
      name: 'Omah Tambeng Tawon dan Lanceng',
      description: 'Rumah wisata dengan tema perlebahan dan peternakan',
      category: 'Edukasi',
      location: 'Dusun I, Desa Banyuanyar',
      contactPerson: 'Pak Sardi',
      contactPhone: '081234567892'
    }
  });

  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-tambeng-tawon.jpg',
        fileSize: 1680000,
        fileUrl:
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Omah Tambeng Tawon dengan peternakan lebah',
        entityType: 'tourism_house',
        entityId: house1.id
      },
      {
        fileName: 'omah-tambeng-edukasi.jpg',
        fileSize: 1520000,
        fileUrl:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Kegiatan edukasi di Omah Tambeng Tawon',
        entityType: 'tourism_house',
        entityId: house1.id
      }
    ],
    skipDuplicates: true
  });

  // House 2: Omah E-Craft
  const house2 = await prisma.tourismHouse.create({
    data: {
      name: 'Omah E-Craft',
      description: 'Rumah wisata kerajinan tangan dan seni tradisional',
      category: 'Kerajinan',
      location: 'Dusun II, Desa Banyuanyar',
      contactPerson: 'Bu Siti',
      contactPhone: '081234567893'
    }
  });

  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-e-craft-workshop.jpg',
        fileSize: 1750000,
        fileUrl:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Workshop kerajinan di Omah E-Craft',
        entityType: 'tourism_house',
        entityId: house2.id
      },
      {
        fileName: 'omah-e-craft-produk.jpg',
        fileSize: 1420000,
        fileUrl:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Produk kerajinan tangan di Omah E-Craft',
        entityType: 'tourism_house',
        entityId: house2.id
      }
    ],
    skipDuplicates: true
  });

  // House 3: Omah Toga
  const house3 = await prisma.tourismHouse.create({
    data: {
      name: 'Omah Toga',
      description: 'Rumah wisata tanaman obat keluarga dan herbal',
      category: 'Kesehatan',
      location: 'Dusun III, Desa Banyuanyar',
      contactPerson: 'Pak Joko',
      contactPhone: '081234567894'
    }
  });

  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-toga-tanaman.jpg',
        fileSize: 1850000,
        fileUrl:
          'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Kebun tanaman obat di Omah Toga',
        entityType: 'tourism_house',
        entityId: house3.id
      },
      {
        fileName: 'omah-toga-herbal.jpg',
        fileSize: 1320000,
        fileUrl:
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
        mimeType: 'image/jpeg',
        description: 'Pengolahan herbal tradisional di Omah Toga',
        entityType: 'tourism_house',
        entityId: house3.id
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Tourism houses seeded: 3 records with their media`);
  return { house1, house2, house3 };
}
