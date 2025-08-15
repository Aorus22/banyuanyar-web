import { DataTable } from '@/components/ui/custom/datatable/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getNewsCategories } from './query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function NewsCategoryPage() {
  const categories = await getNewsCategories();

  return (
    <div className="space-y-6">
      <div className='flex items-start justify-between'>
        <Heading
          title='News Categories'
          description='Kelola kategori berita dan artikel'
        />
        <Button asChild className="flex items-center gap-2 button-primary">
          <Link href="/admin/news-category/create">
            <Plus className="h-4 w-4" /> Tambah Kategori
          </Link>
        </Button>
      </div>
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kategori News</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <DataTable 
            columns={columns} 
            data={categories}
            hideToolbar={false}
          />
        </CardContent>
      </Card>
    </div>
  );
} 