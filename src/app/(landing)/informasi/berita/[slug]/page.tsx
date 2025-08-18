import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Eye, Calendar, User, Tag } from 'lucide-react';

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const news = await prisma.news.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true
    }
  });

  if (!news) {
    notFound();
  }

  await prisma.news.update({
    where: { id: news.id },
    data: { viewCount: { increment: 1 } }
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-24 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Tag className="h-4 w-4" />
          {news.category ? (
            <Badge 
              variant="outline" 
              style={{ borderColor: news.category.color, color: news.category.color }}
            >
              {news.category.name}
            </Badge>
          ) : (
            <span>Tanpa Kategori</span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold mb-4 leading-tight">{news.title}</h1>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{news.author?.name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {news.publishedAt 
                ? format(new Date(news.publishedAt), "dd MMMM yyyy", { locale: id })
                : format(new Date(news.createdAt), "dd MMMM yyyy", { locale: id })
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{news.viewCount} kali dibaca</span>
          </div>
        </div>

        {news.featuredImage && (
          <div className="mb-6">
            <ImageWithFallback
              src={news.featuredImage}
              alt={news.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg"
              fallbackClassName="w-full h-64 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <TiptapViewer 
        content={news.content}
        className="min-h-[200px]"
      />
    </div>
  );
} 