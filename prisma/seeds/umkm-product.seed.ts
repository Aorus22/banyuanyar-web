import { PrismaClient } from '../db';

export async function seedUmkmProduct(prisma: PrismaClient) {
  console.log('🌱 Seeding UMKM products...');

  // Get UMKM IDs
  const kopiUmkm = await prisma.umkm.findFirst({ where: { name: "Kopi Banyuanyar" } });
  const susuUmkm = await prisma.umkm.findFirst({ where: { name: "Susu Segar Banyuanyar" } });
  const kerajinanUmkm = await prisma.umkm.findFirst({ where: { name: "Kerajinan Bambu Banyuanyar" } });

  const umkmProductData = [
    // Produk Kopi Banyuanyar
    {
      name: "Kopi Arabika Banyuanyar",
      description: "Kopi arabika premium dengan rasa yang khas dan aroma yang kuat",
      price: 75000,
      unit: "kg",
      umkmId: kopiUmkm?.id || 1
    },
    {
      name: "Kopi Robusta Banyuanyar",
      description: "Kopi robusta dengan cita rasa yang kuat dan cocok untuk espresso",
      price: 65000,
      unit: "kg",
      umkmId: kopiUmkm?.id || 1
    },
    {
      name: "Kopi Luwak Banyuanyar",
      description: "Kopi luwak premium dengan proses alami yang unik",
      price: 250000,
      unit: "kg",
      umkmId: kopiUmkm?.id || 1
    },
    {
      name: "Kopi Bubuk Sachet",
      description: "Kopi bubuk praktis dalam kemasan sachet untuk konsumsi harian",
      price: 5000,
      unit: "sachet",
      umkmId: kopiUmkm?.id || 1
    },

    // Produk Susu Segar Banyuanyar
    {
      name: "Susu Segar Murni",
      description: "Susu segar murni langsung dari sapi perah lokal",
      price: 15000,
      unit: "liter",
      umkmId: susuUmkm?.id || 2
    },
    {
      name: "Yogurt Plain",
      description: "Yogurt alami tanpa gula dengan tekstur yang lembut",
      price: 12000,
      unit: "cup",
      umkmId: susuUmkm?.id || 2
    },
    {
      name: "Keju Cottage",
      description: "Keju cottage segar dengan protein tinggi",
      price: 25000,
      unit: "pack",
      umkmId: susuUmkm?.id || 2
    },

    // Produk Kerajinan Bambu
    {
      name: "Tas Bambu Anyaman",
      description: "Tas anyaman bambu dengan desain tradisional yang elegan",
      price: 85000,
      unit: "pcs",
      umkmId: kerajinanUmkm?.id || 3
    },
    {
      name: "Vas Bunga Bambu",
      description: "Vas bunga dari bambu dengan ukiran motif tradisional",
      price: 95000,
      unit: "pcs",
      umkmId: kerajinanUmkm?.id || 3
    },
    {
      name: "Lampu Hias Bambu",
      description: "Lampu hias dari bambu dengan pencahayaan yang hangat",
      price: 120000,
      unit: "pcs",
      umkmId: kerajinanUmkm?.id || 3
    },
    {
      name: "Tempat Pensil Bambu",
      description: "Tempat pensil dari bambu dengan ukiran motif Jawa",
      price: 35000,
      unit: "pcs",
      umkmId: kerajinanUmkm?.id || 3
    }
  ];

  const result = await prisma.umkmProduct.createMany({
    data: umkmProductData,
    skipDuplicates: true
  });

  console.log(`✅ UMKM products seeded: ${result.count} records`);
  return result;
} 