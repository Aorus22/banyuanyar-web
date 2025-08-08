import { PrismaClient } from '../db';

export async function seedDocument(prisma: PrismaClient) {
  console.log('🌱 Seeding documents...');

  const documentData = [
    {
      title: "Peraturan Desa Banyuanyar No. 01 Tahun 2024",
      description: "Peraturan desa tentang tata tertib dan ketentuan umum desa",
      filename: "perdes-01-2024.pdf",
      fileSize: 2048576,
      fileType: "application/pdf"
    },
    {
      title: "Rencana Pembangunan Jangka Menengah Desa (RPJMDes)",
      description: "Dokumen perencanaan pembangunan desa untuk periode 2024-2029",
      filename: "rpjmdes-2024-2029.pdf",
      fileSize: 5120000,
      fileType: "application/pdf"
    },
    {
      title: "Anggaran Pendapatan dan Belanja Desa (APBDes)",
      description: "Dokumen anggaran desa tahun 2024",
      filename: "apbdes-2024.pdf",
      fileSize: 1536000,
      fileType: "application/pdf"
    },
    {
      title: "Laporan Pertanggungjawaban Kepala Desa",
      description: "Laporan pertanggungjawaban kepala desa periode 2023",
      filename: "lpj-kades-2023.pdf",
      fileSize: 3072000,
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