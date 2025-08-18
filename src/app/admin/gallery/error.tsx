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
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-red-600" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Terjadi Kesalahan
        </h1>
        <p className="text-gray-600 max-w-md">
          Maaf, terjadi kesalahan yang tidak terduga saat memuat halaman galeri. 
          Silakan coba lagi atau hubungi administrator.
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Button onClick={reset} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Coba Lagi
        </Button>
        <Link href="/admin">
          <Button>
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>

      {error.digest && (
        <div className="text-xs text-gray-500">
          Error ID: {error.digest}
        </div>
      )}
    </div>
  );
} 