import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  ExternalLink,
  Newspaper,
  Building2,
  MapPin,
  Store,
  FileText,
  Mountain,
  Navigation,
  Link
} from 'lucide-react';

const navigationLinks = [
  { name: 'Berita', icon: Newspaper },
  { name: 'Pemerintahan', icon: Building2 },
  { name: 'Profil Desa', icon: MapPin },
  { name: 'UMKM', icon: Store },
  { name: 'Umum', icon: FileText },
  { name: 'Wisata', icon: Mountain }
];

const relatedLinks = [
  { name: 'Pemerintah Kabupaten Boyolali', href: 'https://boyolali.go.id' },
  {
    name: 'Diskominfo Kabupaten Boyolali',
    href: 'https://diskominfo.boyolali.go.id'
  },
  { name: 'Kampus Kopi Banyuanyar', href: '#' }
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@desabanyuanyar.com' }
];

export function LandingFooter() {
  return (
    <footer className='xs:py-20 relative w-full px-6 py-12'>
      <div className='mx-auto mt-8 w-full max-w-screen-xl'>
        <Card className='from-primary to-primary/80 border-0 bg-gradient-to-r shadow-2xl'>
          <CardContent className='p-8 md:p-16'>
            <div className='grid grid-cols-1 gap-16 text-white md:grid-cols-3'>
              {/* Left Section - Branding and Social Media */}
              <div className='space-y-8'>
                <div className='flex items-start gap-4'>
                  {/* Logo placeholder - you can replace this with actual logo */}
                  <div className='flex h-24 w-20 items-center justify-center rounded-lg border border-white/30 bg-white/20 shadow-inner shadow-black/40 backdrop-blur-sm'>
                    <div className='relative h-18 w-14 rounded border-2 border-white/40'>
                      <div className='absolute inset-1 rounded border-2 border-white/60'></div>
                      <div className='absolute top-2 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-white'></div>
                      <div className='absolute bottom-2 left-1/2 h-1 w-6 -translate-x-1/2 transform rounded bg-white/80'></div>
                      <div className='absolute bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 transform rounded bg-white/60'></div>
                    </div>
                  </div>

                  <div className='flex-1'>
                    <h2 className='mb-2 text-3xl font-bold text-white'>
                      desa banyuanyar
                    </h2>
                    <p className='mb-2 text-base text-white/90'>
                      Kec. Ampel Kab. Boyolali
                    </p>
                    <p className='text-sm leading-relaxed text-white/80'>
                      Website Resmi Green Smart Village Desa Banyuanyar
                      Kecamatan Ampel Kabupaten Boyolali
                    </p>
                  </div>
                </div>

                {/* Social Media Buttons */}
                <div className='flex gap-4'>
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <Button
                        key={social.name}
                        variant='ghost'
                        size='icon'
                        className='h-12 w-12 border border-white/30 bg-white/20 text-white shadow-inner shadow-black/40 backdrop-blur-sm hover:bg-white/30'
                        asChild
                      >
                        <a href={social.href} aria-label={social.name}>
                          <IconComponent className='h-6 w-6' />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Middle Section - Navigation */}
              <div className='space-y-6'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/50 bg-white/30 shadow-inner shadow-black/40'>
                    <Navigation className='h-5 w-5 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-white'>Navigasi</h3>
                </div>

                <ul className='space-y-3'>
                  {navigationLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={link.name}>
                        <a
                          href='#'
                          className='group flex items-center gap-3 text-base text-white/90 transition-colors hover:text-white hover:underline'
                        >
                          <IconComponent className='h-5 w-5 text-white/70 transition-colors group-hover:text-white' />
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right Section - Related Links */}
              <div className='space-y-6'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/50 bg-white/30 shadow-inner shadow-black/40'>
                    <Link className='h-5 w-5 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-white'>
                    Link Terkait
                  </h3>
                </div>

                <ul className='space-y-3'>
                  {relatedLinks.map((link) => (
                    <li key={link.name} className='flex items-center gap-3'>
                      <div className='flex h-6 w-6 items-center justify-center rounded border border-white/50 bg-white/30 shadow-inner shadow-black/40'>
                        <ExternalLink className='h-4 w-4 text-white' />
                      </div>
                      <a
                        href={link.href}
                        className='text-base text-white/90 transition-colors hover:text-white hover:underline'
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
}
