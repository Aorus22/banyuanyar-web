import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Users, MapPin, ArrowRight } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer'
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PaketWisataPage() {
  // Get all tourism categories with their packages count
  const categories = await prisma.tourismCategory.findMany({
    include: {
      _count: {
        select: {
          packages: true
        }
      }
    },
    orderBy: { name: 'asc' }
  })

  // Get media for all categories
  const categoryIds = categories.map(c => c.id)
  const mediaRecords = await prisma.media.findMany({
    where: { 
      entityType: 'tourism_category', 
      entityId: { in: categoryIds } 
    },
    orderBy: { id: 'asc' }
  })
  
  const categoryIdToMedia = new Map<number, string>()
  for (const m of mediaRecords) {
    if (!categoryIdToMedia.has(m.entityId)) {
      categoryIdToMedia.set(m.entityId, m.fileUrl)
    }
  }

  // Calculate statistics
  const totalCategories = categories.length
  const totalPackages = categories.reduce((sum, cat) => sum + cat._count.packages, 0)

  return (
    <>
      <PageHeaderEffect 
        title="Paket Wisata Desa Banyuanyar"
        description="Temukan berbagai kategori wisata menarik dan edukatif di Desa Banyuanyar"
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{totalPackages}</div>
                <div className="text-sm text-muted-foreground">Total Paket Wisata</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{totalCategories}</div>
                <div className="text-sm text-muted-foreground">Kategori Wisata</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daftar Kategori Wisata */}
        <Card className="border-2 border-primary/10 shadow-sm pt-0">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4">
            <h3 className="flex items-center gap-3 text-primary font-semibold text-lg">
              <Package className="h-6 w-6" />
              Kategori Paket Wisata
              <Badge variant="secondary" className="ml-2">
                {totalCategories} Kategori
              </Badge>
            </h3>
          </div>
          <CardContent className="pt-6">
            {categories.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Belum ada kategori wisata tersedia.</p>
                <p className="text-sm">Kategori wisata akan muncul di sini setelah ditambahkan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.id} className="group overflow-hidden border-2 border-primary/5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col py-0">
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <ImageWithFallback
                          src={categoryIdToMedia.get(category.id) || undefined}
                          alt={category.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </AspectRatio>
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-white/90 text-primary border-primary/20">
                          {category._count.packages} paket
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex-1">
                      <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                              {category.name}
                            </h3>
                            {category.description && (
                              <div className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                <TiptapViewer content={category.description} />
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 flex flex-col gap-2 mt-auto">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Package className="h-4 w-4" />
                            <span>{category._count.packages} paket tersedia</span>
                          </div>
                          <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                            <Link href={`/umkm/paket-wisata/kategori/${category.id}`}>
                              Lihat Paket
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
} 