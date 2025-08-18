import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

  return (
    <>
      <div className="mt-24 mb-10">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground shadow">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{galeri.title}</h1>
          <p className="text-base md:text-lg opacity-90">{galeri.description}</p>
          {galeri.eventDate && (
            <div className="text-xs text-primary-foreground mt-2">
              {new Date(galeri.eventDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {media.length === 0 ? (
          <div className="text-center text-muted-foreground">Belum ada foto pada galeri ini.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {media.map((m) => (
              <div key={m.id} className="rounded-lg overflow-hidden border">
                <AspectRatio ratio={1}>
                  <ImageWithFallback
                    src={`/gallery/${m.fileName}`}
                    alt={galeri.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
