import React from 'react';
import { LandingNavbar } from './landing-navbar';
import { LandingHero } from './landing-hero';
import { LandingFeatures } from './landing-features';
import { LandingPricing } from './landing-pricing';
import { LandingFAQ } from './landing-faq';
import { LandingTestimonials } from './landing-testimonials';
import { LandingCTABanner } from './landing-cta-banner';
import { LandingFooter } from './landing-footer';

export default function LandingPage() {
  return (
    <div className='min-h-screen'>
      <LandingNavbar />
      <main className='pt-16 xs:pt-20 sm:pt-24'>
        <LandingHero />
        <LandingFeatures />
        <LandingPricing />
        <LandingFAQ />
        <LandingTestimonials />
        <LandingCTABanner />
        <LandingFooter />
      </main>
    </div>
  );
} 