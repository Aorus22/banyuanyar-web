import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { 
  IconTrendingDown, 
  IconTrendingUp, 
  IconNews, 
  IconCalendarEvent, 
  IconPhoto, 
  IconFileText,
  IconBuilding,
  IconPackage,
  IconHome,
  IconUsers,
  IconUser
} from '@tabler/icons-react';
import React from 'react';
import { getDashboardStats } from './query';
import { DashboardData } from './types';

export default async function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  const dashboardData: DashboardData = await getDashboardStats();
  const { stats, recentActivities } = dashboardData;

  return (
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Selamat Datang di Dashboard Admin 👋
          </h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <IconNews className='h-4 w-4' />
                Total Berita
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {stats.totalNews}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  {stats.publishedNews} Published
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {stats.publishedNews} berita sudah dipublikasi <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                {stats.totalNews - stats.publishedNews} berita masih draft
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <IconCalendarEvent className='h-4 w-4' />
                Total Agenda
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {stats.totalEvents}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconCalendarEvent />
                  Agenda Kegiatan
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Total agenda kegiatan desa <IconCalendarEvent className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Semua agenda yang sudah dijadwalkan
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <IconBuilding className='h-4 w-4' />
                Total UMKM
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {stats.totalUmkm}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconPackage />
                  {stats.totalUmkmProducts} Produk
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {stats.totalUmkmProducts} produk UMKM tersedia <IconPackage className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Usaha Mikro Kecil Menengah desa
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <IconHome className='h-4 w-4' />
                Total Wisata
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {stats.totalTourismPackages + stats.totalTourismHouses}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconHome />
                  {stats.totalTourismPackages} Paket
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {stats.totalTourismHouses} rumah penginapan <IconHome className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Destinasi wisata desa Banyuanyar
              </div>
            </CardFooter>
          </Card>
        </div>
        {/* Additional Stats Section */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='pb-3'>
              <CardDescription className='flex items-center gap-2'>
                <IconFileText className='h-4 w-4' />
                Total Dokumen
              </CardDescription>
              <CardTitle className='text-xl font-semibold'>{stats.totalDocuments}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardDescription className='flex items-center gap-2'>
                <IconUsers className='h-4 w-4' />
                Total Perangkat Desa
              </CardDescription>
              <CardTitle className='text-xl font-semibold'>{stats.totalGovernmentOfficials}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardDescription className='flex items-center gap-2'>
                <IconUser className='h-4 w-4' />
                Total User
              </CardDescription>
              <CardTitle className='text-xl font-semibold'>{stats.totalUsers}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardDescription className='flex items-center gap-2'>
                <IconPhoto className='h-4 w-4' />
                Total Galeri
              </CardDescription>
              <CardTitle className='text-xl font-semibold'>{stats.totalGallery}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activities Section */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {/* Recent News */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <IconNews className='h-5 w-5' />
                Berita Terbaru
              </CardTitle>
            </CardHeader>
            <div className='px-6 pb-6'>
              <div className='space-y-3'>
                {recentActivities.news.slice(0, 3).map((news) => (
                  <div key={news.id} className='flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors'>
                    <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium line-clamp-2'>{news.title}</p>
                      <div className='flex items-center gap-2 mt-1 text-xs text-muted-foreground'>
                        <span>{news.category?.name || 'Uncategorized'}</span>
                        <span>•</span>
                        <span>{news.author?.name || 'Anonymous'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Events */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <IconCalendarEvent className='h-5 w-5' />
                Agenda Terbaru
              </CardTitle>
            </CardHeader>
            <div className='px-6 pb-6'>
              <div className='space-y-3'>
                {recentActivities.events.slice(0, 3).map((event) => (
                  <div key={event.id} className='flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium line-clamp-2'>{event.title}</p>
                      <div className='flex items-center gap-2 mt-1 text-xs text-muted-foreground'>
                        <span>{new Date(event.date).toLocaleDateString('id-ID')}</span>
                        {event.location && (
                          <>
                            <span>•</span>
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Gallery */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <IconPhoto className='h-5 w-5' />
                Galeri Terbaru
              </CardTitle>
            </CardHeader>
            <div className='px-6 pb-6'>
              <div className='space-y-3'>
                {recentActivities.gallery.slice(0, 3).map((gallery) => (
                  <div key={gallery.id} className='flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors'>
                    <div className='w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium line-clamp-2'>{gallery.title}</p>
                      <div className='flex items-center gap-2 mt-1 text-xs text-muted-foreground'>
                        <span>{gallery.description ? gallery.description.substring(0, 50) + '...' : 'No description'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {sales}
          </div>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{pie_stats}</div>
        </div> */}
      </div>
  );
}
