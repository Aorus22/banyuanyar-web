import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { User, Eye, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { ClientPagination } from '@/components/ui/custom';
import { safeFormatDateOnly } from '@/lib/date-utils';

interface NewsIndexPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NewsIndexPage({ searchParams }: NewsIndexPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 12;
  const skip = (currentPage - 1) * itemsPerPage;

  // Get total count for pagination
  const totalNews = await prisma.news.count({
    where: { status: 'PUBLISHED' }
  });
  const totalPages = Math.ceil(totalNews / itemsPerPage);

  const news = await prisma.news.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      author: true,
      category: true
    },
    orderBy: {
      publishedAt: 'desc'
    },
    skip,
    take: itemsPerPage
  });

  // Get media for news in a separate query
  const newsIds = news.map(item => item.id);
  const newsMedia = await prisma.media.findMany({
    where: {
      entityType: 'news',
      entityId: { in: newsIds },
      mimeType: { startsWith: 'image/' }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Create a map of news ID to media
  const mediaMap = new Map();
  newsMedia.forEach(media => {
    if (!mediaMap.has(media.entityId)) {
      mediaMap.set(media.entityId, media);
    }
  });

  return (
    <>
      <PageHeaderEffect 
        title="Berita Desa"
        description="Temukan berita dan informasi terbaru seputar desa kami"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => {
            const itemImage = mediaMap.get(item.id);
            
            return (
              <Card key={item.id} className="hover:shadow-lg transition-shadow pt-0 overflow-hidden">
                {/* News Image */}
                <div className="aspect-video overflow-hidden">
                  {itemImage ? (
                    <ImageWithFallback
                      src={itemImage.fileUrl}
                      alt={item.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      fallbackClassName="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-blue-400" />
                    </div>
                  )}
                </div>
                
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {item.category && (
                      <Badge 
                        variant="outline" 
                        style={{ borderColor: item.category.color, color: item.category.color }}
                      >
                        {item.category.name}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {item.publishedAt 
                        ? safeFormatDateOnly(item.publishedAt)
                        : safeFormatDateOnly(item.createdAt)
                      }
                    </span>
                  </div>
                  
                  <CardTitle className="line-clamp-2 text-lg">
                    <Link 
                      href={`/informasi/berita/${item.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{item.author?.name || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{item.viewCount}</span>
                    </div>
                  </div>
                  
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/informasi/berita/${item.slug}`}>
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {news.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Belum ada berita yang dipublikasikan
              </p>
            </CardContent>
          </Card>
        )}

        <ClientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/informasi/berita"
        />
      </div>
    </>
  );
} 