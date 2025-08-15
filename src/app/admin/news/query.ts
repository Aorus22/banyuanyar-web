import { prisma } from '@/lib/prisma';

export async function getNews() {
  try {
    const news = await prisma.news.findMany({
      include: {
        author: true,
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news');
  }
}

export async function getNewsById(id: number) {
  try {
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        author: true,
        category: true
      }
    });
    
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news');
  }
}

export async function getNewsCategories() {
  try {
    const categories = await prisma.newsCategory.findMany({
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