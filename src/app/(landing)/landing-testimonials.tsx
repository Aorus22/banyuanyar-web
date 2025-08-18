import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Pak Suryo',
    role: 'Kepala Desa',
    location: 'Desa Banyuanyar',
    content: 'Desa Banyuanyar memiliki potensi wisata yang luar biasa. Dengan website ini, masyarakat dan pengunjung bisa mengenal desa kami lebih dekat.',
    avatar: '/avatars/suryo.jpg',
    rating: 5
  },
  {
    name: 'Bu Siti',
    role: 'Pengusaha UMKM',
    location: 'Desa Banyuanyar',
    content: 'Website ini sangat membantu UMKM kami untuk mempromosikan produk ke lebih banyak orang. Sekarang produk lokal kami bisa dikenal lebih luas.',
    avatar: '/avatars/siti.jpg',
    rating: 5
  },
  {
    name: 'Ahmad Rizki',
    role: 'Wisatawan',
    location: 'Solo',
    content: 'Saya sangat terkesan dengan keindahan alam dan keramahan masyarakat Desa Banyuanyar. Paket wisatanya sangat menarik dan terjangkau.',
    avatar: '/avatars/ahmad.jpg',
    rating: 5
  },
  {
    name: 'Maria Garcia',
    role: 'Fotografer',
    location: 'Jakarta',
    content: 'Desa Banyuanyar adalah surga fotografer! Pemandangan alamnya indah dan budaya lokalnya sangat menarik untuk didokumentasikan.',
    avatar: '/avatars/maria.jpg',
    rating: 5
  },
  {
    name: 'Nina Putri',
    role: 'Mahasiswa',
    location: 'UNS',
    content: 'Saya suka sekali suasana tenang di Desa Banyuanyar. Cocok untuk refreshing dan belajar tentang budaya pedesaan yang asli.',
    avatar: '/avatars/nina.jpg',
    rating: 5
  },
  {
    name: 'Pak Joko',
    role: 'Warga Desa',
    location: 'Desa Banyuanyar',
    content: 'Dengan adanya website ini, informasi desa menjadi lebih mudah diakses. Masyarakat bisa mengetahui kegiatan dan berita terbaru dengan cepat.',
    avatar: '/avatars/joko.jpg',
    rating: 5
  }
];

export function LandingTestimonials() {
  return (
    <div id='testimonials' className='w-full py-12 xs:py-20 px-6'>
      <div className='w-full max-w-screen-lg mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight'>
            Apa Kata Mereka
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Dengarkan pengalaman dan kesan dari warga desa dan pengunjung tentang Desa Banyuanyar
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='h-full hover:shadow-lg transition-shadow'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  ))}
                </div>
                <p className='text-sm text-muted-foreground mb-4'>
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-semibold text-sm'>{testimonial.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 