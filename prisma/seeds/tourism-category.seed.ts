import { PrismaClient } from '../db';

export async function seedTourismCategory(prisma: PrismaClient) {
  console.log('🌱 Seeding tourism categories and packages...');

  // Category 1: Paket Pelajar
  const category1 = await prisma.tourismCategory.create({
    data: {
      name: 'Paket Pelajar',
      description:
        '<ol class="list-node"><li><p class="text-node">Harga Tertera untuk <strong>minimal tamu sebanyak 20 pax.</strong></p></li><li><p class="text-node">Semua <strong>Aktivitas dimulai dari gedung IKM</strong> / Tourism Information Centre Desa Banyuanyar.</p></li><li><p class="text-node">Paket <strong>reservasi wisata pada H – 1.</strong></p></li><li><p class="text-node"><span><strong>*Setiap Peserta Wajib Membawa Tumbler/Botol Minum Sendiri</strong></span></p></li></ol><p class="text-node"></p>'
    }
  });

  await prisma.media.createMany({
    data: [
      {
        fileName: 'paket-pelajar-1.png',
        fileSize: 1500000,
        fileUrl:
          'https://res.cloudinary.com/dh53vmqmb/image/upload/v1755564470/embed-tiptap/z9egepqaebwieejlhcxc.png',
        mimeType: 'image/png',
        description: 'Gambar representatif untuk Paket Pelajar',
        entityType: 'tourism_category',
        entityId: category1.id
      },
      {
        fileName: 'paket-pelajar-2.png',
        fileSize: 1800000,
        fileUrl:
          'https://res.cloudinary.com/dh53vmqmb/image/upload/v1755564506/embed-tiptap/ad5xqrsq0f6gro3ravdp.png',
        mimeType: 'image/png',
        description: 'Foto kegiatan Paket Pelajar',
        entityType: 'tourism_category',
        entityId: category1.id
      }
    ],
    skipDuplicates: true
  });

  // Package 1: Paket Pelajar Half Day
  const package1 = await prisma.tourismPackage.create({
    data: {
      name: 'Half Day',
      description:
        '<p class="text-node"><span><strong>Mewarnai Batik</strong></span></p><p class="text-node"><strong>1 Workshop UMKM <em>*sesuai Pilihan</em></strong></p><ul class="list-node"><li><p class="text-node">Welcome Drink</p></li><li><p class="text-node">Snack 1x</p></li><li><p class="text-node">Makan Siang</p></li><li><p class="text-node">Oleh-Oleh</p></li><li><p class="text-node">Free Air Mineral</p></li><li><p class="text-node">Welcome Dance</p></li><li><p class="text-node">Transport Lokal</p></li></ul><p class="text-node"></p>',
      price: 50000,
      duration: '4 jam',
      categoryId: category1.id
    }
  });

  // Package 1b: Paket Pelajar Full Day
  const package1b = await prisma.tourismPackage.create({
    data: {
      name: 'Full Day',
      description:
        '<p class="text-node"><span><strong>Mewarnai Batik</strong></span></p><p class="text-node"><span><strong>4 Workshop UMKM&nbsp;<em>*sesuai Pilihan</em></strong></span></p><ul class="list-node"><li><p class="text-node">Welcome Drink</p></li><li><p class="text-node">Snack 1x</p></li><li><p class="text-node">Makan Siang</p></li><li><p class="text-node">Oleh-Oleh</p></li><li><p class="text-node">Free Air Mineral</p></li><li><p class="text-node">Welcome Dance</p></li><li><p class="text-node">Transport Lokal</p></li></ul><p class="text-node"></p>',
      price: 100000,
      duration: '8 jam',
      categoryId: category1.id
    }
  });

  // Category 2: Paket Jeep Tour
  const category2 = await prisma.tourismCategory.create({
    data: {
      name: 'Paket Jeep Tour',
      description:
        '<ol class="list-node"><li><p class="text-node">Harga Tertera untuk <strong>minimal tamu sebanyak 30 pax.</strong></p></li><li><p class="text-node">Semua <strong>Aktivitas dimulai dari gedung IKM</strong> / Tourism Information Centre Desa Banyuanyar.</p></li><li><p class="text-node">Paket <strong>reservasi wisata pada H – 1.</strong></p></li></ol><p class="text-node"></p>'
    }
  });

  await prisma.media.createMany({
    data: [
      {
        fileName: 'jeep-tour-1.png',
        fileSize: 2128000,
        fileUrl:
          'https://res.cloudinary.com/dh53vmqmb/image/upload/v1755565451/embed-tiptap/ucffxnh0otlgmmk4fvrp.png',
        mimeType: 'image/png',
        description: 'Gambar representatif untuk Paket Jeep Tour',
        entityType: 'tourism_category',
        entityId: category2.id
      },
      {
        fileName: 'jeep-tour-2.png',
        fileSize: 1856000,
        fileUrl:
          'https://res.cloudinary.com/dh53vmqmb/image/upload/v1755565488/embed-tiptap/j45obdbhssj2gnek1316.png',
        mimeType: 'image/png',
        description: 'Foto kegiatan Jeep Tour',
        entityType: 'tourism_category',
        entityId: category2.id
      }
    ],
    skipDuplicates: true
  });

  // Package 2a: Regular Package
  const package2a = await prisma.tourismPackage.create({
    data: {
      name: 'Regular Package',
      description:
        '<h5 class="heading-node"><strong>Eksplorasi Desa Wisata</strong></h5><ol class="list-node"><li><p class="text-node">Sendang Mande Rejo</p></li><li><p class="text-node">Perkebunan Kopi Robusta &amp; Kopi Nangka</p></li></ol><ul class="list-node"><li><p class="text-node">Tiket Masuk</p></li><li><p class="text-node">Welcome Drink</p></li><li><p class="text-node">Mobil Jip</p></li><li><p class="text-node">Local Guide</p></li></ul><p class="text-node"></p>',
      price: 150000,
      duration: '2 jam',
      categoryId: category2.id
    }
  });

  // Package 2b: Village Tour
  const package2b = await prisma.tourismPackage.create({
    data: {
      name: 'Village Tour',
      description:
        '<h5 class="heading-node"><strong>Eksplorasi Desa Wisata</strong></h5><ol class="list-node"><li><p class="text-node">Sendang Mande Rejo</p></li><li><p class="text-node">Perkebunan Kopi Robusta &amp; Kopi Nangka</p></li><li><p class="text-node">Lokasi Sentra 4 UMKM Unggulan</p></li></ol><ul class="list-node"><li><p class="text-node">Tiket Masuk</p></li><li><p class="text-node">Welcome Drink</p></li><li><p class="text-node">Snack 1x</p></li><li><p class="text-node">Makan Siang</p></li><li><p class="text-node">Local Guide</p></li></ul><p class="text-node"></p>',
      price: 275000,
      duration: '4 jam',
      categoryId: category2.id
    }
  });

  console.log(
    `✅ Tourism categories and packages seeded: 2 categories with media and 4 packages`
  );
  return {
    categories: { category1, category2 },
    packages: { package1, package1b, package2a, package2b }
  };
}
