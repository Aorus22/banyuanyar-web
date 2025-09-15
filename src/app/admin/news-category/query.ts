import { prisma } from '@/lib/prisma';

export async function getNewsCategories() {
  try {
    const categories = await prisma.newsCategory.findMany({
      include: {
        _count: {
          select: {
            news: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return categories;
  } catch (error) {
    console.error('Error fetching news categories:', error);
    throw new Error('Failed to fetch news categories');
  }
}

export async function getNewsCategoryById(id: number) {
  try {
    const category = await prisma.newsCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            news: true
          }
        }
      }
    });

    return category;
  } catch (error) {
    console.error('Error fetching news category:', error);
    throw new Error('Failed to fetch news category');
  }
}
