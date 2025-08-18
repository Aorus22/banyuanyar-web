import React from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import { ThemeSelector } from '@/components/theme-selector';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
      { label: 'Lokasi UMKM', href: '/umkm/lokasi-umkm' },
      { label: 'Rumah Penginapan', href: '/umkm/rumah-penginapan' }
    ]
  }
] as const;

export function LandingNavbar() {
  return (
    <nav className='fixed z-50 top-6 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full'>
      <div className='h-full flex items-center justify-between mx-auto px-4'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link href='/' className='flex items-center gap-2'>
            <img src='/logo.png' alt='Logo Desa Banyuanyar' className='h-8 w-auto' />
            <span className='text-xl font-bold'>Banyuanyar</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-3'>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.label}>
                  {'children' in menu && menu.children ? (
                    <>
                      <NavigationMenuTrigger className='bg-transparent'>{menu.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className='flex min-w-[220px] max-w-sm flex-col p-1'>
                          {menu.children.map((child) => (
                            <NavigationMenuLink key={child.href} href={child.href} className='flex items-start gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground'>
                              <span>{child.label}</span>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink href={(menu as any).href} className='px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground'>
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
                            <AccordionTrigger className='text-base px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground'>
                              {menu.label}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className='flex flex-col gap-2 pl-2'>
                                {menu.children.map((child) => (
                                  <a
                                    key={child.href}
                                    href={child.href}
                                    className='text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground'
                                  >
                                    {child.label}
                                  </a>
                                ))}
                              </div>
                            </AccordionContent>
                          </>
                        ) : (
                          <a href={(menu as any).href} className='block px-3 py-2 text-base rounded-md hover:bg-accent hover:text-accent-foreground'>
                            {menu.label}
                          </a>
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