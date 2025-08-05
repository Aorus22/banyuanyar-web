import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Status', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' }
  ]
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@banyuanyar.com' }
];

export function LandingFooter() {
  return (
    <footer className='w-full py-12 xs:py-20 px-6 border-t'>
      <div className='w-full max-w-screen-lg mx-auto'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-12'>
          <div>
            <h3 className='font-semibold mb-4'>Product</h3>
            <ul className='space-y-2'>
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className='font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className='font-semibold mb-4'>Support</h3>
            <ul className='space-y-2'>
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className='font-semibold mb-4'>Legal</h3>
            <ul className='space-y-2'>
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className='mb-8' />

        {/* Bottom Footer */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <span className='text-xl font-bold'>Banyuanyar</span>
            <span className='text-sm text-muted-foreground'>
              © 2024 Banyuanyar KKN Project. All rights reserved.
            </span>
          </div>
          
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant='ghost'
                  size='icon'
                  asChild
                >
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className='h-4 w-4' />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 