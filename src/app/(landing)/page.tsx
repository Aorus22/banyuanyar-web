import React from 'react';
import { LandingHero } from './landing-hero';
import { LandingFeatures } from './landing-features';
import { LandingPricing } from './landing-pricing';
import { LandingFAQ } from './landing-faq';
import { LandingTestimonials } from './landing-testimonials';
import { LandingCTABanner } from './landing-cta-banner';

export default function LandingPage() {
  return (
    <>    
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingFAQ />
      <LandingTestimonials />
      <LandingCTABanner />
    </>
  );
} 