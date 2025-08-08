import { PrismaClient } from '../db';

export async function seedTourismCategory(prisma: PrismaClient) {
  console.log('🌱 Seeding tourism categories...');

  const tourismCategoryData = [
    { name: "Paket Pelajar" },
    { name: "Paket Outbound" },
    { name: "Paket Jeep Tour" },
    { name: "Paket Studi Banding" },
    { name: "Paket Camping" },
    { name: "Paket Homestay" }
  ];

  const result = await prisma.tourismCategory.createMany({
    data: tourismCategoryData,
    skipDuplicates: true
  });

  console.log(`✅ Tourism categories seeded: ${result.count} records`);
  return result;
} 