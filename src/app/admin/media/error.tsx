'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center text-center'>
      <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100'>
        <AlertTriangle className='h-12 w-12 text-red-600' />
      </div>

      <h2 className='mb-2 text-2xl font-semibold text-gray-900'>
        Terjadi kesalahan!
      </h2>

      <p className='mb-6 max-w-md text-gray-600'>
        {error.message ||
          'Terjadi kesalahan saat memuat perpustakaan media. Silakan coba lagi.'}
      </p>

      <div className='flex space-x-3'>
        <Button onClick={reset} variant='outline'>
          <RefreshCw className='mr-2 h-4 w-4' />
          Coba lagi
        </Button>

        <Button onClick={() => (window.location.href = '/admin')}>
          Ke Dashboard
        </Button>
      </div>
    </div>
  );
}
