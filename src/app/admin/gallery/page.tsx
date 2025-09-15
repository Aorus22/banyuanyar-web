import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Image as ImageIcon } from 'lucide-react';
import {
  UploadMediaModal,
  GalleryContent,
  GalleryGridSkeleton
} from './gallery-content';
import { CreateGalleryModal } from './create-gallery-modal';
import { getGalleryStats } from './query';

async function GalleryStats() {
  const stats = await getGalleryStats();

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <div className='bg-card text-card-foreground rounded-xl border shadow'>
        <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
          <h3 className='text-sm font-medium tracking-tight'>Total Galeri</h3>
          <ImageIcon className='text-muted-foreground h-4 w-4' />
        </div>
        <div className='p-6 pt-0'>
          <div className='text-2xl font-bold'>{stats.totalGalleries}</div>
          <p className='text-muted-foreground text-xs'>galeri tersedia</p>
        </div>
      </div>
      <div className='bg-card text-card-foreground rounded-xl border shadow'>
        <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
          <h3 className='text-sm font-medium tracking-tight'>Total Foto</h3>
          <ImageIcon className='text-muted-foreground h-4 w-4' />
        </div>
        <div className='p-6 pt-0'>
          <div className='text-2xl font-bold'>{stats.totalPhotos}</div>
          <p className='text-muted-foreground text-xs'>foto tersimpan</p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Galeri</h1>
          <p className='text-muted-foreground'>
            Kelola galeri foto dan acara desa
          </p>
        </div>
        <CreateGalleryModal>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Buat Galeri Baru
          </Button>
        </CreateGalleryModal>
      </div>

      {/* Stats */}
      <Suspense
        fallback={
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='bg-card text-card-foreground rounded-xl border shadow'>
              <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
                <h3 className='text-sm font-medium tracking-tight'>
                  Total Galeri
                </h3>
                <ImageIcon className='text-muted-foreground h-4 w-4' />
              </div>
              <div className='p-6 pt-0'>
                <div className='text-2xl font-bold'>...</div>
                <p className='text-muted-foreground text-xs'>galeri tersedia</p>
              </div>
            </div>
            <div className='bg-card text-card-foreground rounded-xl border shadow'>
              <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
                <h3 className='text-sm font-medium tracking-tight'>
                  Total Foto
                </h3>
                <ImageIcon className='text-muted-foreground h-4 w-4' />
              </div>
              <div className='p-6 pt-0'>
                <div className='text-2xl font-bold'>...</div>
                <p className='text-muted-foreground text-xs'>foto tersimpan</p>
              </div>
            </div>
          </div>
        }
      >
        <GalleryStats />
      </Suspense>

      {/* Gallery Grid */}
      <Suspense fallback={<GalleryGridSkeleton />}>
        <GalleryContent />
      </Suspense>
    </div>
  );
}
