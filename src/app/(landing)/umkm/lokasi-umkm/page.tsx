import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect'
import { UmkmMapViewer } from '@/components/ui/custom/map-viewer'
import { MapPin, Phone, Mail, Globe, Building2, Users, Package } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const umkms = await prisma.umkm.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const mediaRecords = await prisma.media.findMany({
    where: { entityType: 'umkm', entityId: { in: umkms.map((u) => u.id) } },
    orderBy: { id: 'asc' }
  })
  
  const umkmIdToMedia = new Map<number, string>()
  for (const m of mediaRecords) {
    if (!umkmIdToMedia.has(m.entityId)) {
      umkmIdToMedia.set(m.entityId, m.fileUrl)
    }
  }

  // Filter UMKM yang memiliki koordinat
  const umkmsWithCoordinates = umkms
    .filter(u => u.latitude !== null && u.longitude !== null)
    .map(u => ({
      id: u.id,
      name: u.name,
      address: u.address,
      latitude: u.latitude!,
      longitude: u.longitude!
    }))
  
  // Hitung statistik
  const totalUmkm = umkms.length
  const totalProducts = umkms.reduce((sum, u) => sum + u._count.products, 0)

  return (
    <>
      <PageHeaderEffect 
        title="Lokasi UMKM Desa Banyuanyar"
        description="Temukan dan kunjungi pelaku UMKM di Desa Banyuanyar"
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{totalUmkm}</div>
                <div className="text-sm text-muted-foreground">Total UMKM</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{totalProducts}</div>
                <div className="text-sm text-muted-foreground">Total Produk</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Peta Interaktif */}
        <Card className="border-2 border-primary/10 shadow-sm pt-0 gap-0">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
              <Globe className="h-6 w-6" />
              Peta Lokasi UMKM
            </h3>
          </div>
          <CardContent className="p-0">
            <div className="h-96 w-full">
              <UmkmMapViewer
                umkms={umkmsWithCoordinates}
                height="100%"
                className="w-full rounded-b-lg relative z-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Daftar UMKM */}
        <Card className="border-2 border-primary/10 shadow-sm pt-0">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
              <Users className="h-6 w-6" />
              Daftar UMKM
              <Badge variant="secondary" className="ml-2">
                {totalUmkm} UMKM
              </Badge>
            </h3>
          </div>
          <CardContent className="pt-6">
            {umkms.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Building2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Belum ada data UMKM.</p>
                <p className="text-sm">UMKM akan muncul di sini setelah mendaftar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {umkms.map((u) => (
                  <Card key={u.id} className="group overflow-hidden border-2 border-primary/5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col py-0">
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <ImageWithFallback
                          src={umkmIdToMedia.get(u.id) || undefined}
                          alt={u.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </AspectRatio>
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 text-primary border-primary/20">
                          {u._count.products} Produk
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex-1">
                      <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                              {u.name}
                            </h3>
                            {u.ownerName && (
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {u.ownerName}
                              </p>
                            )}
                          </div>

                          {u.address && (
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                {u.address}
                              </p>
                            </div>
                          )}

                          <div className="space-y-2">
                            {u.phone && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>{u.phone}</span>
                              </div>
                            )}
                            {u.email && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>{u.email}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 mt-auto">
                          <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                            <Link href={`/umkm/${u.id}`}>
                              Lihat Detail
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
  )
} 