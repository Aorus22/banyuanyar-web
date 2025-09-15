import { notFound } from 'next/navigation';
import {
  getTourismCategoryById,
  getTourismPackageById
} from '../../../../query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TourismPackageEditForm from './tourism-package-edit-form';

interface EditTourismPackagePageProps {
  params: Promise<{
    id: string;
    packageId: string;
  }>;
}

export default async function EditTourismPackagePage({
  params
}: EditTourismPackagePageProps) {
  const { id: categoryId, packageId } = await params;
  const category = await getTourismCategoryById(parseInt(categoryId));
  const package_ = await getTourismPackageById(parseInt(packageId));

  if (!category || !package_) {
    notFound();
  }

  // Verify package belongs to this category
  if (package_.categoryId !== parseInt(categoryId)) {
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
          title='Edit Paket Wisata'
          description={`Edit paket wisata "${package_.name}" dalam kategori "${category.name}"`}
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
            ID Paket: {package_.id}
          </span>
        </div>
      </div>

      <Separator />

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            Form Edit Paket Wisata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TourismPackageEditForm
            categoryId={category.id}
            packageId={package_.id}
            initialData={package_}
          />
        </CardContent>
      </Card>
    </div>
  );
}
