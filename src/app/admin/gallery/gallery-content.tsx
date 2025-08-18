import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Upload, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { GalleryCard } from './gallery-card';
import { getGalleryList } from './query';
import Link from 'next/link';

export { UploadMediaModal } from './upload-media-modal';

export function GalleryContent() {
  return (
    <GalleryGrid />
  );
}

async function GalleryGrid() {
  const galleryList = await getGalleryList();

  if (galleryList.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryList.map((gallery) => (
          <GalleryCard
            key={gallery.id}
            gallery={gallery}
          />
        ))}
      </div>

      {/* Pagination info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Menampilkan {galleryList.length} dari {galleryList.length} galeri
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
        Belum ada galeri
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Mulai dengan membuat galeri pertama Anda. Anda dapat membuat galeri untuk 
        berbagai acara dan kegiatan desa.
      </p>
      
      <Button size="lg">
        <Upload className="w-5 h-5 mr-2" />
        Buat galeri pertama Anda
      </Button>
    </div>
  );
}

export function GalleryGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video bg-gray-100">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16" />
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