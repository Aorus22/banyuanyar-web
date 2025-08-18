import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Camera, Users, Star, Coffee, Mountain, Home, Car, Tent, BookOpen, Users2, Building } from 'lucide-react';
import Link from 'next/link';

const tourismPackages = [
  {
    title: 'Paket Pelajar',
    description: 'Paket wisata edukasi untuk pelajar dan mahasiswa',
    icon: BookOpen,
    features: [
      'Kunjungan ke kebun kopi',
      'Belajar budaya lokal',
      'Fotografi alam',
      'Snack lokal'
    ],
    popular: false,
    link: '/umkm/paket-wisata',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Paket Outbound',
    description: 'Aktivitas outdoor dan team building',
    icon: Mountain,
    features: [
      'Trekking alam',
      'Games outdoor',
      'Camping ground',
      'BBQ bersama'
    ],
    popular: true,
    link: '/umkm/paket-wisata',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Paket Jeep Tour',
    description: 'Petualangan dengan jeep keliling desa',
    icon: Car,
    features: [
      'Tour keliling desa',
      'Foto di spot menarik',
      'Makan siang lokal',
      'Guide berpengalaman'
    ],
    popular: false,
    link: '/umkm/paket-wisata',
    color: 'from-orange-500 to-orange-600'
  },
  {
    title: 'Paket Live In / Homestay',
    description: 'Menginap dan merasakan kehidupan desa',
    icon: Home,
    features: [
      'Menginap di homestay',
      'Sarapan pagi',
      'Aktivitas desa',
      'Makan malam lokal'
    ],
    popular: false,
    link: '/umkm/omah-wisata',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Paket Camping Ground',
    description: 'Camping di alam terbuka desa',
    icon: Tent,
    features: [
      'Tenda dan peralatan',
      'Api unggun',
      'Stargazing malam',
      'Sarapan pagi'
    ],
    popular: false,
    link: '/umkm/paket-wisata',
    color: 'from-teal-500 to-teal-600'
  },
  {
    title: 'Paket Gathering',
    description: 'Acara gathering dan studi banding',
    icon: Users2,
    features: [
      'Meeting room',
      'Catering lokal',
      'Presentasi desa',
      'Tour singkat'
    ],
    popular: false,
    link: '/umkm/paket-wisata',
    color: 'from-pink-500 to-pink-600'
  }
];

const omahWisata = [
  { name: 'Omah Tambeng Tawon', icon: Home, link: '/umkm/omah-wisata' },
  { name: 'Omah E-Craft', icon: Building, link: '/umkm/omah-wisata' },
  { name: 'Omah Toga', icon: Building, link: '/umkm/omah-wisata' },
  { name: 'Omah Kopi', icon: Coffee, link: '/umkm/omah-wisata' },
  { name: 'Omah Cowboy', icon: Building, link: '/umkm/omah-wisata' },
  { name: 'Omah Bukuku', icon: BookOpen, link: '/umkm/omah-wisata' },
  { name: 'Omah Seni', icon: Building, link: '/umkm/omah-wisata' },
  { name: 'Omah Oveje', icon: Building, link: '/umkm/omah-wisata' }
];

export function LandingPricing() {
  return (
    <div id='tourism' className='w-full py-12 xs:py-20'>
      <div className='w-full max-w-screen-xl mx-auto'>
        {/* Tourism Packages */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight' data-aos="fade-down">
            Paket Wisata Desa Banyuanyar
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-3xl mx-auto' data-aos="fade-up" data-aos-delay="200">
            Pilih paket wisata yang sesuai dengan kebutuhan Anda. Setiap paket dirancang untuk memberikan pengalaman terbaik di Desa Banyuanyar.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
          {tourismPackages.map((pkg, index) => (
            <Card
              key={pkg.title}
              className={`relative ${pkg.popular ? 'border-primary shadow-lg scale-105' : ''} hover:shadow-xl transition-all duration-300`}
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              {pkg.popular && (
                <Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary'>
                  Paling Populer
                </Badge>
              )}
              <CardHeader>
                <div className='flex items-center gap-3 mb-3'>
                  <div className={`h-12 w-12 flex items-center justify-center bg-gradient-to-r ${pkg.color} text-white rounded-full`}>
                    <pkg.icon className='h-6 w-6' />
                  </div>
                  <CardTitle className='text-xl'>{pkg.title}</CardTitle>
                </div>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3 mb-6'>
                  {pkg.features.map((feature) => (
                    <li key={feature} className='flex items-center'>
                      <Star className='h-4 w-4 text-primary mr-2' />
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={pkg.link}>
                  <div className={`w-full text-center py-3 px-4 bg-gradient-to-r ${pkg.color} text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer font-medium`}>
                    Lihat Detail Paket
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white text-center' data-aos="fade-right">
            <h3 className='text-2xl font-bold mb-4'>Ingin Memesan Paket?</h3>
            <p className='mb-6 opacity-90'>Hubungi kami melalui WhatsApp untuk informasi lebih lanjut dan pemesanan</p>
            <Link href="https://wa.me/your-number">
              <div className='inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
                <span>💬</span>
                Chat WhatsApp
              </div>
            </Link>
          </div>

          <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center' data-aos="fade-left">
            <h3 className='text-2xl font-bold mb-4'>Kunjungi Kami</h3>
            <p className='mb-6 opacity-90'>Desa Banyuanyar, Kecamatan Ampel, Kabupaten Boyolali</p>
            <Link href="/profil-desa/demografi-geografis">
              <div className='inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
                <MapPin className='h-5 w-5' />
                Lihat Lokasi
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 