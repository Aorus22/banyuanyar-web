import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';
import { ImagePreviewCarousel } from '@/components/ui/custom';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Eye, Calendar, User, Tag, Image as ImageIcon } from 'lucide-react';
import { safeFormatDateFullMonth } from '@/lib/date-utils';

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

  // Get media for this specific news
  const newsMedia = await prisma.media.findMany({
    where: {
      entityType: 'news',
      entityId: news.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

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
                ? safeFormatDateFullMonth(news.publishedAt)
                : safeFormatDateFullMonth(news.createdAt)
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{news.viewCount} kali dibaca</span>
          </div>
        </div>

        {/* Media Gallery */}
        {newsMedia.length > 0 ? (
          <div className="mb-6">            
            {newsMedia.length === 1 ? (
              // Single image - no carousel needed
              <div className="mb-4">
                <ImageWithFallback
                  src={newsMedia[0].fileUrl}
                  alt={newsMedia[0].fileName}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                  fallbackClassName="w-full h-64 rounded-lg"
                />
              </div>
            ) : (
              // Multiple images - use carousel
              <ImagePreviewCarousel 
                images={newsMedia.map(media => media.fileUrl)}
                autoPlay={true}
                interval={5000}
                thumbnailSize="md"
              />
            )}
          </div>
        ) : (
          // No media available
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Belum ada media tersedia
              </span>
            </div>
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-blue-400" />
            </div>
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