import { Button } from '@/components/ui/button';
import { Search, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Halaman tidak ditemukan
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md">
        Halaman yang Anda cari tidak ada. Mungkin telah dipindahkan atau dihapus.
      </p>
      
      <div className="flex space-x-3">
        <Button asChild variant="outline">
          <Link href="/admin">
            <Home className="w-4 h-4 mr-2" />
            Ke Dashboard
          </Link>
        </Button>
        
        <Button asChild>
          <Link href="/admin/media">
            Ke Perpustakaan Media
          </Link>
        </Button>
      </div>
    </div>
  );
} 