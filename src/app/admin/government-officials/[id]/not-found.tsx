import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function NotFound() {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center space-y-4'>
      <div className='space-y-2 text-center'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Perangkat Desa Tidak Ditemukan
        </h2>
        <p className='text-muted-foreground'>
          Perangkat desa yang Anda cari tidak ditemukan atau telah dihapus.
        </p>
      </div>
      <Button asChild>
        <Link href='/admin/government-officials'>
          <Icons.arrowLeft className='mr-2 h-4 w-4' />
          Kembali ke Daftar Perangkat Desa
        </Link>
      </Button>
    </div>
  );
}
