import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const galleryId = Number(params.id);
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
    <div className="min-h-screen pt-24 container mx-auto py-16">
      <div className="mb-10">
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
              <div key={m.id} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border">
                <img
                  src={`/gallery/${m.fileName}`}
                  alt={galeri.title}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
