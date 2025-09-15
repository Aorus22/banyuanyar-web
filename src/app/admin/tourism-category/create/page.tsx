import { TourismCategoryForm } from '../tourism-category-form';
import { createTourismCategory } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function CreateTourismCategoryPage() {
  return (
    <div className='space-y-6'>
      <Heading
        title='Tambah Kategori Wisata Baru'
        description='Buat kategori baru untuk mengelompokkan paket wisata'
      />
      <Separator />

      <TourismCategoryForm createTourismCategory={createTourismCategory} />
    </div>
  );
}
