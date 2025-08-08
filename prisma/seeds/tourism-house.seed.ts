import { PrismaClient } from '../db';

export async function seedTourismHouse(prisma: PrismaClient) {
  console.log('🌱 Seeding tourism houses...');

  const tourismHouseData = [
    {
      name: "Omah Tambeng Tawon dan Lanceng",
      description: "Rumah wisata dengan tema perlebahan dan peternakan",
      category: "Edukasi",
      location: "Dusun I, Desa Banyuanyar",
      contactPerson: "Pak Sardi",
      contactPhone: "081234567892"
    },
    {
      name: "Omah E-Craft",
      description: "Rumah wisata kerajinan tangan dan seni tradisional",
      category: "Kerajinan",
      location: "Dusun II, Desa Banyuanyar",
      contactPerson: "Bu Siti",
      contactPhone: "081234567893"
    },
    {
      name: "Omah Toga",
      description: "Rumah wisata tanaman obat keluarga dan herbal",
      category: "Kesehatan",
      location: "Dusun III, Desa Banyuanyar",
      contactPerson: "Pak Joko",
      contactPhone: "081234567894"
    }
  ];

  const result = await prisma.tourismHouse.createMany({
    data: tourismHouseData,
    skipDuplicates: true
  });

  console.log(`✅ Tourism houses seeded: ${result.count} records`);
  return result;
} 