
import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const sejarah = await prisma.villageProfile.findUnique({
    where: { key: 'history', isActive: true },
  });

  return (
    <>
      <PageHeaderEffect 
        title="Sejarah Desa"
        description="Informasi sejarah desa Banyuanyar"
      />

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Sejarah Singkat</h2>
          <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
            {sejarah?.value ? sejarah.value : <span className="text-muted-foreground">Belum ada data sejarah desa.</span>}
          </div>
        </div>
      </div>
    </>
  );
}