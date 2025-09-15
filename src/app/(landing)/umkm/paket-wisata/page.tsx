import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Users, MapPin, ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PaketWisataPage() {
  // Get all tourism categories with their packages count
  const categories = await prisma.tourismCategory.findMany({
    include: {
      _count: {
        select: {
          packages: true
        }
      }
    },
    orderBy: { name: 'asc' }
  });

  // Get media for all categories
  const categoryIds = categories.map((c) => c.id);
  const mediaRecords = await prisma.media.findMany({
    where: {
      entityType: 'tourism_category',
      entityId: { in: categoryIds }
    },
    orderBy: { id: 'asc' }
  });

  const categoryIdToMedia = new Map<number, string>();
  for (const m of mediaRecords) {
    if (!categoryIdToMedia.has(m.entityId)) {
      categoryIdToMedia.set(m.entityId, m.fileUrl);
    }
  }

  // Calculate statistics
  const totalCategories = categories.length;
  const totalPackages = categories.reduce(
    (sum, cat) => sum + cat._count.packages,
    0
  );

  return (
    <>
      <PageHeaderEffect
        title='Paket Wisata Desa Banyuanyar'
        description='Temukan berbagai kategori wisata menarik dan edukatif di Desa Banyuanyar'
      />

      <div className='container mx-auto space-y-8 px-4 py-8'>
        {/* Statistik */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Card className='shadow-sm'>
            <CardContent className='flex items-center gap-4 p-4'>
              <div className='bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full'>
                <Package className='text-primary h-6 w-6' />
              </div>
              <div>
                <div className='text-primary text-2xl font-bold'>
                  {totalPackages}
                </div>
                <div className='text-muted-foreground text-sm'>
                  Total Paket Wisata
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-sm'>
            <CardContent className='flex items-center gap-4 p-4'>
              <div className='bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full'>
                <Users className='text-primary h-6 w-6' />
              </div>
              <div>
                <div className='text-primary text-2xl font-bold'>
                  {totalCategories}
                </div>
                <div className='text-muted-foreground text-sm'>
                  Kategori Wisata
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daftar Kategori Wisata */}
        <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
          <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
            <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
              <Package className='h-6 w-6' />
              Kategori Paket Wisata
              <Badge variant='secondary' className='ml-2'>
                {totalCategories} Kategori
              </Badge>
            </h3>
          </div>
          <CardContent className='pt-6'>
            {categories.length === 0 ? (
              <div className='text-muted-foreground py-12 text-center'>
                <Package className='mx-auto mb-4 h-16 w-16 opacity-50' />
                <p className='text-lg'>Belum ada kategori wisata tersedia.</p>
                <p className='text-sm'>
                  Kategori wisata akan muncul di sini setelah ditambahkan.
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className='group border-primary/5 hover:border-primary/30 flex flex-col overflow-hidden border-2 py-0 transition-all duration-300 hover:shadow-lg'
                  >
                    <div className='relative'>
                      <AspectRatio ratio={16 / 9}>
                        <ImageWithFallback
                          src={categoryIdToMedia.get(category.id) || undefined}
                          alt={category.name}
                          fill
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='object-cover transition-transform duration-300 group-hover:scale-105'
                        />
                      </AspectRatio>
                      <div className='absolute top-3 right-3'>
                        <Badge
                          variant='outline'
                          className='text-primary border-primary/20 bg-white/90'
                        >
                          {category._count.packages} paket
                        </Badge>
                      </div>
                    </div>

                    <CardContent className='flex-1 p-6'>
                      <div className='flex h-full flex-col'>
                        <div className='flex-1 space-y-4'>
                          <div>
                            <h3 className='text-primary group-hover:text-primary/80 mb-2 text-xl font-bold transition-colors'>
                              {category.name}
                            </h3>
                            {category.description && (
                              <div className='text-muted-foreground line-clamp-3 text-sm leading-relaxed'>
                                <TiptapViewer content={category.description} />
                              </div>
                            )}
                          </div>

                          <div className='space-y-2'>
                            <div className='text-muted-foreground flex items-center gap-4 text-sm'></div>
                          </div>
                        </div>

                        <div className='mt-auto flex flex-col gap-2 pt-4'>
                          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                            <Package className='h-4 w-4' />
                            <span>
                              {category._count.packages} paket tersedia
                            </span>
                          </div>
                          <Button
                            asChild
                            className='group-hover:bg-primary/90 w-full transition-colors'
                          >
                            <Link
                              href={`/umkm/paket-wisata/kategori/${category.id}`}
                            >
                              Lihat Paket
                              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                            </Link>
                          </Button>
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
