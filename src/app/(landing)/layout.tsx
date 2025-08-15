import React from 'react';
import { LandingNavbar } from './landing-navbar';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-20">
      <LandingNavbar />
      {children}
    </div>
  );
} 