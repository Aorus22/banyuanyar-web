import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Eye, Calendar, Image as ImageIcon } from 'lucide-react';
import { safeFormatDateOnly } from '@/lib/date-utils';

interface RelatedNewsProps {
  currentNewsId: number;
  currentCategoryId?: number;
}

export default async function RelatedNews({
  currentNewsId,
  currentCategoryId
}: RelatedNewsProps) {
  // Get related news (same category first, then recent news)
  const relatedNews = await prisma.news.findMany({
    where: {
      id: { not: currentNewsId },
      status: 'PUBLISHED',
      ...(currentCategoryId && { categoryId: currentCategoryId })
    },
    include: {
      category: true
    },
    orderBy: [
      { categoryId: 'desc' }, // Same category first
      { publishedAt: 'desc' }
    ],
    take: 5
  });

  // If not enough news from same category, get recent news
  if (relatedNews.length < 5) {
    const additionalNews = await prisma.news.findMany({
      where: {
        id: { not: currentNewsId },
        status: 'PUBLISHED',
        ...(currentCategoryId && { categoryId: { not: currentCategoryId } })
      },
      include: {
        category: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 5 - relatedNews.length
    });

    relatedNews.push(...additionalNews);
  }

  // Get media for related news
  const newsIds = relatedNews.map((item) => item.id);
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
  newsMedia.forEach((media) => {
    if (!mediaMap.has(media.entityId)) {
      mediaMap.set(media.entityId, media);
    }
  });

  if (relatedNews.length === 0) {
    return null;
  }

  return (
    <div className='lg:ml-8'>
      <div className='sticky top-24'>
        <h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>
          Berita Lainnya
        </h3>

        <div className='space-y-4'>
          {relatedNews.map((item) => {
            const itemImage = mediaMap.get(item.id);

            return (
              <Card
                key={item.id}
                className='overflow-hidden p-2 transition-shadow hover:shadow-md'
              >
                <div className='flex items-center gap-3'>
                  {/* Thumbnail */}
                  <div className='flex h-full w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-md'>
                    {itemImage ? (
                      <ImageWithFallback
                        src={itemImage.fileUrl}
                        alt={item.title}
                        width={80}
                        height={64}
                        className='h-full w-full object-cover'
                        fallbackClassName='w-full h-full'
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200'>
                        <ImageIcon className='h-6 w-6 text-blue-400' />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className='min-w-0 flex-1 py-2'>
                    <div className='mb-2 flex items-center gap-2'>
                      {item.category && (
                        <Badge
                          variant='outline'
                          className='text-xs'
                          style={{
                            borderColor: item.category.color,
                            color: item.category.color
                          }}
                        >
                          {item.category.name}
                        </Badge>
                      )}
                    </div>

                    <Link
                      href={`/informasi/berita/${item.slug}`}
                      className='block'
                    >
                      <h4 className='hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors'>
                        {item.title}
                      </h4>
                    </Link>

                    <div className='text-muted-foreground mt-2 flex items-center gap-4 text-xs'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' />
                        <span>
                          {item.publishedAt
                            ? safeFormatDateOnly(item.publishedAt)
                            : safeFormatDateOnly(item.createdAt)}
                        </span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Eye className='h-3 w-3' />
                        <span>{item.viewCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
