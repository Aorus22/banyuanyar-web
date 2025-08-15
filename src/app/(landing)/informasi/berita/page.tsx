import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { User, Eye, ArrowRight } from 'lucide-react';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';

export default async function NewsIndexPage() {
  const news = await prisma.news.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      author: true,
      category: true
    },
    orderBy: {
      publishedAt: 'desc'
    },
    take: 10
  });

  return (
    <>
      <PageHeaderEffect 
        title="Berita Desa"
        description="Temukan berita dan informasi terbaru seputar desa kami"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow pt-0">
            {item.featuredImage && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={item.featuredImage}
                  alt={item.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  fallbackClassName="w-full h-full rounded-t-lg"
                />
              </div>
            )}
            
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
                    ? format(new Date(item.publishedAt), "dd MMM yyyy", { locale: id })
                    : format(new Date(item.createdAt), "dd MMM yyyy", { locale: id })
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
        ))}
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
    </>
  );
} 