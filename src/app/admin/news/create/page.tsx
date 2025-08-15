import { NewsForm } from '../news-form';
import { createNews } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getNewsCategories } from '../query';

export default async function CreateNewsPage() {
  const categories = await getNewsCategories();

  return (
    <div className="space-y-6">
      <Heading
        title='Tambah News Baru'
        description='Buat berita dan artikel baru untuk desa'
      />
      <Separator />
      
      <NewsForm createNews={createNews} categories={categories} />
    </div>
  );
} 