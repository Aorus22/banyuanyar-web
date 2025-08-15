import { TourismPackageForm } from '../tourism-package-form';
import { createTourismPackage } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getTourismCategories } from '../query';

export default async function CreateTourismPackagePage() {
  const categories = await getTourismCategories();

  return (
    <div className="space-y-6">
      <Heading
        title='Tambah Paket Wisata Baru'
        description='Buat paket wisata baru untuk destinasi'
      />
      <Separator />
      
      <TourismPackageForm createTourismPackage={createTourismPackage} categories={categories} />
    </div>
  );
} 