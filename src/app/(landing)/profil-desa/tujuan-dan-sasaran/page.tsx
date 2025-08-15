
import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Tujuan tidak ada di seeder, hanya "objectives" (sasaran)
  const sasaran = await prisma.villageProfile.findUnique({
    where: { key: 'objectives', isActive: true },
  });

  return (
    <>
      <PageHeaderEffect 
        title="Tujuan & Sasaran"
        description="Tujuan dan sasaran pembangunan desa Banyuanyar"
      />

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Sasaran Pembangunan Desa</h2>
          <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
            {sasaran?.value ? sasaran.value : <span className="text-muted-foreground">Belum ada data sasaran desa.</span>}
          </div>
        </div>
      </div>
    </>
  );
}