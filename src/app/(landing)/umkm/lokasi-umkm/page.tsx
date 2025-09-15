import React from 'react';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { UmkmMapViewer } from '@/components/ui/custom/map-viewer';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  Users,
  Package
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const umkms = await prisma.umkm.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const mediaRecords = await prisma.media.findMany({
    where: { entityType: 'umkm', entityId: { in: umkms.map((u) => u.id) } },
    orderBy: { id: 'asc' }
  });

  const umkmIdToMedia = new Map<number, string>();
  for (const m of mediaRecords) {
    if (!umkmIdToMedia.has(m.entityId)) {
      umkmIdToMedia.set(m.entityId, m.fileUrl);
    }
  }

  // Filter UMKM yang memiliki koordinat
  const umkmsWithCoordinates = umkms
    .filter((u) => u.latitude !== null && u.longitude !== null)
    .map((u) => ({
      id: u.id,
      name: u.name,
      address: u.address,
      latitude: u.latitude!,
      longitude: u.longitude!
    }));

  // Hitung statistik
  const totalUmkm = umkms.length;
  const totalProducts = umkms.reduce((sum, u) => sum + u._count.products, 0);

  return (
    <>
      <PageHeaderEffect
        title='Lokasi UMKM Desa Banyuanyar'
        description='Temukan dan kunjungi pelaku UMKM di Desa Banyuanyar'
      />

      <div className='container mx-auto space-y-8 px-4 py-8'>
        {/* Statistik */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Card className='shadow-sm'>
            <CardContent className='flex items-center gap-4 p-4'>
              <div className='bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full'>
                <Building2 className='text-primary h-6 w-6' />
              </div>
              <div>
                <div className='text-primary text-2xl font-bold'>
                  {totalUmkm}
                </div>
                <div className='text-muted-foreground text-sm'>Total UMKM</div>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-sm'>
            <CardContent className='flex items-center gap-4 p-4'>
              <div className='bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full'>
                <Package className='text-primary h-6 w-6' />
              </div>
              <div>
                <div className='text-primary text-2xl font-bold'>
                  {totalProducts}
                </div>
                <div className='text-muted-foreground text-sm'>
                  Total Produk
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Peta Interaktif */}
        <Card className='border-primary/10 gap-0 border-2 pt-0 shadow-sm'>
          <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
            <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
              <Globe className='h-6 w-6' />
              Peta Lokasi UMKM
            </h3>
          </div>
          <CardContent className='p-0'>
            <div className='h-96 w-full'>
              <UmkmMapViewer
                umkms={umkmsWithCoordinates}
                height='100%'
                className='relative z-0 w-full rounded-b-lg'
              />
            </div>
          </CardContent>
        </Card>

        {/* Daftar UMKM */}
        <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
          <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
            <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
              <Users className='h-6 w-6' />
              Daftar UMKM
              <Badge variant='secondary' className='ml-2'>
                {totalUmkm} UMKM
              </Badge>
            </h3>
          </div>
          <CardContent className='pt-6'>
            {umkms.length === 0 ? (
              <div className='text-muted-foreground py-12 text-center'>
                <Building2 className='mx-auto mb-4 h-16 w-16 opacity-50' />
                <p className='text-lg'>Belum ada data UMKM.</p>
                <p className='text-sm'>
                  UMKM akan muncul di sini setelah mendaftar.
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {umkms.map((u) => (
                  <Card
                    key={u.id}
                    className='group border-primary/5 hover:border-primary/30 flex flex-col overflow-hidden border-2 py-0 transition-all duration-300 hover:shadow-lg'
                  >
                    <div className='relative'>
                      <AspectRatio ratio={16 / 9}>
                        <ImageWithFallback
                          src={umkmIdToMedia.get(u.id) || undefined}
                          alt={u.name}
                          fill
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='object-cover transition-transform duration-300 group-hover:scale-105'
                        />
                      </AspectRatio>
                      <div className='absolute top-3 right-3'>
                        <Badge
                          variant='secondary'
                          className='text-primary border-primary/20 bg-white/90'
                        >
                          {u._count.products} Produk
                        </Badge>
                      </div>
                    </div>

                    <CardContent className='flex-1 p-6'>
                      <div className='flex h-full flex-col'>
                        <div className='flex-1 space-y-4'>
                          <div>
                            <h3 className='text-primary group-hover:text-primary/80 mb-2 text-xl font-bold transition-colors'>
                              {u.name}
                            </h3>
                            {u.ownerName && (
                              <p className='text-muted-foreground flex items-center gap-2 text-sm'>
                                <Users className='h-4 w-4' />
                                {u.ownerName}
                              </p>
                            )}
                          </div>

                          {u.address && (
                            <div className='flex items-start gap-2'>
                              <MapPin className='text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0' />
                              <p className='text-muted-foreground line-clamp-2 text-sm leading-relaxed'>
                                {u.address}
                              </p>
                            </div>
                          )}

                          <div className='space-y-2'>
                            {u.phone && (
                              <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                                <Phone className='h-4 w-4' />
                                <span>{u.phone}</span>
                              </div>
                            )}
                            {u.email && (
                              <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                                <Mail className='h-4 w-4' />
                                <span>{u.email}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className='mt-auto pt-4'>
                          <Button
                            asChild
                            size='sm'
                            className='bg-primary hover:bg-primary/90 w-full'
                          >
                            <Link href={`/umkm/${u.id}`}>Lihat Detail</Link>
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
