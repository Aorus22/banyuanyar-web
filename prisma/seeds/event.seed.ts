import { PrismaClient } from '../db';

export async function seedEvent(prisma: PrismaClient) {
  console.log('🌱 Seeding events...');

  // Event 1: Kunjungan Dinas Pariwisata Banjarnegara
  const event1 = await prisma.event.create({
    data: {
      title: "Kunjungan Dinas Pariwisata Banjarnegara",
      description: "Kunjungan dari Dinas Pariwisata dan Kebudayaan Kabupaten Banjarnegara dilaksanakan pada tanggal 18 September 2024",
      date: new Date("2024-09-18"),
      startTime: "09:00",
      endTime: "17:00",
      location: "Desa Banyuanyar",
      organizer: "Dinas Pariwisata dan Kebudayaan Kabupaten Banjarnegara",
    }
  });

  // Media untuk Event 1
  await prisma.media.createMany({
    data: [
      {
        fileName: 'kunjungan-dinas-pariwisata.jpg',
        fileSize: 2048000,
        fileUrl: 'https://desabanyuanyar.com/wp-content/uploads/2021/01/2024_09_18_14_23_IMG_7115-scaled-1910x1910.jpg',
        mimeType: 'image/jpeg',
        description: 'Kunjungan Dinas Pariwisata Banjarnegara di Desa Banyuanyar',
        entityType: 'event',
        entityId: event1.id,
      }
    ],
    skipDuplicates: true
  });

  // Event 2: Study Tiru Pemdes Cileng Kab. Magetan
  const event2 = await prisma.event.create({
    data: {
      title: "Study Tiru Pemdes Cileng Kab. Magetan",
      description: "Kegiatan Study Tiru yang dilaksanakan oleh Pemerintah Desa Cileng Kabupaten Magetan berlangsung pada tanggal 21 September 2024.",
      date: new Date("2024-09-21"),
      startTime: "09:00",
      endTime: "17:00",
      location: "Desa Banyuanyar",
      organizer: "Pemerintah Desa Cileng Kabupaten Magetan",
    }
  });

  // Media untuk Event 2
  await prisma.media.createMany({
    data: [
      {
        fileName: 'study-tiru-pemdes-cileng.jpg',
        fileSize: 1680000,
        fileUrl: 'https://desabanyuanyar.com/wp-content/uploads/2021/01/Banyuanyar-2-scaled.jpg.webp',
        mimeType: 'image/webp',
        description: 'Study Tiru Pemdes Cileng Kabupaten Magetan di Desa Banyuanyar',
        entityType: 'event',
        entityId: event2.id,
      }
    ],
    skipDuplicates: true
  });

  // Event 3: Kenduren Udan Dawet Desa Banyuanyar
  const event3 = await prisma.event.create({
    data: {
      title: "Kenduren Udan Dawet Desa Banyuanyar",
      description: "Kenduren Udan Dawet merupakan wujud syukur kepada Sang Pencipta atas kesehatan keselamatan yang diberikan kepada warga.",
      date: new Date("2024-09-15"),
      startTime: "08:00",
      endTime: "16:00",
      location: "Desa Banyuanyar",
      organizer: "Pemerintah Desa Banyuanyar",
    }
  });

  // Media untuk Event 3
  await prisma.media.createMany({
    data: [
      {
        fileName: 'kenduren-udan-dawet.png',
        fileSize: 1456000,
        fileUrl: 'https://desabanyuanyar.com/wp-content/uploads/2021/01/Desain-tanpa-judul-10.png',
        mimeType: 'image/png',
        description: 'Kenduren Udan Dawet Desa Banyuanyar',
        entityType: 'event',
        entityId: event3.id,
      }
    ],
    skipDuplicates: true
  });

  // Event 4: Gelar Desa Wisata Jawa Tengah 2024 Purworejo
  const event4 = await prisma.event.create({
    data: {
      title: "Gelar Desa Wisata Jawa Tengah 2024 Purworejo",
      description: "Acara Gelar Desa Wisata Jawa Tengah 2024 diselenggarakan di Purworejo pada tanggal 13 September 2024.",
      date: new Date("2024-09-13"),
      startTime: "08:00",
      endTime: "18:00",
      location: "Purworejo",
      organizer: "Dinas Pariwisata Jawa Tengah",
    }
  });

  // Media untuk Event 4
  await prisma.media.createMany({
    data: [
      {
        fileName: 'gelar-desa-wisata-jateng.jpg',
        fileSize: 1792000,
        fileUrl: 'https://desabanyuanyar.com/wp-content/uploads/2024/10/Desain-tanpa-judul-1.jpg.webp',
        mimeType: 'image/webp',
        description: 'Gelar Desa Wisata Jawa Tengah 2024 di Purworejo',
        entityType: 'event',
        entityId: event4.id,
      }
    ],
    skipDuplicates: true
  });

  // Event 5: Infrastruktur Teknologi dan Akses Internet
  const event5 = await prisma.event.create({
    data: {
      title: "Infrastruktur Teknologi dan Akses Internet",
      description: "Infrastruktur teknologi di Desa Banyuanyar mencakup perangkat lunak, jaringan, dan sistem mendukung akses internet cepat.",
      date: new Date("2024-09-20"),
      startTime: "09:00",
      endTime: "17:00",
      location: "Desa Banyuanyar",
      organizer: "Pemerintah Desa Banyuanyar",
    }
  });

  // Media untuk Event 5
  await prisma.media.createMany({
    data: [
      {
        fileName: 'infrastruktur-teknologi.jpg',
        fileSize: 1920000,
        fileUrl: 'https://desabanyuanyar.com/wp-content/uploads/2024/10/Desain-tanpa-judul-5.jpg.webp',
        mimeType: 'image/webp',
        description: 'Infrastruktur Teknologi dan Akses Internet Desa Banyuanyar',
        entityType: 'event',
        entityId: event5.id,
      }
    ],
    skipDuplicates: true
  });

  // Event 6: E-Commerce dan Pemasaran Online
  const event6 = await prisma.event.create({
    data: {
      title: "E-Commerce dan Pemasaran Online",
      description: "E-Commerce dan Pemasaran Online di Desa Banyuanyar memanfaatkan platform digital untuk memperluas pasar produk lokal.",
      date: new Date("2024-09-22"),
      startTime: "09:00",
      endTime: "17:00",
      location: "Desa Banyuanyar",
      organizer: "Pemerintah Desa Banyuanyar",
    }
  });

  // Media untuk Event 6
  await prisma.media.createMany({
    data: [
      {
        fileName: 'ecommerce-pemasaran-online.png',
        fileSize: 2048000,
        fileUrl: 'https://desabanyuanyar.com/wp-content/uploads/2024/10/Desain-tanpa-judul-5.jpg.webp',
        mimeType: 'image/webp',
        description: 'E-Commerce dan Pemasaran Online Desa Banyuanyar',
        entityType: 'event',
        entityId: event6.id,
      }
    ],
    skipDuplicates: true
  });

  // Event 7: Pusat Pembelajaran Digital
  const event7 = await prisma.event.create({
    data: {
      title: "Pusat Pembelajaran Digital",
      description: "Desa Banyuanyar menyediakan fasilitas dan sumber belajar teknologi untuk akses pendidikan modern.",
      date: new Date("2024-09-25"),
      startTime: "09:00",
      endTime: "17:00",
      location: "Desa Banyuanyar",
      organizer: "Pemerintah Desa Banyuanyar",
    }
  });

  // Media untuk Event 7
  await prisma.media.createMany({
    data: [
      {
        fileName: 'pusat-pembelajaran-digital.jpg',
        fileSize: 1792000,
        fileUrl: 'https://desabanyuanyar.com/wp-content/uploads/2024/10/Desain-tanpa-judul-4.jpg.webp',
        mimeType: 'image/webp',
        description: 'Pusat Pembelajaran Digital Desa Banyuanyar',
        entityType: 'event',
        entityId: event7.id,
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Events seeded: 7 records with their media`);
  return { event1, event2, event3, event4, event5, event6, event7 };
} 