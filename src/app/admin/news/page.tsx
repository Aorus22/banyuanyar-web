import { DataTable } from '@/components/ui/custom/datatable/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getNews } from './query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between'>
        <Heading
          title='News'
          description='Kelola semua berita dan artikel desa'
        />
        <Button asChild className='button-primary flex items-center gap-2'>
          <Link href='/admin/news/create'>
            <Plus className='h-4 w-4' /> Tambah News
          </Link>
        </Button>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Daftar News yang Tersedia</CardTitle>
        </CardHeader>
        <CardContent className='px-3 sm:px-6'>
          <DataTable columns={columns} data={news} hideToolbar={false} />
        </CardContent>
      </Card>
    </div>
  );
}
