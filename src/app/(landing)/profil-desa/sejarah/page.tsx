
import React from 'react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const sejarah = await prisma.villageProfile.findUnique({
    where: { key: 'history', isActive: true },
  });

  return (
    <div className="min-h-screen pt-24 container mx-auto py-16">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground shadow">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Sejarah Desa</h1>
          <p className="text-base md:text-lg opacity-90">Informasi sejarah desa Banyuanyar</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Sejarah Singkat</h2>
          <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
            {sejarah?.value ? sejarah.value : <span className="text-muted-foreground">Belum ada data sejarah desa.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}