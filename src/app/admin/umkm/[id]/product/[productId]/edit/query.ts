import { prisma } from '@/lib/prisma';

export async function getUmkmProductById(id: number) {
  try {
    const product = await prisma.umkmProduct.findUnique({
      where: { id },
      include: {
        umkm: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!product) return null;

    // Convert Decimal to number for client components
    return {
      ...product,
      price: Number(product.price)
    };
  } catch (error) {
    console.error('Error fetching UMKM product:', error);
    throw new Error('Failed to fetch UMKM product');
  }
}
