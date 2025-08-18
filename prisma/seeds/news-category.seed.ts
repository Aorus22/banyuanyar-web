import { PrismaClient } from '../db';

export async function seedNewsCategory(prisma: PrismaClient) {
  console.log('🌱 Seeding news categories...');

  const newsCategoryData = [
    {
      name: "Berita Desa",
      slug: "berita-desa",
      description: "Berita terkini seputar kegiatan dan perkembangan desa",
      color: "#3B82F6"
    },
    {
      name: "Wisata",
      slug: "wisata",
      description: "Informasi seputar wisata dan destinasi di Desa Banyuanyar",
      color: "#10B981"
    },
    {
      name: "UMKM",
      slug: "umkm",
      description: "Berita dan informasi seputar UMKM desa",
      color: "#F59E0B"
    },
    {
      name: "Pemerintahan",
      slug: "pemerintahan",
      description: "Informasi seputar pemerintahan desa",
      color: "#EF4444"
    },
    {
      name: "Umum",
      slug: "umum",
      description: "Informasi tentang hal-hal umum",
      color: "#F59E0B"
    }
  ];

  const result = await prisma.newsCategory.createMany({
    data: newsCategoryData,
    skipDuplicates: true
  });

  console.log(`✅ News categories seeded: ${result.count} records`);
  return result;
} 