'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-12 h-12 text-red-600" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Terjadi kesalahan!
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {error.message || 'Terjadi kesalahan saat memuat perpustakaan media. Silakan coba lagi.'}
      </p>
      
      <div className="flex space-x-3">
        <Button onClick={reset} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Coba lagi
        </Button>
        
        <Button onClick={() => window.location.href = '/admin'}>
          Ke Dashboard
        </Button>
      </div>
    </div>
  );
} 