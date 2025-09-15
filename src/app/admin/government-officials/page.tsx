import { DataTable } from '@/components/ui/custom/datatable/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getGovernmentOfficials } from './query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function GovernmentOfficialsPage() {
  const officials = await getGovernmentOfficials();

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between'>
        <Heading
          title='Perangkat Desa'
          description='Kelola data perangkat desa Banyuanyar'
        />
        <Button asChild className='button-primary flex items-center gap-2'>
          <Link href='/admin/government-officials/create'>
            <Plus className='h-4 w-4' /> Tambah Perangkat Desa
          </Link>
        </Button>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Perangkat Desa yang Tersedia</CardTitle>
        </CardHeader>
        <CardContent className='px-3 sm:px-6'>
          <DataTable columns={columns} data={officials} hideToolbar={false} />
        </CardContent>
      </Card>
    </div>
  );
}
