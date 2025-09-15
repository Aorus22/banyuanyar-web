import { notFound } from 'next/navigation';
import { getTourismCategoryById } from '../../../query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TourismPackageForm from './tourism-package-form';

interface CreateTourismPackagePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CreateTourismPackagePage({
  params
}: CreateTourismPackagePageProps) {
  const { id: categoryId } = await params;
  const category = await getTourismCategoryById(parseInt(categoryId));

  if (!category) {
    notFound();
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='space-y-2'>
        <div className='text-muted-foreground flex items-center gap-2 text-sm'>
          <Link
            href={`/admin/tourism-category/${category.id}`}
            className='hover:text-primary flex items-center gap-1 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            Kembali ke {category.name}
          </Link>
        </div>

        <Heading
          title='Tambah Paket Wisata'
          description={`Tambahkan paket wisata baru ke kategori "${category.name}"`}
        />

        <div className='flex items-center gap-2'>
          <Badge
            variant='outline'
            className='bg-primary/10 text-primary border-primary/20'
          >
            <Package className='mr-1 h-3 w-3' />
            {category.name}
          </Badge>
          <span className='text-muted-foreground text-sm'>
            {category._count.packages} paket saat ini
          </span>
        </div>
      </div>

      <Separator />

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            Form Paket Wisata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TourismPackageForm categoryId={category.id} />
        </CardContent>
      </Card>
    </div>
  );
}
