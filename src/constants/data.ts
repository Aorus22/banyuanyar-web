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
    title: 'admin',
    url: '/admin/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
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
    title: 'Wisata',
    url: '/admin/tourism-package',
    icon: 'map',
    shortcut: ['t', 't'],
    isActive: false,
    items: [
      {
        title: 'Paket Wisata',
        url: '/admin/tourism-package',
        icon: 'map',
        shortcut: ['t', 'p'],
        isActive: false,
      },
      {
        title: 'Kategori Wisata',
        url: '/admin/tourism-category',
        icon: 'tag',
        shortcut: ['t', 'c'],
        isActive: false,
      }
    ]
  },
  {
    title: 'Penginapan',
    url: '/admin/tourism-house',
    icon: 'home',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'UMKM',
    url: '/admin/umkm',
    icon: 'shopping-bag',
    shortcut: ['u', 'u'],
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
