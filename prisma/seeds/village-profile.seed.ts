import { PrismaClient } from '../db';

export async function seedVillageProfile(prisma: PrismaClient) {
  console.log('🌱 Seeding village profile...');

  const villageProfileData = [

    {
      key: "vision",
      value: "Desa Banyuanyar Mewujudkan Sebagai Kawasan Desa Hijau dan Pintar (Green Smart Village ) Menuju Desa Mandiri, Religius, Berbudaya Sesuai Dengan Nilai-Nilai Pancasila",
      name: "Visi desa"
    },
    {
      key: "history",
      value: `<img src="https://desabanyuanyar.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-04-at-19.31.38.jpeg.webp" alt="" title="" id="t5muoye4i" width="854.36" height="480.5775"><p class="text-node"></p><p class="text-node">Menurut Cerita Rakyat Desa Banyuanyar sejarah Desa Banyuanyar adalah sebagai berikut:</p><p class="text-node"><strong><em>” Pada jaman dahulu kala ada sebuah sumber mata air yang sangat deras muncul disitu. Masyarakat sekitarnya merasa kaget dan berucap: eneng banyu sing anyar! eneng banyu anyar teko” dan karena khawatir khususnya Kyai Doglo, berkenaan derasnya mata air tersebut akan menyebabkan daerah tersebut tergenang air yang bisa berakibat menenggelamkan wilayah perkampungan sekitar.</em></strong></p><p class="text-node"><strong><em>Dengan berbagai ikhtiar dan pendapat akhirnya mereka sepakat untuk menutup mata iar tersebut dengan dua kepala kambing dan memotong sehelai rambut kyai Doglo sehingga benar-benar mata air tesebut tertutup. Kemunculan mata air tersebut sehingga memunculkan paradigma ” banyu sing nyar” menjadi nama desa Banyuanyar.</em></strong></p><p class="text-node">Letak/lokasi sumber mata air tersebut tepatnya disebelah timur Tempat Pemakaman Umum Desa Banyuanyar, dan menurut cerita arus mata air yang disumbat tadi mengalir ke arah Pemandian Tlatar.</p><p class="text-node">Demikian sekilas cerita rakyat terjadinya Desa Banyuanyar. &nbsp;</p>`,
      name: "Sejarah desa"
    },
    {
      key: "mission_1",
      value: "Menanamkan nilai-nilai religius dan kearifan lokal melalui Program Pengembangan Aspek-aspek Spiritual Ramah Anak dan Adat Istiadat.",
      name: "Misi 1"
    },
    {
      key: "mission_2",
      value: "Meningkatkan Kegiatan dan Program Desa Dalam Keikutsertaan Kedaulatan Desa Mencapai Kedaulatan Nasional.",
      name: "Misi 2"
    },
    {
      key: "mission_3",
      value: "Meningkatkan ketersediaan sarana dan prasarana umum yang aman dan nyaman melalui Program Peningkatan Sarana prasarana Umum Berbasis Teknologi Ramah Lingkungan.",
      name: "Misi 3"
    },
    {
      key: "mission_4",
      value: "Meningkatkan kualitas pelayanan masyarakat dan transparansi Berbasis Teknologi Informatika dan Smartphone (Digital Village).",
      name: "Misi 4"
    },
    {
      key: "mission_5",
      value: "Meningkatkan kualitas pendidikan baik formal maupun non formal melalui Gerakan Kampung Ramah Anak.",
      name: "Misi 5"
    },
    {
      key: "mission_6",
      value: "Mengembangkan ketersediaan fasilitas penunjang desa wisata melalui Program Peningkatan Sarana Prasarana Destinasi Pariwisata Kampung Susu dan Kopi (Tourist Village Of Milk And Coffee).",
      name: "Misi 6"
    },
    {
      key: "mission_7",
      value: "Mewujudkan sistem usaha mandiri desa melalui Badan Usaha Milik Desa (BUM Desa).",
      name: "Misi 7"
    },
    {
      key: "mission_8",
      value: "Meningkatkan hasil produksi perkebunan, peternakan, dan pertanian masyarakat melalui Gerakan Mandiri Pangan menuju Kampung Iklim (Climate Village) dan Mandiri Energi (Energy Village Endurance).",
      name: "Misi 8"
    },
    {
      key: "mission_9",
      value: "Meningkatkan produktivitas ekonomi masyarakat melalui Program Peningkatan Pengetahuan dan Produktivitas Keterampilan Masyarakat (Vocational Village).",
      name: "Misi 9"
    },
    {
      key: "mission_10",
      value: "Meningkatkan mutu layanan kesehatan di desa melalui Program Gerakan Desa Sehat.",
      name: "Misi 10"
    },
    {
      key: "mission_11",
      value: "Mewujudkan Program Keluarga Harapan Untuk Peningkatan Kesejahteraan Keluarga Dan Kualitas Hidup Masyarakat Desa (Quality Of Life).",
      name: "Misi 11"
    },
    {
      key: "objectives",
      value: `<img src="https://desabanyuanyar.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-04-at-19.31.32-2-2038x1146.jpeg" alt="" title="" id="l491jrk9j" width="1012.3000000000001" height="569.2324828263004"><p class="text-node"></p><p class="text-node">Rencana pembangunan desa Banyuanyar dengan prinsip pendekatan Smart Green Village. Perencanaan ini berdasarkan pada pembangunan desa untuk memfasilitasi akses jaringan internet dan sistem informasi desa. Serta perencanaan kawasan desa yang berkelanjutan (sustainable) melalui prinsip pembangunan T = W-D. Prinsip tersebut dengan memaksimalkan Welfare dan mengurangi Damage terhadap lingkungan, sehingga Throughout tercapai maksimal mendukung keberlanjutan pembangunan desa.</p>`,
      name: "Sasaran pembangunan desa"
    },
    {
      key: "demographics_data",
      value: `<img src="https://desabanyuanyar.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-04-at-19.31.38.jpeg.webp" alt="" title="" id="u2dxnzbef" width="962.48" height="541.395"><h3 class="heading-node">Lokasi Geografis</h3><p class="text-node">Desa Banyuanyar secara administratif terletak di Kecamatan Ampel, Kabupaten Boyolali dengan luas wilayah sebesar 333,90 Ha. Terdapat 5 Rukun Warga (RW) dan 19 Rukun Tetangga (RT) yang terbagi menjadi 9 dukuh dan 4 wilayah kadus.</p><p class="text-node"></p><img src="https://desabanyuanyar.com/wp-content/uploads/2024/10/Picture2.png" alt="" title="" id="jm7e8czc0" width="561.8000000000001" height="397.18398637137994"><h3 class="heading-node">Batas Wilayah</h3><p class="text-node">Batas-batas wilayah Desa Banyuanyar: Sebelah Utara: Desa Tanduk Kec. Ampel, Sebelah Timur: Desa Sidomulyo Kec. Ampel, Sebelah Tenggara: Desa Penggung Kec. Boyolali, Sebelah Selatan: Desa Candi Gatak Kec. Cepogo, Sebelah Barat: Desa Gubug Kec. Cepogo.</p><p class="text-node"></p><img src="https://desabanyuanyar.com/wp-content/uploads/2024/10/Picture3.png" alt="" title="" id="dobcjzq7i" width="517.28" height="372.7126637554585"><h3 class="heading-node">Data Klimatologi</h3><p class="text-node">Iklim makro pada Desa Banyuanyar meliputi kemarau dan penghujan, dengan suhu udara berkisar antara 24°-35° C. Desa Banyuanyar berdasarkan kondisi iklimnya, dapat digolongkan sebagai wilayah dengan karakteristik lembab dengan curah hujan 17,33 mm / tahun dengan jumlah bulan kering 7 tujuh bulan selama satu tahun.</p>`,
      name: "Data demografi & geografis"
    },
  ];

  const result = await prisma.villageProfile.createMany({
    data: villageProfileData,
    skipDuplicates: true
  });

  console.log(`✅ Village profile seeded: ${result.count} records`);
  return result;
} 