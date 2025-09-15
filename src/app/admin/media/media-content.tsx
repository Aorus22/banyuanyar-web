import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { MediaCard } from './media-card';
import { UploadMediaModal } from './upload-media-modal';
import { getMediaList } from './query';

export { UploadMediaModal } from './upload-media-modal';

export function MediaContent() {
  return <MediaGrid />;
}

async function MediaGrid() {
  const mediaList = await getMediaList();

  if (mediaList.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className='space-y-6'>
      {/* Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {mediaList.map((media) => (
          <MediaCard
            key={media.id}
            media={{
              id: media.id,
              fileName: media.fileName,
              fileSize: media.fileSize,
              fileUrl: media.fileUrl,
              mimeType: media.mimeType,
              entityType: media.entityType,
              entityId: media.entityId,
              createdAt: media.createdAt
            }}
          />
        ))}
      </div>

      {/* Pagination info */}
      <div className='text-muted-foreground flex items-center justify-between text-sm'>
        <span>
          Menampilkan {mediaList.length} dari {mediaList.length} file media
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
        Belum ada file media
      </h3>

      <p className='mx-auto mb-6 max-w-md text-gray-500'>
        Mulai dengan mengupload file media pertama Anda. Anda dapat mengupload
        gambar, dokumen, dan file lainnya untuk mengatur dan mengelola konten
        Anda.
      </p>

      <UploadMediaModal>
        <Button size='lg'>
          <Upload className='mr-2 h-5 w-5' />
          Upload file pertama Anda
        </Button>
      </UploadMediaModal>
    </div>
  );
}

export function MediaGridSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} className='overflow-hidden'>
            <div className='aspect-square bg-gray-100'>
              <Skeleton className='h-full w-full' />
            </div>
            <CardContent className='space-y-3 p-4'>
              <Skeleton className='h-4 w-full' />
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <Skeleton className='h-3 w-16' />
                  <Skeleton className='h-3 w-20' />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-3 w-12' />
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
