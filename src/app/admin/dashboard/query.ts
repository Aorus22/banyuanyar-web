import { prisma } from '@/lib/prisma';
import { DashboardData } from './types';

export async function getDashboardStats(): Promise<DashboardData> {
  try {
    // Get counts for different entities
    const [
      totalNews,
      publishedNews,
      totalEvents,
      totalGallery,
      totalDocuments,
      totalUmkm,
      totalUmkmProducts,
      totalTourismPackages,
      totalTourismHouses,
      totalGovernmentOfficials,
      totalUsers
    ] = await Promise.all([
      prisma.news.count(),
      prisma.news.count({ where: { status: 'PUBLISHED' } }),
      prisma.event.count(),
      prisma.gallery.count({ where: { isActive: true } }),
      prisma.document.count({ where: { isActive: true } }),
      prisma.umkm.count({ where: { isActive: true } }),
      prisma.umkmProduct.count({ where: { isActive: true } }),
      prisma.tourismPackage.count({ where: { isActive: true } }),
      prisma.tourismHouse.count({ where: { isActive: true } }),
      prisma.governmentOfficial.count({ where: { isActive: true } }),
      prisma.user.count()
    ]);

    // Get recent activities
    const recentNews = await prisma.news.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        author: { select: { name: true } }
      }
    });

    const recentEvents = await prisma.event.findMany({
      take: 5,
      orderBy: { date: 'desc' }
    });

    const recentGallery = await prisma.gallery.findMany({
      take: 5,
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    // Get monthly news count for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyNewsData = await prisma.news.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: sixMonthsAgo }
      },
      _count: true
    });

    // Process monthly data
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const monthCount = monthlyNewsData.find((item: { createdAt: Date; _count: number }) => {
        const itemMonth = `${item.createdAt.getFullYear()}-${String(item.createdAt.getMonth() + 1).padStart(2, '0')}`;
        return itemMonth === monthKey;
      });

      return {
        month: date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
        count: monthCount?._count || 0
      };
    }).reverse();

    return {
      stats: {
        totalNews,
        publishedNews,
        totalEvents,
        totalGallery,
        totalDocuments,
        totalUmkm,
        totalUmkmProducts,
        totalTourismPackages,
        totalTourismHouses,
        totalGovernmentOfficials,
        totalUsers
      },
      recentActivities: {
        news: recentNews,
        events: recentEvents,
        gallery: recentGallery
      },
      monthlyNewsData: monthlyData
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('Failed to fetch dashboard statistics');
  }
} 