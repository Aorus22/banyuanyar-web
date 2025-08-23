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

export default async function CategoryFilter({ selectedCategoryId, totalNews }: CategoryFilterProps) {
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
    ? categories.find(cat => cat.id === parseInt(selectedCategoryId))
    : null;

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Tag className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Kategori Berita
            </h2>
            <p className="text-muted-foreground">
              {selectedCategory 
                ? `Menampilkan berita dalam kategori "${selectedCategory.name}"`
                : 'Pilih kategori untuk memfilter berita'
              }
            </p>
          </div>
        </div>
        
        {selectedCategory && (
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link href="/informasi/berita">
              <X className="h-4 w-4 mr-2" />
              Hapus Filter
            </Link>
          </Button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Link href="/informasi/berita">
          <Badge 
            variant={!selectedCategoryId ? "default" : "outline"}
            className="px-4 py-2 text-sm font-medium cursor-pointer hover:scale-105 transition-transform"
          >
            Semua ({totalNews})
          </Badge>
        </Link>
        
        {categories.map((category) => (
          <Link key={category.id} href={`/informasi/berita?category=${category.id}`}>
            <Badge 
              variant={selectedCategoryId === category.id.toString() ? "default" : "outline"}
              className="px-4 py-2 text-sm font-medium cursor-pointer hover:scale-105 transition-transform"
              style={selectedCategoryId !== category.id.toString() ? { 
                borderColor: category.color, 
                color: category.color 
              } : {}}
            >
              {category.name} ({category._count.news})
            </Badge>
          </Link>
        ))}
      </div>

      {/* Selected Category Info */}
      {selectedCategory && (
        <>
          <Separator className="my-6" />
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedCategory.color }}
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Kategori: {selectedCategory.name}
                </h3>
                <p className="text-sm text-muted-foreground">
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