import React from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import { ThemeSelector } from '@/components/theme-selector';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';

const menus = [
  {
    label: 'Beranda',
    href: '/'
  },
  {
    label: 'Profil desa',
    children: [
      { label: 'Sejarah', href: '/profil-desa/sejarah' },
      { label: 'Visi Misi', href: '/profil-desa/visi-misi' },
      { label: 'Tujuan dan Sasaran', href: '/profil-desa/tujuan-dan-sasaran' },
      { label: 'Demografi Geografis', href: '/profil-desa/demografi-geografis' }
    ]
  },
  {
    label: 'Pemerintah',
    children: [
      { label: 'Perangkat Desa', href: '/pemerintah/perangkat-desa' },
      { label: 'Struktur Organisasi', href: '/pemerintah/struktur-organisasi' }
    ]
  },
  {
    label: 'Informasi',
    children: [
      { label: 'Berita', href: '/informasi/berita' },
      { label: 'Agenda Kegiatan', href: '/informasi/agenda-kegiatan' },
      { label: 'Galeri', href: '/informasi/galeri' },
      { label: 'Dokumen', href: '/informasi/dokumen' }
    ]
  },
  {
    label: 'UMKM',
    children: [
      { label: 'Paket Wisata', href: '/umkm/paket-wisata' },
      { label: 'Lokasi UMKM', href: '/umkm/lokasi-umkm' }
      // { label: 'Omah Wisata', href: '/umkm/omah-wisata' }
    ]
  }
] as const;

export function LandingNavbar() {
  return (
    <nav className='xs:h-16 bg-background/50 fixed inset-x-4 top-6 z-50 mx-auto h-14 max-w-screen-xl rounded-full border backdrop-blur-sm dark:border-slate-700/70'>
      <div className='mx-auto flex h-full items-center justify-between px-4'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link href='/' className='flex items-center gap-2'>
            <img
              src='/logo.png'
              alt='Logo Desa Banyuanyar'
              className='h-8 w-auto'
            />
            <span className='text-xl font-bold'>Banyuanyar</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden items-center space-x-3 md:flex'>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.label}>
                  {'children' in menu && menu.children ? (
                    <>
                      <NavigationMenuTrigger className='bg-transparent'>
                        {menu.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className='flex max-w-sm min-w-[220px] flex-col p-1'>
                          {menu.children.map((child) => (
                            <NavigationMenuLink
                              key={child.href}
                              href={child.href}
                              className='hover:bg-accent hover:text-accent-foreground flex items-start gap-2 rounded-md p-2'
                            >
                              <span>{child.label}</span>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={(menu as any).href}
                      className='hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 text-sm font-medium'
                    >
                      {menu.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className='flex items-center gap-3'>
          <ThemeSelector />
          <ModeToggle />

          {/* Mobile Menu */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' aria-label='Buka menu'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-80'>
                <SheetHeader className='sr-only'>
                  <SheetTitle>Menu Navigasi</SheetTitle>
                </SheetHeader>
                <div className='mt-6'>
                  <Accordion type='single' collapsible>
                    {menus.map((menu) => (
                      <AccordionItem value={menu.label} key={menu.label}>
                        {'children' in menu && menu.children ? (
                          <>
                            <AccordionTrigger className='hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-base'>
                              {menu.label}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className='flex flex-col gap-2 pl-2'>
                                {menu.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className='hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm'
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </>
                        ) : (
                          <Link
                            href={(menu as any).href}
                            className='hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-base'
                          >
                            {menu.label}
                          </Link>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
