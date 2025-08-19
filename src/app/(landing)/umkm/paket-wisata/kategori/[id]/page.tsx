import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Users, Clock, MapPin, ArrowLeft, Calendar } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer'
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect'
import { ImagePreviewCarousel } from '@/components/ui/custom/media-manager/image-preview-carousel'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

interface CategoryDetailPageProps {
  params: Promise<{
    id: string
  }>
}

function formatIDR(price: number | null): string {
  if (!price) return 'Harga sesuai permintaan'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { id: categoryId } = await params

  const category = await prisma.tourismCategory.findUnique({
    where: { id: parseInt(categoryId) },
    include: {
      packages: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: {
          packages: true
        }
      }
    }
  })

  if (!category) {
    notFound()
  }

  // Convert Decimal values to numbers for client components
  const packagesWithConvertedPrices = category.packages.map(pkg => ({
    ...pkg,
    price: pkg.price ? Number(pkg.price) : null
  }))

  // Get media for this category
  const categoryMedia = await prisma.media.findMany({
    where: {
      entityType: 'tourism_category',
      entityId: category.id
    },
    orderBy: { id: 'asc' }
  })

  const categoryImageUrls = categoryMedia.map(m => m.fileUrl)

  return (
    <>
      <PageHeaderEffect 
        title={category.name}
        description="Lihat semua paket wisata dalam kategori ini"
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link 
            href="/umkm/paket-wisata"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Paket Wisata
          </Link>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-2 border-primary/10 rounded-lg px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">{category.name}</h1>
              <p className="text-muted-foreground mt-1">
                {category._count.packages} paket wisata tersedia
              </p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Kategori Wisata
            </Badge>
          </div>
        </div>

        {/* Category Media */}
        {categoryImageUrls.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Galeri Kategori</h3>
            <div className="rounded-lg overflow-hidden border">
              <ImagePreviewCarousel
                images={categoryImageUrls}
                showThumbnails={true}
                showSmallImages={true}
                autoPlay={false}
                className="h-full"
              />
            </div>
          </div>
        )}

        {/* Category Description */}
        <div className="space-y-4">
          {category.description && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Deskripsi Kategori</h3>
              <div className="prose prose-sm max-w-none">
                <TiptapViewer className='p-0 broder-none' content={category.description} />
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>{category._count.packages} paket tersedia</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Dibuat {format(new Date(category.createdAt), "dd MMM yyyy", { locale: id })}</span>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <Card className="border-2 border-primary/10 shadow-sm pt-0">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
              <Package className="h-6 w-6" />
              Paket Wisata dalam Kategori Ini
              <Badge variant="secondary" className="ml-2">
                {packagesWithConvertedPrices.length} Paket
              </Badge>
            </h3>
          </div>
          <CardContent className="pt-6">
            {packagesWithConvertedPrices.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Belum ada paket wisata dalam kategori ini.</p>
                <p className="text-sm">Paket wisata akan muncul di sini setelah ditambahkan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packagesWithConvertedPrices.map((pkg) => (
                  <Card key={pkg.id} className="group overflow-hidden border-2 border-primary/5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col">
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex flex-col flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                            {pkg.name}
                          </h3>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {pkg.duration || 'Durasi'}
                          </Badge>
                        </div>
                        
                        {pkg.description && (
                          <div className="text-sm text-muted-foreground leading-relaxed flex-1">
                            <TiptapViewer className='!p-0 border-none' content={pkg.description} />
                          </div>
                        )}

                        <div className="mt-auto space-y-4">
                          {pkg.price && (
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {formatIDR(pkg.price)}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-center">
                            {pkg.duration && (
                              <div className="flex items-center gap-2 text-base text-muted-foreground">
                                <Clock className="h-5 w-5" />
                                <span>{pkg.duration}</span>
                              </div>
                            )}
                          </div>
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