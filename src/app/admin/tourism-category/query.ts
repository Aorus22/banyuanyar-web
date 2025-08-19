import { prisma } from '@/lib/prisma';

export async function getTourismCategories() {
  try {
    const categories = await prisma.tourismCategory.findMany({
      include: {
        packages: {
          orderBy: {
            createdAt: 'desc'
          }
        },
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
    
    // Convert Decimal values to numbers for client components
    const categoriesWithConvertedPrices = categories.map(category => ({
      ...category,
      packages: category.packages.map(pkg => ({
        ...pkg,
        price: pkg.price ? Number(pkg.price) : null
      }))
    }));
    
    return categoriesWithConvertedPrices;
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
        packages: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            packages: true
          }
        }
      }
    });
    
    if (!category) return null;
    
    // Convert Decimal values to numbers for client components
    const categoryWithConvertedPrices = {
      ...category,
      packages: category.packages.map(pkg => ({
        ...pkg,
        price: pkg.price ? Number(pkg.price) : null
      }))
    };
    
    return categoryWithConvertedPrices;
  } catch (error) {
    console.error('Error fetching tourism category:', error);
    throw new Error('Failed to fetch tourism category');
  }
}

export async function getTourismPackageById(id: number) {
  try {
    const package_ = await prisma.tourismPackage.findUnique({
      where: { id },
      include: {
        category: true
      }
    });
    
    if (!package_) return null;
    
    // Convert Decimal values to numbers for client components
    const packageWithConvertedPrice = {
      ...package_,
      price: package_.price ? Number(package_.price) : null
    };
    
    return packageWithConvertedPrice;
  } catch (error) {
    console.error('Error fetching tourism package:', error);
    throw new Error('Failed to fetch tourism package');
  }
} 