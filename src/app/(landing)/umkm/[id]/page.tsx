import { notFound } from 'next/navigation'
import { getUmkmById, getUmkmMedia } from './query'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImagePreviewCarousel } from '@/components/ui/custom/media-manager'
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer'
import { GoogleMapsViewer } from '@/components/ui/custom/google-maps-viewer'
import { MapPin, Phone, Mail, Globe, Building2, Users, Package, Calendar, MapPinned } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect'

interface UmkmDetailPageProps {
  params: Promise<{
    id: string
  }>
}

interface UmkmProduct {
  id: number
  name: string
  description: string | null
  price: number
  unit: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface UmkmWithProducts {
  id: number
  name: string
  ownerName: string | null
  description: string | null
  productType: string | null
  address: string | null
  phone: string | null
  email: string | null
  socialMedia: any
  latitude: number | null
  longitude: number | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  products: UmkmProduct[]
  _count: {
    products: number
  }
}

export default async function UmkmDetailPage({ params }: UmkmDetailPageProps) {
  const { id: umkmId } = await params
  const umkm = await getUmkmById(parseInt(umkmId)) as UmkmWithProducts | null
  const umkmImages = await getUmkmMedia(parseInt(umkmId))

  if (!umkm) {
    notFound()
  }

  return (
    <>
      <PageHeaderEffect 
        title={umkm.name}
        description={`UMKM di Desa Banyuanyar`}
      />

      <div className="container mx-auto px-4 space-y-8 max-w-5xl">


        {/* Image Carousel */}
        {umkmImages.length === 0 ? (
          // No media available
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
        ) : umkmImages.length === 1 ? (
          // Single image - no carousel needed
          <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={umkmImages[0]}
              alt="UMKM Image"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          // Multiple images - use carousel
          <div className="h-96">
            <ImagePreviewCarousel
              images={umkmImages}
              showThumbnails={true}
              showSmallImages={true}
              autoPlay={true}
              interval={4000}
              className="h-full"
            />
          </div>
        )}

        {/* Deskripsi */}
        {umkm.description && (
          <div>
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg mb-4">
              <Package className="h-6 w-6" />
              Tentang
            </h3>
            <div className="prose prose-sm max-w-none">
              <TiptapViewer content={umkm.description} />
            </div>
          </div>
        )}

        {/* Informasi Dasar & Media Sosial */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
          <h3 className="flex items-center gap-3 text-white font-semibold text-lg mb-6">
            <Building2 className="h-6 w-6" />
            Informasi UMKM
          </h3>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Pemilik</p>
                    <p className="font-semibold text-white">{umkm.ownerName || 'Tidak diketahui'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Bergabung Sejak</p>
                    <p className="font-semibold text-white">{format(new Date(umkm.createdAt), "dd MMMM yyyy", { locale: id })}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {umkm.phone && (
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Telepon</p>
                      <p className="font-semibold text-white">{umkm.phone}</p>
                    </div>
                  </div>
                )}

                {umkm.email && (
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Email</p>
                      <p className="font-semibold text-white">{umkm.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Media Sosial */}
            {umkm.socialMedia && Object.keys(umkm.socialMedia as any).length > 0 && (
                              <div className="mt-6 pt-6 border-t border-white/20">
                              <h4 className="flex items-center gap-3 text-white font-semibold text-lg mb-4">
                <Users className="h-5 w-5" />
                Media Sosial
              </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(umkm.socialMedia as any).instagram && (
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">IG</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-pink-700">{(umkm.socialMedia as any).instagram}</p>
                      </div>
                    </div>
                  )}
                  
                  {(umkm.socialMedia as any).facebook && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">FB</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-700">{(umkm.socialMedia as any).facebook}</p>
                      </div>
                    </div>
                  )}
                  
                  {(umkm.socialMedia as any).twitter && (
                    <div className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-200 rounded-lg">
                      <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">X</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-sky-700">{(umkm.socialMedia as any).twitter}</p>
                      </div>
                    </div>
                  )}
                  
                  {(umkm.socialMedia as any).tiktok && (
                    <div className="flex items-center gap-3 p-3 bg-black text-white rounded-lg">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">TT</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{(umkm.socialMedia as any).tiktok}</p>
                      </div>
                    </div>
                  )}
                  
                  {(umkm.socialMedia as any).youtube && (
                    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">YT</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-700">{(umkm.socialMedia as any).youtube}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lokasi */}
        <div>
          <h3 className="flex items-center gap-3 text-primary font-semibold text-lg mb-4">
            <MapPinned className="h-6 w-6" />
            Lokasi
          </h3>
          <div className="space-y-4">
            {umkm.address && (
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mt-1">
                  <MapPin className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alamat</p>
                  <p className="font-semibold text-sm">{umkm.address}</p>
                </div>
              </div>
            )}

            {umkm.latitude && umkm.longitude && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Koordinat</p>
                    <p className="font-semibold text-sm">
                      {umkm.latitude.toFixed(6)}, {umkm.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
                
                {/* Google Maps Preview */}
                <div className="rounded-lg overflow-hidden border">
                  <GoogleMapsViewer
                    latitude={umkm.latitude}
                    longitude={umkm.longitude}
                    height="300px"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Produk UMKM */}
        <div>
          <h3 className="flex items-center gap-3 text-primary font-semibold text-lg mb-4">
            <Package className="h-6 w-6" />
            Produk UMKM
            <Badge variant="secondary" className="ml-2">
              {umkm._count.products} produk
            </Badge>
          </h3>
          <div>
            {umkm.products.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada produk untuk UMKM ini</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {umkm.products.map((product: UmkmProduct) => (
                  <Card key={product.id} className="group overflow-hidden border-2 border-primary/5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col">
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                          <Package className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                      </AspectRatio>
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 text-primary border-primary/20">
                          {product.isActive ? "Aktif" : "Tidak Aktif"}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex-1">
                      <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                              {product.name}
                            </h3>
                            {product.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-primary">
                              Rp {product.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              per {product.unit}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 mt-auto">
                          {umkm.phone && (
                            <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                              <a 
                                href={`https://wa.me/${umkm.phone.replace(/\D/g, '')}?text=Halo, saya tertarik dengan produk ${product.name} dari ${umkm.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Pesan Sekarang
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 