import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Image as ImageIcon, Filter } from 'lucide-react';
import {
  UploadMediaModal,
  MediaContent,
  MediaGridSkeleton
} from './media-content';

export default function MediaPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Perpustakaan Media
          </h1>
          <p className='text-muted-foreground'>
            Kelola dan atur file media Anda
          </p>
        </div>

        <div className='flex items-center space-x-2'>
          <Button variant='outline' size='sm'>
            <Filter className='mr-2 h-4 w-4' />
            Filter
          </Button>

          <UploadMediaModal>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Upload Media
            </Button>
          </UploadMediaModal>
        </div>
      </div>

      {/* Stats */}
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='bg-card text-card-foreground rounded-lg border p-6 shadow-sm'>
          <div className='flex items-center space-x-2'>
            <ImageIcon className='text-muted-foreground h-4 w-4' />
            <span className='text-sm font-medium'>Total File</span>
          </div>
          <div className='text-2xl font-bold'>0</div>
          <p className='text-muted-foreground text-xs'>Semua file media</p>
        </div>

        <div className='bg-card text-card-foreground rounded-lg border p-6 shadow-sm'>
          <div className='flex items-center space-x-2'>
            <ImageIcon className='text-muted-foreground h-4 w-4' />
            <span className='text-sm font-medium'>Berita</span>
          </div>
          <div className='text-2xl font-bold'>0</div>
          <p className='text-muted-foreground text-xs'>Gambar berita</p>
        </div>

        <div className='bg-card text-card-foreground rounded-lg border p-6 shadow-sm'>
          <div className='flex items-center space-x-2'>
            <ImageIcon className='text-muted-foreground h-4 w-4' />
            <span className='text-sm font-medium'>Galeri</span>
          </div>
          <div className='text-2xl font-bold'>0</div>
          <p className='text-muted-foreground text-xs'>Gambar galeri</p>
        </div>

        <div className='bg-card text-card-foreground rounded-lg border p-6 shadow-sm'>
          <div className='flex items-center space-x-2'>
            <ImageIcon className='text-muted-foreground h-4 w-4' />
            <span className='text-sm font-medium'>UMKM</span>
          </div>
          <div className='text-2xl font-bold'>0</div>
          <p className='text-muted-foreground text-xs'>Gambar UMKM</p>
        </div>
      </div>

      {/* Media Grid */}
      <Suspense fallback={<MediaGridSkeleton />}>
        <MediaContent />
      </Suspense>
    </div>
  );
}
