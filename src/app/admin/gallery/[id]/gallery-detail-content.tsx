import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { GalleryPhotoCard } from './gallery-photo-card';
import { getMediaByGalleryId } from '../query';

interface GalleryDetailContentProps {
  galleryId: number;
}

export function GalleryDetailContent({ galleryId }: GalleryDetailContentProps) {
  return (
    <GalleryPhotos galleryId={galleryId} />
  );
}

async function GalleryPhotos({ galleryId }: { galleryId: number }) {
  const mediaList = await getMediaByGalleryId(galleryId);

  if (mediaList.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mediaList.map((media) => (
          <GalleryPhotoCard
            key={media.id}
            media={media}
            galleryId={galleryId}
          />
        ))}
      </div>

      {/* Pagination info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Menampilkan {mediaList.length} dari {mediaList.length} foto
        </span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ImageIcon className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Belum ada foto dalam galeri ini
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Mulai dengan mengupload foto pertama Anda ke galeri ini. 
        Anda dapat mengupload gambar, dokumen, dan file lainnya.
      </p>
      
      <Button size="lg">
        <Upload className="w-5 h-5 mr-2" />
        Upload foto pertama
      </Button>
    </div>
  );
}

export function GalleryDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-square bg-gray-100">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
} 