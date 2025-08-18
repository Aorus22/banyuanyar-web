import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Perangkat Desa Tidak Ditemukan</h2>
        <p className="text-muted-foreground">
          Perangkat desa yang Anda cari tidak ditemukan atau telah dihapus.
        </p>
      </div>
      <Button asChild>
        <Link href="/admin/government-officials">
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Daftar Perangkat Desa
        </Link>
      </Button>
    </div>
  );
} 