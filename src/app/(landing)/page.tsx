import React from 'react';
import LandingHero from './landing-hero';
import { LandingFeatures } from './landing-features';
import { LandingPricing } from './landing-pricing';
import { LandingCTABanner } from './landing-cta-banner';

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">    
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingCTABanner />
    </div>
  );
} 