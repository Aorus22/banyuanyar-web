import { NewsStatus, PrismaClient } from '../db';

export async function seedNews(prisma: PrismaClient) {
  console.log('🌱 Seeding news...');

  // Get admin user for news author
  const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  const beritaCategory = await prisma.newsCategory.findFirst({ where: { slug: "berita-desa" } });

  const newsData = [
    {
      title: "PENERAPAN BIOPORI DESA BANYUANYAR UNTUK MENDUKUNG AKSI SDGS",
      slug: "penerapan-biopori-desa-banyuanyar-untuk-mendukung-aksi-sdgs",
      content: "Desa Banyuanyar berhasil menerapkan sistem biopori untuk mendukung aksi SDGS dalam rangka pelestarian lingkungan. Program ini merupakan bagian dari visi Green Smart Village yang diusung oleh desa. Biopori yang diterapkan di berbagai titik strategis desa membantu meningkatkan resapan air dan mengurangi risiko banjir saat musim hujan. Selain itu, biopori juga berfungsi sebagai tempat pembuatan kompos alami yang dapat digunakan untuk pertanian organik. Program ini mendapat dukungan penuh dari masyarakat dan menjadi contoh bagi desa-desa lain di sekitar.",
      featuredImage: "/images/news/biopori.jpg",
      authorId: adminUser?.id,
      categoryId: beritaCategory?.id,
      status: NewsStatus.PUBLISHED,
      publishedAt: new Date("2025-03-05"),
      viewCount: 150
    },
    {
      title: "MNC Peduli di Desa Banyuanyar",
      slug: "mnc-peduli-di-desa-banyuanyar",
      content: "Program MNC Peduli memberikan bantuan dan dukungan untuk pengembangan Desa Banyuanyar. Kunjungan MNC Peduli ke Desa Banyuanyar merupakan bentuk kepedulian terhadap pengembangan desa wisata dan pemberdayaan masyarakat. Program ini mencakup pelatihan pengembangan UMKM, dukungan infrastruktur wisata, dan peningkatan kapasitas SDM desa. MNC Peduli juga memberikan bantuan berupa peralatan untuk mendukung program Green Smart Village yang sedang dikembangkan. Kerjasama ini diharapkan dapat mempercepat pencapaian visi desa sebagai desa mandiri, religius, dan berbudaya.",
      featuredImage: "/images/news/mnc-peduli.jpg",
      authorId: adminUser?.id,
      categoryId: beritaCategory?.id,
      status: NewsStatus.PUBLISHED,
      publishedAt: new Date("2024-11-05"),
      viewCount: 89
    }
  ];

  const result = await prisma.news.createMany({
    data: newsData,
    skipDuplicates: true
  });

  console.log(`✅ News seeded: ${result.count} records`);
  return result;
} 