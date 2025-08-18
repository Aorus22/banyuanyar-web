import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MapPin, Camera, Coffee, Users, FileText, Phone, Mail, Clock, Building, Store } from 'lucide-react';
import Link from 'next/link';

export function LandingCTABanner() {
  return (
    <div className='w-full py-12 xs:py-20'>
      <div className='w-full max-w-screen-xl mx-auto space-y-12'>
        {/* Main CTA */}
        <div className='bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white' data-aos="zoom-in">
          <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-4' data-aos="fade-down" data-aos-delay="200">
            Siap Jelajahi Desa Banyuanyar?
          </h2>
          <p className='text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90' data-aos="fade-up" data-aos-delay="400">
            Temukan keindahan alam, budaya, dan keramahan masyarakat Desa Banyuanyar. 
            Mulai petualangan Anda hari ini!
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4' data-aos="fade-up" data-aos-delay="600">
            <Button
              size='lg'
              variant='secondary'
              className='w-full sm:w-auto rounded-full text-base'
              asChild
            >
              <Link href="/umkm/paket-wisata">
                Lihat Paket Wisata <ArrowUpRight className='!h-5 !w-5 ml-2' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='w-full sm:w-auto rounded-full text-base bg-white/10 border-white/20 text-white hover:bg-white/20'
              asChild
            >
              <Link href="/informasi/galeri">
                <Camera className='!h-5 !w-5 mr-2' /> Galeri Foto
              </Link>
            </Button>
          </div>
          <p className='text-sm opacity-75 mt-4' data-aos="fade-up" data-aos-delay="800">
            Gratis • Mudah Diakses • Informasi Terkini
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Link href="/umkm">
            <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer' data-aos="fade-up" data-aos-delay="100">
              <div className='h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Store className='h-6 w-6' />
              </div>
              <h3 className='font-semibold mb-2'>UMKM Lokal</h3>
              <p className='text-sm opacity-90'>Produk dan jasa lokal berkualitas</p>
            </div>
          </Link>

          <Link href="/informasi/berita">
            <div className='bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer' data-aos="fade-up" data-aos-delay="200">
              <div className='h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FileText className='h-6 w-6' />
              </div>
              <h3 className='font-semibold mb-2'>Berita Desa</h3>
              <p className='text-sm opacity-90'>Informasi terbaru seputar desa</p>
            </div>
          </Link>

          <Link href="/profil-desa/sejarah">
            <div className='bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer' data-aos="fade-up" data-aos-delay="300">
              <div className='h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Users className='h-6 w-6' />
              </div>
              <h3 className='font-semibold mb-2'>Budaya & Sejarah</h3>
              <p className='text-sm opacity-90'>Tradisi dan warisan budaya</p>
            </div>
          </Link>

          <Link href="/pemerintah/struktur-organisasi">
            <div className='bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer' data-aos="fade-up" data-aos-delay="400">
              <div className='h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Building className='h-6 w-6' />
              </div>
              <h3 className='font-semibold mb-2'>Pemerintahan</h3>
              <p className='text-sm opacity-90'>Struktur dan perangkat desa</p>
            </div>
          </Link>
        </div>

        {/* Contact & Info Section */}
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white text-center' data-aos="fade-right">
            <div className='h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Phone className='h-6 w-6' />
            </div>
            <h3 className='font-semibold mb-2'>Hubungi Kami</h3>
            <p className='text-sm opacity-90 mb-4'>Untuk informasi dan pemesanan</p>
            <Link href="https://wa.me/your-number">
              <div className='inline-flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors'>
                💬 WhatsApp
              </div>
            </Link>
          </div>

          <div className='bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white text-center' data-aos="fade-up">
            <div className='h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <MapPin className='h-6 w-6' />
            </div>
            <h3 className='font-semibold mb-2'>Lokasi</h3>
            <p className='text-sm opacity-90 mb-4'>Desa Banyuanyar, Kec. Ampel</p>
            <Link href="/profil-desa/demografi-geografis">
              <div className='inline-flex items-center gap-2 bg-white text-pink-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors'>
                📍 Lihat Peta
              </div>
            </Link>
          </div>

          <div className='bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white text-center' data-aos="fade-left">
            <div className='h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Clock className='h-6 w-6' />
            </div>
            <h3 className='font-semibold mb-2'>Jam Operasional</h3>
            <p className='text-sm opacity-90 mb-4'>Senin - Minggu: 08.00 - 17.00</p>
            <Link href="/informasi/agenda-kegiatan">
              <div className='inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors'>
                📅 Agenda
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}