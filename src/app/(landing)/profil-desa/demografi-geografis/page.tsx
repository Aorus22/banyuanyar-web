import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const demographicsData = await prisma.villageProfile.findUnique({
    where: { key: 'demographics_data', isActive: true }
  });

  return (
    <>
      <PageHeaderEffect
        title='Demografi & Geografis'
        description='Informasi demografi dan geografis desa Banyuanyar'
      />

      <div className='mx-auto max-w-5xl space-y-8'>
        <div className='dark:bg-muted rounded-xl bg-white p-6 shadow md:p-8'>
          <h2 className='text-primary mb-4 text-xl font-semibold'>
            Data Demografi & Geografis
          </h2>
          {demographicsData?.value ? (
            <TiptapViewer
              content={demographicsData.value}
              className='min-h-[400px] border-none'
            />
          ) : (
            <span className='text-muted-foreground'>
              Belum ada data demografi dan geografis desa.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
