import { notFound } from 'next/navigation';
import { getTourismCategoryById } from '../query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Plus, Edit, Users, Calendar, Globe, FileText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';
import { ImagePreviewCarousel } from '@/components/ui/custom/media-manager/image-preview-carousel';
import { prisma } from '@/lib/prisma';

interface PackageCardProps {
  package_: {
    id: number;
    name: string;
    description: string | null;
    price: number | null;
    duration: string | null;
    isActive: boolean;
    categoryId: number;
  };
  categoryId: number;
}

function PackageCard({ package_, categoryId }: PackageCardProps) {
  const formatIDR = (price: number | null) => {
    if (!price) return 'Harga sesuai permintaan'
    const n = (price as any)?.toNumber ? (price as any).toNumber() : Number(price)
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
      isNaN(n) ? 0 : n
    )
  }

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
            <h3 className="font-semibold leading-tight line-clamp-2">{package_.name}</h3>
            <Badge variant={package_.isActive ? "default" : "secondary"}>
              {package_.isActive ? "Aktif" : "Tidak Aktif"}
            </Badge>
          </div>
          {package_.description && (
            <div className="text-sm text-muted-foreground">
              <TiptapViewer content={package_.description} />
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">
              {package_.price ? formatIDR(package_.price) : 'Harga sesuai permintaan'}
            </div>
            <div className="text-sm text-muted-foreground">
              {package_.duration || 'Durasi tidak ditentukan'}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button asChild size="sm" variant="outline" className="flex-1">
              <Link href={`/admin/tourism-category/${categoryId}/package/${package_.id}/edit`}>
                Edit
              </Link>
            </Button>
            <Button asChild size="sm" className="flex-1">
              <Link href={`/admin/tourism-category/${categoryId}/package/${package_.id}`}>
                Detail
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TourismCategoryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TourismCategoryDetailPage({ params }: TourismCategoryDetailPageProps) {
  const { id: categoryId } = await params;
  const category = await getTourismCategoryById(parseInt(categoryId));

  if (!category) {
    notFound();
  }

  // Get media for this category
  const categoryMedia = await prisma.media.findMany({
    where: {
      entityType: 'tourism_category',
      entityId: category.id
    },
    orderBy: { id: 'asc' }
  });

  const categoryImageUrls = categoryMedia.map(m => m.fileUrl);

  return (
    <div className="space-y-8">
      {/* Header dengan tombol Edit */}
      <div className='flex items-start justify-between'>
        <div className="space-y-2">
          <Heading
            title={category.name}
            description='Detail informasi kategori dan paket wisata'
          />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Kategori ID: {category.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{category._count.packages} paket wisata</span>
            </div>
          </div>
        </div>
        <Button asChild variant="outline">
          <Link href={`/admin/tourism-category/${category.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Kategori
          </Link>
        </Button>
      </div>

      <Separator />

      {/* Informasi Kategori */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nama Kategori</p>
                  <p className="font-semibold">{category.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dibuat Pada</p>
                  <p className="font-semibold">{format(new Date(category.createdAt), "dd MMMM yyyy", { locale: id })}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Paket</p>
                  <p className="font-semibold">{category._count.packages} paket</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="default">Aktif</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          {category.description && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="flex items-center gap-3 text-primary font-semibold text-lg mb-4">
                <FileText className="h-6 w-6" />
                Deskripsi Kategori
              </h3>
              <div className="prose prose-sm max-w-none">
                <TiptapViewer content={category.description} />
              </div>
            </div>
          )}

          {/* Media Kategori */}
          {categoryMedia.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="flex items-center gap-3 text-primary font-semibold text-lg mb-4">
                <ImageIcon className="h-6 w-6" />
                Media Kategori
              </h3>
              <div className="max-w-2xl">
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
        </CardContent>
      </Card>

      {/* Daftar Paket Wisata */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Paket Wisata</h3>
            <p className="text-sm text-muted-foreground">
              Daftar paket wisata dalam kategori ini
            </p>
          </div>
          <Button asChild size="sm">
            <Link href={`/admin/tourism-category/${category.id}/package/create`}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Paket
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {category.packages && category.packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.packages.map((package_) => (
                <PackageCard 
                  key={package_.id} 
                  package_={package_} 
                  categoryId={category.id} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Belum ada paket wisata dalam kategori ini.</p>
              <p className="text-sm">Tambahkan paket wisata pertama untuk memulai.</p>
              <Button asChild className="mt-4">
                <Link href={`/admin/tourism-category/${category.id}/package/create`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Paket Pertama
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 