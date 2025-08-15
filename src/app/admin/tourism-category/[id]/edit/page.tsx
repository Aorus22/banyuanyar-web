import { TourismCategoryForm } from '../../tourism-category-form';
import { notFound } from 'next/navigation';
import { getTourismCategoryById } from '../../query';
import { updateTourismCategory } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface EditTourismCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditTourismCategoryPage({ params }: EditTourismCategoryPageProps) {
  const category = await getTourismCategoryById(parseInt(params.id));

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title='Edit Kategori Wisata'
        description='Edit informasi kategori yang sudah ada'
      />
      <Separator />
      
      <TourismCategoryForm category={category} updateTourismCategory={updateTourismCategory} />
    </div>
  );
} 