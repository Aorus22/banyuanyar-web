import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export const dynamic = 'force-dynamic'

function formatIDR(price: unknown): string {
  // Prisma Decimal may come as object with toNumber
  // Fallback to Number conversion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const n = (price as any)?.toNumber ? (price as any).toNumber() : Number(price)
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
    isNaN(n) ? 0 : n
  )
}

export default async function Page() {
  const packages = await prisma.tourismPackage.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  // Ambil media pertama untuk setiap paket (jika ada)
  const mediaRecords = await prisma.media.findMany({
    where: { entityType: 'tourism_package', entityId: { in: packages.map((p) => p.id) } },
    orderBy: { id: 'asc' }
  })
  const packageIdToMedia = new Map<number, string>()
  for (const m of mediaRecords) {
    if (!packageIdToMedia.has(m.entityId)) {
      packageIdToMedia.set(m.entityId, `/images/${m.entityType}/${m.fileName}`)
    }
  }

  return (
    <div className="min-h-screen pt-24 container mx-auto py-16">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Paket Wisata</h1>
          <p className="text-base md:text-lg opacity-90">Rangkaian paket wisata menarik di Desa Banyuanyar</p>
        </div>
      </div>

      {packages.length === 0 ? (
        <div className="text-center text-muted-foreground">Belum ada paket wisata.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((p) => (
            <Card key={p.id} className="group overflow-hidden p-0 border transition-colors hover:border-primary/50">
              <div className="relative">
                <AspectRatio ratio={1}>
                  <ImageWithFallback
                    src={packageIdToMedia.get(p.id) ?? ''}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </AspectRatio>
              </div>
              <CardContent className="py-4">
                <div className="space-y-2 text-center">
                  <div className="text-lg font-semibold leading-tight">{p.name}</div>
                  <div className="flex items-center justify-center gap-2">
                    {p.category && <Badge variant="secondary">{p.category.name}</Badge>}
                    {p.duration && <Badge variant="outline">{p.duration}</Badge>}
                  </div>
                  <div className="text-primary font-semibold">{formatIDR(p.price)}</div>
                  {p.description && (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-3">{p.description}</p>
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