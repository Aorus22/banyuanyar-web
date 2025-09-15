import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tag, X } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategoryId?: string;
  totalNews: number;
}

export default async function CategoryFilter({
  selectedCategoryId,
  totalNews
}: CategoryFilterProps) {
  // Get all categories with news count
  const categories = await prisma.newsCategory.findMany({
    include: {
      _count: {
        select: {
          news: {
            where: { status: 'PUBLISHED' }
          }
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });

  // Get selected category info
  const selectedCategory = selectedCategoryId
    ? categories.find((cat) => cat.id === parseInt(selectedCategoryId))
    : null;

  return (
    <div className='mb-8'>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Tag className='text-primary h-6 w-6' />
          <div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              Kategori Berita
            </h2>
            <p className='text-muted-foreground'>
              {selectedCategory
                ? `Menampilkan berita dalam kategori "${selectedCategory.name}"`
                : 'Pilih kategori untuk memfilter berita'}
            </p>
          </div>
        </div>

        {selectedCategory && (
          <Button variant='outline' size='sm' asChild>
            <Link href='/informasi/berita'>
              <X className='mr-2 h-4 w-4' />
              Hapus Filter
            </Link>
          </Button>
        )}
      </div>

      {/* Category Pills */}
      <div className='mb-6 flex flex-wrap gap-3'>
        <Link href='/informasi/berita'>
          <Badge
            variant={!selectedCategoryId ? 'default' : 'outline'}
            className='cursor-pointer px-4 py-2 text-sm font-medium transition-transform hover:scale-105'
          >
            Semua ({totalNews})
          </Badge>
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/informasi/berita?category=${category.id}`}
          >
            <Badge
              variant={
                selectedCategoryId === category.id.toString()
                  ? 'default'
                  : 'outline'
              }
              className='cursor-pointer px-4 py-2 text-sm font-medium transition-transform hover:scale-105'
              style={
                selectedCategoryId !== category.id.toString()
                  ? {
                      borderColor: category.color,
                      color: category.color
                    }
                  : {}
              }
            >
              {category.name} ({category._count.news})
            </Badge>
          </Link>
        ))}
      </div>

      {/* Selected Category Info */}
      {selectedCategory && (
        <>
          <Separator className='my-6' />
          <div className='rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-950/30 dark:to-indigo-950/30'>
            <div className='flex items-center gap-3'>
              <div
                className='h-4 w-4 rounded-full'
                style={{ backgroundColor: selectedCategory.color }}
              />
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                  Kategori: {selectedCategory.name}
                </h3>
                <p className='text-muted-foreground text-sm'>
                  {selectedCategory._count.news} berita tersedia
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
