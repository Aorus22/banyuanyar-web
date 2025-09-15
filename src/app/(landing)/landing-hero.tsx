import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  MapPin,
  Users,
  Calendar,
  Coffee,
  Mountain,
  Camera,
  Trees,
  Flower,
  Sun,
  Moon,
  FileText,
  Store
} from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { safeFormatDateOnly } from '@/lib/date-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

export const dynamic = 'force-dynamic';

export default async function LandingHero() {
  // Fetch real data from database
  const [latestNews, upcomingEvents, villageOfficials, topUMKM, galleryPhotos] =
    await Promise.all([
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
  const newsIds = latestNews.map((item) => item.id);
  const newsMedia = await prisma.media.findMany({
    where: {
      entityType: 'news',
      entityId: { in: newsIds },
      mimeType: { startsWith: 'image/' }
    },
    orderBy: { createdAt: 'desc' }
  });
  const newsMediaMap = new Map();
  newsMedia.forEach((media) => {
    if (!newsMediaMap.has(media.entityId)) {
      newsMediaMap.set(media.entityId, media);
    }
  });

  // Get media for UMKM
  const umkmIds = topUMKM.map((item) => item.id);
  const umkmMedia = await prisma.media.findMany({
    where: {
      entityType: 'umkm',
      entityId: { in: umkmIds },
      mimeType: { startsWith: 'image/' }
    },
    orderBy: { createdAt: 'desc' }
  });
  const umkmMediaMap = new Map();
  umkmMedia.forEach((media) => {
    if (!umkmMediaMap.has(media.entityId)) {
      umkmMediaMap.set(media.entityId, media);
    }
  });

  // Get media for events
  const eventIds = upcomingEvents.map((item) => item.id);
  const eventMedia = await prisma.media.findMany({
    where: {
      entityType: 'event',
      entityId: { in: eventIds },
      mimeType: { startsWith: 'image/' }
    },
    orderBy: { createdAt: 'desc' }
  });
  const eventMediaMap = new Map();
  eventMedia.forEach((media) => {
    if (!eventMediaMap.has(media.entityId)) {
      eventMediaMap.set(media.entityId, media);
    }
  });

  return (
    <div className='flex flex-col items-center pt-20'>
      {/* Hero Section with Background Image */}
      <div className='relative mb-16 w-full' data-aos='fade-up'>
        <div className='relative min-h-[60vh] overflow-hidden rounded-2xl'>
          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url("https://desabanyuanyar.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-04-at-19.31.32-1-1-637x427.jpeg")`
            }}
          />

          {/* Dark Overlay for better text readability */}
          <div className='absolute inset-0 bg-black/50' />

          {/* Hero Content */}
          <div className='relative z-10 flex min-h-[60vh] items-center justify-center p-8'>
            <div className='max-w-3xl text-center'>
              <Badge
                className='bg-primary mb-6 rounded-full border-none px-4 py-2 text-sm'
                data-aos='fade-down'
                data-aos-delay='100'
              >
                Green Smart Village 🌱
              </Badge>
              <h1
                className='xs:text-4xl mb-6 max-w-[25ch] text-3xl !leading-[1.2] font-bold tracking-tight text-white sm:text-5xl md:text-6xl'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                Desa Banyuanyar
              </h1>
              <p
                className='xs:text-lg mb-8 max-w-[70ch] text-white/90'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                Selamat datang di website resmi Green Smart Village Desa
                Banyuanyar Kecamatan Ampel Kabupaten Boyolali. Temukan keindahan
                alam, budaya, dan keramahan masyarakat desa kami yang kaya akan
                tradisi dan potensi wisata.
              </p>
              <div
                className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'
                data-aos='fade-up'
                data-aos-delay='400'
              >
                <Button
                  size='lg'
                  className='w-full rounded-full text-base sm:w-auto'
                  asChild
                >
                  <Link href='/umkm/paket-wisata'>
                    Jelajahi Wisata <ArrowUpRight className='!h-5 !w-5' />
                  </Link>
                </Button>
                <Button
                  size='lg'
                  className='w-full rounded-full border border-white/30 bg-white/20 text-base text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/30 sm:w-auto'
                  asChild
                >
                  <Link href='/profil-desa/visi-misi'>
                    <MapPin className='!h-5 !w-5' /> Profil Desa
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Village Highlights */}
      <div className='mx-auto max-w-6xl' data-aos='fade-up'>
        <div className='mb-12 text-center'>
          <h2
            className='mb-4 text-2xl font-semibold'
            data-aos='fade-down'
            data-aos-delay='100'
          >
            Keunggulan Desa Banyuanyar
          </h2>
          <p
            className='text-muted-foreground'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Green Smart Village dengan berbagai potensi wisata dan UMKM
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <div
            className='bg-primary border-primary hover:bg-primary/90 rounded-xl border p-6 text-center transition-shadow hover:shadow-lg'
            data-aos='zoom-in'
            data-aos-delay='50'
          >
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white'>
              <Mountain className='text-primary h-8 w-8' />
            </div>
            <h3 className='mb-2 font-semibold text-white'>Wisata Alam</h3>
            <p className='text-sm text-white/90'>
              Pemandangan sawah hijau dan udara pegunungan yang sejuk
            </p>
          </div>

          <div
            className='bg-primary border-primary hover:bg-primary/90 rounded-xl border p-6 text-center transition-shadow hover:shadow-lg'
            data-aos='zoom-in'
            data-aos-delay='100'
          >
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white'>
              <Coffee className='text-primary h-8 w-8' />
            </div>
            <h3 className='mb-2 font-semibold text-white'>Kampus Kopi</h3>
            <p className='text-sm text-white/90'>
              Nikmati kopi berkualitas dari kebun kopi lokal
            </p>
          </div>

          <div
            className='bg-primary border-primary hover:bg-primary/90 rounded-xl border p-6 text-center transition-shadow hover:shadow-lg'
            data-aos='zoom-in'
            data-aos-delay='150'
          >
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white'>
              <Users className='text-primary h-8 w-8' />
            </div>
            <h3 className='mb-2 font-semibold text-white'>Budaya Lokal</h3>
            <p className='text-sm text-white/90'>
              Kesenian tradisional dan ritual adat yang unik
            </p>
          </div>

          <div
            className='bg-primary border-primary hover:bg-primary/90 rounded-xl border p-6 text-center transition-shadow hover:shadow-lg'
            data-aos='zoom-in'
            data-aos-delay='200'
          >
            <div className='Davenport, IA mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white'>
              <Camera className='text-primary h-8 w-8' />
            </div>
            <h3 className='mb-2 font-semibold text-white'>Spot Foto</h3>
            <p className='text-sm text-white/90'>
              Lokasi instagramable untuk dokumentasi wisata
            </p>
          </div>
        </div>
      </div>

      {/* Village Stats Section */}
      <div className='mx-auto mt-20 max-w-4xl' data-aos='fade-up'>
        <div className='mb-8 text-center'>
          <p
            className='text-muted-foreground text-sm'
            data-aos='fade-down'
            data-aos-delay='100'
          >
            Desa Banyuanyar dalam Angka
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='text-center' data-aos='fade-up' data-aos-delay='50'>
            <div className='text-primary mb-2 text-3xl font-bold'>500+</div>
            <div className='text-muted-foreground text-sm'>Penduduk</div>
          </div>
          <div className='text-center' data-aos='fade-up' data-aos-delay='100'>
            <div className='text-primary mb-2 text-3xl font-bold'>10+</div>
            <div className='text-muted-foreground text-sm'>UMKM</div>
          </div>
          <div className='text-center' data-aos='fade-up' data-aos-delay='150'>
            <div className='text-primary mb-2 text-3xl font-bold'>8+</div>
            <div className='text-muted-foreground text-sm'>Paket Wisata</div>
          </div>
          <div className='text-center' data-aos='fade-up' data-aos-delay='200'>
            <div className='text-primary mb-2 text-3xl font-bold'>7</div>
            <div className='text-muted-foreground text-sm'>Omah Wisata</div>
          </div>
        </div>
      </div>

      {/* Natural Beauty Section */}
      <div className='mx-auto mt-20 max-w-6xl' data-aos='fade-up'>
        <div className='mb-12 text-center'>
          <h2
            className='mb-4 text-2xl font-semibold'
            data-aos='fade-down'
            data-aos-delay='100'
          >
            Keindahan Alam Desa Banyuanyar
          </h2>
          <p
            className='text-muted-foreground'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Nikmati pemandangan alam yang memukau sepanjang hari
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div
            className='from-yellow- decimal-to-orange-100 rounded-xl border border-yellow-200 bg-gradient-to-br p-6 text-center dark:border-yellow-800 dark:from-yellow-900/20 dark:to-orange-900/20'
            data-aos='flip-left'
            data-aos-delay='50'
          >
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20'>
              <Sun className='h-8 w-8 text-yellow-600' />
            </div>
            <h3 className='mb-2 font-semibold text-yellow-800 dark:text-yellow-200'>
              Pagi Hari
            </h3>
            <p className='text-sm text-yellow-700 dark:text-yellow-300'>
              Matahari terbit di balik pegunungan dengan kabut tipis yang
              menutupi sawah hijau
            </p>
          </div>

          <div
            className='rounded-xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-6 text-center dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20'
            data-aos='flip-left'
            data-aos-delay='100'
          >
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20'>
              <Trees className='h-8 w-8 text-green-600' />
            </div>
            <h3 className='mb-2 font-semibold text-green-800 dark:text-green-200'>
              Siang Hari
            </h3>
            <p className='text-sm text-green-700 dark:text-green-300'>
              Sawah hijau yang luas dengan aktivitas petani yang sibuk mengurus
              tanaman
            </p>
          </div>

          <div
            className='rounded-xl border border-blue-200 bg-gradient-to-br from-blue-100 to-indigo-100 p-6 text-center dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20'
            data-aos='flip-left'
            data-aos-delay='150'
          >
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20'>
              <Moon className='h-8 w-8 text-blue-600' />
            </div>
            <h3 className='mb-2 font-semibold text-blue-800 dark:text-blue-200'>
              Malam Hari
            </h3>
            <p className='text-sm text-blue-700 dark:text-blue-300'>
              Langit berbintang dengan suara jangkrik dan angin malam yang sejuk
            </p>
          </div>
        </div>
      </div>

      {/* Large Village Image Section */}
      <div className='mt-20 w-full' data-aos='zoom-in'>
        <div className='relative h-[75vh] w-full overflow-hidden rounded-2xl'>
          {/* Background Image with Overlay */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url('/images/village-landscape.jpg')`
            }}
          >
            {/* Dark Overlay for better text readability */}
            <div className='absolute inset-0 bg-black/40'></div>

            {/* Content Overlay */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='max-w-4xl px-6 text-center text-white'>
                <h2
                  className='mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl'
                  data-aos='fade-down'
                  data-aos-delay='100'
                >
                  Keindahan Alam
                  <br />
                  <span className='text-yellow-300'>Desa Banyuanyar</span>
                </h2>
                <p
                  className='mx-auto mb-8 max-w-2xl text-lg opacity-90 md:text-xl'
                  data-aos='fade-up'
                  data-aos-delay='200'
                >
                  Nikmati pemandangan sawah hijau yang membentang luas, udara
                  pegunungan yang sejuk, dan keramahan masyarakat yang hangat
                </p>
                <div
                  className='flex flex-col items-center justify-center gap-4 sm:flex-row'
                  data-aos='fade-up'
                  data-aos-delay='300'
                >
                  <Link href='/informasi/galeri'>
                    <div className='cursor-pointer rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100'>
                      <Camera className='mr-2 inline-block h-5 w-5' />
                      Lihat Galeri Foto
                    </div>
                  </Link>
                  <Link href='/umkm/paket-wisata'>
                    <div className='cursor-pointer rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-gray-900'>
                      <MapPin className='mr-2 inline-block h-5 w-5' />
                      Jelajahi Wisata
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Fallback if image doesn't exist */}
          <div className='from-primary via-primary/80 to-primary/60 absolute inset-0 flex items-center justify-center bg-gradient-to-br'>
            <div className='max-w-4xl px-6 text-center text-white'>
              <h2 className='mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl'>
                Keindahan Alam
                <br />
                <span className='text-yellow-300'>Desa Banyuanyar</span>
              </h2>
              <p className='mx-auto mb-8 max-w-2xl text-lg opacity-90 md:text-xl'>
                Nikmati pemandangan sawah hijau yang membentang luas, udara
                pegunungan yang sejuk, dan keramahan masyarakat yang hangat
              </p>
              <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                <Link href='/informasi/galeri'>
                  <div className='cursor-pointer rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100'>
                    <Camera className='mr-2 inline-block h-5 w-5' />
                    Lihat Galeri Foto
                  </div>
                </Link>
                <Link href='/umkm/paket-wisata'>
                  <div className='cursor-pointer rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-gray-900'>
                    <MapPin className='mr-2 inline-block h-5 w-5' />
                    Jelajahi Wisata
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Showcase Sections */}
      <div className='mx-auto mt-20 w-full max-w-7xl space-y-20 px-6'>
        {/* Latest News Section */}
        <div className='text-center' data-aos='fade-up'>
          <h2
            className='mb-4 text-3xl font-bold'
            data-aos='fade-down'
            data-aos-delay='100'
          >
            Berita Terbaru Desa
          </h2>
          <p
            className='text-muted-foreground mb-8'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Informasi terkini seputar kegiatan dan perkembangan desa
          </p>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {latestNews.length > 0 ? (
              latestNews.map((news, index) => {
                const newsImage = newsMediaMap.get(news.id);
                return (
                  <Card
                    key={news.id}
                    className='overflow-hidden pt-0 transition-shadow hover:shadow-lg'
                    data-aos='fade-up'
                    data-aos-delay={50 * (index + 1)}
                  >
                    <div className='aspect-video overflow-hidden'>
                      {newsImage ? (
                        <ImageWithFallback
                          src={newsImage.fileUrl}
                          alt={news.title}
                          width={400}
                          height={225}
                          className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                          fallbackClassName='w-full h-full'
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200'>
                          <FileText className='h-12 w-12 text-blue-400' />
                        </div>
                      )}
                    </div>
                    <CardHeader className='flex-1'>
                      <div className='mb-3 flex items-center gap-2'>
                        {news.category && (
                          <BadgeUI variant='outline' className='text-xs'>
                            {news.category.name}
                          </BadgeUI>
                        )}
                        <span className='text-muted-foreground text-xs'>
                          {news.publishedAt
                            ? safeFormatDateOnly(news.publishedAt)
                            : 'N/A'}
                        </span>
                      </div>
                      <CardTitle className='line-clamp-2 text-lg leading-tight'>
                        {news.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-muted-foreground mb-4 line-clamp-3 text-sm'>
                        {news.content
                          .replace(/<[^>]*>/g, '') // Remove HTML tags
                          .replace(/&[^;]+;/g, ' ') // Replace ALL HTML entities with space
                          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                          .trim()
                          .substring(0, 120)}
                        ...
                      </p>
                      <Link
                        href={`/informasi/berita/${news.slug}`}
                        className='text-primary text-sm hover:underline'
                      >
                        Baca Selengkapnya →
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className='text-muted-foreground col-span-full py-12 text-center'>
                Belum ada berita yang tersedia
              </div>
            )}
          </div>
          <div className='mt-8'>
            <Link
              href='/informasi/berita'
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors'
            >
              Lihat Semua Berita <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* Latest Events Section */}
        <div className='text-center' data-aos='fade-up'>
          <h2
            className='mb-4 text-3xl font-bold'
            data-aos='fade-down'
            data-aos-delay='100'
          >
            Agenda Kegiatan Terbaru
          </h2>
          <p
            className='text-muted-foreground mb-8'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Kegiatan terbaru yang telah dan akan diselenggarakan di desa
          </p>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => {
                const eventImage = eventMediaMap.get(event.id);
                return (
                  <Card
                    key={event.id}
                    className='overflow-hidden pt-0 transition-shadow hover:shadow-lg'
                    data-aos='fade-up'
                    data-aos-delay={50 * (index + 1)}
                  >
                    {/* Event Image */}
                    <div className='aspect-video overflow-hidden'>
                      {eventImage ? (
                        <ImageWithFallback
                          src={eventImage.fileUrl}
                          alt={event.title}
                          width={400}
                          height={225}
                          className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                          fallbackClassName='w-full h-full'
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-200'>
                          <Calendar className='h-12 w-12 text-green-400' />
                        </div>
                      )}
                    </div>

                    <CardHeader className='flex-1'>
                      <div className='mb-3 flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-green-500' />
                        <span className='text-muted-foreground text-sm'>
                          {safeFormatDateOnly(event.date)}
                        </span>
                      </div>
                      <CardTitle className='text-lg leading-tight'>
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className='pt-0'>
                      <p className='text-muted-foreground mb-4 line-clamp-3 text-sm'>
                        {event.description}
                      </p>
                      <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                        <MapPin className='h-4 w-4' />
                        <span>
                          {event.location || 'Lokasi belum ditentukan'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className='text-muted-foreground col-span-full py-12 text-center'>
                Belum ada agenda kegiatan yang tersedia
              </div>
            )}
          </div>
          <div className='mt-8'>
            <Link
              href='/informasi/agenda-kegiatan'
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors'
            >
              Lihat Semua Agenda <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* Village Officials Section */}
        <div className='text-center' data-aos='fade-up'>
          <h2
            className='mb-4 text-3xl font-bold'
            data-aos='fade-down'
            data-aos-delay='100'
          >
            Perangkat Desa
          </h2>
          <p
            className='text-muted-foreground mb-8'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Kenali para pemimpin dan pengelola pemerintahan desa
          </p>
          <div className='bg-primary rounded-2xl p-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {villageOfficials.length > 0 ? (
                villageOfficials.map((official, index) => (
                  <Card
                    key={official.id}
                    className='text-center transition-shadow hover:shadow-lg'
                    data-aos='zoom-in'
                    data-aos-delay={50 * (index + 1)}
                  >
                    <div className='p-6'>
                      <div className='from-primary/20 to-primary/30 mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br'>
                        {official.photoUrl ? (
                          <ImageWithFallback
                            src={official.photoUrl}
                            alt={official.name}
                            width={128}
                            height={128}
                            className='h-full w-full rounded-full object-cover'
                            fallbackClassName='w-full h-full rounded-full'
                          />
                        ) : (
                          <Users className='text-primary h-16 w-16' />
                        )}
                      </div>
                      <h3 className='mb-2 text-lg font-semibold'>
                        {official.name}
                      </h3>
                      <BadgeUI className='mb-3'>{official.position}</BadgeUI>
                      {official.bio && (
                        <p className='text-muted-foreground line-clamp-3 text-sm'>
                          {official.bio}
                        </p>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <div className='text-muted-foreground col-span-full py-12 text-center'>
                  Belum ada data perangkat desa
                </div>
              )}
            </div>
          </div>
          <div className='mt-8'>
            <Link
              href='/pemerintah/perangkat-desa'
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors'
            >
              Lihat Semua Perangkat <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* UMKM Showcase Section */}
        <div className='text-center' data-aos='fade-up'>
          <h2
            className='mb-4 text-3xl font-bold'
            data-aos='fade-down'
            data-aos-delay='100'
          >
            UMKM Unggulan Desa
          </h2>
          <p
            className='text-muted-foreground mb-8'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Produk dan jasa berkualitas dari pelaku UMKM lokal
          </p>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {topUMKM.length > 0 ? (
              topUMKM.map((umkm, index) => {
                const umkmImage = umkmMediaMap.get(umkm.id);
                return (
                  <Card
                    key={umkm.id}
                    className='overflow-hidden pt-0 transition-shadow hover:shadow-lg'
                    data-aos='fade-up'
                    data-aos-delay={50 * (index + 1)}
                  >
                    <div className='aspect-video overflow-hidden'>
                      {umkmImage ? (
                        <ImageWithFallback
                          src={umkmImage.fileUrl}
                          alt={umkm.name}
                          width={400}
                          height={225}
                          className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                          fallbackClassName='w-full h-full'
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200'>
                          <Store className='h-12 w-12 text-orange-400' />
                        </div>
                      )}
                    </div>
                    <CardHeader className='flex-1'>
                      <CardTitle className='text-lg leading-tight'>
                        {umkm.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-muted-foreground mb-4 line-clamp-3 text-sm'>
                        {umkm.description}
                      </p>
                      <div className='text-muted-foreground mb-4 flex items-center gap-2 text-sm'>
                        <MapPin className='h-4 w-4' />
                        <span>{umkm.address || 'Alamat belum tersedia'}</span>
                      </div>
                      <Link
                        href={`/umkm/${umkm.id}`}
                        className='text-primary text-sm hover:underline'
                      >
                        Lihat Detail →
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className='text-muted-foreground col-span-full py-12 text-center'>
                Belum ada data UMKM yang tersedia
              </div>
            )}
          </div>
          <div className='mt-8'>
            <Link
              href='/umkm'
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors'
            >
              Lihat Semua UMKM <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* Photo Gallery Preview Section */}
        <div className='text-center' data-aos='fade-up'>
          <h2
            className='mb-4 text-3xl font-bold'
            data-aos='fade-down'
            data-aos-delay='100'
          >
            Galeri Foto Desa
          </h2>
          <p
            className='text-muted-foreground mb-8'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Kumpulan foto keindahan dan aktivitas desa
          </p>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {galleryPhotos.length > 0
              ? galleryPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className='aspect-square overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105'
                    data-aos='zoom-in'
                    data-aos-delay={50 * (index + 1)}
                  >
                    <ImageWithFallback
                      src={photo.fileUrl}
                      alt='Galeri Desa'
                      width={300}
                      height={300}
                      className='h-full w-full object-cover'
                      fallbackClassName='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'
                    />
                  </div>
                ))
              : [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className='flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200'
                    data-aos='zoom-in'
                    data-aos-delay={50 * (i + 1)}
                  >
                    <Camera className='h-8 w-8 text-gray-400' />
                  </div>
                ))}
          </div>
          <div className='mt-6'>
            <Link
              href='/informasi/galeri'
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors'
            >
              Lihat Semua Foto <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
