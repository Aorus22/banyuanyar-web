import React from 'react';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const officials = await prisma.governmentOfficial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  });

  return (
    <>
      <PageHeaderEffect
        title='Perangkat Desa'
        description='Profil singkat perangkat desa Banyuanyar'
      />

      {officials.length === 0 ? (
        <div className='text-muted-foreground text-center'>
          Belum ada data perangkat desa.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {officials.map((o) => (
            <Card
              key={o.id}
              className='group hover:border-primary/50 overflow-hidden border p-0 transition-colors'
            >
              <div className='relative'>
                <AspectRatio ratio={1}>
                  <ImageWithFallback
                    src={o.photoUrl ?? ''}
                    alt={o.name}
                    fill
                    sizes='(max-width: 768px) 100vw, 33vw'
                    className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                  />
                </AspectRatio>
              </div>

              <CardContent className='py-4'>
                <div className='space-y-2 text-center'>
                  <div className='text-lg leading-tight font-semibold'>
                    {o.name}
                  </div>
                  <div>
                    <Badge className='mx-auto'>{o.position}</Badge>
                  </div>

                  {o.bio && (
                    <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                      {o.bio}
                    </p>
                  )}
                </div>

                {o.socialMedia && (
                  <div className='mt-4 flex flex-wrap justify-center gap-2'>
                    {Object.entries(
                      o.socialMedia as Record<string, string>
                    ).map(([platform, handle]) => (
                      <a
                        key={platform}
                        href={`https://${platform}.com/${handle.replace(/^@/, '')}`}
                        target='_blank'
                        rel='noreferrer'
                        className='hover:bg-accent hover:text-accent-foreground rounded-md border px-2 py-1 text-xs transition'
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
