import { NewsForm } from '../../news-form';
import { notFound } from 'next/navigation';
import { getNewsById, getNewsCategories } from '../../query';
import { updateNews } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface EditNewsPageProps {
  params: {
    id: string;
  };
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const [news, categories] = await Promise.all([
    getNewsById(parseInt(params.id)),
    getNewsCategories()
  ]);

  if (!news) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title='Edit News'
        description='Edit informasi news yang sudah ada'
      />
      <Separator />
      
      <NewsForm news={news} updateNews={updateNews} categories={categories} />
    </div>
  );
} 