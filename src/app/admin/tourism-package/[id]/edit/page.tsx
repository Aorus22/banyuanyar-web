import { TourismPackageForm } from '../../tourism-package-form';
import { notFound } from 'next/navigation';
import { getTourismPackageById, getTourismCategories } from '../../query';
import { updateTourismPackage } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface EditTourismPackagePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTourismPackagePage({ params }: EditTourismPackagePageProps) {
  const { id } = await params;
  const [package_, categories] = await Promise.all([
    getTourismPackageById(parseInt(id)),
    getTourismCategories()
  ]);

  if (!package_) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title='Edit Paket Wisata'
        description='Edit informasi paket wisata yang sudah ada'
      />
      <Separator />
      
      <TourismPackageForm package_={package_} updateTourismPackage={updateTourismPackage} categories={categories} />
    </div>
  );
} 