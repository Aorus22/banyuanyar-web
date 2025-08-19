import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImagePreviewCarousel } from '@/components/ui/custom/media-manager'
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer'
import { MapPin, Clock, Package, Calendar, Users, Globe } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect'

interface TourismPackageDetailPageProps {
  params: Promise<{
    id: string
  }>
}

interface TourismPackageWithCategory {
  id: number
  name: string
  description: string | null
  price: number | null
  duration: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  categoryId: number
  category: {
    id: number
    name: string
    description: string | null
  } | null
}

function formatIDR(price: unknown): string {
  if (!price) return 'Harga sesuai permintaan'
  const n = (price as any)?.toNumber ? (price as any).toNumber() : Number(price)
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
    isNaN(n) ? 0 : n
  )
}

export default async function TourismPackageDetailPage({ params }: TourismPackageDetailPageProps) {
  const { id: packageId } = await params
  
  const tourismPackage = await prisma.tourismPackage.findUnique({
    where: { id: parseInt(packageId) },
    include: { category: true }
  }) as TourismPackageWithCategory | null

  if (!tourismPackage) {
    notFound()
  }

  // Convert Decimal values to numbers for client components
  const packageWithConvertedPrice = {
    ...tourismPackage,
    price: tourismPackage.price ? Number(tourismPackage.price) : null
  }

  // Get media for the category
  const categoryMedia = await prisma.media.findMany({
    where: { 
      entityType: 'tourism_category', 
      entityId: tourismPackage.categoryId 
    },
    orderBy: { id: 'asc' }
  })

  const categoryImageUrls = categoryMedia.map(m => m.fileUrl)

  return (
    <>
      <PageHeaderEffect 
        title={packageWithConvertedPrice.name}
        description={`Paket wisata ${packageWithConvertedPrice.category?.name || ''} di Desa Banyuanyar`}
      />

      <div className="container mx-auto px-4 space-y-8 max-w-5xl">
        {/* Image Carousel */}
        {categoryImageUrls.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Belum ada galeri tersedia
              </span>
            </div>
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <Package className="w-16 h-16 text-blue-400" />
            </div>
          </div>
        ) : (
          <ImagePreviewCarousel
            images={categoryImageUrls}
            showThumbnails={true}
            showSmallImages={true}
            autoPlay={true}
            interval={4000}
            className="h-full"
          />
        )}

        {/* Deskripsi */}
        {packageWithConvertedPrice.description && (
          <div>
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg mb-4">
              <Package className="h-6 w-6" />
              Tentang Paket
            </h3>
            <div className="prose prose-sm max-w-none">
              <TiptapViewer content={packageWithConvertedPrice.description} />
            </div>
          </div>
        )}

        {/* Informasi Dasar */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
          <h3 className="flex items-center gap-3 text-white font-semibold text-lg mb-6">
            <Package className="h-6 w-6" />
            Informasi Paket Wisata
          </h3>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Kategori</p>
                      <p className="font-semibold text-white">{packageWithConvertedPrice.category?.name || '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Dibuat Pada</p>
                      <p className="font-semibold text-white">{format(new Date(packageWithConvertedPrice.createdAt), "dd MMMM yyyy", { locale: id })}</p>
                    </div>
                  </div>
              </div>

              <div className="space-y-4">
                {packageWithConvertedPrice.duration && (
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Durasi</p>
                      <p className="font-semibold text-white">{packageWithConvertedPrice.duration}</p>
                    </div>
                  </div>
                )}

                {packageWithConvertedPrice.price && (
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Harga</p>
                      <p className="font-semibold text-white">{formatIDR(packageWithConvertedPrice.price)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kategori */}
        {packageWithConvertedPrice.category && (
          <div>
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg mb-4">
              <Users className="h-6 w-6" />
              Kategori Wisata
            </h3>
            <Card className="border-2 border-primary/10 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-primary mb-2">
                      {packageWithConvertedPrice.category.name}
                    </h4>
                    {packageWithConvertedPrice.category.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {packageWithConvertedPrice.category.description}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Kategori
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Tertarik dengan Paket Ini?
              </h3>
              <p className="text-muted-foreground mb-6">
                Hubungi kami untuk informasi lebih lanjut dan pemesanan paket wisata ini.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Hubungi Kami
                </Button>
                <Button variant="outline" size="lg">
                  Lihat Paket Lainnya
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
} 