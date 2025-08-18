import { PrismaClient } from '../db';

export async function seedUmkmProduct(prisma: PrismaClient) {
  console.log('🌱 Seeding UMKM products...');

  // Get UMKM IDs
  const kopiUmkm = await prisma.umkm.findFirst({ where: { name: "Kopi Banyuanyar" } });
  const susuUmkm = await prisma.umkm.findFirst({ where: { name: "Susu Segar Banyuanyar" } });
  const kerajinanUmkm = await prisma.umkm.findFirst({ where: { name: "Kerajinan Bambu Banyuanyar" } });

  // Produk Kopi 1: Kopi Arabika Banyuanyar
  const product1 = await prisma.umkmProduct.create({
    data: {
      name: "Kopi Arabika Banyuanyar",
      description: "Kopi arabika premium dengan rasa yang khas dan aroma yang kuat",
      price: 75000,
      unit: "kg",
      umkmId: kopiUmkm?.id || 1
    }
  });

  await prisma.media.create({
    data: {
      fileName: 'kopi-arabika-banyuanyar.jpg',
      fileSize: 1280000,
      fileUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      description: 'Kemasan Kopi Arabika Banyuanyar premium',
      entityType: 'umkm_product',
      entityId: product1.id,
    }
  });

  // Produk Kopi 2: Kopi Robusta Banyuanyar
  const product2 = await prisma.umkmProduct.create({
    data: {
      name: "Kopi Robusta Banyuanyar",
      description: "Kopi robusta dengan cita rasa yang kuat dan cocok untuk espresso",
      price: 65000,
      unit: "kg",
      umkmId: kopiUmkm?.id || 1
    }
  });

  await prisma.media.create({
    data: {
      fileName: 'kopi-robusta-banyuanyar.jpg',
      fileSize: 1350000,
      fileUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      description: 'Kopi Robusta Banyuanyar dalam kemasan',
      entityType: 'umkm_product',
      entityId: product2.id,
    }
  });

  // Produk Kopi 3: Kopi Luwak Banyuanyar
  const product3 = await prisma.umkmProduct.create({
    data: {
      name: "Kopi Luwak Banyuanyar",
      description: "Kopi luwak premium dengan proses alami yang unik",
      price: 250000,
      unit: "kg",
      umkmId: kopiUmkm?.id || 1
    }
  });

  await prisma.media.create({
    data: {
      fileName: 'kopi-luwak-banyuanyar.jpg',
      fileSize: 1600000,
      fileUrl: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      description: 'Kemasan premium Kopi Luwak Banyuanyar',
      entityType: 'umkm_product',
      entityId: product3.id,
    }
  });

  // Produk Kopi 4: Kopi Bubuk Sachet
  const product4 = await prisma.umkmProduct.create({
    data: {
      name: "Kopi Bubuk Sachet",
      description: "Kopi bubuk praktis dalam kemasan sachet untuk konsumsi harian",
      price: 5000,
      unit: "sachet",
      umkmId: kopiUmkm?.id || 1
    }
  });

  // Produk Susu 1: Susu Segar Murni
  const product5 = await prisma.umkmProduct.create({
    data: {
      name: "Susu Segar Murni",
      description: "Susu segar murni langsung dari sapi perah lokal",
      price: 15000,
      unit: "liter",
      umkmId: susuUmkm?.id || 2
    }
  });

  await prisma.media.create({
    data: {
      fileName: 'susu-segar-murni.jpg',
      fileSize: 1150000,
      fileUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      description: 'Botol susu segar murni Banyuanyar',
      entityType: 'umkm_product',
      entityId: product5.id,
    }
  });

  // Produk Susu 2: Yogurt Plain
  const product6 = await prisma.umkmProduct.create({
    data: {
      name: "Yogurt Plain",
      description: "Yogurt alami tanpa gula dengan tekstur yang lembut",
      price: 12000,
      unit: "cup",
      umkmId: susuUmkm?.id || 2
    }
  });

  await prisma.media.create({
    data: {
      fileName: 'yogurt-plain-banyuanyar.jpg',
      fileSize: 980000,
      fileUrl: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      description: 'Cup yogurt plain Banyuanyar',
      entityType: 'umkm_product',
      entityId: product6.id,
    }
  });

  // Produk Susu 3: Keju Cottage
  const product7 = await prisma.umkmProduct.create({
    data: {
      name: "Keju Cottage",
      description: "Keju cottage segar dengan protein tinggi",
      price: 25000,
      unit: "pack",
      umkmId: susuUmkm?.id || 2
    }
  });

  // Produk Kerajinan 1: Tas Bambu Anyaman
  const product8 = await prisma.umkmProduct.create({
    data: {
      name: "Tas Bambu Anyaman",
      description: "Tas anyaman bambu dengan desain tradisional yang elegan",
      price: 85000,
      unit: "pcs",
      umkmId: kerajinanUmkm?.id || 3
    }
  });

  await prisma.media.create({
    data: {
      fileName: 'tas-bambu-anyaman.jpg',
      fileSize: 1420000,
      fileUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      description: 'Tas anyaman bambu tradisional Banyuanyar',
      entityType: 'umkm_product',
      entityId: product8.id,
    }
  });

  // Produk Kerajinan 2: Vas Bunga Bambu
  const product9 = await prisma.umkmProduct.create({
    data: {
      name: "Vas Bunga Bambu",
      description: "Vas bunga dari bambu dengan ukiran motif tradisional",
      price: 95000,
      unit: "pcs",
      umkmId: kerajinanUmkm?.id || 3
    }
  });

  await prisma.media.create({
    data: {
      fileName: 'vas-bunga-bambu.jpg',
      fileSize: 1250000,
      fileUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      description: 'Vas bunga bambu dengan ukiran motif tradisional',
      entityType: 'umkm_product',
      entityId: product9.id,
    }
  });

  // Produk Kerajinan 3: Lampu Hias Bambu
  const product10 = await prisma.umkmProduct.create({
    data: {
      name: "Lampu Hias Bambu",
      description: "Lampu hias dari bambu dengan pencahayaan yang hangat",
      price: 120000,
      unit: "pcs",
      umkmId: kerajinanUmkm?.id || 3
    }
  });

  await prisma.media.create({
    data: {
      fileName: 'lampu-hias-bambu.jpg',
      fileSize: 1380000,
      fileUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
      mimeType: 'image/jpeg',
      description: 'Lampu hias bambu dengan pencahayaan hangat',
      entityType: 'umkm_product',
      entityId: product10.id,
    }
  });

  // Produk Kerajinan 4: Tempat Pensil Bambu
  const product11 = await prisma.umkmProduct.create({
    data: {
      name: "Tempat Pensil Bambu",
      description: "Tempat pensil dari bambu dengan ukiran motif Jawa",
      price: 35000,
      unit: "pcs",
      umkmId: kerajinanUmkm?.id || 3
    }
  });

  console.log(`✅ UMKM products seeded: 11 records with their media`);
  return { 
    product1, product2, product3, product4, product5, 
    product6, product7, product8, product9, product10, product11 
  };
} 