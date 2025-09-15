import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Image as ImageIcon,
  Upload,
  Calendar,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { GalleryCard } from './gallery-card';
import { getGalleryList } from './query';
import Link from 'next/link';

export { UploadMediaModal } from './upload-media-modal';

export function GalleryContent() {
  return <GalleryGrid />;
}

async function GalleryGrid() {
  const galleryList = await getGalleryList();

  if (galleryList.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className='space-y-6'>
      {/* Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {galleryList.map((gallery) => (
          <GalleryCard key={gallery.id} gallery={gallery} />
        ))}
      </div>

      {/* Pagination info */}
      <div className='text-muted-foreground flex items-center justify-between text-sm'>
        <span>
          Menampilkan {galleryList.length} dari {galleryList.length} galeri
        </span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className='py-12 text-center'>
      <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100'>
        <ImageIcon className='h-12 w-12 text-gray-400' />
      </div>

      <h3 className='mb-2 text-lg font-semibold text-gray-900'>
        Belum ada galeri
      </h3>

      <p className='mx-auto mb-6 max-w-md text-gray-500'>
        Mulai dengan membuat galeri pertama Anda. Anda dapat membuat galeri
        untuk berbagai acara dan kegiatan desa.
      </p>

      <Button size='lg'>
        <Upload className='mr-2 h-5 w-5' />
        Buat galeri pertama Anda
      </Button>
    </div>
  );
}

export function GalleryGridSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className='overflow-hidden'>
            <div className='aspect-video bg-gray-100'>
              <Skeleton className='h-full w-full' />
            </div>
            <CardContent className='space-y-3 p-4'>
              <Skeleton className='h-5 w-full' />
              <Skeleton className='h-4 w-3/4' />
              <div className='flex items-center justify-between'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-6 w-16' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='flex justify-center'>
        <Skeleton className='h-4 w-48' />
      </div>
    </div>
  );
}
