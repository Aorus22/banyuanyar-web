import { notFound } from 'next/navigation';
import { getUmkmById } from '../query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, MapPin, Phone, Mail, User, Package, Calendar, Globe, Building2, Users, FileText, MapPinned } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import UmkmProductTable from './umkm-product-table';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';
import { GoogleMapsViewer } from '@/components/ui/custom/google-maps-viewer';
import { ImagePreviewCarousel } from '@/components/ui/custom';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string | null;
    price: number;
    unit: string;
    isActive: boolean;
  };
  umkmId: number;
}

function ProductCard({ product, umkmId }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border transition-colors hover:border-primary/50">
      <div className="relative">
        <div className="aspect-square bg-muted/30 flex items-center justify-center">
          <Package className="h-16 w-16 text-muted-foreground/50" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold leading-tight line-clamp-2">{product.name}</h3>
            <Badge variant={product.isActive ? "default" : "secondary"}>
              {product.isActive ? "Aktif" : "Tidak Aktif"}
            </Badge>
          </div>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">
              Rp {product.price.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              per {product.unit}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button asChild size="sm" variant="outline" className="flex-1">
              <Link href={`/admin/umkm/${umkmId}/product/${product.id}/edit`}>
                Edit
              </Link>
            </Button>
            <Button asChild size="sm" className="flex-1">
              <Link href={`/admin/umkm/${umkmId}/product/${product.id}`}>
                Detail
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface UmkmDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UmkmDetailPage({ params }: UmkmDetailPageProps) {
  const { id: umkmId } = await params;
  const umkm = await getUmkmById(parseInt(umkmId));

  if (!umkm) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header dengan tombol Edit */}
      <div className='flex items-start justify-between'>
        <div className="space-y-2">
          <Heading
            title={umkm.name}
            description='Detail informasi UMKM dan produk'
          />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>UMKM ID: {umkm.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>{umkm._count.products} produk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${umkm.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={umkm.isActive ? 'text-green-600' : 'text-red-600'}>
                {umkm.isActive ? 'Aktif' : 'Tidak Aktif'}
              </span>
            </div>
          </div>
        </div>
        <Button asChild className="flex items-center gap-2 bg-primary hover:bg-primary/90">
          <Link href={`/admin/umkm/${umkmId}/edit`}>
            <Edit className="h-4 w-4" /> Edit UMKM
          </Link>
        </Button>
      </div>
      <Separator />

      <div className="space-y-6">
        {/* Informasi Dasar */}
        <Card className="border-2 border-primary/10 shadow-sm pt-0">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
              <Building2 className="h-6 w-6" />
              Informasi Dasar
            </h3>
          </div>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pemilik</p>
                    <p className="font-semibold">{umkm.ownerName || 'Tidak diketahui'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bergabung Sejak</p>
                    <p className="font-semibold">{format(new Date(umkm.createdAt), "dd MMMM yyyy", { locale: id })}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {umkm.phone && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telepon</p>
                      <p className="font-semibold">{umkm.phone}</p>
                    </div>
                  </div>
                )}

                {umkm.email && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{umkm.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deskripsi */}
        {umkm.description && (
          <Card className="border-2 border-primary/10 shadow-sm pt-0">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
              <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
                <FileText className="h-6 w-6" />
                Deskripsi UMKM
              </h3>
            </div>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none">
                <TiptapViewer content={umkm.description} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lokasi */}
        <Card className="border-2 border-primary/10 shadow-sm pt-0">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
              <MapPinned className="h-6 w-6" />
              Lokasi
            </h3>
          </div>
          <CardContent className="pt-6 space-y-4">
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
                    height="200px"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Media Sosial */}
        {umkm.socialMedia && Object.keys(umkm.socialMedia).length > 0 && (
          <Card className="border-2 border-primary/10 shadow-sm pt-0">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
              <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
                <Users className="h-6 w-6" />
                Media Sosial
              </h3>
            </div>
            <CardContent className="pt-6">
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
            </CardContent>
          </Card>
        )}



        {/* Produk UMKM */}
        <Card className="border-2 border-primary/10 shadow-sm pt-0">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
                <Package className="h-6 w-6" />
                Produk UMKM
                <Badge variant="secondary" className="ml-2">
                  {umkm._count.products} produk
                </Badge>
              </h3>
              <Button asChild size="sm" variant="outline" className="flex items-center gap-2">
                <Link href={`/admin/umkm/${umkmId}/product/create`}>
                  <Package className="h-4 w-4" /> Tambah Produk
                </Link>
              </Button>
            </div>
          </div>
          <CardContent className="pt-6">
            {umkm.products.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada produk untuk UMKM ini</p>
                <Button asChild className="mt-4">
                  <Link href={`/admin/umkm/${umkm.id}/product/create`}>
                    Tambah Produk Pertama
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {umkm.products.map((product) => (
                  <ProductCard key={product.id} product={product} umkmId={umkm.id} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}