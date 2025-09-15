import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Package,
  Users,
  Clock,
  MapPin,
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { ImagePreviewCarousel } from '@/components/ui/custom/media-manager/image-preview-carousel';
import Link from 'next/link';
import { safeFormatDateOnly } from '@/lib/date-utils';

export const dynamic = 'force-dynamic';

interface CategoryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatIDR(price: number | null): string {
  if (!price) return 'Harga sesuai permintaan';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(price);
}

export default async function CategoryDetailPage({
  params
}: CategoryDetailPageProps) {
  const { id: categoryId } = await params;

  const category = await prisma.tourismCategory.findUnique({
    where: { id: parseInt(categoryId) },
    include: {
      packages: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: {
          packages: true
        }
      }
    }
  });

  if (!category) {
    notFound();
  }

  // Convert Decimal values to numbers for client components
  const packagesWithConvertedPrices = category.packages.map((pkg) => ({
    ...pkg,
    price: pkg.price ? Number(pkg.price) : null
  }));

  // Get media for this category
  const categoryMedia = await prisma.media.findMany({
    where: {
      entityType: 'tourism_category',
      entityId: category.id
    },
    orderBy: { id: 'asc' }
  });

  const categoryImageUrls = categoryMedia.map((m) => m.fileUrl);

  return (
    <>
      <PageHeaderEffect
        title={category.name}
        description='Lihat semua paket wisata dalam kategori ini'
      />

      <div className='container mx-auto space-y-8 px-4 py-8'>
        {/* Breadcrumb */}
        <div className='text-muted-foreground flex items-center gap-2 text-sm'>
          <Link
            href='/umkm/paket-wisata'
            className='hover:text-primary flex items-center gap-1 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            Kembali ke Paket Wisata
          </Link>
        </div>

        {/* Category Header */}
        <div className='from-primary/5 to-primary/10 border-primary/10 rounded-lg border-2 bg-gradient-to-r px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-primary text-2xl font-bold'>
                {category.name}
              </h1>
              <p className='text-muted-foreground mt-1'>
                {category._count.packages} paket wisata tersedia
              </p>
            </div>
            <Badge
              variant='secondary'
              className='bg-primary/10 text-primary border-primary/20'
            >
              Kategori Wisata
            </Badge>
          </div>
        </div>

        {/* Category Media */}
        {categoryImageUrls.length > 0 && (
          <div className='mb-8'>
            <h3 className='mb-3 text-lg font-semibold'>Galeri Kategori</h3>
            <div className='overflow-hidden rounded-lg border'>
              <ImagePreviewCarousel
                images={categoryImageUrls}
                showThumbnails={true}
                showSmallImages={true}
                autoPlay={false}
                className='h-full'
              />
            </div>
          </div>
        )}

        {/* Category Description */}
        <div className='space-y-4'>
          {category.description && (
            <div>
              <h3 className='mb-3 text-lg font-semibold'>Deskripsi Kategori</h3>
              <div className='prose prose-sm max-w-none'>
                <TiptapViewer
                  className='broder-none p-0'
                  content={category.description}
                />
              </div>
            </div>
          )}

          <div className='text-muted-foreground flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-2'>
              <Package className='h-4 w-4' />
              <span>{category._count.packages} paket tersedia</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span>Dibuat {safeFormatDateOnly(category.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
          <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
            <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
              <Package className='h-6 w-6' />
              Paket Wisata dalam Kategori Ini
              <Badge variant='secondary' className='ml-2'>
                {packagesWithConvertedPrices.length} Paket
              </Badge>
            </h3>
          </div>
          <CardContent className='pt-6'>
            {packagesWithConvertedPrices.length === 0 ? (
              <div className='text-muted-foreground py-12 text-center'>
                <Package className='mx-auto mb-4 h-16 w-16 opacity-50' />
                <p className='text-lg'>
                  Belum ada paket wisata dalam kategori ini.
                </p>
                <p className='text-sm'>
                  Paket wisata akan muncul di sini setelah ditambahkan.
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {packagesWithConvertedPrices.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className='group border-primary/5 hover:border-primary/30 flex flex-col overflow-hidden border-2 transition-all duration-300 hover:shadow-lg'
                  >
                    <CardContent className='flex flex-1 flex-col p-6'>
                      <div className='flex flex-1 flex-col'>
                        <div className='flex items-start justify-between'>
                          <h3 className='text-primary group-hover:text-primary/80 text-xl font-bold transition-colors'>
                            {pkg.name}
                          </h3>
                          <Badge
                            variant='outline'
                            className='bg-primary/10 text-primary border-primary/20'
                          >
                            {pkg.duration || 'Durasi'}
                          </Badge>
                        </div>

                        {pkg.description && (
                          <div className='text-muted-foreground flex-1 text-sm leading-relaxed'>
                            <TiptapViewer
                              className='border-none !p-0'
                              content={pkg.description}
                            />
                          </div>
                        )}

                        <div className='mt-auto space-y-4'>
                          {pkg.price && (
                            <div className='text-center'>
                              <div className='text-primary text-2xl font-bold'>
                                {formatIDR(pkg.price)}
                              </div>
                            </div>
                          )}

                          <div className='flex items-center justify-center'>
                            {pkg.duration && (
                              <div className='text-muted-foreground flex items-center gap-2 text-base'>
                                <Clock className='h-5 w-5' />
                                <span>{pkg.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
