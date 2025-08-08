import { PrismaClient } from '../db';

export async function seedTourismPackage(prisma: PrismaClient) {
  console.log('🌱 Seeding tourism packages...');

  // Get category IDs
  const pelajarCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Pelajar" } });
  const outboundCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Outbound" } });
  const jeepCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Jeep Tour" } });

  const tourismPackageData = [
    {
      name: "Paket Pelajar",
      description: "Paket wisata edukasi untuk pelajar dengan harga terjangkau",
      price: 50000,
      duration: "4 jam",
      maxParticipants: 50,
      categoryId: pelajarCategory?.id || 1
    },
    {
      name: "Paket Outbound",
      description: "Paket outbound untuk team building dan refreshing",
      price: 150000,
      duration: "8 jam",
      maxParticipants: 30,
      categoryId: outboundCategory?.id || 2
    },
    {
      name: "Paket Jeep Tour",
      description: "Petualangan dengan jeep mengelilingi desa dan perkebunan",
      price: 200000,
      duration: "6 jam",
      maxParticipants: 8,
      categoryId: jeepCategory?.id || 3
    }
  ];

  const result = await prisma.tourismPackage.createMany({
    data: tourismPackageData,
    skipDuplicates: true
  });

  console.log(`✅ Tourism packages seeded: ${result.count} records`);
  return result;
} 