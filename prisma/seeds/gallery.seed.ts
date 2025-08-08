import { PrismaClient } from '../db';

export async function seedGallery(prisma: PrismaClient) {
  console.log('🌱 Seeding galleries...');

  const galleryData = [
    {
      title: "Foto Kegiatan 17 Agustus 2024",
      description: "Dokumentasi perayaan Hari Kemerdekaan RI ke-79 di Desa Banyuanyar",
      eventDate: new Date("2024-08-17"),
    },
    {
      title: "Kunjungan MNC Peduli",
      description: "Dokumentasi kunjungan dan program MNC Peduli di Desa Banyuanyar",
      eventDate: new Date("2024-11-05"),
    },
    {
      title: "Wisata Kampus Kopi",
      description: "Galeri foto destinasi wisata Kampus Kopi Banyuanyar",
      eventDate: new Date("2024-11-05"),
    }
  ];

  const result = await prisma.gallery.createMany({
    data: galleryData,
    skipDuplicates: true
  });

  console.log(`✅ Galleries seeded: ${result.count} records`);
  return result;
} 