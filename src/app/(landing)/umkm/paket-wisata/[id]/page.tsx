import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImagePreviewCarousel } from '@/components/ui/custom/media-manager';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';
import { MapPin, Clock, Package, Calendar, Users, Globe } from 'lucide-react';
import { safeFormatDateFullMonth } from '@/lib/date-utils';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';

interface TourismPackageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface TourismPackageWithCategory {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  duration: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  category: {
    id: number;
    name: string;
    description: string | null;
  } | null;
}

function formatIDR(price: unknown): string {
  if (!price) return 'Harga sesuai permintaan';
  const n = (price as any)?.toNumber
    ? (price as any).toNumber()
    : Number(price);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(isNaN(n) ? 0 : n);
}

export default async function TourismPackageDetailPage({
  params
}: TourismPackageDetailPageProps) {
  const { id: packageId } = await params;

  const tourismPackage = (await prisma.tourismPackage.findUnique({
    where: { id: parseInt(packageId) },
    include: { category: true }
  })) as TourismPackageWithCategory | null;

  if (!tourismPackage) {
    notFound();
  }

  // Convert Decimal values to numbers for client components
  const packageWithConvertedPrice = {
    ...tourismPackage,
    price: tourismPackage.price ? Number(tourismPackage.price) : null
  };

  // Get media for the category
  const categoryMedia = await prisma.media.findMany({
    where: {
      entityType: 'tourism_category',
      entityId: tourismPackage.categoryId
    },
    orderBy: { id: 'asc' }
  });

  const categoryImageUrls = categoryMedia.map((m) => m.fileUrl);

  return (
    <>
      <PageHeaderEffect
        title={packageWithConvertedPrice.name}
        description={`Paket wisata ${packageWithConvertedPrice.category?.name || ''} di Desa Banyuanyar`}
      />

      <div className='container mx-auto max-w-5xl space-y-8 px-4'>
        {/* Image Carousel */}
        {categoryImageUrls.length === 0 ? (
          <div className='py-12 text-center'>
            <div className='mb-3 flex items-center justify-center gap-2'>
              <Package className='text-muted-foreground h-5 w-5' />
              <span className='text-muted-foreground text-sm font-medium'>
                Belum ada galeri tersedia
              </span>
            </div>
            <div className='flex h-96 w-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-200'>
              <Package className='h-16 w-16 text-blue-400' />
            </div>
          </div>
        ) : (
          <ImagePreviewCarousel
            images={categoryImageUrls}
            showThumbnails={true}
            showSmallImages={true}
            autoPlay={true}
            interval={4000}
            className='h-full'
          />
        )}

        {/* Deskripsi */}
        {packageWithConvertedPrice.description && (
          <div>
            <h3 className='text-primary mb-4 flex items-center gap-3 text-lg font-semibold'>
              <Package className='h-6 w-6' />
              Tentang Paket
            </h3>
            <div className='prose prose-sm max-w-none'>
              <TiptapViewer content={packageWithConvertedPrice.description} />
            </div>
          </div>
        )}

        {/* Informasi Dasar */}
        <div className='from-primary to-primary/80 rounded-2xl bg-gradient-to-r p-8 text-white'>
          <h3 className='mb-6 flex items-center gap-3 text-lg font-semibold text-white'>
            <Package className='h-6 w-6' />
            Informasi Paket Wisata
          </h3>
          <div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-4'>
                <div className='flex items-center gap-3 rounded-lg bg-white/10 p-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/20'>
                    <Package className='h-5 w-5 text-white' />
                  </div>
                  <div>
                    <p className='text-sm text-white/80'>Kategori</p>
                    <p className='font-semibold text-white'>
                      {packageWithConvertedPrice.category?.name || '-'}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3 rounded-lg bg-white/10 p-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/20'>
                    <Calendar className='h-5 w-5 text-white' />
                  </div>
                  <div>
                    <p className='text-sm text-white/80'>Dibuat Pada</p>
                    <p className='font-semibold text-white'>
                      {safeFormatDateFullMonth(
                        packageWithConvertedPrice.createdAt
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                {packageWithConvertedPrice.duration && (
                  <div className='flex items-center gap-3 rounded-lg bg-white/10 p-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/20'>
                      <Clock className='h-5 w-5 text-white' />
                    </div>
                    <div>
                      <p className='text-sm text-white/80'>Durasi</p>
                      <p className='font-semibold text-white'>
                        {packageWithConvertedPrice.duration}
                      </p>
                    </div>
                  </div>
                )}

                {packageWithConvertedPrice.price && (
                  <div className='flex items-center gap-3 rounded-lg bg-white/10 p-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/20'>
                      <Globe className='h-5 w-5 text-white' />
                    </div>
                    <div>
                      <p className='text-sm text-white/80'>Harga</p>
                      <p className='font-semibold text-white'>
                        {formatIDR(packageWithConvertedPrice.price)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kategori */}
        {packageWithConvertedPrice.category && (
          <div>
            <h3 className='text-primary mb-4 flex items-center gap-3 text-lg font-semibold'>
              <Users className='h-6 w-6' />
              Kategori Wisata
            </h3>
            <Card className='border-primary/10 border-2 shadow-sm'>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-primary/10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full'>
                    <Package className='text-primary h-8 w-8' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-primary mb-2 text-xl font-bold'>
                      {packageWithConvertedPrice.category.name}
                    </h4>
                    {packageWithConvertedPrice.category.description && (
                      <p className='text-muted-foreground leading-relaxed'>
                        {packageWithConvertedPrice.category.description}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant='secondary'
                    className='bg-primary/10 text-primary border-primary/20'
                  >
                    Kategori
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <div className='py-8 text-center'>
          <Card className='border-primary/20 from-primary/5 to-primary/10 border-2 bg-gradient-to-r'>
            <CardContent className='p-8'>
              <h3 className='text-primary mb-4 text-2xl font-bold'>
                Tertarik dengan Paket Ini?
              </h3>
              <p className='text-muted-foreground mb-6'>
                Hubungi kami untuk informasi lebih lanjut dan pemesanan paket
                wisata ini.
              </p>
              <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                <Button size='lg' className='bg-primary hover:bg-primary/90'>
                  Hubungi Kami
                </Button>
                <Button variant='outline' size='lg'>
                  Lihat Paket Lainnya
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
