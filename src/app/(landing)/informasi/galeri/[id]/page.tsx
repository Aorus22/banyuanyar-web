import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ImagePreviewCarousel } from '@/components/ui/custom/media-manager';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { Image as ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const galleryId = Number(id);
  if (isNaN(galleryId)) return notFound();

  const galeri = await prisma.gallery.findUnique({
    where: { id: galleryId }
  });
  if (!galeri) return notFound();

  const media = await prisma.media.findMany({
    where: { entityType: 'gallery', entityId: galleryId },
    orderBy: { id: 'asc' }
  });

  const imageUrls = media.map((m) => m.fileUrl);

  return (
    <>
      <PageHeaderEffect
        title={galeri.title}
        description={galeri.description || 'Galeri foto desa'}
      />

      <div className='mx-auto max-w-6xl space-y-8 px-4'>
        {/* Gallery Info */}
        <div className='from-primary to-primary/80 text-primary-foreground rounded-2xl bg-gradient-to-r p-8 text-center shadow md:p-10'>
          <h1 className='mb-2 text-3xl font-bold tracking-tight md:text-4xl'>
            {galeri.title}
          </h1>
          {galeri.description && (
            <p className='text-base opacity-90 md:text-lg'>
              {galeri.description}
            </p>
          )}
          {galeri.eventDate && (
            <div className='mt-4 text-sm opacity-90'>
              {new Date(galeri.eventDate).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
        </div>

        {/* Gallery Images */}
        <div>
          <h2 className='mb-6 text-center text-2xl font-bold'>Foto Galeri</h2>

          {imageUrls.length === 0 ? (
            <div className='text-muted-foreground py-12 text-center'>
              <ImageIcon className='mx-auto mb-4 h-16 w-16 opacity-50' />
              <p className='text-lg'>Belum ada foto pada galeri ini.</p>
            </div>
          ) : (
            <div className='space-y-6'>
              {/* Main Image Carousel */}
              <div className='overflow-hidden rounded-lg border shadow-lg'>
                <ImagePreviewCarousel
                  images={imageUrls}
                  showThumbnails={true}
                  showSmallImages={true}
                  autoPlay={true}
                  interval={4000}
                  className='h-96 w-full md:h-[500px]'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
