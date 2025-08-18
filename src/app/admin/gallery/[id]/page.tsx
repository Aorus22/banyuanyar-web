import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Image as ImageIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import { getGalleryById } from '../query';
import { GalleryDetailContent, GalleryDetailSkeleton } from './gallery-detail-content';
import { UploadGalleryMediaModal } from './upload-gallery-media-modal';

interface GalleryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { id } = await params;
  const galleryId = parseInt(id);
  
  if (isNaN(galleryId)) {
    notFound();
  }

  const gallery = await getGalleryById(galleryId);
  
  if (!gallery) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/gallery">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{gallery.title}</h1>
            <p className="text-muted-foreground">
              {gallery.description || 'Tidak ada deskripsi'}
            </p>
          </div>
        </div>
        <UploadGalleryMediaModal galleryId={galleryId}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Upload Foto
          </Button>
        </UploadGalleryMediaModal>
      </div>

      {/* Gallery Info */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Status</h3>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">
              {gallery.isActive ? 'Aktif' : 'Nonaktif'}
            </div>
            <p className="text-xs text-muted-foreground">
              Galeri {gallery.isActive ? 'dapat diakses' : 'tidak dapat diakses'}
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Tanggal Acara</h3>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">
              {gallery.eventDate 
                ? new Date(gallery.eventDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                : 'Tidak ada'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {gallery.eventDate ? 'Tanggal acara galeri' : 'Tidak ada tanggal acara'}
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Dibuat</h3>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">
              {new Date(gallery.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Tanggal pembuatan galeri
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Deskripsi</h3>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">
              {gallery.description ? 'Ada' : 'Tidak ada'}
            </div>
            <p className="text-xs text-muted-foreground">
              {gallery.description ? 'Galeri memiliki deskripsi' : 'Galeri tanpa deskripsi'}
            </p>
          </div>
        </div>
      </div>

      {/* Description Card */}
      {gallery.description && (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3">Deskripsi Galeri</h3>
            <p className="text-muted-foreground leading-relaxed">
              {gallery.description}
            </p>
          </div>
        </div>
      )}

      {/* Gallery Photos */}
      <Suspense fallback={<GalleryDetailSkeleton />}>
        <GalleryDetailContent galleryId={galleryId} />
      </Suspense>
    </div>
  );
} 