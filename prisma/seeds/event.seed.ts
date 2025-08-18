import { PrismaClient } from '../db';

export async function seedEvent(prisma: PrismaClient) {
  console.log('🌱 Seeding events...');

  const eventData = [
    {
      title: "Profil Bumdesa Kampus Kopi Banyuanyar",
      description: "Presentasi profil Bumdesa Kampus Kopi Banyuanyar",
      startDate: new Date("2024-11-22"),
      endDate: new Date("2024-11-22"),
      location: "Balai Desa Banyuanyar",
      organizer: "Bumdesa Kampus Kopi",
    },
    {
      title: "Profil Desa Wisata Kampus Kopi Banyuanyar",
      description: "Presentasi profil Desa Wisata Kampus Kopi Banyuanyar",
      startDate: new Date("2024-11-11"),
      endDate: new Date("2024-11-11"),
      location: "Kampus Kopi Banyuanyar",
      organizer: "Tim Desa Wisata",
    }
  ];

  const result = await prisma.event.createMany({
    data: eventData,
    skipDuplicates: true
  });

  console.log(`✅ Events seeded: ${result.count} records`);
  return result;
} 