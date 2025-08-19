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
    where: { id: galleryId },
  });
  if (!galeri) return notFound();

  const media = await prisma.media.findMany({
    where: { entityType: 'gallery', entityId: galleryId },
    orderBy: { id: 'asc' },
  });

  const imageUrls = media.map(m => m.fileUrl);

  return (
    <>
      <PageHeaderEffect 
        title={galeri.title}
        description={galeri.description || 'Galeri foto desa'}
      />

      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Gallery Info */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground shadow">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{galeri.title}</h1>
          {galeri.description && (
            <p className="text-base md:text-lg opacity-90">{galeri.description}</p>
          )}
          {galeri.eventDate && (
            <div className="text-sm opacity-90 mt-4">
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
          <h2 className="text-2xl font-bold text-center mb-6">Foto Galeri</h2>
          
          {imageUrls.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Belum ada foto pada galeri ini.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Image Carousel */}
              <div className="rounded-lg overflow-hidden border shadow-lg">
                <ImagePreviewCarousel
                  images={imageUrls}
                  showThumbnails={true}
                  showSmallImages={true}
                  autoPlay={true}
                  interval={4000}
                  className="w-full h-96 md:h-[500px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
