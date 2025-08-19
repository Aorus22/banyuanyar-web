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
import { safeFormatDateFullMonth } from '@/lib/date-utils'
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
  imageUrls: string[]
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
        ) : (
            <ImagePreviewCarousel
              images={umkmImages}
              showThumbnails={true}
              showSmallImages={true}
              autoPlay={true}
              interval={4000}
              className="h-full"
            />
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
                    <p className="font-semibold text-white">{umkm.ownerName || '-'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Bergabung Sejak</p>
                    <p className="font-semibold text-white">{safeFormatDateFullMonth(umkm.createdAt)}</p>
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
                  {(umkm.socialMedia as any).whatsapp && (
                    <a 
                      href={`https://wa.me/${(umkm.socialMedia as any).whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-700">{(umkm.socialMedia as any).whatsapp}</p>
                      </div>
                    </a>
                  )}

                  {(umkm.socialMedia as any).instagram && (
                    <a 
                      href={`https://instagram.com/${(umkm.socialMedia as any).instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg hover:from-pink-100 hover:to-purple-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-pink-700">{(umkm.socialMedia as any).instagram}</p>
                      </div>
                    </a>
                  )}
                  
                  {(umkm.socialMedia as any).facebook && (
                    <a 
                      href={`https://facebook.com/${(umkm.socialMedia as any).facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-700">{(umkm.socialMedia as any).facebook}</p>
                      </div>
                    </a>
                  )}
                  
                  {(umkm.socialMedia as any).twitter && (
                    <a 
                      href={`https://twitter.com/${(umkm.socialMedia as any).twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-sky-700">{(umkm.socialMedia as any).twitter}</p>
                      </div>
                    </a>
                  )}
                  
                  {(umkm.socialMedia as any).tiktok && (
                    <a 
                      href={`https://tiktok.com/@${(umkm.socialMedia as any).tiktok.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{(umkm.socialMedia as any).tiktok}</p>
                      </div>
                    </a>
                  )}
                  
                  {(umkm.socialMedia as any).youtube && (
                    <a 
                      href={`https://youtube.com/@${(umkm.socialMedia as any).youtube.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-700">{(umkm.socialMedia as any).youtube}</p>
                      </div>
                    </a>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {umkm.products.map((product: UmkmProduct) => (
                  <Card key={product.id} className="group overflow-hidden border-2 border-primary/5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col pt-0">
                    <div className="relative">
                      {product.imageUrls.length > 0 ? (
                        <ImagePreviewCarousel
                          images={product.imageUrls}
                          showThumbnails={true}
                          showSmallImages={false}
                          autoPlay={false}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                          <Package className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                      )}
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

                          {(product.price || product.unit) && (
                            <div className="flex items-center justify-between">
                              {product.price && (
                                <div className="text-lg font-bold text-primary">
                                  Rp {product.price.toLocaleString()}
                                </div>
                              )}
                              {product.unit && (
                                <div className="text-sm text-muted-foreground">
                                  per {product.unit}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 mt-auto">
                          {umkm.socialMedia && (umkm.socialMedia as any).whatsapp ? (
                            <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                              <a 
                                href={`https://wa.me/${(umkm.socialMedia as any).whatsapp.replace(/\D/g, '')}?text=Halo, saya tertarik dengan produk ${product.name} dari ${umkm.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Pesan
                              </a>
                            </Button>
                          ) : umkm.phone ? (
                            <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                              <a 
                                href={`tel:${umkm.phone}`}
                              >
                                Hubungi via Telepon
                              </a>
                            </Button>
                          ) : null}
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