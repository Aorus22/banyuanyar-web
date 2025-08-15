import { NewsCategoryForm } from '../../news-category-form';
import { notFound } from 'next/navigation';
import { getNewsCategoryById } from '../../query';
import { updateNewsCategory } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface EditNewsCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditNewsCategoryPage({ params }: EditNewsCategoryPageProps) {
  const category = await getNewsCategoryById(parseInt(params.id));

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title='Edit Kategori News'
        description='Edit informasi kategori yang sudah ada'
      />
      <Separator />
      
      <NewsCategoryForm category={category} updateNewsCategory={updateNewsCategory} />
    </div>
  );
} 