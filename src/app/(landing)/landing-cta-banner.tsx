import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  MapPin,
  Camera,
  Coffee,
  Users,
  FileText,
  Phone,
  Mail,
  Clock,
  Building,
  Store
} from 'lucide-react';
import Link from 'next/link';

export function LandingCTABanner() {
  return (
    <div className='xs:py-20 w-full py-12'>
      <div className='mx-auto w-full max-w-screen-xl space-y-12'>
        {/* Main CTA */}
        <div
          className='from-primary to-primary/80 rounded-2xl bg-gradient-to-r p-8 text-center text-white md:p-12'
          data-aos='zoom-in'
        >
          <h2
            className='xs:text-4xl mb-4 text-3xl font-bold tracking-tight sm:text-5xl'
            data-aos='fade-down'
            data-aos-delay='200'
          >
            Siap Jelajahi Desa Banyuanyar?
          </h2>
          <p
            className='mx-auto mb-8 max-w-2xl text-lg opacity-90 md:text-xl'
            data-aos='fade-up'
            data-aos-delay='400'
          >
            Temukan keindahan alam, budaya, dan keramahan masyarakat Desa
            Banyuanyar. Mulai petualangan Anda hari ini!
          </p>
          <div
            className='flex flex-col items-center justify-center gap-4 sm:flex-row'
            data-aos='fade-up'
            data-aos-delay='600'
          >
            <Button
              size='lg'
              variant='secondary'
              className='w-full rounded-full text-base sm:w-auto'
              asChild
            >
              <Link href='/umkm/paket-wisata'>
                Lihat Paket Wisata <ArrowUpRight className='ml-2 !h-5 !w-5' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='w-full rounded-full border-white/20 bg-white/10 text-base text-white hover:bg-white/20 sm:w-auto'
              asChild
            >
              <Link href='/informasi/galeri'>
                <Camera className='mr-2 !h-5 !w-5' /> Galeri Foto
              </Link>
            </Button>
          </div>
          <p
            className='mt-4 text-sm opacity-75'
            data-aos='fade-up'
            data-aos-delay='800'
          >
            Gratis • Mudah Diakses • Informasi Terkini
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Link href='/umkm'>
            <div
              className='cursor-pointer rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-center text-white transition-transform hover:scale-105'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20'>
                <Store className='h-6 w-6' />
              </div>
              <h3 className='mb-2 font-semibold'>UMKM Lokal</h3>
              <p className='text-sm opacity-90'>
                Produk dan jasa lokal berkualitas
              </p>
            </div>
          </Link>

          <Link href='/informasi/berita'>
            <div
              className='cursor-pointer rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-center text-white transition-transform hover:scale-105'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20'>
                <FileText className='h-6 w-6' />
              </div>
              <h3 className='mb-2 font-semibold'>Berita Desa</h3>
              <p className='text-sm opacity-90'>
                Informasi terbaru seputar desa
              </p>
            </div>
          </Link>

          <Link href='/profil-desa/sejarah'>
            <div
              className='cursor-pointer rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-center text-white transition-transform hover:scale-105'
              data-aos='fade-up'
              data-aos-delay='300'
            >
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20'>
                <Users className='h-6 w-6' />
              </div>
              <h3 className='mb-2 font-semibold'>Budaya & Sejarah</h3>
              <p className='text-sm opacity-90'>Tradisi dan warisan budaya</p>
            </div>
          </Link>

          <Link href='/pemerintah/struktur-organisasi'>
            <div
              className='cursor-pointer rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-center text-white transition-transform hover:scale-105'
              data-aos='fade-up'
              data-aos-delay='400'
            >
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20'>
                <Building className='h-6 w-6' />
              </div>
              <h3 className='mb-2 font-semibold'>Pemerintahan</h3>
              <p className='text-sm opacity-90'>Struktur dan perangkat desa</p>
            </div>
          </Link>
        </div>

        {/* Contact & Info Section */}
        <div className='grid gap-6 md:grid-cols-3'>
          <div
            className='rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-center text-white'
            data-aos='fade-right'
          >
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20'>
              <Phone className='h-6 w-6' />
            </div>
            <h3 className='mb-2 font-semibold'>Hubungi Kami</h3>
            <p className='mb-4 text-sm opacity-90'>
              Untuk informasi dan pemesanan
            </p>
            <Link href='https://wa.me/your-number'>
              <div className='inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-teal-600 transition-colors hover:bg-gray-100'>
                💬 WhatsApp
              </div>
            </Link>
          </div>

          <div
            className='rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 p-6 text-center text-white'
            data-aos='fade-up'
          >
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20'>
              <MapPin className='h-6 w-6' />
            </div>
            <h3 className='mb-2 font-semibold'>Lokasi</h3>
            <p className='mb-4 text-sm opacity-90'>
              Desa Banyuanyar, Kec. Ampel
            </p>
            <Link href='/profil-desa/demografi-geografis'>
              <div className='inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-pink-600 transition-colors hover:bg-gray-100'>
                📍 Lihat Peta
              </div>
            </Link>
          </div>

          <div
            className='rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-center text-white'
            data-aos='fade-left'
          >
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20'>
              <Clock className='h-6 w-6' />
            </div>
            <h3 className='mb-2 font-semibold'>Jam Operasional</h3>
            <p className='mb-4 text-sm opacity-90'>
              Senin - Minggu: 08.00 - 17.00
            </p>
            <Link href='/informasi/agenda-kegiatan'>
              <div className='inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-gray-100'>
                📅 Agenda
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
