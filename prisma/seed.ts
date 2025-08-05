const { PrismaClient } = require('./db');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

function hashed(password: string) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

async function main() {
  // Clean up existing data
  await prisma.visitorStatistic.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.villagePotential.deleteMany();
  await prisma.umkmProduct.deleteMany();
  await prisma.umkm.deleteMany();
  await prisma.tourismHouse.deleteMany();
  await prisma.tourismPackage.deleteMany();
  await prisma.tourismCategory.deleteMany();
  await prisma.document.deleteMany();
  await prisma.media.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.event.deleteMany();
  await prisma.news.deleteMany();
  await prisma.newsCategory.deleteMany();
  await prisma.organizationalStructure.deleteMany();
  await prisma.governmentOfficial.deleteMany();
  await prisma.villageProfile.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = await prisma.user.createMany({
    data: [
      {
        email: "admin@desabanyuanyar.com",
        username: "admin",
        password: hashed("admin123"),
        name: "Administrator",
        phone: "081234567890",
        role: "ADMIN"
      },
      {
        email: "staff@desabanyuanyar.com",
        username: "staff",
        password: hashed("staff123"),
        name: "Staff Desa",
        phone: "081234567891",
        role: "USER"
      }
    ],
  });

  console.log("Users added:", users);

  // Create village profile
  const villageProfile = await prisma.villageProfile.createMany({
    data: [
      {
        key: "village_name",
        value: "Desa Banyuanyar",
        name: "Nama resmi desa"
      },
      {
        key: "tagline",
        value: "Green Smart Village",
        name: "Tagline atau slogan desa"
      },
      {
        key: "description",
        value: "Desa Banyuanyar Mewujudkan Sebagai Kawasan Desa Hijau dan Pintar (Green Smart Village) Menuju Desa Mandiri, Religius, Berbudaya Sesuai Dengan Nilai-Nilai Pancasila",
        name: "Deskripsi umum desa"
      },
      {
        key: "vision",
        value: "Mewujudkan Desa Banyuanyar sebagai Green Smart Village yang mandiri, religius, dan berbudaya",
        name: "Visi desa"
      },
      {
        key: "mission",
        value: "Mengembangkan potensi desa berbasis teknologi dan lingkungan yang berkelanjutan",
        name: "Misi desa"
      },
      {
        key: "objectives",
        value: "Meningkatkan kesejahteraan masyarakat melalui pengembangan wisata dan UMKM",
        name: "Tujuan pengembangan desa"
      },
      {
        key: "geographic_demographics",
        value: "Desa Banyuanyar terletak di Kecamatan Ampel, Kabupaten Boyolali dengan luas wilayah 500 hektar",
        name: "Informasi geografis dan demografis desa"
      },
      {
        key: "history",
        value: "Desa Banyuanyar memiliki sejarah panjang sebagai desa pertanian yang kemudian berkembang menjadi desa wisata",
        name: "Sejarah desa"
      },
      {
        key: "address",
        value: "Desa Banyuanyar, Kecamatan Ampel, Kabupaten Boyolali, Jawa Tengah",
        name: "Alamat lengkap desa"
      },
      {
        key: "phone",
        value: "0271-123456",
        name: "Nomor telepon kantor desa"
      },
      {
        key: "email",
        value: "info@desabanyuanyar.com",
        name: "Email kontak desa"
      },
      {
        key: "website",
        value: "https://desabanyuanyar.com",
        name: "Website resmi desa"
      },
      {
        key: "logo_url",
        value: "/images/logo-desa-banyuanyar.png",
        name: "URL logo desa"
      },
      {
        key: "banner_url",
        value: "/images/banner-desa-banyuanyar.jpg",
        name: "URL banner desa"
      }
    ]
  });

  console.log("Village profile created:", villageProfile);

  // Create government officials
  const governmentOfficials = await prisma.governmentOfficial.createMany({
    data: [
      {
        name: "Komarudin, ST",
        position: "Kepala Desa Banyuanyar",
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
      }
    ]
  });

  console.log("Government officials added:", governmentOfficials);

  // Create news categories
  const newsCategories = await prisma.newsCategory.createMany({
    data: [
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
      }
    ]
  });

  console.log("News categories added:", newsCategories);

  // Get admin user for news author
  const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  const beritaCategory = await prisma.newsCategory.findFirst({ where: { slug: "berita-desa" } });

  // Create sample news
  const news = await prisma.news.createMany({
    data: [
      {
        title: "PENERAPAN BIOPORI DESA BANYUANYAR UNTUK MENDUKUNG AKSI SDGS",
        slug: "penerapan-biopori-desa-banyuanyar-untuk-mendukung-aksi-sdgs",
        content: "Desa Banyuanyar berhasil menerapkan sistem biopori untuk mendukung aksi SDGS dalam rangka pelestarian lingkungan...",
        excerpt: "Inovasi biopori untuk pelestarian lingkungan dan peningkatan kualitas air tanah",
        featuredImage: "/images/news/biopori.jpg",
        authorId: adminUser?.id,
        categoryId: beritaCategory?.id,
        status: "PUBLISHED",
        publishedAt: new Date("2025-03-05"),
        viewCount: 150
      },
      {
        title: "MNC Peduli di Desa Banyuanyar",
        slug: "mnc-peduli-di-desa-banyuanyar",
        content: "Program MNC Peduli memberikan bantuan dan dukungan untuk pengembangan Desa Banyuanyar...",
        excerpt: "Kolaborasi dengan MNC Peduli untuk pengembangan desa",
        featuredImage: "/images/news/mnc-peduli.jpg",
        authorId: adminUser?.id,
        categoryId: beritaCategory?.id,
        status: "PUBLISHED",
        publishedAt: new Date("2024-11-05"),
        viewCount: 89
      }
    ]
  });

  console.log("News added:", news);

  // Create events
  const events = await prisma.event.createMany({
    data: [
      {
        title: "Profil Bumdesa Kampus Kopi Banyuanyar",
        description: "Presentasi profil Bumdesa Kampus Kopi Banyuanyar",
        startDate: new Date("2024-11-22"),
        endDate: new Date("2024-11-22"),
        startTime: "09:00",
        endTime: "12:00",
        location: "Balai Desa Banyuanyar",
        organizer: "Bumdesa Kampus Kopi",
        status: "COMPLETED"
      },
      {
        title: "Profil Desa Wisata Kampus Kopi Banyuanyar",
        description: "Presentasi profil Desa Wisata Kampus Kopi Banyuanyar",
        startDate: new Date("2024-11-11"),
        endDate: new Date("2024-11-11"),
        startTime: "14:00",
        endTime: "17:00",
        location: "Kampus Kopi Banyuanyar",
        organizer: "Tim Desa Wisata",
        status: "COMPLETED"
      }
    ]
  });

  console.log("Events added:", events);

  // Create tourism categories
  const tourismCategories = await prisma.tourismCategory.createMany({
    data: [
      { name: "Paket Pelajar" },
      { name: "Paket Outbound" },
      { name: "Paket Jeep Tour" },
      { name: "Paket Studi Banding" },
      { name: "Paket Camping" },
      { name: "Paket Homestay" }
    ]
  });

  console.log("Tourism categories added:", tourismCategories);

  // Get category IDs
  const pelajarCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Pelajar" } });
  const outboundCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Outbound" } });
  const jeepCategory = await prisma.tourismCategory.findFirst({ where: { name: "Paket Jeep Tour" } });

  // Create tourism packages
  const tourismPackages = await prisma.tourismPackage.createMany({
    data: [
      {
        name: "Paket Pelajar",
        description: "Paket wisata edukasi untuk pelajar dengan harga terjangkau",
        price: 50000,
        duration: "4 jam",
        maxParticipants: 50,
        categoryId: pelajarCategory?.id || 1
      },
      {
        name: "Paket Outbound",
        description: "Paket outbound untuk team building dan refreshing",
        price: 150000,
        duration: "8 jam",
        maxParticipants: 30,
        categoryId: outboundCategory?.id || 2
      },
      {
        name: "Paket Jeep Tour",
        description: "Petualangan dengan jeep mengelilingi desa dan perkebunan",
        price: 200000,
        duration: "6 jam",
        maxParticipants: 8,
        categoryId: jeepCategory?.id || 3
      }
    ]
  });

  console.log("Tourism packages added:", tourismPackages);

  // Get tourism packages for media
  const tourismPackageList = await prisma.tourismPackage.findMany();

  // Add media for tourism packages
  await prisma.media.createMany({
    data: [
      {
        fileName: "paket-pelajar.jpg",
        originalName: "paket-pelajar-wisata.jpg",
        filePath: "https://abh.ai/place/600/400/3B82F6/FFFFFF?text=Paket+Pelajar",
        fileSize: 800000,
        mimeType: "image/jpeg",
        altText: "Paket Pelajar",
        caption: "Paket wisata edukasi untuk pelajar",
        sortOrder: 1,
        entityType: "tourism_package",
        entityId: tourismPackageList[0]?.id || 1
      },
      {
        fileName: "paket-outbound.jpg",
        originalName: "paket-outbound-wisata.jpg",
        filePath: "https://abh.ai/place/600/400/10B981/FFFFFF?text=Paket+Outbound",
        fileSize: 850000,
        mimeType: "image/jpeg",
        altText: "Paket Outbound",
        caption: "Paket outbound untuk team building",
        sortOrder: 1,
        entityType: "tourism_package",
        entityId: tourismPackageList[1]?.id || 2
      },
      {
        fileName: "paket-jeep.jpg",
        originalName: "paket-jeep-tour.jpg",
        filePath: "https://abh.ai/place/600/400/F59E0B/FFFFFF?text=Paket+Jeep+Tour",
        fileSize: 900000,
        mimeType: "image/jpeg",
        altText: "Paket Jeep Tour",
        caption: "Petualangan dengan jeep mengelilingi desa",
        sortOrder: 1,
        entityType: "tourism_package",
        entityId: tourismPackageList[2]?.id || 3
      }
    ]
  });

  // Create tourism houses
  const tourismHouses = await prisma.tourismHouse.createMany({
    data: [
      {
        name: "Omah Tambeng Tawon dan Lanceng",
        description: "Rumah wisata dengan tema perlebahan dan peternakan",
        category: "Edukasi",
        location: "Dusun I, Desa Banyuanyar",
        contactPerson: "Pak Sardi",
        contactPhone: "081234567892"
      },
      {
        name: "Omah E-Craft",
        description: "Rumah wisata kerajinan tangan dan seni tradisional",
        category: "Kerajinan",
        location: "Dusun II, Desa Banyuanyar",
        contactPerson: "Bu Siti",
        contactPhone: "081234567893"
      },
      {
        name: "Omah Toga",
        description: "Rumah wisata tanaman obat keluarga dan herbal",
        category: "Kesehatan",
        location: "Dusun III, Desa Banyuanyar",
        contactPerson: "Pak Joko",
        contactPhone: "081234567894"
      }
    ]
  });

  console.log("Tourism houses added:", tourismHouses);

  // Create galleries with folders
  const gallery1 = await prisma.gallery.create({
    data: {
      title: "Foto Kegiatan 17 Agustus 2024",
      description: "Dokumentasi perayaan Hari Kemerdekaan RI ke-79 di Desa Banyuanyar",
      coverImage: "/images/galleries/17-agustus/cover.jpg",
      eventDate: new Date("2024-08-17"),
    }
  });

  const gallery2 = await prisma.gallery.create({
    data: {
      title: "Kunjungan MNC Peduli",
      description: "Dokumentasi kunjungan dan program MNC Peduli di Desa Banyuanyar",
      coverImage: "/images/galleries/mnc-peduli/cover.jpg",
      eventDate: new Date("2024-11-05"),
    }
  });

  const gallery3 = await prisma.gallery.create({
    data: {
      title: "Wisata Kampus Kopi",
      description: "Galeri foto destinasi wisata Kampus Kopi Banyuanyar",
      coverImage: "/images/galleries/kampus-kopi/cover.jpg",
      eventDate: new Date("2024-11-05"),
    }
  });

  // Add media for galleries
  await prisma.media.createMany({
    data: [
      // Gallery 1: 17 Agustus
      {
        fileName: "upacara-1.jpg",
        originalName: "upacara-bendera.jpg",
        filePath: "https://abh.ai/place/800/600/3B82F6/FFFFFF?text=Upacara+Bendera",
        fileSize: 1024000,
        mimeType: "image/jpeg",
        altText: "Upacara bendera 17 Agustus",
        caption: "Upacara pengibaran bendera merah putih",
        sortOrder: 1,
        entityType: "gallery",
        entityId: gallery1.id
      },
      {
        fileName: "lomba-kerupuk.jpg",
        originalName: "lomba-makan-kerupuk.jpg",
        filePath: "https://abh.ai/place/800/600/EF4444/FFFFFF?text=Lomba+Kerupuk",
        fileSize: 850000,
        mimeType: "image/jpeg",
        altText: "Lomba makan kerupuk",
        caption: "Kegiatan lomba tradisional makan kerupuk",
        sortOrder: 2,
        entityType: "gallery",
        entityId: gallery1.id
      },
      {
        fileName: "balap-karung.jpg",
        originalName: "lomba-balap-karung.jpg",
        filePath: "https://abh.ai/place/800/600/10B981/FFFFFF?text=Balap+Karung",
        fileSize: 950000,
        mimeType: "image/jpeg",
        altText: "Lomba balap karung",
        caption: "Kegiatan lomba balap karung antar warga",
        sortOrder: 3,
        entityType: "gallery",
        entityId: gallery1.id
      },
      {
        fileName: "penyerahan-hadiah.jpg",
        originalName: "penyerahan-hadiah-lomba.jpg",
        filePath: "https://abh.ai/place/800/600/F59E0B/FFFFFF?text=Penyerahan+Hadiah",
        fileSize: 900000,
        mimeType: "image/jpeg",
        altText: "Penyerahan hadiah lomba",
        caption: "Penyerahan hadiah kepada pemenang lomba",
        sortOrder: 4,
        entityType: "gallery",
        entityId: gallery1.id
      },
      
      // Gallery 2: MNC Peduli
      {
        fileName: "sambutan-kades.jpg",
        originalName: "sambutan-kepala-desa.jpg",
        filePath: "https://abh.ai/place/800/600/6366F1/FFFFFF?text=Sambutan+Kades",
        fileSize: 1200000,
        mimeType: "image/jpeg",
        altText: "Sambutan kepala desa",
        caption: "Sambutan dari Kepala Desa Komarudin, ST",
        sortOrder: 1,
        entityType: "gallery",
        entityId: gallery2.id
      },
      {
        fileName: "mou.jpg",
        originalName: "penandatanganan-mou.jpg",
        filePath: "https://abh.ai/place/800/600/8B5CF6/FFFFFF?text=Penandatanganan+MoU",
        fileSize: 1100000,
        mimeType: "image/jpeg",
        altText: "Penandatanganan MoU",
        caption: "Penandatanganan Memorandum of Understanding",
        sortOrder: 2,
        entityType: "gallery",
        entityId: gallery2.id
      },
      {
        fileName: "penyerahan-bantuan.jpg",
        originalName: "penyerahan-bantuan-mnc.jpg",
        filePath: "https://abh.ai/place/800/600/059669/FFFFFF?text=Penyerahan+Bantuan",
        fileSize: 1000000,
        mimeType: "image/jpeg",
        altText: "Penyerahan bantuan",
        caption: "Penyerahan bantuan dari MNC Peduli",
        sortOrder: 3,
        entityType: "gallery",
        entityId: gallery2.id
      },
      {
        fileName: "foto-bersama.jpg",
        originalName: "foto-bersama-mnc.jpg",
        filePath: "https://abh.ai/place/800/600/DC2626/FFFFFF?text=Foto+Bersama",
        fileSize: 950000,
        mimeType: "image/jpeg",
        altText: "Foto bersama",
        caption: "Foto bersama tim MNC Peduli dan perangkat desa",
        sortOrder: 4,
        entityType: "gallery",
        entityId: gallery2.id
      },
      
      // Gallery 3: Kampus Kopi
      {
        fileName: "gerbang.jpg",
        originalName: "gerbang-kampus-kopi.jpg",
        filePath: "https://abh.ai/place/800/600/7C3AED/FFFFFF?text=Gerbang+Kampus+Kopi",
        fileSize: 980000,
        mimeType: "image/jpeg",
        altText: "Gerbang Kampus Kopi",
        caption: "Gerbang masuk destinasi wisata Kampus Kopi",
        sortOrder: 1,
        entityType: "gallery",
        entityId: gallery3.id
      },
      {
        fileName: "perkebunan.jpg",
        originalName: "perkebunan-kopi.jpg",
        filePath: "https://abh.ai/place/800/600/16A34A/FFFFFF?text=Perkebunan+Kopi",
        fileSize: 1150000,
        mimeType: "image/jpeg",
        altText: "Perkebunan kopi",
        caption: "Pemandangan perkebunan kopi yang hijau",
        sortOrder: 2,
        entityType: "gallery",
        entityId: gallery3.id
      },
      {
        fileName: "roasting.jpg",
        originalName: "proses-roasting.jpg",
        filePath: "https://abh.ai/place/800/600/92400E/FFFFFF?text=Proses+Roasting",
        fileSize: 1050000,
        mimeType: "image/jpeg",
        altText: "Proses roasting kopi",
        caption: "Proses roasting biji kopi",
        sortOrder: 3,
        entityType: "gallery",
        entityId: gallery3.id
      },
      {
        fileName: "cafe.jpg",
        originalName: "cafe-kampus-kopi.jpg",
        filePath: "https://abh.ai/place/800/600/1F2937/FFFFFF?text=Cafe+Kampus+Kopi",
        fileSize: 980000,
        mimeType: "image/jpeg",
        altText: "Cafe Kampus Kopi",
        caption: "Area cafe untuk menikmati kopi",
        sortOrder: 4,
        entityType: "gallery",
        entityId: gallery3.id
      },
      {
        fileName: "wisatawan.jpg",
        originalName: "wisatawan-kampus-kopi.jpg",
        filePath: "https://abh.ai/place/800/600/0891B2/FFFFFF?text=Wisatawan",
        fileSize: 920000,
        mimeType: "image/jpeg",
        altText: "Wisatawan Kampus Kopi",
        caption: "Wisatawan yang sedang berkunjung",
        sortOrder: 5,
        entityType: "gallery",
        entityId: gallery3.id
      }
    ]
  });

  console.log("Galleries and media added");

  // Create UMKM
  const umkm1 = await prisma.umkm.create({
    data: {
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
    }
  });

  const umkm2 = await prisma.umkm.create({
    data: {
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
    }
  });

  const umkm3 = await prisma.umkm.create({
    data: {
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
  });

  console.log("UMKM added:", { umkm1, umkm2, umkm3 });

  // Create UMKM Products
  await prisma.umkmProduct.createMany({
    data: [
      // Produk Kopi Banyuanyar
      {
        name: "Kopi Arabika Banyuanyar",
        description: "Kopi arabika premium dengan rasa yang khas dan aroma yang kuat",
        price: 75000,
        unit: "kg",
        umkmId: umkm1.id
      },
      {
        name: "Kopi Robusta Banyuanyar",
        description: "Kopi robusta dengan cita rasa yang kuat dan cocok untuk espresso",
        price: 65000,
        unit: "kg",
        umkmId: umkm1.id
      },
      {
        name: "Kopi Luwak Banyuanyar",
        description: "Kopi luwak premium dengan proses alami yang unik",
        price: 250000,
        unit: "kg",
        umkmId: umkm1.id
      },
      {
        name: "Kopi Bubuk Sachet",
        description: "Kopi bubuk praktis dalam kemasan sachet untuk konsumsi harian",
        price: 5000,
        unit: "sachet",
        umkmId: umkm1.id
      },

      // Produk Susu Segar Banyuanyar
      {
        name: "Susu Segar Murni",
        description: "Susu segar murni langsung dari sapi perah lokal",
        price: 15000,
        unit: "liter",
        umkmId: umkm2.id
      },
      {
        name: "Yogurt Plain",
        description: "Yogurt alami tanpa gula dengan tekstur yang lembut",
        price: 12000,
        unit: "cup",
        umkmId: umkm2.id
      },
      {
        name: "Keju Cottage",
        description: "Keju cottage segar dengan protein tinggi",
        price: 25000,
        unit: "pack",
        umkmId: umkm2.id
      },

      // Produk Kerajinan Bambu
      {
        name: "Tas Bambu Anyaman",
        description: "Tas anyaman bambu dengan desain tradisional yang elegan",
        price: 85000,
        unit: "pcs",
        umkmId: umkm3.id
      },
      {
        name: "Vas Bunga Bambu",
        description: "Vas bunga dari bambu dengan ukiran motif tradisional",
        price: 95000,
        unit: "pcs",
        umkmId: umkm3.id
      },
      {
        name: "Lampu Hias Bambu",
        description: "Lampu hias dari bambu dengan pencahayaan yang hangat",
        price: 120000,
        unit: "pcs",
        umkmId: umkm3.id
      },
      {
        name: "Tempat Pensil Bambu",
        description: "Tempat pensil dari bambu dengan ukiran motif Jawa",
        price: 35000,
        unit: "pcs",
        umkmId: umkm3.id
      }
    ]
  });

  console.log("UMKM Products added");

  // Add media for UMKM
  await prisma.media.createMany({
    data: [
      // Media untuk UMKM Kopi Banyuanyar
      {
        fileName: "kopi-banyuanyar.jpg",
        originalName: "kopi-banyuanyar-umkm.jpg",
        filePath: "https://abh.ai/place/600/400/92400E/FFFFFF?text=Kopi+Banyuanyar",
        fileSize: 800000,
        mimeType: "image/jpeg",
        altText: "UMKM Kopi Banyuanyar",
        caption: "Produksi kopi berkualitas tinggi dari perkebunan lokal",
        sortOrder: 1,
        entityType: "umkm",
        entityId: umkm1.id
      },
      
      // Media untuk UMKM Susu Segar
      {
        fileName: "susu-banyuanyar.jpg",
        originalName: "susu-segar-banyuanyar-umkm.jpg",
        filePath: "https://abh.ai/place/600/400/0891B2/FFFFFF?text=Susu+Segar+Banyuanyar",
        fileSize: 750000,
        mimeType: "image/jpeg",
        altText: "UMKM Susu Segar Banyuanyar",
        caption: "Susu segar dari sapi perah lokal",
        sortOrder: 1,
        entityType: "umkm",
        entityId: umkm2.id
      },
      
      // Media untuk UMKM Kerajinan Bambu
      {
        fileName: "kerajinan-bambu.jpg",
        originalName: "kerajinan-bambu-banyuanyar-umkm.jpg",
        filePath: "https://abh.ai/place/600/400/16A34A/FFFFFF?text=Kerajinan+Bambu+Banyuanyar",
        fileSize: 900000,
        mimeType: "image/jpeg",
        altText: "UMKM Kerajinan Bambu Banyuanyar",
        caption: "Kerajinan tangan dari bambu berkualitas tinggi",
        sortOrder: 1,
        entityType: "umkm",
        entityId: umkm3.id
      }
    ]
  });

  // Get UMKM products for media
  const kopiProducts = await prisma.umkmProduct.findMany({
    where: { umkmId: umkm1.id }
  });

  const susuProducts = await prisma.umkmProduct.findMany({
    where: { umkmId: umkm2.id }
  });

  const kerajinanProducts = await prisma.umkmProduct.findMany({
    where: { umkmId: umkm3.id }
  });

  // Add media for UMKM products
  await prisma.media.createMany({
    data: [
      // Media untuk produk Kopi
      {
        fileName: "kopi-arabika.jpg",
        originalName: "kopi-arabika-banyuanyar.jpg",
        filePath: "https://abh.ai/place/400/300/92400E/FFFFFF?text=Kopi+Arabika",
        fileSize: 600000,
        mimeType: "image/jpeg",
        altText: "Kopi Arabika Banyuanyar",
        caption: "Kopi arabika premium dengan rasa yang khas",
        sortOrder: 1,
        entityType: "umkm_product",
        entityId: kopiProducts[0]?.id || 1
      },
      {
        fileName: "kopi-robusta.jpg",
        originalName: "kopi-robusta-banyuanyar.jpg",
        filePath: "https://abh.ai/place/400/300/7C2D12/FFFFFF?text=Kopi+Robusta",
        fileSize: 550000,
        mimeType: "image/jpeg",
        altText: "Kopi Robusta Banyuanyar",
        caption: "Kopi robusta dengan cita rasa yang kuat",
        sortOrder: 1,
        entityType: "umkm_product",
        entityId: kopiProducts[1]?.id || 2
      },
      {
        fileName: "kopi-luwak.jpg",
        originalName: "kopi-luwak-banyuanyar.jpg",
        filePath: "https://abh.ai/place/400/300/451A03/FFFFFF?text=Kopi+Luwak",
        fileSize: 700000,
        mimeType: "image/jpeg",
        altText: "Kopi Luwak Banyuanyar",
        caption: "Kopi luwak premium dengan proses alami",
        sortOrder: 1,
        entityType: "umkm_product",
        entityId: kopiProducts[2]?.id || 3
      },
      
      // Media untuk produk Susu
      {
        fileName: "susu-segar.jpg",
        originalName: "susu-segar-murni.jpg",
        filePath: "https://abh.ai/place/400/300/0891B2/FFFFFF?text=Susu+Segar+Murni",
        fileSize: 500000,
        mimeType: "image/jpeg",
        altText: "Susu Segar Murni",
        caption: "Susu segar murni langsung dari sapi perah",
        sortOrder: 1,
        entityType: "umkm_product",
        entityId: susuProducts[0]?.id || 5
      },
      {
        fileName: "yogurt.jpg",
        originalName: "yogurt-plain.jpg",
        filePath: "https://abh.ai/place/400/300/0EA5E9/FFFFFF?text=Yogurt+Plain",
        fileSize: 450000,
        mimeType: "image/jpeg",
        altText: "Yogurt Plain",
        caption: "Yogurt alami tanpa gula dengan tekstur lembut",
        sortOrder: 1,
        entityType: "umkm_product",
        entityId: susuProducts[1]?.id || 6
      },
      
      // Media untuk produk Kerajinan
      {
        fileName: "tas-bambu.jpg",
        originalName: "tas-bambu-anyaman.jpg",
        filePath: "https://abh.ai/place/400/300/16A34A/FFFFFF?text=Tas+Bambu+Anyaman",
        fileSize: 650000,
        mimeType: "image/jpeg",
        altText: "Tas Bambu Anyaman",
        caption: "Tas anyaman bambu dengan desain tradisional",
        sortOrder: 1,
        entityType: "umkm_product",
        entityId: kerajinanProducts[0]?.id || 8
      },
      {
        fileName: "vas-bambu.jpg",
        originalName: "vas-bunga-bambu.jpg",
        filePath: "https://abh.ai/place/400/300/15803D/FFFFFF?text=Vas+Bunga+Bambu",
        fileSize: 600000,
        mimeType: "image/jpeg",
        altText: "Vas Bunga Bambu",
        caption: "Vas bunga dari bambu dengan ukiran motif",
        sortOrder: 1,
        entityType: "umkm_product",
        entityId: kerajinanProducts[1]?.id || 9
      }
    ]
  });

  console.log("UMKM and product media added");

  // Create village potentials
  const villagePotentials = await prisma.villagePotential.createMany({
    data: [
      {
        title: "UMKM Desa",
        description: "Produk unggulan khas masing-masing kampung One Kampung One Product atau O.K.O.P",
        category: "Ekonomi",
        linkUrl: "/umkm",
        sortOrder: 1
      },
      {
        title: "Agro Eco Tourism",
        description: "Menyajikan wisata Alam dan Pendidikan Lingkungan berbasis Pertanian dan Peternakan",
        category: "Wisata",
        linkUrl: "/wisata",
        sortOrder: 2
      },
      {
        title: "Kampus Kopi",
        description: "Potensi desa selayaknya ruang pembelajaran yang berada di wilayah desa",
        category: "Pendidikan",
        linkUrl: "/kampus-kopi",
        sortOrder: 3
      }
    ]
  });

  console.log("Village potentials added:", villagePotentials);

  // Create achievements
  const achievements = await prisma.achievement.createMany({
    data: [
      {
        title: "Juara III Gelar Desa Wisata Jateng 2023",
        description: "Desa Banyuanyar berhasil meraih juara III dalam Gelar Desa Wisata Jawa Tengah 2023",
        awardDate: new Date("2023-09-18"),
        organizer: "Pemerintah Provinsi Jawa Tengah"
      },
      {
        title: "40 Terbaik New Desa BRILiaN",
        description: "Desa Banyuanyar masuk dalam 40 desa terbaik program New Desa BRILiaN",
        awardDate: new Date("2024-01-15"),
        organizer: "Bank BRI"
      }
    ]
  });

  console.log("Achievements added:", achievements);

  // Create site settings
  const siteSettings = await prisma.siteSetting.createMany({
    data: [
      {
        settingKey: "site_title",
        settingValue: "Desa Banyuanyar - Green Smart Village",
        settingType: "STRING",
        description: "Judul website desa"
      },
      {
        settingKey: "site_description",
        settingValue: "Website resmi Desa Banyuanyar, Green Smart Village di Kecamatan Ampel, Kabupaten Boyolali",
        settingType: "STRING",
        description: "Deskripsi website"
      },
      {
        settingKey: "contact_email",
        settingValue: "info@desabanyuanyar.com",
        settingType: "STRING",
        description: "Email kontak desa"
      },
      {
        settingKey: "contact_phone",
        settingValue: "0271-123456",
        settingType: "STRING",
        description: "Nomor telepon kontak"
      },
      {
        settingKey: "social_media",
        settingValue: '{"facebook": "desabanyuanyar", "instagram": "desa_banyuanyar", "twitter": "@desabanyuanyar"}',
        settingType: "JSON",
        description: "Social media links"
      }
    ]
  });

  console.log("Site settings added:", siteSettings);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });