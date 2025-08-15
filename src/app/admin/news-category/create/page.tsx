import { NewsCategoryForm } from '../news-category-form';
import { createNewsCategory } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function CreateNewsCategoryPage() {
  return (
    <div className="space-y-6">
      <Heading
        title='Tambah Kategori News Baru'
        description='Buat kategori baru untuk mengelompokkan berita dan artikel'
      />
      <Separator />
      
      <NewsCategoryForm createNewsCategory={createNewsCategory} />
    </div>
  );
} 