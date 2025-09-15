'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Gallery error:', error);
  }, [error]);

  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center space-y-6 text-center'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-red-100'>
        <AlertTriangle className='h-10 w-10 text-red-600' />
      </div>

      <div className='space-y-2'>
        <h1 className='text-2xl font-bold text-gray-900'>Terjadi Kesalahan</h1>
        <p className='max-w-md text-gray-600'>
          Maaf, terjadi kesalahan yang tidak terduga saat memuat halaman galeri.
          Silakan coba lagi atau hubungi administrator.
        </p>
      </div>

      <div className='flex items-center space-x-3'>
        <Button onClick={reset} variant='outline'>
          <RefreshCw className='mr-2 h-4 w-4' />
          Coba Lagi
        </Button>
        <Link href='/admin'>
          <Button>
            <Home className='mr-2 h-4 w-4' />
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>

      {error.digest && (
        <div className='text-xs text-gray-500'>Error ID: {error.digest}</div>
      )}
    </div>
  );
}
