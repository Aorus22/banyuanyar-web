import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Tujuan tidak ada di seeder, hanya "objectives" (sasaran)
  const sasaran = await prisma.villageProfile.findUnique({
    where: { key: 'objectives', isActive: true }
  });

  return (
    <>
      <PageHeaderEffect
        title='Tujuan & Sasaran'
        description='Tujuan dan sasaran pembangunan desa Banyuanyar'
      />

      <div className='mx-auto max-w-5xl'>
        <div className='dark:bg-muted rounded-xl bg-white p-6 shadow md:p-8'>
          <h2 className='text-primary mb-4 text-xl font-semibold'>
            Sasaran Pembangunan Desa
          </h2>
          {sasaran?.value ? (
            <TiptapViewer
              content={sasaran.value}
              className='min-h-[200px] border-none'
            />
          ) : (
            <span className='text-muted-foreground'>
              Belum ada data sasaran desa.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
