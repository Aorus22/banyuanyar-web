import React from 'react';
import {
  MapPin,
  Camera,
  Store,
  Users,
  FileText,
  Calendar,
  Home,
  Mountain,
  Coffee,
  BookOpen,
  Palette,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: MapPin,
    title: 'Profil Desa',
    description:
      'Kenali visi, misi, sejarah, dan demografi Desa Banyuanyar yang kaya akan budaya dan tradisi.',
    link: '/profil-desa/visi-misi'
  },
  {
    icon: Camera,
    title: 'Galeri Foto',
    description:
      'Lihat keindahan alam dan aktivitas masyarakat Desa Banyuanyar melalui koleksi foto yang menarik.',
    link: '/informasi/galeri'
  },
  {
    icon: Store,
    title: 'UMKM Lokal',
    description:
      'Temukan produk unggulan dan jasa dari pelaku UMKM Desa Banyuanyar yang berkualitas.',
    link: '/umkm'
  },
  {
    icon: Mountain,
    title: 'Paket Wisata',
    description:
      'Nikmati berbagai paket wisata menarik yang menampilkan keunikan dan keindahan desa kami.',
    link: '/umkm/paket-wisata'
  },
  {
    icon: FileText,
    title: 'Berita Desa',
    description:
      'Dapatkan informasi terbaru seputar kegiatan, perkembangan, dan berita dari Desa Banyuanyar.',
    link: '/informasi/berita'
  },
  {
    icon: Users,
    title: 'Pemerintahan',
    description:
      'Kenali struktur organisasi dan perangkat desa yang mengelola pemerintahan Desa Banyuanyar.',
    link: '/pemerintah/struktur-organisasi'
  },
  {
    icon: Home,
    title: 'Omah Wisata',
    description:
      'Jelajahi berbagai omah wisata unik seperti Omah Kopi, Omah Seni, dan Omah Toga.',
    link: '/umkm/rumah-penginapan'
  },
  {
    icon: Coffee,
    title: 'Kampus Kopi',
    description:
      'Nikmati pengalaman kopi berkualitas dari kebun kopi lokal Desa Banyuanyar.',
    link: '/umkm'
  },
  {
    icon: BookOpen,
    title: 'Agenda Kegiatan',
    description:
      'Lihat jadwal kegiatan dan agenda desa yang akan diselenggarakan di Desa Banyuanyar.',
    link: '/informasi/agenda-kegiatan'
  },
  {
    icon: Palette,
    title: 'Seni & Budaya',
    description:
      'Temukan kesenian tradisional dan budaya lokal yang masih dilestarikan masyarakat desa.',
    link: '/profil-desa/sejarah'
  },
  {
    icon: Heart,
    title: 'Keramahan Masyarakat',
    description:
      'Rasakan keramahan dan kehangatan masyarakat Desa Banyuanyar yang terkenal ramah.',
    link: '/profil-desa/visi-misi'
  },
  {
    icon: Calendar,
    title: 'Dokumen Desa',
    description:
      'Akses dokumen resmi dan informasi administrasi Desa Banyuanyar.',
    link: '/informasi/dokumen'
  }
];

export function LandingFeatures() {
  return (
    <div id='features' className='w-full py-12 xs:py-20 px-6'>
      <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center' data-aos="fade-down">
        Jelajahi Desa Banyuanyar
      </h2>
      <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-center' data-aos="fade-up" data-aos-delay="200">
        Temukan berbagai informasi dan layanan yang tersedia di desa kami
      </p>
      <div className='w-full max-w-screen-xl mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {features.map((feature, index) => (
          <Link
            key={feature.title}
            href={feature.link}
            className='group'
          >
            <div 
              className='flex flex-col bg-background border rounded-xl py-6 px-5 h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50 group-hover:scale-[1.02]'
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className='mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full group-hover:bg-primary/10 transition-colors'>
                <feature.icon className='h-6 w-6 group-hover:text-primary transition-colors' />
              </div>
              <span className='text-lg font-semibold group-hover:text-primary transition-colors'>{feature.title}</span>
              <p className='mt-1 text-foreground/80 text-[15px]'>
                {feature.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 