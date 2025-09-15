import { prisma } from '@/lib/prisma';

export async function getUmkmById(id: number) {
  try {
    const umkm = await prisma.umkm.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { products: true }
        }
      }
    });

    if (!umkm) return null;

    // Get media for products
    const productIds = umkm.products.map((p) => p.id);
    const productMedia = await prisma.media.findMany({
      where: {
        entityType: 'umkm_product',
        entityId: { in: productIds }
      },
      orderBy: { id: 'asc' }
    });

    // Create map of product ID to media URLs (array for carousel)
    const productIdToMedia = new Map<number, string[]>();
    for (const m of productMedia) {
      if (!productIdToMedia.has(m.entityId)) {
        productIdToMedia.set(m.entityId, []);
      }
      productIdToMedia.get(m.entityId)!.push(m.fileUrl);
    }

    // Convert Decimal to number for client components
    return {
      ...umkm,
      products: umkm.products.map((product) => ({
        ...product,
        price: Number(product.price),
        imageUrls: productIdToMedia.get(product.id) || []
      }))
    };
  } catch (error) {
    console.error('Error fetching UMKM:', error);
    throw new Error('Failed to fetch UMKM');
  }
}

export async function getUmkmMedia(umkmId: number) {
  try {
    const media = await prisma.media.findMany({
      where: {
        entityType: 'umkm',
        entityId: umkmId
      },
      orderBy: { id: 'asc' }
    });

    // Return fileUrl directly since we're using Cloudinary
    return media.map((m) => m.fileUrl);
  } catch (error) {
    console.error('Error fetching UMKM media:', error);
    return [];
  }
}
