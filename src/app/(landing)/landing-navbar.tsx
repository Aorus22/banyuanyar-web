import React from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import { ThemeSelector } from '@/components/theme-selector';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Testimonials', href: '#testimonials' }
];

export function LandingNavbar() {
  return (
    <nav className='fixed z-50 top-6 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full'>
      <div className='h-full flex items-center justify-between mx-auto px-4'>
        {/* Logo */}
        <div className='flex items-center'>
          <span className='text-xl font-bold'>Banyuanyar</span>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-8'>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className='flex items-center gap-3'>
          <ThemeSelector />
          <ModeToggle />
          <Button variant='outline' className='hidden sm:inline-flex'>
            Sign In
          </Button>
          <Button className='hidden xs:inline-flex'>Get Started</Button>

          {/* Mobile Menu */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <div className='flex flex-col space-y-4 mt-8'>
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='text-sm font-medium transition-colors hover:text-primary'
                    >
                      {item.name}
                    </a>
                  ))}
                  <Button variant='outline' className='mt-4'>
                    Sign In
                  </Button>
                  <Button className='mt-2'>Get Started</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
} 