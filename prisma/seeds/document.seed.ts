import { PrismaClient } from '../db';

export async function seedDocument(prisma: PrismaClient) {
  console.log('🌱 Seeding documents...');

  const documentData = [
    {
      title: "PROFIL BUMDesa Kampus Kopi Banyuanyar",
      description: "Profil lengkap BUMDesa Kampus Kopi Banyuanyar",
      fileUrl: "https://desabanyuanyar.com/download/profil-bumdesa-kampus-kopi-banyuanyar/",
      filename: "profil-bumdesa-kampus-kopi-banyuanyar.pdf",
      fileSize: 4096, // 4.00 KB
      fileType: "application/pdf"
    },
    {
      title: "Profil Desa Wisata Banyuanyar",
      description: "Dokumen profil desa wisata Banyuanyar",
      fileUrl: "https://desabanyuanyar.com/download/3930/",
      filename: "profil-desa-wisata-banyuanyar.pdf",
      fileSize: 4096, // 4.00 KB
      fileType: "application/pdf"
    },
    {
      title: "BROSUR KAMPUS KOPI BANYUANYAR AYO DOLAN NDESO",
      description: "Brosur wisata Kampus Kopi Banyuanyar",
      fileUrl: "https://desabanyuanyar.com/download/visitbanyuanyar/",
      filename: "brosur-kampus-kopi-banyuanyar.pdf",
      fileSize: 4096, // 4.00 KB
      fileType: "application/pdf"
    },
    {
      title: "BROSUR BARENDO COFFEE LAND AND NATURE CAMP",
      description: "Brosur wisata Barendo Coffee Land and Nature Camp",
      fileUrl: "https://desabanyuanyar.com/download/brosur-barendo-coffee-land-and-nature-camp/",
      filename: "brosur-barendo-coffee-land.pdf",
      fileSize: 4096, // 4.00 KB
      fileType: "application/pdf"
    },
    {
      title: "Peta Administrasi Desa Banyuanyar",
      description: "Peta administrasi wilayah desa Banyuanyar",
      fileUrl: "https://desabanyuanyar.com/download/peta-adminstrasi-desa-banyuanyar/",
      filename: "peta-administrasi-desa-banyuanyar.pdf",
      fileSize: 7340032, // 7 MB
      fileType: "application/pdf"
    },
    {
      title: "Bumdesa Kampus Kopi Banyuanyar",
      description: "Dokumen lengkap BUMDesa Kampus Kopi Banyuanyar",
      fileUrl: "https://desabanyuanyar.com/download/profil-bumdesa/",
      filename: "bumdesa-kampus-kopi-banyuanyar.pdf",
      fileSize: 7340032, // 7 MB
      fileType: "application/pdf"
    },
    {
      title: "Penggunaan Lahan Tiap Administrasi",
      description: "Dokumen penggunaan lahan per administrasi desa",
      fileUrl: "https://desabanyuanyar.com/download/penggunaan-lahan/",
      filename: "penggunaan-lahan-administrasi.pdf",
      fileSize: 899072, // 878 KB
      fileType: "application/pdf"
    },
    {
      title: "Keterangan Luas Wilayah Administrasi",
      description: "Dokumen keterangan luas wilayah administrasi desa",
      fileUrl: "https://desabanyuanyar.com/download/keterangan-luas-wilayah/",
      filename: "keterangan-luas-wilayah-administrasi.pdf",
      fileSize: 652288, // 637 KB
      fileType: "application/pdf"
    },
    {
      title: "PKS Universitas Diponegoro 3",
      description: "Perjanjian Kerjasama dengan Universitas Diponegoro",
      fileUrl: "https://desabanyuanyar.com/download/pks-universitas-diponegoro-3/",
      filename: "pks-universitas-diponegoro-3.pdf",
      fileSize: 1205862, // 1.15 MB
      fileType: "application/pdf"
    },
    {
      title: "Buku Pemerintah Desa",
      description: "Buku panduan pemerintah desa Banyuanyar",
      fileUrl: "https://desabanyuanyar.com/download/buku-pemerintah-desa/",
      filename: "buku-pemerintah-desa.pdf",
      fileSize: 105472, // 103 KB
      fileType: "application/pdf"
    },
    {
      title: "PKS Sekolah Tinggi Pariwisata Trisakti",
      description: "Perjanjian Kerjasama dengan Sekolah Tinggi Pariwisata Trisakti",
      fileUrl: "https://desabanyuanyar.com/download/pks-sekolah-tinggi-pariwisata-trisakti/",
      filename: "pks-stp-trisakti.pdf",
      fileSize: 1205862, // 1.15 MB
      fileType: "application/pdf"
    },
    {
      title: "PKS Universitas Seni Indonesia ISI Surakarta",
      description: "Perjanjian Kerjasama dengan ISI Surakarta",
      fileUrl: "https://desabanyuanyar.com/download/pks-isi-surakarta/",
      filename: "pks-isi-surakarta.pdf",
      fileSize: 1205862, // 1.15 MB
      fileType: "application/pdf"
    },
    {
      title: "PKS Digido Desa Banyuanyar",
      description: "Perjanjian Kerjasama dengan Digido Desa Banyuanyar",
      fileUrl: "https://desabanyuanyar.com/download/pks-digido-desa-banyuanyar/",
      filename: "pks-digido-desa-banyuanyar.pdf",
      fileSize: 282828, // 276.17 KB
      fileType: "application/pdf"
    },
    {
      title: "PKS Sekolah Vokasi Universitas Diponegoro",
      description: "Perjanjian Kerjasama dengan Sekolah Vokasi Universitas Diponegoro",
      fileUrl: "https://desabanyuanyar.com/download/pks-universitas-diponegoro/",
      filename: "pks-sv-undip.pdf",
      fileSize: 1205862, // 1.15 MB
      fileType: "application/pdf"
    },
    {
      title: "PKS Universitas Sebelas Maret D3 SV Akuntansi",
      description: "Perjanjian Kerjasama dengan UNS D3 SV Akuntansi",
      fileUrl: "https://desabanyuanyar.com/download/pks-universitas-sebelas-maret-d3-sv-akutansi/",
      filename: "pks-uns-d3-sv-akuntansi.pdf",
      fileSize: 1205862, // 1.15 MB
      fileType: "application/pdf"
    },
    {
      title: "PKS Universitas Sebelas Maret D3 SV Agribisnis",
      description: "Perjanjian Kerjasama dengan UNS D3 SV Agribisnis",
      fileUrl: "https://desabanyuanyar.com/download/pks-uns-d3-sv-agribisnis/",
      filename: "pks-uns-d3-sv-agribisnis.pdf",
      fileSize: 2310144, // 2.21 MB
      fileType: "application/pdf"
    },
    {
      title: "PKS BUMDesa UMKM Susu - PPKO Appaloosa",
      description: "Perjanjian Kerjasama BUMDesa UMKM Susu dengan PPKO Appaloosa",
      fileUrl: "https://desabanyuanyar.com/download/pks-bumdesa-umkm-susu-ppko-appaloosa/",
      filename: "pks-bumdesa-umkm-susu-ppko-appaloosa.pdf",
      fileSize: 1258291, // 1.20 MB
      fileType: "application/pdf"
    },
    {
      title: "PKS BUMDesa UMKM Susu",
      description: "Perjanjian Kerjasama BUMDesa UMKM Susu",
      fileUrl: "https://desabanyuanyar.com/download/pks-bumdesa-umkm-susu/",
      filename: "pks-bumdesa-umkm-susu.pdf",
      fileSize: 1258291, // 1.20 MB
      fileType: "application/pdf"
    },
    {
      title: "PKS BUMDesa UMKM OKOP",
      description: "Perjanjian Kerjasama BUMDesa UMKM OKOP",
      fileUrl: "https://desabanyuanyar.com/download/pks-bumdesa-umkm-okop/",
      filename: "pks-bumdesa-umkm-okop.pdf",
      fileSize: 3040870, // 2.90 MB
      fileType: "application/pdf"
    },
    {
      title: "PKS BUMDesa Sewa Jip",
      description: "Perjanjian Kerjasama BUMDesa Sewa Jip",
      fileUrl: "https://desabanyuanyar.com/download/pks-bumdesa-sewa-jip/",
      filename: "pks-bumdesa-sewa-jip.pdf",
      fileSize: 895232, // 873.86 KB
      fileType: "application/pdf"
    }
  ];

  const result = await prisma.document.createMany({
    data: documentData,
    skipDuplicates: true
  });

  console.log(`✅ Documents seeded: ${result.count} records`);
  return result;
} 