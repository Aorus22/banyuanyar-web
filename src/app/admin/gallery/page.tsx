import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { UploadMediaModal, GalleryContent, GalleryGridSkeleton } from './gallery-content';
import { CreateGalleryModal } from './create-gallery-modal';
import { getGalleryStats } from './query';

async function GalleryStats() {
  const stats = await getGalleryStats();
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Total Galeri</h3>
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">{stats.totalGalleries}</div>
          <p className="text-xs text-muted-foreground">
            galeri tersedia
          </p>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Total Foto</h3>
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">{stats.totalPhotos}</div>
          <p className="text-xs text-muted-foreground">
            foto tersimpan
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Galeri</h1>
          <p className="text-muted-foreground">
            Kelola galeri foto dan acara desa
          </p>
        </div>
        <CreateGalleryModal>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Buat Galeri Baru
          </Button>
        </CreateGalleryModal>
      </div>

      {/* Stats */}
      <Suspense fallback={
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Galeri</h3>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">...</div>
              <p className="text-xs text-muted-foreground">
                galeri tersedia
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Foto</h3>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">...</div>
              <p className="text-xs text-muted-foreground">
                foto tersimpan
              </p>
            </div>
          </div>
        </div>
      }>
        <GalleryStats />
      </Suspense>

      {/* Gallery Grid */}
      <Suspense fallback={<GalleryGridSkeleton />}>
        <GalleryContent />
      </Suspense>
    </div>
  );
} 