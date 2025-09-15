import { notFound } from 'next/navigation';
import { getUmkmById } from '../query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Edit,
  MapPin,
  Phone,
  Mail,
  User,
  Package,
  Calendar,
  Globe,
  Building2,
  Users,
  FileText,
  MapPinned,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { safeFormatDateFullMonth } from '@/lib/date-utils';
import UmkmProductTable from './umkm-product-table';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';
import { GoogleMapsViewer } from '@/components/ui/custom/google-maps-viewer';
import { ImagePreviewCarousel } from '@/components/ui/custom/media-manager/image-preview-carousel';
import { prisma } from '@/lib/prisma';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string | null;
    price: number;
    unit: string | null;
    isActive: boolean;
    imageUrls: string[];
  };
  umkmId: number;
}

function ProductCard({ product, umkmId }: ProductCardProps) {
  return (
    <Card className='group hover:border-primary/50 overflow-hidden border transition-colors'>
      <div className='relative'>
        {product.imageUrls.length > 0 ? (
          <ImagePreviewCarousel
            images={product.imageUrls}
            showThumbnails={true}
            showSmallImages={false}
            autoPlay={false}
            className='h-full w-full'
          />
        ) : (
          <div className='bg-muted/30 flex aspect-square items-center justify-center'>
            <Package className='text-muted-foreground/50 h-16 w-16' />
          </div>
        )}
      </div>
      <CardContent className='p-4'>
        <div className='space-y-2'>
          <div className='flex items-start justify-between'>
            <h3 className='line-clamp-2 leading-tight font-semibold'>
              {product.name}
            </h3>
            <Badge variant={product.isActive ? 'default' : 'secondary'}>
              {product.isActive ? 'Aktif' : 'Tidak Aktif'}
            </Badge>
          </div>
          {product.description && (
            <p className='text-muted-foreground line-clamp-2 text-sm'>
              {product.description}
            </p>
          )}
          <div className='flex items-center justify-between'>
            <div className='text-primary text-lg font-bold'>
              Rp {product.price.toLocaleString()}
            </div>
            <div className='text-muted-foreground text-sm'>
              per {product.unit || 'unit'}
            </div>
          </div>
          <div className='flex gap-2 pt-2'>
            <Button asChild size='sm' className='flex-1'>
              <Link href={`/admin/umkm/${umkmId}/product/${product.id}/edit`}>
                Edit
              </Link>
            </Button>
            {/* <Button asChild size="sm" className="flex-1">
              <Link href={`/admin/umkm/${umkmId}/product/${product.id}`}>
                Detail
              </Link>
            </Button> */}
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

  // Get media for this UMKM
  const umkmMedia = await prisma.media.findMany({
    where: {
      entityType: 'umkm',
      entityId: umkm.id
    },
    orderBy: { id: 'asc' }
  });

  const umkmImageUrls = umkmMedia.map((m) => m.fileUrl);

  return (
    <div className='space-y-8'>
      {/* Header dengan tombol Edit */}
      <div className='flex items-start justify-between'>
        <div className='space-y-2'>
          <Heading
            title={umkm.name}
            description='Detail informasi UMKM dan produk'
          />
          <div className='text-muted-foreground flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-2'>
              <Building2 className='h-4 w-4' />
              <span>UMKM ID: {umkm.id}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Package className='h-4 w-4' />
              <span>{umkm._count.products} produk</span>
            </div>
            <div className='flex items-center gap-2'>
              <div
                className={`h-2 w-2 rounded-full ${umkm.isActive ? 'bg-green-500' : 'bg-red-500'}`}
              ></div>
              <span
                className={umkm.isActive ? 'text-green-600' : 'text-red-600'}
              >
                {umkm.isActive ? 'Aktif' : 'Tidak Aktif'}
              </span>
            </div>
          </div>
        </div>
        <Button
          asChild
          className='bg-primary hover:bg-primary/90 flex items-center gap-2'
        >
          <Link href={`/admin/umkm/${umkmId}/edit`}>
            <Edit className='h-4 w-4' /> Edit UMKM
          </Link>
        </Button>
      </div>
      <Separator />

      <div className='space-y-6'>
        {/* Informasi Dasar */}
        <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
          <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
            <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
              <Building2 className='h-6 w-6' />
              Informasi Dasar
            </h3>
          </div>
          <CardContent className='pt-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-4'>
                <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                  <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full'>
                    <User className='text-primary h-5 w-5' />
                  </div>
                  <div>
                    <p className='text-muted-foreground text-sm'>Pemilik</p>
                    <p className='font-semibold'>
                      {umkm.ownerName || 'Tidak diketahui'}
                    </p>
                  </div>
                </div>

                <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10'>
                    <Calendar className='h-5 w-5 text-green-600' />
                  </div>
                  <div>
                    <p className='text-muted-foreground text-sm'>
                      Bergabung Sejak
                    </p>
                    <p className='font-semibold'>
                      {safeFormatDateFullMonth(umkm.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                {umkm.phone && (
                  <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10'>
                      <Phone className='h-5 w-5 text-blue-600' />
                    </div>
                    <div>
                      <p className='text-muted-foreground text-sm'>Telepon</p>
                      <p className='font-semibold'>{umkm.phone}</p>
                    </div>
                  </div>
                )}

                {umkm.phone && (
                  <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10'>
                      <svg
                        className='h-5 w-5 text-green-600'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' />
                      </svg>
                    </div>
                    <div>
                      <p className='text-muted-foreground text-sm'>WhatsApp</p>
                      <a
                        href={`https://wa.me/${umkm.phone.replace(/\D/g, '')}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-semibold text-green-600 transition-colors hover:text-green-700'
                      >
                        {umkm.phone}
                      </a>
                    </div>
                  </div>
                )}

                {umkm.email && (
                  <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10'>
                      <Mail className='h-5 w-5 text-orange-600' />
                    </div>
                    <div>
                      <p className='text-muted-foreground text-sm'>Email</p>
                      <p className='font-semibold'>{umkm.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deskripsi */}
        {umkm.description && (
          <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
            <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
              <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
                <FileText className='h-6 w-6' />
                Deskripsi UMKM
              </h3>
            </div>
            <CardContent className='pt-6'>
              <div className='prose prose-sm max-w-none'>
                <TiptapViewer content={umkm.description} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Media UMKM */}
        {umkmMedia.length > 0 && (
          <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
            <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
              <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
                <ImageIcon className='h-6 w-6' />
                Media UMKM
              </h3>
            </div>
            <CardContent className='pt-6'>
              <div className='max-w-2xl'>
                <ImagePreviewCarousel
                  images={umkmImageUrls}
                  showThumbnails={true}
                  showSmallImages={true}
                  autoPlay={false}
                  className='h-full'
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lokasi */}
        <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
          <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
            <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
              <MapPinned className='h-6 w-6' />
              Lokasi
            </h3>
          </div>
          <CardContent className='space-y-4 pt-6'>
            {umkm.address && (
              <div className='bg-muted/30 flex items-start gap-3 rounded-lg p-3'>
                <div className='mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10'>
                  <MapPin className='h-5 w-5 text-red-600' />
                </div>
                <div>
                  <p className='text-muted-foreground text-sm'>Alamat</p>
                  <p className='text-sm font-semibold'>{umkm.address}</p>
                </div>
              </div>
            )}

            {umkm.latitude && umkm.longitude && (
              <div className='space-y-3'>
                <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10'>
                    <Globe className='h-5 w-5 text-purple-600' />
                  </div>
                  <div>
                    <p className='text-muted-foreground text-sm'>Koordinat</p>
                    <p className='text-sm font-semibold'>
                      {umkm.latitude.toFixed(6)}, {umkm.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>

                {/* Google Maps Preview */}
                <div className='overflow-hidden rounded-lg border'>
                  <GoogleMapsViewer
                    latitude={umkm.latitude}
                    longitude={umkm.longitude}
                    height='200px'
                    className='w-full'
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Media Sosial */}
        {umkm.socialMedia && Object.keys(umkm.socialMedia).length > 0 && (
          <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
            <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
              <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
                <Users className='h-6 w-6' />
                Media Sosial
              </h3>
            </div>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                {(umkm.socialMedia as any).instagram && (
                  <div className='flex items-center gap-3 rounded-lg border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 p-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-600'>
                      <span className='text-xs font-bold text-white'>IG</span>
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-pink-700'>
                        {(umkm.socialMedia as any).instagram}
                      </p>
                    </div>
                  </div>
                )}

                {(umkm.socialMedia as any).facebook && (
                  <div className='flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-600'>
                      <span className='text-xs font-bold text-white'>FB</span>
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-blue-700'>
                        {(umkm.socialMedia as any).facebook}
                      </p>
                    </div>
                  </div>
                )}

                {(umkm.socialMedia as any).twitter && (
                  <div className='flex items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 p-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-sky-500'>
                      <span className='text-xs font-bold text-white'>X</span>
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-sky-700'>
                        {(umkm.socialMedia as any).twitter}
                      </p>
                    </div>
                  </div>
                )}

                {(umkm.socialMedia as any).tiktok && (
                  <div className='flex items-center gap-3 rounded-lg bg-black p-3 text-white'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white'>
                      <span className='text-xs font-bold text-black'>TT</span>
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>
                        {(umkm.socialMedia as any).tiktok}
                      </p>
                    </div>
                  </div>
                )}

                {(umkm.socialMedia as any).youtube && (
                  <div className='flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-red-600'>
                      <span className='text-xs font-bold text-white'>YT</span>
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-red-700'>
                        {(umkm.socialMedia as any).youtube}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Produk UMKM */}
        <Card className='border-primary/10 border-2 pt-0 shadow-sm'>
          <div className='from-primary/5 to-primary/10 border-b bg-gradient-to-r px-6 py-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-primary flex items-center gap-3 text-lg font-semibold'>
                <Package className='h-6 w-6' />
                Produk UMKM
                <Badge variant='secondary' className='ml-2'>
                  {umkm._count.products} produk
                </Badge>
              </h3>
              <Button
                asChild
                size='sm'
                variant='outline'
                className='flex items-center gap-2'
              >
                <Link href={`/admin/umkm/${umkmId}/product/create`}>
                  <Package className='h-4 w-4' /> Tambah Produk
                </Link>
              </Button>
            </div>
          </div>
          <CardContent className='pt-6'>
            {umkm.products.length === 0 ? (
              <div className='text-muted-foreground py-8 text-center'>
                <Package className='mx-auto mb-4 h-12 w-12 opacity-50' />
                <p>Belum ada produk untuk UMKM ini</p>
                <Button asChild className='mt-4'>
                  <Link href={`/admin/umkm/${umkm.id}/product/create`}>
                    Tambah Produk Pertama
                  </Link>
                </Button>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {umkm.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    umkmId={umkm.id}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
