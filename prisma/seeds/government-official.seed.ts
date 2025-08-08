import { PrismaClient } from '../db';

export async function seedGovernmentOfficial(prisma: PrismaClient) {
  console.log('🌱 Seeding government officials...');

  const governmentOfficialData = [
    {
      name: "Komarudin, ST",
      position: "Kepala Desa",
      photoUrl: "/images/officials/komarudin.jpg",
      bio: "Kepala Desa yang visioner dalam mengembangkan Green Smart Village",
      socialMedia: {
        facebook: "komarudin.st",
        twitter: "@komarudin_st",
        instagram: "komarudin.st",
        tiktok: "@komarudin.st"
      },
      sortOrder: 1
    },
    {
      name: "Alif Komarudin, ST",
      position: "Kasi Kesra & Pelayanan",
      photoUrl: "/images/officials/alif.jpg",
      bio: "Bertanggung jawab atas kesejahteraan sosial dan pelayanan masyarakat",
      socialMedia: {
        facebook: "alif.komarudin",
        twitter: "@alif_komarudin"
      },
      sortOrder: 2
    },
    {
      name: "Sriyono, A.Md",
      position: "Sekretaris Desa",
      photoUrl: "/images/officials/sriyono.jpg",
      bio: "Sekretaris desa yang handal dalam administrasi dan koordinasi",
      socialMedia: {
        facebook: "sriyono.amd",
        twitter: "@sriyono_amd"
      },
      sortOrder: 3
    },
    {
      name: "Bella Sita K, S.Pd",
      position: "Kaur Keuangan",
      photoUrl: "/images/officials/bella.jpg",
      bio: "Bertanggung jawab atas pengelolaan keuangan desa",
      socialMedia: {
        instagram: "bella.sita"
      },
      sortOrder: 4
    },
    {
      name: "Srigiyatmi, S.Pd",
      position: "Kasi Pemerintahan",
      photoUrl: "/images/officials/srigiyatmi.jpg",
      bio: "Bertanggung jawab atas urusan pemerintahan desa",
      socialMedia: {
        facebook: "srigiyatmi.spd"
      },
      sortOrder: 5
    },
    {
      name: "Fathurrohman, S.Pd",
      position: "Kaur Umum & Perencanaan",
      photoUrl: "/images/officials/fathurrohman.jpg",
      bio: "Bertanggung jawab atas urusan umum dan perencanaan desa",
      socialMedia: {
        instagram: "fathurrohman.spd"
      },
      sortOrder: 6
    },
    {
      name: "Waluyo, S.Pd",
      position: "Kepala Dusun I",
      photoUrl: "/images/officials/waluyo.jpg",
      bio: "Kepala Dusun I yang bertanggung jawab atas wilayah dusun pertama",
      socialMedia: {
        facebook: "waluyo.spd"
      },
      sortOrder: 7
    },
    {
      name: "Suyamto, SH",
      position: "Kepala Dusun II",
      photoUrl: "/images/officials/suyamto.jpg",
      bio: "Kepala Dusun II yang bertanggung jawab atas wilayah dusun kedua",
      socialMedia: {
        instagram: "suyamto.sh"
      },
      sortOrder: 8
    },
    {
      name: "Joko Triyono, S.Pd",
      position: "Kepala Dusun III",
      photoUrl: "/images/officials/joko-triyono.jpg",
      bio: "Kepala Dusun III yang bertanggung jawab atas wilayah dusun ketiga",
      socialMedia: {
        facebook: "joko.triyono.spd"
      },
      sortOrder: 9
    }
  ];

  const result = await prisma.governmentOfficial.createMany({
    data: governmentOfficialData,
    skipDuplicates: true
  });

  console.log(`✅ Government officials seeded: ${result.count} records`);
  return result;
} 