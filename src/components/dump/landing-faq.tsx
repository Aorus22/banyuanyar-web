import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Apa saja yang bisa dilihat di Desa Banyuanyar?',
    answer: 'Desa Banyuanyar menawarkan berbagai atraksi wisata seperti pemandangan alam yang indah, budaya tradisional, produk UMKM lokal, dan keramahan masyarakat. Anda bisa menikmati paket wisata, mengunjungi galeri foto, dan mempelajari sejarah desa.'
  },
  {
    question: 'Bagaimana cara mengakses informasi terbaru desa?',
    answer: 'Anda bisa mengakses informasi terbaru melalui halaman berita desa yang selalu diperbarui dengan kegiatan, perkembangan, dan berita terkini seputar Desa Banyuanyar. Semua informasi tersedia secara online dan mudah diakses.'
  },
  {
    question: 'Apakah ada produk UMKM yang bisa dibeli?',
    answer: 'Ya, Desa Banyuanyar memiliki berbagai produk UMKM berkualitas seperti makanan tradisional, kerajinan tangan, dan jasa homestay. Semua produk dapat dilihat dan dipesan melalui halaman UMKM di website ini.'
  },
  {
    question: 'Bagaimana struktur pemerintahan desa?',
    answer: 'Struktur pemerintahan Desa Banyuanyar dapat dilihat melalui halaman khusus yang menampilkan organisasi desa dan perangkat desa yang mengelola berbagai aspek pemerintahan dan pelayanan masyarakat.'
  },
  {
    question: 'Apakah ada paket wisata yang tersedia?',
    answer: 'Ya, tersedia berbagai paket wisata menarik yang menampilkan keunikan Desa Banyuanyar. Paket wisata mencakup wisata alam, budaya, dan pengalaman lokal yang dapat dipesan sesuai kebutuhan pengunjung.'
  },
  {
    question: 'Bagaimana cara menghubungi pemerintah desa?',
    answer: 'Informasi kontak pemerintah desa tersedia di halaman perangkat desa. Anda juga bisa mengakses dokumen dan informasi resmi melalui halaman dokumen desa untuk keperluan administrasi.'
  }
];

export function LandingFAQ() {
  return (
    <div id='faq' className='w-full py-12 xs:py-20 px-6'>
      <div className='w-full max-w-screen-lg mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight'>
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Temukan jawaban untuk pertanyaan umum seputar Desa Banyuanyar
          </p>
        </div>

        <Accordion type='single' collapsible className='w-full'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='text-left'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
} 