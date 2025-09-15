import { PrismaClient } from '../db';

export async function seedUmkm(prisma: PrismaClient) {
  console.log('🌱 Seeding UMKM and their products...');

  // UMKM 1: Omah Tambeng Tawon dan Lanceng
  const umkm1 = await prisma.umkm.create({
    data: {
      name: 'Omah Tambeng Tawon dan Lanceng',
      ownerName: null,
      description:
        '<p class="text-node">Omah Madu Banyuanyar, Tambeng Tawon dan Lanceng.</p>',
      address: 'Kampung Madu Lanceng, Dukuh Grenjeng Banyuanyar',
      phone: '+6282180377847',
      email: null,
      socialMedia: {
        instagram: 'omah_oveje_banyuanyar',
        whatsapp: '62857258780004'
      },
      latitude: -7.123456,
      longitude: 110.654321
    }
  });

  // Media untuk UMKM 1
  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-madu-1.png',
        fileSize: 1536000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172322.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm1.id
      },
      {
        fileName: 'omah-madu-2.png',
        fileSize: 2048000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172230.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm1.id
      },
      {
        fileName: 'omah-madu-3.png',
        fileSize: 1650000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172301.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm1.id
      },
      {
        fileName: 'omah-madu-4.png',
        fileSize: 1920000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172351.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm1.id
      }
    ],
    skipDuplicates: true
  });

  // Produk UMKM 1: Madu
  const product1 = await prisma.umkmProduct.create({
    data: {
      name: 'Madu',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm1.id
    }
  });

  // Media untuk Produk Madu
  await prisma.media.createMany({
    data: [
      {
        fileName: 'madu-1.jpg',
        fileSize: 1280000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/7ccbf288-c93d-4b12-9b42-11606e84a5da.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product1.id
      },
      {
        fileName: 'madu-2.jpg',
        fileSize: 1350000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/98a96ffa-30dc-47d4-be06-639300386e26.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product1.id
      },
      {
        fileName: 'madu-3.jpg',
        fileSize: 1600000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/5f35fdb1-a4fa-408b-8c3b-87221d749050.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product1.id
      }
    ],
    skipDuplicates: true
  });

  // UMKM 2: Omah E-Craft
  const umkm2 = await prisma.umkm.create({
    data: {
      name: 'Omah E-Craft',
      ownerName: null,
      description:
        '<p class="text-node">Official Kampung Ekraf Desa Banyuanyar.</p>',
      address: 'Dk. Geneng Desa Banyuanyar Ampel',
      phone: null,
      email: null,
      socialMedia: {
        instagram: 'omah_ecraftbanyuanyar',
        whatsapp: '62857258780004'
      },
      latitude: -7.123789,
      longitude: 110.654789
    }
  });

  // Media untuk UMKM 2
  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-ecraft-1.png',
        fileSize: 1792000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172351.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm2.id
      },
      {
        fileName: 'omah-ecraft-2.png',
        fileSize: 1280000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172322.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm2.id
      },
      {
        fileName: 'omah-ecraft-3.png',
        fileSize: 1650000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172230.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm2.id
      },
      {
        fileName: 'omah-ecraft-4.png',
        fileSize: 1920000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172301.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm2.id
      }
    ],
    skipDuplicates: true
  });

  // Produk UMKM 2: Kerajinan
  const product2 = await prisma.umkmProduct.create({
    data: {
      name: 'Kerajinan',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm2.id
    }
  });

  // Media untuk Produk Kerajinan
  await prisma.media.createMany({
    data: [
      {
        fileName: 'kerajinan-1.jpg',
        fileSize: 1420000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/fbf0c418-7dd5-4fc7-97f5-55c8a8b8ca5a.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product2.id
      },
      {
        fileName: 'kerajinan-2.jpg',
        fileSize: 1250000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/c3bf96f7-8568-488a-b911-975ced4fe3fb.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product2.id
      },
      {
        fileName: 'kerajinan-3.jpg',
        fileSize: 1380000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/40610af7-00c9-4cad-b7a9-4ca20264845b.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product2.id
      },
      {
        fileName: 'kerajinan-4.jpg',
        fileSize: 1150000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/bb3c8c73-384f-49f9-a716-ec66ad8e6585.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product2.id
      },
      {
        fileName: 'kerajinan-5.jpg',
        fileSize: 980000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/e112f384-0148-409d-95e2-596a1b3eb513.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product2.id
      },
      {
        fileName: 'kerajinan-6.jpg',
        fileSize: 1200000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/eeb72d05-dbc9-45a6-9a1b-2c52b3bbae16.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product2.id
      }
    ],
    skipDuplicates: true
  });

  // UMKM 3: Omah Toga
  const umkm3 = await prisma.umkm.create({
    data: {
      name: 'Omah Toga',
      ownerName: null,
      description:
        '<p class="text-node"><span>O</span>mah Tanaman Obat dan Keluarga diproduksi oleh KWT BAGAS WARAS</p><ul class="list-node"><li><p class="text-node">Olahan Stik</p></li><li><p class="text-node">Olahan Kripik</p></li></ul><p class="text-node">Omah Toga Banyuanyar Boyolali Berbagai olahan herbal alami dan berkhasiat bagi kesehatan👌</p><p class="text-node">Untuk pemesanan hub: 081215415602/Mbak Lina</p>',
      address: 'Banyuanyar Ampel Boyolali',
      phone: '+6281215415602',
      email: null,
      socialMedia: {
        instagram: 'omah_oveje_banyuanyar',
        whatsapp: '62857258780004'
      },
      latitude: -7.124567,
      longitude: 110.655567
    }
  });

  // Media untuk UMKM 3
  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-toga-1.png',
        fileSize: 1536000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172230.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm3.id
      },
      {
        fileName: 'omah-toga-2.png',
        fileSize: 2048000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172322.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm3.id
      },
      {
        fileName: 'omah-toga-3.png',
        fileSize: 1650000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172351.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm3.id
      },
      {
        fileName: 'omah-toga-4.png',
        fileSize: 1920000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/Screenshot-2023-07-24-172301.png',
        mimeType: 'image/png',
        description: null,
        entityType: 'umkm',
        entityId: umkm3.id
      }
    ],
    skipDuplicates: true
  });

  // Produk UMKM 3 (1): Snack
  const product3 = await prisma.umkmProduct.create({
    data: {
      name: 'Snack',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm3.id
    }
  });

  // Media untuk Produk Snack
  await prisma.media.create({
    data: {
      fileName: 'snack-1.png',
      fileSize: 1280000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture10.png',
      mimeType: 'image/png',
      description: null,
      entityType: 'umkm_product',
      entityId: product3.id
    }
  });

  // Produk UMKM 3 (2): Rempah
  const product4 = await prisma.umkmProduct.create({
    data: {
      name: 'Rempah',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm3.id
    }
  });

  // Media untuk Produk Rempah
  await prisma.media.create({
    data: {
      fileName: 'rempah-1.jpg',
      fileSize: 1350000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/ebceadff-ade4-4fb1-b09a-b5165ac59be9.jfif_-1.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product4.id
    }
  });

  // UMKM 4: Omah Kopi Ngemplak
  const umkm4 = await prisma.umkm.create({
    data: {
      name: 'Omah Kopi Ngemplak',
      ownerName: 'Eko Budi Suroso',
      description:
        '<p class="text-node"><span>K</span>edai Kopi Om Koplak atau Omah Kopi Ngemplak Menyediakan :</p><ul class="list-node"><li><p class="text-node">Kopi Robusta</p></li><li><p class="text-node">Kopi Nangka</p></li><li><p class="text-node">Kopi Arabika</p></li></ul><p class="text-node">Eko Budi Suroso<br><a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://shope.ee/8zSOOJqbzM">https://shope.ee/8zSOOJqbzM</a></p>',
      address: 'Omah kopi Ngemplak / Kedai Om Koplak',
      phone: '+6281348300347',
      email: null,
      socialMedia: {
        instagram: 'visitbanyuanyar',
        whatsapp: '62857258780004'
      },
      latitude: -7.125123,
      longitude: 110.656123
    }
  });

  // Media untuk UMKM 4
  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-kopi-1.jpg',
        fileSize: 1792000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/2d22d696-9b8c-47d9-94f6-818f47705c39.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm4.id
      },
      {
        fileName: 'omah-kopi-2.jpg',
        fileSize: 1280000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/7fe43bf9-11b4-4409-b1b9-da96a857e11d.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm4.id
      },
      {
        fileName: 'omah-kopi-3.jpg',
        fileSize: 1650000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/e9ee8c84-2b15-4902-ace7-efeadd464adf.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm4.id
      },
      {
        fileName: 'omah-kopi-4.jpg',
        fileSize: 1920000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/631d72f4-6d6c-43bc-bbd9-e3a155ea99fc.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm4.id
      }
    ],
    skipDuplicates: true
  });

  // Produk UMKM 4: Kopi
  const product5 = await prisma.umkmProduct.create({
    data: {
      name: 'Kopi',
      description: 'Berbagai jenis kopi: Robusta, Nangka, dan Arabika',
      price: null,
      unit: null,
      umkmId: umkm4.id
    }
  });

  // Media untuk Produk Kopi
  await prisma.media.createMany({
    data: [
      {
        fileName: 'kopi-1.jpg',
        fileSize: 1420000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/611def4f-aab3-46ba-b633-034366f30bba.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product5.id
      },
      {
        fileName: 'kopi-2.jpg',
        fileSize: 1250000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/17954e1a-b4f6-45c6-bab9-37c5f1f630f4.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm_product',
        entityId: product5.id
      }
    ],
    skipDuplicates: true
  });

  // UMKM 5: Omah Cowboy
  const umkm5 = await prisma.umkm.create({
    data: {
      name: 'Omah Cowboy',
      ownerName: null,
      description:
        '<h3 class="heading-node"><strong>Kenapa Susu Sapi Banyuanyar?​</strong></h3><p class="text-node"><span>K</span>ami, salah satu desa dengan sentra petemakan sapi perah terbesar di Kabupaten Boyolali dengan jumlah ternak sapi lebih dari 1500 ekor yang tersebar di seluruh kawasan desa Banyuanyar. Dengan kapasitas produksi yang stabil dan telah menjadi kepercayaan pelanggan susu dari koperasi dan industri maka kualitas susu sapi kami tidak diragukan. Sehingga, untuk optimalisi hasil produksi susu sapi, pemerintah desa Banyuanyar melalui Bumdesa Kampus Kopi memberikan pendampingan, pelatihan dan pembinaan kepada dukuh Wangan sebagai lokasi Untuk Pengolaham Hasil (UPH) susu sapi dengan beragam produk olahan susu yang 1009, mumi. Produk yang telah dihasilkan adalah minuman susu hangat dan es dengan beragam varian rasa, yoghurt, pie susu, kerupuk susu dan nagasari susu yang memiliki kualitas produk terbaik dan bersaing. Kelompok dukuh ini memiliki julukan Kampung Susu Cowboy Banyuanyar.</p>',
      address: 'Dk. Wangan Desa Banyuanyar',
      phone: '+6281329639609',
      email: null,
      socialMedia: {
        instagram: 'omah_cowboy_banyuanyar',
        whatsapp: '62857258780004'
      },
      latitude: -7.125789,
      longitude: 110.656789
    }
  });

  // Media untuk UMKM 5
  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-cowboy-1.jpg',
        fileSize: 1792000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/324913207_137387889171998_6367595893227852948_n.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm5.id
      },
      {
        fileName: 'omah-cowboy-2.jpg',
        fileSize: 1280000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/357550181_1344640319731106_9112462300129394420_n.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm5.id
      },
      {
        fileName: 'omah-cowboy-3.jpg',
        fileSize: 1650000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/843115ba-3d9d-4ec4-b552-f5a8d947ab22.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm5.id
      },
      {
        fileName: 'omah-cowboy-4.jpg',
        fileSize: 1920000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/6f729940-e805-4b98-87bd-052b9675e6ef.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm5.id
      },
      {
        fileName: 'omah-cowboy-5.jpg',
        fileSize: 1750000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/DSF2074-scaled-1.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm5.id
      },
      {
        fileName: 'omah-cowboy-6.jpg',
        fileSize: 1850000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/8ac04a8d-c32e-4b7d-a390-1226891c0d15.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm5.id
      },
      {
        fileName: 'omah-cowboy-7.jpg',
        fileSize: 1950000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/e7285ca5-1e09-489f-8fd5-722d09c7a570.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm5.id
      }
    ],
    skipDuplicates: true
  });

  // Produk UMKM 5 (1): Pie Susu
  const product6 = await prisma.umkmProduct.create({
    data: {
      name: 'Pie Susu',
      description: 'Pie susu lezat dari Omah Cowboy Banyuanyar',
      price: null,
      unit: null,
      umkmId: umkm5.id
    }
  });

  // Media untuk Produk Pie Susu
  await prisma.media.create({
    data: {
      fileName: 'pie-susu.png',
      fileSize: 1280000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture1.png',
      mimeType: 'image/png',
      description: null,
      entityType: 'umkm_product',
      entityId: product6.id
    }
  });

  // Produk UMKM 5 (2): Kerupuk Susu
  const product7 = await prisma.umkmProduct.create({
    data: {
      name: 'Kerupuk Susu',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm5.id
    }
  });

  // Media untuk Produk Kerupuk Susu
  await prisma.media.create({
    data: {
      fileName: 'kerupuk-susu.png',
      fileSize: 1350000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture2.png',
      mimeType: 'image/png',
      description: null,
      entityType: 'umkm_product',
      entityId: product7.id
    }
  });

  // Produk UMKM 5 (3): Susu Murni
  const product8 = await prisma.umkmProduct.create({
    data: {
      name: 'Susu Murni',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm5.id
    }
  });

  // Media untuk Produk Susu Murni
  await prisma.media.create({
    data: {
      fileName: 'susu-murni.jpg',
      fileSize: 1600000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture3.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product8.id
    }
  });

  // Produk UMKM 5 (4): Yogurt
  const product9 = await prisma.umkmProduct.create({
    data: {
      name: 'Yogurt',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm5.id
    }
  });

  // Media untuk Produk Yogurt
  await prisma.media.create({
    data: {
      fileName: 'yogurt-cowboy.jpg',
      fileSize: 1850000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/8ac04a8d-c32e-4b7d-a390-1226891c0d15.jfif_.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product9.id
    }
  });

  // UMKM 6: Omah Bukuku
  const umkm6 = await prisma.umkm.create({
    data: {
      name: 'Omah Bukuku',
      ownerName: null,
      description:
        '<p class="text-node">Omah Bukuku Banyuanyar Omah Bukuku Desa Banyuanyar, Kecamatan Ampel, Boyolali Perputakaan Desa untuk memajukan minat baca masyarakat Desa Banyuanyar.</p>',
      address: 'Banyuanyar Ampel Boyolali',
      phone: null,
      email: null,
      socialMedia: {
        instagram: 'omahbukuku_banyuanyar',
        whatsapp: '62857258780004'
      },
      latitude: -7.126123,
      longitude: 110.657123
    }
  });

  // Media untuk UMKM 6
  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-bukuku-1.jpg',
        fileSize: 1792000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/324913207_137387889171998_6367595893227852948_n.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm6.id
      },
      {
        fileName: 'omah-bukuku-2.jpg',
        fileSize: 1280000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/357550181_1344640319731106_9112462300129394420_n.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm6.id
      },
      {
        fileName: 'omah-bukuku-3.jpg',
        fileSize: 1650000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/316519060_1771358986551282_2110413704284927455_n.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm6.id
      },
      {
        fileName: 'omah-bukuku-4.jpg',
        fileSize: 1920000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/316310389_866663347796601_285984738734779528_n.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm6.id
      },
      {
        fileName: 'omah-bukuku-5.jpg',
        fileSize: 1750000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/316324172_165050769496349_3063265376442621052_n.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm6.id
      },
      {
        fileName: 'omah-bukuku-6.jpg',
        fileSize: 1850000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/317521812_6309480149066137_4494695962724057685_n.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm6.id
      }
    ],
    skipDuplicates: true
  });

  // UMKM 7: Omah Seni
  const umkm7 = await prisma.umkm.create({
    data: {
      name: 'Omah Seni',
      ownerName: null,
      description:
        '<p class="text-node">Uri – Uri Budaya Jawa, bukan hal mudah bagi generasi muda masa kini yang telah akrab dengan arus modernisasi serba digital. Laju teknologi dengan segala iming-iming fitur yang seolah menjadi kebutuhan utama sudah menjadi konsumsi hingga ke masyarakat desa, terlebih usia pelajar. Sejak saat itulah, lambat laun akar budaya tradisi yang terlahir dari desa mulai pudar, luntur dan abai menjadi kisah dan cerita oleh para orang tua. Oleh karena itu, saatnya kita bertanggung jawab bersama menjadi bagian dari nilai—nilai budaya yang telah berkembang dan dilestarikan oleh genarasi pendahulu kita.</p>',
      address: 'Banyuanyar Ampel Boyolali',
      phone: null,
      email: null,
      socialMedia: {
        instagram: 'omahseni_banyuanyar',
        whatsapp: '62857258780004'
      },
      latitude: -7.126789,
      longitude: 110.657789
    }
  });

  // Media untuk UMKM 7
  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-seni-1.jpg',
        fileSize: 1792000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/d60eedc1-7212-4c00-af35-83c136857062-1.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm7.id
      },
      {
        fileName: 'omah-seni-2.jpg',
        fileSize: 1280000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/956f9fd1-f59f-4200-a63f-2909a8303d11.jfif_-1.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm7.id
      },
      {
        fileName: 'omah-seni-3.jpg',
        fileSize: 1650000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/af1925cd-bc44-4cfd-b939-ae7f7f45b669-1.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm7.id
      },
      {
        fileName: 'omah-seni-4.jpg',
        fileSize: 1920000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/9bd9bc04-f836-477b-808b-dad4bcbad821.jfif_.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm7.id
      }
    ],
    skipDuplicates: true
  });

  // UMKM 8: Omah Oveje
  const umkm8 = await prisma.umkm.create({
    data: {
      name: 'Omah Oveje',
      ownerName: null,
      description:
        '<p class="text-node">Unit Usaha Pengolahan Jahe Kelompok Tani Sumber Agung 1 Dk. Jumbleng Desa Banyuanyar, Ampel, Boyolali.</p>',
      address: 'Banyuanyar Ampel Boyolali',
      phone: '+62857258780004',
      email: null,
      socialMedia: {
        instagram: 'omah_oveje_banyuanyar',
        whatsapp: '62857258780004'
      },
      latitude: -7.127123,
      longitude: 110.658123
    }
  });

  // Media untuk UMKM 8
  await prisma.media.createMany({
    data: [
      {
        fileName: 'omah-oveje-1.jpg',
        fileSize: 1792000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/1a8b19bf-9696-44e7-8bc8-0a90292fbecd.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm8.id
      },
      {
        fileName: 'omah-oveje-2.jpg',
        fileSize: 1280000,
        fileUrl:
          'https://desabanyuanyar.com/wp-content/uploads/2024/11/de343eec-4c87-4237-b214-fc93041426e4.jpg',
        mimeType: 'image/jpeg',
        description: null,
        entityType: 'umkm',
        entityId: umkm8.id
      }
    ],
    skipDuplicates: true
  });

  // Produk UMKM 8 (1): Nastar Jahe
  const product10 = await prisma.umkmProduct.create({
    data: {
      name: 'Nastar Jahe',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm8.id
    }
  });

  // Media untuk Produk Nastar Jahe
  await prisma.media.create({
    data: {
      fileName: 'nastar-jahe.jpg',
      fileSize: 1280000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture6-1.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product10.id
    }
  });

  // Produk UMKM 8 (2): Dodol Jahe
  const product11 = await prisma.umkmProduct.create({
    data: {
      name: 'Dodol Jahe',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm8.id
    }
  });

  // Media untuk Produk Dodol Jahe
  await prisma.media.create({
    data: {
      fileName: 'dodol-jahe.jpg',
      fileSize: 1350000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture4.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product11.id
    }
  });

  // Produk UMKM 8 (3): Sirup Jahe
  const product12 = await prisma.umkmProduct.create({
    data: {
      name: 'Sirup Jahe',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm8.id
    }
  });

  // Media untuk Produk Sirup Jahe
  await prisma.media.create({
    data: {
      fileName: 'sirup-jahe.jpg',
      fileSize: 1600000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture8.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product12.id
    }
  });

  // Produk UMKM 8 (4): Kunir Instan
  const product13 = await prisma.umkmProduct.create({
    data: {
      name: 'Kunir Instan',
      description: 'Kunir instan praktis dari Omah Oveje',
      price: null,
      unit: null,
      umkmId: umkm8.id
    }
  });

  // Media untuk Produk Kunir Instan
  await prisma.media.create({
    data: {
      fileName: 'kunir-instan.jpg',
      fileSize: 1450000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture2-1.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product13.id
    }
  });

  // Produk UMKM 8 (5): Geplak Jahe
  const product14 = await prisma.umkmProduct.create({
    data: {
      name: 'Geplak Jahe',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm8.id
    }
  });

  // Media untuk Produk Geplak Jahe
  await prisma.media.create({
    data: {
      fileName: 'geplak-jahe.jpg',
      fileSize: 1550000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture5-1.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product14.id
    }
  });

  // Produk UMKM 8 (6): Sari Jahe Rempah
  const product15 = await prisma.umkmProduct.create({
    data: {
      name: 'Sari Jahe Rempah',
      description: null,
      price: null,
      unit: null,
      umkmId: umkm8.id
    }
  });

  // Media untuk Produk Sari Jahe Rempah
  await prisma.media.create({
    data: {
      fileName: 'sari-jahe-rempah.jpg',
      fileSize: 1700000,
      fileUrl:
        'https://desabanyuanyar.com/wp-content/uploads/2024/11/Picture9.jpg',
      mimeType: 'image/jpeg',
      description: null,
      entityType: 'umkm_product',
      entityId: product15.id
    }
  });

  console.log(
    `✅ UMKM and products seeded: 8 UMKM records with 15 products and their media`
  );
  return {
    umkm1,
    umkm2,
    umkm3,
    umkm4,
    umkm5,
    umkm6,
    umkm7,
    umkm8,
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14,
    product15
  };
}
