import { DataTable } from '@/components/ui/custom/datatable/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getTourismHouses } from './query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function TourismHousePage() {
  const houses = await getTourismHouses();

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between'>
        <Heading title='Tourism Houses' description='Kelola omah wisata' />
        <Button asChild className='button-primary flex items-center gap-2'>
          <Link href='/admin/tourism-house/create'>
            <Plus className='h-4 w-4' /> Tambah Omah Wisata
          </Link>
        </Button>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Omah Wisata</CardTitle>
        </CardHeader>
        <CardContent className='px-3 sm:px-6'>
          <DataTable columns={columns} data={houses} hideToolbar={false} />
        </CardContent>
      </Card>
    </div>
  );
}
