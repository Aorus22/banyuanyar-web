import React from 'react';
import { LandingNavbar } from '../../components/layout/landing/Navbar';
import { LandingFooter } from '../../components/layout/landing/Footer';
import { PageHeaderProvider } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderContext';
import { PageHeaderRenderer } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderRenderer';
import { AOSInitializer } from '@/components/aos-initializer';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageHeaderProvider>
      <div className="min-h-screen">
        <AOSInitializer />
        <PageHeaderRenderer />
        <LandingNavbar />
        <main className='container mx-auto px-4 pt-8 max-w-7xl'>
          {children}
        </main>
        <LandingFooter />
      </div>
    </PageHeaderProvider>
  );
} 