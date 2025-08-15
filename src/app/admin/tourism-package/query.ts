import { prisma } from '@/lib/prisma';

export async function getTourismPackages() {
  try {
    const packages = await prisma.tourismPackage.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Convert Decimal to number for client components
    return packages.map(pkg => ({
      ...pkg,
      price: pkg.price ? Number(pkg.price) : null
    }));
  } catch (error) {
    console.error('Error fetching tourism packages:', error);
    throw new Error('Failed to fetch tourism packages');
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
    
    // Convert Decimal to number for client components
    return {
      ...package_,
      price: package_.price ? Number(package_.price) : null
    };
  } catch (error) {
    console.error('Error fetching tourism package:', error);
    throw new Error('Failed to fetch tourism package');
  }
}

export async function getTourismCategories() {
  try {
    const categories = await prisma.tourismCategory.findMany({
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