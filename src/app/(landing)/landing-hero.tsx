import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MapPin, Users, Calendar, Coffee, Mountain, Camera, Trees, Flower, Sun, Moon, FileText, Store } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

export const dynamic = 'force-dynamic';

export default async function LandingHero() {
  // Fetch real data from database
  const [latestNews, upcomingEvents, villageOfficials, topUMKM, galleryPhotos] = await Promise.all([
    // Latest news (3 items)
    prisma.news.findMany({
      where: { status: 'PUBLISHED' },
      include: { author: true, category: true },
      orderBy: { publishedAt: 'desc' },
      take: 3
    }),
    
    // Latest events (3 items)
    prisma.event.findMany({
      orderBy: { date: 'desc' },
      take: 3
    }),
    
    // Top 3 village officials
    prisma.governmentOfficial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      take: 3
    }),
    
    // Top 3 UMKM
    prisma.umkm.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    }),
    
    // Gallery photos (4 items)
    prisma.media.findMany({
      where: { 
        entityType: 'gallery',
        mimeType: { startsWith: 'image/' }
      },
      orderBy: { createdAt: 'desc' },
      take: 4
    })
  ]);

  // Get media for news
  const newsIds = latestNews.map(item => item.id);
  const newsMedia = await prisma.media.findMany({
    where: {
      entityType: 'news',
      entityId: { in: newsIds },
      mimeType: { startsWith: 'image/' }
    },
    orderBy: { createdAt: 'desc' }
  });
  const newsMediaMap = new Map();
  newsMedia.forEach(media => {
    if (!newsMediaMap.has(media.entityId)) {
      newsMediaMap.set(media.entityId, media);
    }
  });

  // Get media for UMKM
  const umkmIds = topUMKM.map(item => item.id);
  const umkmMedia = await prisma.media.findMany({
    where: {
      entityType: 'umkm',
      entityId: { in: umkmIds },
      mimeType: { startsWith: 'image/' }
    },
    orderBy: { createdAt: 'desc' }
  });
  const umkmMediaMap = new Map();
  umkmMedia.forEach(media => {
    if (!umkmMediaMap.has(media.entityId)) {
      umkmMediaMap.set(media.entityId, media);
    }
  });

  // Get media for events
  const eventIds = upcomingEvents.map(item => item.id);
  const eventMedia = await prisma.media.findMany({
    where: {
      entityType: 'event',
      entityId: { in: eventIds },
      mimeType: { startsWith: 'image/' }
    },
    orderBy: { createdAt: 'desc' }
  });
  const eventMediaMap = new Map();
  eventMedia.forEach(media => {
    if (!eventMediaMap.has(media.entityId)) {
      eventMediaMap.set(media.entityId, media);
    }
  });

  return (
    <div className='flex flex-col items-center pt-20'>
      {/* Hero Section with Background Image */}
      <div className='relative w-full mb-16' data-aos="fade-up">
        <div className='relative overflow-hidden rounded-2xl min-h-[60vh]'>
          {/* Background Image */}
          <div 
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url("https://desabanyuanyar.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-04-at-19.31.32-1-1-637x427.jpeg")`,
            }}
          />
          
          {/* Dark Overlay for better text readability */}
          <div className='absolute inset-0 bg-black/50' />
          
          {/* Hero Content */}
          <div className='relative z-10 flex items-center justify-center min-h-[60vh] p-8'>
            <div className='text-center max-w-3xl'>
              <Badge className='bg-primary rounded-full py-2 px-4 border-none text-sm mb-6' data-aos="fade-down" data-aos-delay="100">
                Green Smart Village 🌱
              </Badge>
              <h1 className='max-w-[25ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight text-white mb-6' data-aos="fade-up" data-aos-delay="200">
                Desa Banyuanyar
              </h1>
              <p className='max-w-[70ch] xs:text-lg text-white/90 mb-8' data-aos="fade-up" data-aos-delay="300">
                Selamat datang di website resmi Green Smart Village Desa Banyuanyar Kecamatan Ampel Kabupaten Boyolali. 
                Temukan keindahan alam, budaya, dan keramahan masyarakat desa kami yang kaya akan tradisi dan potensi wisata.
              </p>
              <div className='flex flex-col sm:flex-row items-center sm:justify-center gap-4' data-aos="fade-up" data-aos-delay="400">
                <Button
                  size='lg'
                  className='w-full sm:w-auto rounded-full text-base'
                  asChild
                >
                  <Link href="/umkm/paket-wisata">
                    Jelajahi Wisata <ArrowUpRight className='!h-5 !w-5' />
                  </Link>
                </Button>
                <Button
                  size='lg'
                  className='w-full sm:w-auto rounded-full text-base bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/30 hover:border-white/50 transition-all duration-300'
                  asChild
                >
                  <Link href="/profil-desa/visi-misi">
                    <MapPin className='!h-5 !w-5' /> Profil Desa
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Village Highlights */}
      <div className='max-w-6xl mx-auto' data-aos="fade-up">
        <div className='text-center mb-12'>
          <h2 className='text-2xl font-semibold mb-4' data-aos="fade-down" data-aos-delay="100">Keunggulan Desa Banyuanyar</h2>
          <p className='text-muted-foreground' data-aos="fade-up" data-aos-delay="200">Green Smart Village dengan berbagai potensi wisata dan UMKM</p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='text-center p-6 bg-primary border border-primary rounded-xl hover:shadow-lg transition-shadow hover:bg-primary/90' data-aos="zoom-in" data-aos-delay="50">
            <div className='h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4'>
              <Mountain className='h-8 w-8 text-primary' />
            </div>
            <h3 className='font-semibold mb-2 text-white'>Wisata Alam</h3>
            <p className='text-sm text-white/90'>Pemandangan sawah hijau dan udara pegunungan yang sejuk</p>
          </div>
          
          <div className='text-center p-6 bg-primary border border-primary rounded-xl hover:shadow-lg transition-shadow hover:bg-primary/90' data-aos="zoom-in" data-aos-delay="100">
            <div className='h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4'>
              <Coffee className='h-8 w-8 text-primary' />
            </div>
            <h3 className='font-semibold mb-2 text-white'>Kampus Kopi</h3>
            <p className='text-sm text-white/90'>Nikmati kopi berkualitas dari kebun kopi lokal</p>
          </div>
          
          <div className='text-center p-6 bg-primary border border-primary rounded-xl hover:shadow-lg transition-shadow hover:bg-primary/90' data-aos="zoom-in" data-aos-delay="150">
            <div className='h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4'>
              <Users className='h-8 w-8 text-primary' />
            </div>
            <h3 className='font-semibold mb-2 text-white'>Budaya Lokal</h3>
            <p className='text-sm text-white/90'>Kesenian tradisional dan ritual adat yang unik</p>
          </div>
          
          <div className='text-center p-6 bg-primary border border-primary rounded-xl hover:shadow-lg transition-shadow hover:bg-primary/90' data-aos="zoom-in" data-aos-delay="200">
            <div className='h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 Davenport, IA'>
              <Camera className='h-8 w-8 text-primary' />
            </div>
            <h3 className='font-semibold mb-2 text-white'>Spot Foto</h3>
            <p className='text-sm text-white/90'>Lokasi instagramable untuk dokumentasi wisata</p>
          </div>
        </div>
      </div>
      
      {/* Village Stats Section */}
      <div className='mt-20 max-w-4xl mx-auto' data-aos="fade-up">
        <div className='text-center mb-8'>
          <p className='text-sm text-muted-foreground' data-aos="fade-down" data-aos-delay="100">Desa Banyuanyar dalam Angka</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='text-center' data-aos="fade-up" data-aos-delay="50">
            <div className='text-3xl font-bold text-primary mb-2'>500+</div>
            <div className='text-sm text-muted-foreground'>Penduduk</div>
          </div>
          <div className='text-center' data-aos="fade-up" data-aos-delay="100">
            <div className='text-3xl font-bold text-primary mb-2'>10+</div>
            <div className='text-sm text-muted-foreground'>UMKM</div>
          </div>
          <div className='text-center' data-aos="fade-up" data-aos-delay="150">
            <div className='text-3xl font-bold text-primary mb-2'>8+</div>
            <div className='text-sm text-muted-foreground'>Paket Wisata</div>
          </div>
          <div className='text-center' data-aos="fade-up" data-aos-delay="200">
            <div className='text-3xl font-bold text-primary mb-2'>7</div>
            <div className='text-sm text-muted-foreground'>Omah Wisata</div>
          </div>
        </div>
      </div>

      {/* Natural Beauty Section */}
      <div className='mt-20 max-w-6xl mx-auto' data-aos="fade-up">
        <div className='text-center mb-12'>
          <h2 className='text-2xl font-semibold mb-4' data-aos="fade-down" data-aos-delay="100">Keindahan Alam Desa Banyuanyar</h2>
          <p className='text-muted-foreground' data-aos="fade-up" data-aos-delay="200">Nikmati pemandangan alam yang memukau sepanjang hari</p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center p-6 bg-gradient-to-br from-yellow- decimal-to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800' data-aos="flip-left" data-aos-delay="50">
            <div className='h-16 w-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Sun className='h-8 w-8 text-yellow-600' />
            </div>
            <h3 className='font-semibold mb-2 text-yellow-800 dark:text-yellow-200'>Pagi Hari</h3>
            <p className='text-sm text-yellow-700 dark:text-yellow-300'>Matahari terbit di balik pegunungan dengan kabut tipis yang menutupi sawah hijau</p>
          </div>
          
          <div className='text-center p-6 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800' data-aos="flip-left" data-aos-delay="100">
            <div className='h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Trees className='h-8 w-8 text-green-600' />
            </div>
            <h3 className='font-semibold mb-2 text-green-800 dark:text-green-200'>Siang Hari</h3>
            <p className='text-sm text-green-700 dark:text-green-300'>Sawah hijau yang luas dengan aktivitas petani yang sibuk mengurus tanaman</p>
          </div>
          
          <div className='text-center p-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800' data-aos="flip-left" data-aos-delay="150">
            <div className='h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Moon className='h-8 w-8 text-blue-600' />
            </div>
            <h3 className='font-semibold mb-2 text-blue-800 dark:text-blue-200'>Malam Hari</h3>
            <p className='text-sm text-blue-700 dark:text-blue-300'>Langit berbintang dengan suara jangkrik dan angin malam yang sejuk</p>
          </div>
        </div>
      </div>

      {/* Large Village Image Section */}
      <div className='mt-20 w-full' data-aos="zoom-in">
        <div className='relative h-[75vh] w-full overflow-hidden rounded-2xl'>
          {/* Background Image with Overlay */}
          <div 
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url('/images/village-landscape.jpg')`,
            }}
          >
            {/* Dark Overlay for better text readability */}
            <div className='absolute inset-0 bg-black/40'></div>
            
            {/* Content Overlay */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center text-white max-w-4xl px-6'>
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight' data-aos="fade-down" data-aos-delay="100">
                  Keindahan Alam
                  <br />
                  <span className='text-yellow-300'>Desa Banyuanyar</span>
                </h2>
                <p className='text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto' data-aos="fade-up" data-aos-delay="200">
                  Nikmati pemandangan sawah hijau yang membentang luas, udara pegunungan yang sejuk, 
                  dan keramahan masyarakat yang hangat
                </p>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-4' data-aos="fade-up" data-aos-delay="300">
                  <Link href="/informasi/galeri">
                    <div className='bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer'>
                      <Camera className='inline-block w-5 h-5 mr-2' />
                      Lihat Galeri Foto
                    </div>
                  </Link>
                  <Link href="/umkm/paket-wisata">
                    <div className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors cursor-pointer'>
                      <MapPin className='inline-block w-5 h-5 mr-2' />
                      Jelajahi Wisata
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fallback if image doesn't exist */}
          <div className='absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center'>
            <div className='text-center text-white max-w-4xl px-6'>
              <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
                Keindahan Alam
                <br />
                <span className='text-yellow-300'>Desa Banyuanyar</span>
              </h2>
              <p className='text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto'>
                Nikmati pemandangan sawah hijau yang membentang luas, udara pegunungan yang sejuk, 
                dan keramahan masyarakat yang hangat
              </p>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                <Link href="/informasi/galeri">
                  <div className='bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer'>
                    <Camera className='inline-block w-5 h-5 mr-2' />
                    Lihat Galeri Foto
                  </div>
                </Link>
                <Link href="/umkm/paket-wisata">
                  <div className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors cursor-pointer'>
                    <MapPin className='inline-block w-5 h-5 mr-2' />
                    Jelajahi Wisata
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Showcase Sections */}
      <div className='mt-20 w-full max-w-7xl mx-auto px-6 space-y-20'>
        
        {/* Latest News Section */}
        <div className='text-center' data-aos="fade-up">
          <h2 className='text-3xl font-bold mb-4' data-aos="fade-down" data-aos-delay="100">Berita Terbaru Desa</h2>
          <p className='text-muted-foreground mb-8' data-aos="fade-up" data-aos-delay="200">Informasi terkini seputar kegiatan dan perkembangan desa</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {latestNews.length > 0 ? latestNews.map((news, index) => {
              const newsImage = newsMediaMap.get(news.id);
              return (
                <Card key={news.id} className='hover:shadow-lg transition-shadow pt-0 overflow-hidden' data-aos="fade-up" data-aos-delay={50 * (index + 1)}>
                  <div className='aspect-video overflow-hidden'>
                    {newsImage ? (
                      <ImageWithFallback
                        src={newsImage.fileUrl}
                        alt={news.title}
                        width={400}
                        height={225}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                        fallbackClassName='w-full h-full'
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center'>
                        <FileText className='w-12 h-12 text-blue-400' />
                      </div>
                    )}
                  </div>
                  <CardHeader className='flex-1'>
                    <div className='flex items-center gap-2 mb-3'>
                      {news.category && (
                        <BadgeUI variant='outline' className='text-xs'>
                          {news.category.name}
                        </BadgeUI>
                      )}
                      <span className='text-xs text-muted-foreground'>
                        {news.publishedAt ? format(news.publishedAt, 'dd MMM yyyy', { locale: idLocale }) : 'N/A'}
                      </span>
                    </div>
                    <CardTitle className='text-lg leading-tight line-clamp-2'>{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <p className='text-sm text-muted-foreground line-clamp-3 mb-4'>
                      {news.content
                        .replace(/<[^>]*>/g, '') // Remove HTML tags
                        .replace(/&[^;]+;/g, ' ') // Replace ALL HTML entities with space
                        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                        .trim()
                        .substring(0, 120)}...
                    </p>
                    <Link href={`/informasi/berita/${news.slug}`} className='text-primary hover:underline text-sm'>
                      Baca Selengkapnya →
                    </Link>
                  </CardContent>
                </Card>
              );
            }) : (
              <div className='col-span-full text-center text-muted-foreground py-12'>
                Belum ada berita yang tersedia
              </div>
            )}
          </div>
          <div className='mt-8'>
            <Link href="/informasi/berita" className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'>
              Lihat Semua Berita <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* Latest Events Section */}
        <div className='text-center' data-aos="fade-up">
          <h2 className='text-3xl font-bold mb-4' data-aos="fade-down" data-aos-delay="100">Agenda Kegiatan Terbaru</h2>
          <p className='text-muted-foreground mb-8' data-aos="fade-up" data-aos-delay="200">Kegiatan terbaru yang telah dan akan diselenggarakan di desa</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => {
              const eventImage = eventMediaMap.get(event.id);
              return (
                <Card key={event.id} className='hover:shadow-lg transition-shadow pt-0 overflow-hidden' data-aos="fade-up" data-aos-delay={50 * (index + 1)}>
                  {/* Event Image */}
                  <div className='aspect-video overflow-hidden'>
                    {eventImage ? (
                      <ImageWithFallback
                        src={eventImage.fileUrl}
                        alt={event.title}
                        width={400}
                        height={225}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                        fallbackClassName='w-full h-full'
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center'>
                        <Calendar className='w-12 h-12 text-green-400' />
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className='flex-1'>
                    <div className='flex items-center gap-2 mb-3'>
                      <Calendar className='h-4 w-4 text-green-500' />
                      <span className='text-sm text-muted-foreground'>
                        {format(event.date, 'dd MMM yyyy', { locale: idLocale })}
                      </span>
                    </div>
                    <CardTitle className='text-lg leading-tight'>{event.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className='pt-0'>
                    <p className='text-sm text-muted-foreground line-clamp-3 mb-4'>{event.description}</p>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <MapPin className='h-4 w-4' />
                      <span>{event.location || 'Lokasi belum ditentukan'}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            }) : (
              <div className='col-span-full text-center text-muted-foreground py-12'>
                Belum ada agenda kegiatan yang tersedia
              </div>
            )}
          </div>
          <div className='mt-8'>
            <Link href="/informasi/agenda-kegiatan" className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'>
              Lihat Semua Agenda <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* Village Officials Section */}
        <div className='text-center' data-aos="fade-up">
          <h2 className='text-3xl font-bold mb-4' data-aos="fade-down" data-aos-delay="100">Perangkat Desa</h2>
          <p className='text-muted-foreground mb-8' data-aos="fade-up" data-aos-delay="200">Kenali para pemimpin dan pengelola pemerintahan desa</p>
          <div className='bg-primary rounded-2xl p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {villageOfficials.length > 0 ? villageOfficials.map((official, index) => (
                <Card key={official.id} className='hover:shadow-lg transition-shadow text-center' data-aos="zoom-in" data-aos-delay={50 * (index + 1)}>
                  <div className='p-6'>
                    <div className='h-32 w-32 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center mx-auto mb-4'>
                      {official.photoUrl ? (
                        <ImageWithFallback
                          src={official.photoUrl}
                          alt={official.name}
                          width={128}
                          height={128}
                          className='w-full h-full object-cover rounded-full'
                          fallbackClassName='w-full h-full rounded-full'
                        />
                      ) : (
                        <Users className='h-16 w-16 text-primary' />
                      )}
                    </div>
                    <h3 className='font-semibold text-lg mb-2'>{official.name}</h3>
                    <BadgeUI className='mb-3'>{official.position}</BadgeUI>
                    {official.bio && (
                      <p className='text-sm text-muted-foreground line-clamp-3'>{official.bio}</p>
                    )}
                  </div>
                </Card>
              )) : (
                <div className='col-span-full text-center text-muted-foreground py-12'>
                  Belum ada data perangkat desa
                </div>
              )}
            </div>
          </div>
          <div className='mt-8'>
            <Link href="/pemerintah/perangkat-desa" className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'>
              Lihat Semua Perangkat <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* UMKM Showcase Section */}
        <div className='text-center' data-aos="fade-up">
          <h2 className='text-3xl font-bold mb-4' data-aos="fade-down" data-aos-delay="100">UMKM Unggulan Desa</h2>
          <p className='text-muted-foreground mb-8' data-aos="fade-up" data-aos-delay="200">Produk dan jasa berkualitas dari pelaku UMKM lokal</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {topUMKM.length > 0 ? topUMKM.map((umkm, index) => {
              const umkmImage = umkmMediaMap.get(umkm.id);
              return (
                <Card key={umkm.id} className='hover:shadow-lg transition-shadow pt-0 overflow-hidden' data-aos="fade-up" data-aos-delay={50 * (index + 1)}>
                  <div className='aspect-video overflow-hidden'>
                    {umkmImage ? (
                      <ImageWithFallback
                        src={umkmImage.fileUrl}
                        alt={umkm.name}
                        width={400}
                        height={225}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                        fallbackClassName='w-full h-full'
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center'>
                        <Store className='w-12 h-12 text-orange-400' />
                      </div>
                    )}
                  </div>
                  <CardHeader className='flex-1'>
                    <CardTitle className='text-lg leading-tight'>{umkm.name}</CardTitle>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <p className='text-sm text-muted-foreground line-clamp-3 mb-4'>{umkm.description}</p>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground mb-4'>
                      <MapPin className='h-4 w-4' />
                      <span>{umkm.address || 'Alamat belum tersedia'}</span>
                    </div>
                    <Link href={`/umkm/${umkm.id}`} className='text-primary hover:underline text-sm'>
                      Lihat Detail →
                    </Link>
                  </CardContent>
                </Card>
              );
            }) : (
              <div className='col-span-full text-center text-muted-foreground py-12'>
                Belum ada data UMKM yang tersedia
              </div>
            )}
          </div>
          <div className='mt-8'>
            <Link href="/umkm" className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'>
              Lihat Semua UMKM <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* Photo Gallery Preview Section */}
        <div className='text-center' data-aos="fade-up">
          <h2 className='text-3xl font-bold mb-4' data-aos="fade-down" data-aos-delay="100">Galeri Foto Desa</h2>
          <p className='text-muted-foreground mb-8' data-aos="fade-up" data-aos-delay="200">Kumpulan foto keindahan dan aktivitas desa</p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {galleryPhotos.length > 0 ? galleryPhotos.map((photo, index) => (
              <div key={photo.id} className='aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300' data-aos="zoom-in" data-aos-delay={50 * (index + 1)}>
                <ImageWithFallback
                  src={photo.fileUrl}
                  alt='Galeri Desa'
                  width={300}
                  height={300}
                  className='w-full h-full object-cover'
                  fallbackClassName='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'
                />
              </div>
            )) : (
              [...Array(4)].map((_, i) => (
                <div key={i} className='aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center' data-aos="zoom-in" data-aos-delay={50 * (i + 1)}>
                  <Camera className='h-8 w-8 text-gray-400' />
                </div>
              ))
            )}
          </div>
          <div className='mt-6'>
            <Link href="/informasi/galeri" className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'>
              Lihat Semua Foto <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}