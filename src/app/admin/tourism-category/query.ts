import { prisma } from '@/lib/prisma';

export async function getTourismCategories() {
  try {
    const categories = await prisma.tourismCategory.findMany({
      include: {
        _count: {
          select: {
            packages: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    return categories;
  } catch (error) {
    console.error('Error fetching tourism categories:', error);
    throw new Error('Failed to fetch tourism categories');
  }
}

export async function getTourismCategoryById(id: number) {
  try {
    const category = await prisma.tourismCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            packages: true
          }
        }
      }
    });
    
    return category;
  } catch (error) {
    console.error('Error fetching tourism category:', error);
    throw new Error('Failed to fetch tourism category');
  }
} 