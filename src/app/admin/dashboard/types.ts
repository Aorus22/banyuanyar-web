export interface DashboardStats {
  totalNews: number;
  publishedNews: number;
  totalEvents: number;
  totalGallery: number;
  totalDocuments: number;
  totalUmkm: number;
  totalUmkmProducts: number;
  totalTourismPackages: number;
  totalTourismHouses: number;
  totalGovernmentOfficials: number;
  totalUsers: number;
}

export interface RecentNews {
  id: number;
  title: string;
  category?: {
    name: string;
  } | null;
  author?: {
    name: string;
  } | null;
}

export interface RecentEvent {
  id: number;
  title: string;
  date: Date;
  location?: string | null;
}

export interface RecentGallery {
  id: number;
  title: string;
  description?: string | null;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivities: {
    news: RecentNews[];
    events: RecentEvent[];
    gallery: RecentGallery[];
  };
  monthlyNewsData: Array<{
    month: string;
    count: number;
  }>;
}
