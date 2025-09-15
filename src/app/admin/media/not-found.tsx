import { Button } from '@/components/ui/button';
import { Search, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center text-center'>
      <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100'>
        <Search className='h-12 w-12 text-gray-400' />
      </div>

      <h2 className='mb-2 text-2xl font-semibold text-gray-900'>
        Halaman tidak ditemukan
      </h2>

      <p className='mb-6 max-w-md text-gray-600'>
        Halaman yang Anda cari tidak ada. Mungkin telah dipindahkan atau
        dihapus.
      </p>

      <div className='flex space-x-3'>
        <Button asChild variant='outline'>
          <Link href='/admin'>
            <Home className='mr-2 h-4 w-4' />
            Ke Dashboard
          </Link>
        </Button>

        <Button asChild>
          <Link href='/admin/media'>Ke Perpustakaan Media</Link>
        </Button>
      </div>
    </div>
  );
}
