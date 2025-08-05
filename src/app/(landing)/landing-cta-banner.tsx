import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

export function LandingCTABanner() {
  return (
    <div className='w-full py-12 xs:py-20 px-6'>
      <div className='w-full max-w-screen-lg mx-auto'>
        <div className='bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white'>
          <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-4'>
            Ready to Transform Your KKN Experience?
          </h2>
          <p className='text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90'>
            Join thousands of universities and communities already using our platform 
            to make their KKN projects more impactful and organized.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button
              size='lg'
              variant='secondary'
              className='w-full sm:w-auto rounded-full text-base'
            >
              Start Free Trial <ArrowUpRight className='!h-5 !w-5 ml-2' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='w-full sm:w-auto rounded-full text-base bg-white/10 border-white/20 text-white hover:bg-white/20'
            >
              Schedule Demo
            </Button>
          </div>
          <p className='text-sm opacity-75 mt-4'>
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
} 