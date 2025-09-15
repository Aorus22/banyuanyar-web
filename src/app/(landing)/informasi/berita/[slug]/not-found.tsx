import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft, Home } from 'lucide-react';

export default function NewsNotFound() {
  return (
    <div className='container mx-auto max-w-2xl px-4 py-16'>
      <Card>
        <CardHeader className='text-center'>
          <div className='bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
            <FileText className='text-muted-foreground h-8 w-8' />
          </div>
          <CardTitle className='text-2xl'>News Tidak Ditemukan</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6 text-center'>
          <p className='text-muted-foreground'>
            Maaf, news yang Anda cari tidak dapat ditemukan atau mungkin telah
            dihapus.
          </p>

          <div className='flex flex-col justify-center gap-3 sm:flex-row'>
            <Button asChild variant='outline'>
              <Link href='/admin/news'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Kembali ke Daftar News
              </Link>
            </Button>
            <Button asChild>
              <Link href='/admin'>
                <Home className='mr-2 h-4 w-4' />
                Dashboard Admin
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
