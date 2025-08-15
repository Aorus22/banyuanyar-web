import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Twitter, Instagram, Mail, ExternalLink, Newspaper, Building2, MapPin, Store, FileText, Mountain, Navigation, Link } from 'lucide-react';

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
  { name: 'Diskominfo Kabupaten Boyolali', href: 'https://diskominfo.boyolali.go.id' },
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
    <footer className='w-full py-12 xs:py-20 px-6 relative'>
      <div className='w-full max-w-screen-xl mx-auto mt-8'>
        <Card className='bg-gradient-to-r from-primary to-primary/80 border-0 shadow-2xl'>
          <CardContent className='p-8 md:p-16'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-16 text-white'>
              
              {/* Left Section - Branding and Social Media */}
              <div className='space-y-8'>
                <div className='flex items-start gap-4'>
                  {/* Logo placeholder - you can replace this with actual logo */}
                  <div className='w-20 h-24 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 shadow-inner shadow-black/40'>
                    <div className='w-14 h-18 border-2 border-white/40 rounded relative'>
                      <div className='absolute inset-1 border-2 border-white/60 rounded'></div>
                      <div className='absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full'></div>
                      <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white/80 rounded'></div>
                      <div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white/60 rounded'></div>
                    </div>
                  </div>
                  
                  <div className='flex-1'>
                    <h2 className='text-3xl font-bold text-white mb-2'>desa banyuanyar</h2>
                    <p className='text-base text-white/90 mb-2'>Kec. Ampel Kab. Boyolali</p>
                    <p className='text-sm text-white/80 leading-relaxed'>
                      Website Resmi Green Smart Village Desa Banyuanyar Kecamatan Ampel Kabupaten Boyolali
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
                        className='w-12 h-12 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-inner shadow-black/40'
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
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center border border-white/50 shadow-inner shadow-black/40'>
                    <Navigation className='w-5 h-5 text-white' />
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
                          className='flex items-center gap-3 text-white/90 hover:text-white transition-colors text-base hover:underline group'
                        >
                          <IconComponent className='w-5 h-5 text-white/70 group-hover:text-white transition-colors' />
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              {/* Right Section - Related Links */}
              <div className='space-y-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center border border-white/50 shadow-inner shadow-black/40'>
                    <Link className='w-5 h-5 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-white'>Link Terkait</h3>
                </div>
                
                <ul className='space-y-3'>
                  {relatedLinks.map((link) => (
                    <li key={link.name} className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-white/30 rounded flex items-center justify-center border border-white/50 shadow-inner shadow-black/40'>
                        <ExternalLink className='w-4 h-4 text-white' />
                      </div>
                      <a
                        href={link.href}
                        className='text-white/90 hover:text-white transition-colors text-base hover:underline'
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