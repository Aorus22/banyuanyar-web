import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Profil Desa',
    url: '/admin/village-profile',
    icon: 'home',
    shortcut: ['p', 'd'],
    isActive: false,
    items: [
      {
        title: 'Sejarah',
        url: '/admin/village-profile/history',
        icon: 'page',
        shortcut: ['p', 's'],
        isActive: false,
      },
      {
        title: 'Visi & Misi',
        url: '/admin/village-profile/vision-mission',
        icon: 'target',
        shortcut: ['p', 'v'],
        isActive: false,
      },
      {
        title: 'Tujuan & Sasaran',
        url: '/admin/village-profile/objectives',
        icon: 'flag',
        shortcut: ['p', 't'],
        isActive: false,
      },
      {
        title: 'Demografi & Geografis',
        url: '/admin/village-profile/demographics',
        icon: 'map',
        shortcut: ['p', 'd'],
        isActive: false,
      }
    ]
  },
  {
    title: 'Perangkat Desa',
    url: '/admin/government-officials',
    icon: 'users',
    shortcut: ['p', 'd'],
    isActive: false,
    items: []
  },
  {
    title: 'Event',
    url: '/admin/event',
    icon: 'calendar',
    shortcut: ['e', 'e'],
    isActive: false,
    items: []
  },
  {
    title: 'Berita',
    url: '/admin/news',
    icon: 'post',
    shortcut: ['n', 'n'],
    isActive: false,
    items: [
      {
        title: 'Daftar Berita',
        url: '/admin/news',
        icon: 'post',
        shortcut: ['n', 'l'],
        isActive: false,
      },
      {
        title: 'Kategori',
        url: '/admin/news-category',
        icon: 'tag',
        shortcut: ['n', 'c'],
        isActive: false,
      }
    ]
  },
  {
    title: 'Dokumen',
    url: '/admin/document',
    icon: 'file',
    shortcut: ['d', 'd'],
    isActive: false,
    items: []
  },
  {
    title: 'Wisata',
    url: '/admin/tourism-category',
    icon: 'map',
    shortcut: ['t', 't'],
    isActive: false,
    items: []
  },
  // {
  //   title: 'Omah',
  //   url: '/admin/tourism-house',
  //   icon: 'home',
  //   shortcut: ['p', 'p'],
  //   isActive: false,
  //   items: []
  // },
  {
    title: 'UMKM',
    url: '/admin/umkm',
    icon: 'shopping-bag',
    shortcut: ['u', 'u'],
    isActive: false,
    items: []
  },
  // {
  //   title: 'Media',
  //   url: '/admin/media',
  //   icon: 'image',
  //   shortcut: ['m', 'm'],
  //   isActive: false,
  //   items: []
  // },
  {
    title: 'Galeri',
    url: '/admin/gallery',
    icon: 'gallery',
    shortcut: ['g', 'g'],
    isActive: false,
    items: []
  },
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
