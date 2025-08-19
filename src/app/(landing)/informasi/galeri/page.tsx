import React from 'react';
import { prisma } from '@/lib/prisma';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';

export const dynamic = 'force-dynamic';

type Media = {
  id: string;
  fileUrl: string;
};

type Gallery = {
  id: string;
  title: string;
  description?: string;
  eventDate?: string | Date;
  media: Media[];
};

export default async function Page() {
  // Get all galleries
  const rawGalleries = await prisma.gallery.findMany({
    where: { isActive: true },
    orderBy: { eventDate: 'desc' },
  });

  // Get all media for galleries
  const galleryIds = rawGalleries.map(g => g.id);
  const allMedia = await prisma.media.findMany({
    where: { 
      entityType: 'gallery',
      entityId: { in: galleryIds }
    },
    orderBy: { id: 'asc' }
  });

  // Combine media with galleries
  const galleries: Gallery[] = rawGalleries.map(gallery => ({
    id: gallery.id.toString(),
    title: gallery.title,
    description: gallery.description ?? undefined,
    eventDate: gallery.eventDate ?? undefined,
    media: allMedia.filter(m => m.entityId === gallery.id).map(media => ({
      id: media.id.toString(),
      fileUrl: media.fileUrl,
    })),
  }));

  return (
    <>
      <PageHeaderEffect 
        title="Galeri Desa"
        description="Dokumentasi kegiatan dan destinasi Desa Banyuanyar"
      />

      <div className="max-w-4xl mx-auto">
        {galleries.length === 0 ? (
          <div className="text-center text-muted-foreground">Belum ada galeri desa.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {galleries.map((galeri) => {
              const thumbnail = galeri.media[0];
              return (
                <a
                  key={galeri.id}
                  href={`/informasi/galeri/${galeri.id}`}
                  className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition relative bg-white dark:bg-muted"
                >
                  <div className="relative">
                    <AspectRatio ratio={1}>
                      {thumbnail ? (
                        <ImageWithFallback
                          src={thumbnail.fileUrl}
                          alt={galeri.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">Tidak ada gambar</div>
                      )}
                    </AspectRatio>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity">
                    <div className="text-lg font-semibold text-white mb-2 text-center px-2">{galeri.title}</div>
                    {galeri.description && (
                      <div className="text-sm text-white text-center px-2">{galeri.description}</div>
                    )}
                    {galeri.eventDate && (
                      <div className="text-xs text-white mt-2">{new Date(galeri.eventDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
