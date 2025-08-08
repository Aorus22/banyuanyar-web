import { PrismaClient } from '../db';

export async function seedUmkm(prisma: PrismaClient) {
  console.log('🌱 Seeding UMKM...');

  const umkmData = [
    {
      name: "Kopi Banyuanyar",
      ownerName: "Pak Ahmad",
      description: "Produksi kopi berkualitas tinggi dari perkebunan lokal",
      productType: "Minuman",
      address: "Dusun I, Desa Banyuanyar",
      phone: "081234567895",
      email: "kopi@banyuanyar.com",
      socialMedia: {
        instagram: "kopi_banyuanyar",
        facebook: "KopiBanyuanyar"
      },
      latitude: -7.123456,
      longitude: 110.654321
    },
    {
      name: "Susu Segar Banyuanyar",
      ownerName: "Bu Sari",
      description: "Susu segar dari sapi perah lokal",
      productType: "Minuman",
      address: "Dusun II, Desa Banyuanyar",
      phone: "081234567896",
      socialMedia: {
        instagram: "susu_banyuanyar"
      },
      latitude: -7.123789,
      longitude: 110.654789
    },
    {
      name: "Kerajinan Bambu Banyuanyar",
      ownerName: "Pak Joko",
      description: "Kerajinan tangan dari bambu berkualitas tinggi",
      productType: "Kerajinan",
      address: "Dusun III, Desa Banyuanyar",
      phone: "081234567897",
      email: "kerajinan@banyuanyar.com",
      socialMedia: {
        instagram: "kerajinan_bambu_banyuanyar"
      },
      latitude: -7.124123,
      longitude: 110.655123
    }
  ];

  const result = await prisma.umkm.createMany({
    data: umkmData,
    skipDuplicates: true
  });

  console.log(`✅ UMKM seeded: ${result.count} records`);
  return result;
} 