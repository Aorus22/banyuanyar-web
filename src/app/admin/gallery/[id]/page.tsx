import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Image as ImageIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import { getGalleryById } from '../query';
import {
  GalleryDetailContent,
  GalleryDetailSkeleton
} from './gallery-detail-content';
import { UploadGalleryMediaModal } from './upload-gallery-media-modal';

interface GalleryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GalleryDetailPage({
  params
}: GalleryDetailPageProps) {
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
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link href='/admin/gallery'>
            <Button variant='outline' size='sm'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              {gallery.title}
            </h1>
            <p className='text-muted-foreground'>
              {gallery.description || 'Tidak ada deskripsi'}
            </p>
          </div>
        </div>
        <UploadGalleryMediaModal galleryId={galleryId}>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Upload Foto
          </Button>
        </UploadGalleryMediaModal>
      </div>

      {/* Gallery Info */}
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='bg-card text-card-foreground rounded-xl border shadow'>
          <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
            <h3 className='text-sm font-medium tracking-tight'>Status</h3>
            <ImageIcon className='text-muted-foreground h-4 w-4' />
          </div>
          <div className='p-6 pt-0'>
            <div className='text-2xl font-bold'>
              {gallery.isActive ? 'Aktif' : 'Nonaktif'}
            </div>
            <p className='text-muted-foreground text-xs'>
              Galeri{' '}
              {gallery.isActive ? 'dapat diakses' : 'tidak dapat diakses'}
            </p>
          </div>
        </div>
        <div className='bg-card text-card-foreground rounded-xl border shadow'>
          <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
            <h3 className='text-sm font-medium tracking-tight'>
              Tanggal Acara
            </h3>
            <ImageIcon className='text-muted-foreground h-4 w-4' />
          </div>
          <div className='p-6 pt-0'>
            <div className='text-2xl font-bold'>
              {gallery.eventDate
                ? new Date(gallery.eventDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                : 'Tidak ada'}
            </div>
            <p className='text-muted-foreground text-xs'>
              {gallery.eventDate
                ? 'Tanggal acara galeri'
                : 'Tidak ada tanggal acara'}
            </p>
          </div>
        </div>
        <div className='bg-card text-card-foreground rounded-xl border shadow'>
          <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
            <h3 className='text-sm font-medium tracking-tight'>Dibuat</h3>
            <ImageIcon className='text-muted-foreground h-4 w-4' />
          </div>
          <div className='p-6 pt-0'>
            <div className='text-2xl font-bold'>
              {new Date(gallery.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <p className='text-muted-foreground text-xs'>
              Tanggal pembuatan galeri
            </p>
          </div>
        </div>
        <div className='bg-card text-card-foreground rounded-xl border shadow'>
          <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
            <h3 className='text-sm font-medium tracking-tight'>Deskripsi</h3>
            <ImageIcon className='text-muted-foreground h-4 w-4' />
          </div>
          <div className='p-6 pt-0'>
            <div className='text-2xl font-bold'>
              {gallery.description ? 'Ada' : 'Tidak ada'}
            </div>
            <p className='text-muted-foreground text-xs'>
              {gallery.description
                ? 'Galeri memiliki deskripsi'
                : 'Galeri tanpa deskripsi'}
            </p>
          </div>
        </div>
      </div>

      {/* Description Card */}
      {gallery.description && (
        <div className='bg-card text-card-foreground rounded-xl border shadow'>
          <div className='p-6'>
            <h3 className='mb-3 text-lg font-semibold'>Deskripsi Galeri</h3>
            <p className='text-muted-foreground leading-relaxed'>
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
