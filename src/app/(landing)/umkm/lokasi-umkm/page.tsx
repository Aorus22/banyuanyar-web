import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const umkms = await prisma.umkm.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  })

  const mediaRecords = await prisma.media.findMany({
    where: { entityType: 'umkm', entityId: { in: umkms.map((u) => u.id) } },
    orderBy: { id: 'asc' }
  })
  const umkmIdToMedia = new Map<number, string>()
  for (const m of mediaRecords) {
    if (!umkmIdToMedia.has(m.entityId)) {
      umkmIdToMedia.set(m.entityId, `/images/${m.entityType}/${m.fileName}`)
    }
  }

  return (
    <div className="min-h-screen pt-24 container mx-auto py-16">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">UMKM Desa</h1>
          <p className="text-base md:text-lg opacity-90">Daftar pelaku UMKM di Desa Banyuanyar</p>
        </div>
      </div>

      {umkms.length === 0 ? (
        <div className="text-center text-muted-foreground">Belum ada data UMKM.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {umkms.map((u) => (
            <Card key={u.id} className="group overflow-hidden p-0 border transition-colors hover:border-primary/50">
              <div className="relative">
                <AspectRatio ratio={1}>
                  <ImageWithFallback
                    src={umkmIdToMedia.get(u.id) ?? ''}
                    alt={u.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </AspectRatio>
              </div>
              <CardContent className="py-4">
                <div className="space-y-2 text-center">
                  <div className="text-lg font-semibold leading-tight">{u.name}</div>
                  <div className="flex items-center justify-center gap-2">
                    {u.productType && <Badge variant="secondary">{u.productType}</Badge>}
                    {u.ownerName && <Badge variant="outline">Pemilik: {u.ownerName}</Badge>}
                  </div>
                  {u.address && (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{u.address}</p>
                  )}
                  {u.phone && (
                    <p className="text-xs text-muted-foreground">Kontak: {u.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 