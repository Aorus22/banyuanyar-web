import { prisma } from '@/lib/prisma'

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
    })
    
    if (!umkm) return null
    
    // Convert Decimal to number for client components
    return {
      ...umkm,
      products: umkm.products.map(product => ({
        ...product,
        price: Number(product.price)
      }))
    }
  } catch (error) {
    console.error('Error fetching UMKM:', error)
    throw new Error('Failed to fetch UMKM')
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
    })
    
    // Return fileUrl if available, otherwise construct path
    return media.map(m => m.fileUrl || `/images/${m.entityType}/${m.fileName}`)
  } catch (error) {
    console.error('Error fetching UMKM media:', error)
    return []
  }
} 