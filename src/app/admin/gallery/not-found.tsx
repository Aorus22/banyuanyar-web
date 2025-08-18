import { Button } from '@/components/ui/button';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
        <Search className="w-10 h-10 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-600 max-w-md">
          Maaf, halaman galeri yang Anda cari tidak dapat ditemukan. 
          Mungkin halaman telah dihapus atau URL tidak valid.
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Link href="/admin/gallery">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Galeri
          </Button>
        </Link>
        <Link href="/admin">
          <Button>
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
} 