

import React from 'react';
import { prisma } from '@/lib/prisma';

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
    <div className="min-h-screen pt-24 container mx-auto py-16">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground shadow">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Visi & Misi</h1>
          <p className="text-base md:text-lg opacity-90">Visi dan misi desa Banyuanyar</p>
        </div>
      </div>

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
    </div>
  );
}