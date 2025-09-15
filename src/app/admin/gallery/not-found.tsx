import { Button } from '@/components/ui/button';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center space-y-6 text-center'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-100'>
        <Search className='h-10 w-10 text-gray-400' />
      </div>

      <div className='space-y-2'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Halaman Tidak Ditemukan
        </h1>
        <p className='max-w-md text-gray-600'>
          Maaf, halaman galeri yang Anda cari tidak dapat ditemukan. Mungkin
          halaman telah dihapus atau URL tidak valid.
        </p>
      </div>

      <div className='flex items-center space-x-3'>
        <Link href='/admin/gallery'>
          <Button variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Kembali ke Galeri
          </Button>
        </Link>
        <Link href='/admin'>
          <Button>
            <Home className='mr-2 h-4 w-4' />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
