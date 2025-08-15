import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const houses = await prisma.tourismHouse.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  })

  const mediaRecords = await prisma.media.findMany({
    where: { entityType: 'tourism_house', entityId: { in: houses.map((h) => h.id) } },
    orderBy: { id: 'asc' }
  })
  const houseIdToMedia = new Map<number, string>()
  for (const m of mediaRecords) {
    if (!houseIdToMedia.has(m.entityId)) {
      houseIdToMedia.set(m.entityId, `/images/${m.entityType}/${m.fileName}`)
    }
  }

  return (
    <div className="min-h-screen pt-24 container mx-auto py-16">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Rumah Penginapan</h1>
          <p className="text-base md:text-lg opacity-90">Pilihan rumah wisata dan homestay di Desa Banyuanyar</p>
        </div>
      </div>

      {houses.length === 0 ? (
        <div className="text-center text-muted-foreground">Belum ada rumah penginapan.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {houses.map((h) => (
            <Card key={h.id} className="group overflow-hidden p-0 border transition-colors hover:border-primary/50">
              <div className="relative">
                <AspectRatio ratio={1}>
                  <ImageWithFallback
                    src={houseIdToMedia.get(h.id) ?? ''}
                    alt={h.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </AspectRatio>
              </div>
              <CardContent className="py-4">
                <div className="space-y-2 text-center">
                  <div className="text-lg font-semibold leading-tight">{h.name}</div>
                  <div className="flex items-center justify-center gap-2">
                    {h.category && <Badge variant="secondary">{h.category}</Badge>}
                    {h.location && <Badge variant="outline">{h.location}</Badge>}
                  </div>
                  {h.description && (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-3">{h.description}</p>
                  )}
                  {(h.contactPerson || h.contactPhone) && (
                    <p className="text-xs text-muted-foreground">Kontak: {h.contactPerson ?? '-'} {h.contactPhone ? `• ${h.contactPhone}` : ''}</p>
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