

import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const vision = await prisma.villageProfile.findUnique({
    where: { key: 'vision', isActive: true },
  });
  const missions = await prisma.villageProfile.findMany({
    where: {
      key: { startsWith: 'mission_' },
      isActive: true,
    },
    orderBy: { key: 'asc' },
  });

  return (
    <>
      <PageHeaderEffect 
        title="Visi & Misi"
        description="Visi dan misi desa Banyuanyar"
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Visi</h2>
          <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
            {vision?.value ? vision.value : <span className="text-muted-foreground">Belum ada data visi desa.</span>}
          </div>
        </div>
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Misi</h2>
          {missions.length > 0 ? (
            <ol className="list-decimal pl-5 space-y-2">
              {missions.map((misi) => (
                <li key={misi.key} className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  {misi.value}
                </li>
              ))}
            </ol>
          ) : (
            <span className="text-muted-foreground">Belum ada data misi desa.</span>
          )}
        </div>
      </div>
    </>
  );
}