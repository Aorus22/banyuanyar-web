import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const vision = await prisma.villageProfile.findUnique({
    where: { key: 'vision', isActive: true }
  });
  const missions = await prisma.villageProfile.findMany({
    where: {
      key: { startsWith: 'mission_' },
      isActive: true
    },
    orderBy: { key: 'asc' }
  });

  return (
    <>
      <PageHeaderEffect
        title='Visi & Misi'
        description='Visi dan misi desa Banyuanyar'
      />

      <div className='mx-auto max-w-5xl space-y-8'>
        <div className='dark:bg-muted rounded-xl bg-white p-6 shadow md:p-8'>
          <h2 className='text-primary mb-4 text-xl font-semibold'>Visi</h2>
          {vision?.value ? (
            <div className='from-primary/5 to-primary/10 border-primary/20 rounded-lg border bg-gradient-to-r p-6'>
              <div className='flex items-start space-x-4'>
                <div className='bg-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white'>
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div className='flex-1'>
                  <p className='text-lg leading-relaxed font-medium text-gray-700 dark:text-gray-200'>
                    {vision.value}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <span className='text-muted-foreground'>
              Belum ada data visi desa.
            </span>
          )}
        </div>
        <div className='dark:bg-muted rounded-xl bg-white p-6 shadow md:p-8'>
          <h2 className='text-primary mb-4 text-xl font-semibold'>Misi</h2>
          {missions.length > 0 ? (
            <div className='space-y-4'>
              {missions.map((misi, index) => (
                <div
                  key={misi.key}
                  className='from-primary/5 to-primary/10 border-primary/20 hover:border-primary/30 flex items-start space-x-4 rounded-lg border bg-gradient-to-r p-4 transition-all duration-200'
                >
                  <div className='bg-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white'>
                    {index + 1}
                  </div>
                  <div className='flex-1'>
                    <p className='text-base leading-relaxed text-gray-700 dark:text-gray-200'>
                      {misi.value || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className='text-muted-foreground'>
              Belum ada data misi desa.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
