import { DataTable } from '@/components/ui/custom/datatable/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getUmkms } from './query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function UmkmPage() {
  const umkms = await getUmkms();

  return (
    <div className="space-y-6">
      <div className='flex items-start justify-between'>
        <Heading
          title='UMKM'
          description='Kelola data UMKM dan usaha kecil menengah'
        />
        <Button asChild className="flex items-center gap-2 button-primary">
          <Link href="/admin/umkm/create">
            <Plus className="h-4 w-4" /> Tambah UMKM
          </Link>
        </Button>
      </div>
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar UMKM</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <DataTable 
            columns={columns} 
            data={umkms}
            hideToolbar={false}
          />
        </CardContent>
      </Card>
    </div>
  );
} 