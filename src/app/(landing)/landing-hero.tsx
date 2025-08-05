import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CirclePlay } from 'lucide-react';

export function LandingHero() {
  return (
    <div className='min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6'>
      <div className='md:mt-6 flex items-center justify-center'>
        <div className='text-center max-w-2xl'>
          <Badge className='bg-primary rounded-full py-1 border-none'>
            v1.0.0 is available now! 🚀
          </Badge>
          <h1 className='mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight'>
            Banyuanyar KKN Project Management
          </h1>
          <p className='mt-6 max-w-[60ch] xs:text-lg'>
            Explore our comprehensive project management system for KKN activities. 
            Streamline your development workflow with easy-to-use tools and features.
          </p>
          <div className='mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4'>
            <Button
              size='lg'
              className='w-full sm:w-auto rounded-full text-base'
            >
              Get Started <ArrowUpRight className='!h-5 !w-5' />
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='w-full sm:w-auto rounded-full text-base shadow-none'
            >
              <CirclePlay className='!h-5 !w-5' /> Watch Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Logo Cloud Section */}
      <div className='mt-24 max-w-3xl mx-auto'>
        <div className='text-center mb-8'>
          <p className='text-sm text-muted-foreground'>Trusted by leading organizations</p>
        </div>
        <div className='flex flex-wrap justify-center items-center gap-8 opacity-60'>
          <div className='text-2xl font-bold'>UNS</div>
          <div className='text-2xl font-bold'>KKN</div>
          <div className='text-2xl font-bold'>Banyuanyar</div>
          <div className='text-2xl font-bold'>Community</div>
        </div>
      </div>
    </div>
  );
} 