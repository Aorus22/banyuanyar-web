import { prisma } from '@/lib/prisma';

export async function getUmkms() {
  try {
    const umkms = await prisma.umkm.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return umkms;
  } catch (error) {
    console.error('Error fetching UMKMs:', error);
    throw new Error('Failed to fetch UMKMs');
  }
}

export async function getUmkmById(id: number) {
  try {
    const umkm = await prisma.umkm.findUnique({
      where: { id },
      include: {
        products: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            products: true
          }
        }
      }
    });
    
    if (!umkm) return null;
    
    // Convert Decimal to number for client components
    return {
      ...umkm,
      products: umkm.products.map(product => ({
        ...product,
        price: Number(product.price)
      }))
    };
  } catch (error) {
    console.error('Error fetching UMKM:', error);
    throw new Error('Failed to fetch UMKM');
  }
}

export async function getUmkmProducts(umkmId: number) {
  try {
    const products = await prisma.umkmProduct.findMany({
      where: { umkmId },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Convert Decimal to number for client components
    return products.map(product => ({
      ...product,
      price: Number(product.price)
    }));
  } catch (error) {
    console.error('Error fetching UMKM products:', error);
    throw new Error('Failed to fetch UMKM products');
  }
} 