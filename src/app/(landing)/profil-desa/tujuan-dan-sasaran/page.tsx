
import React from 'react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Tujuan tidak ada di seeder, hanya "objectives" (sasaran)
  const sasaran = await prisma.villageProfile.findUnique({
    where: { key: 'objectives', isActive: true },
  });

  return (
    <div className="min-h-screen pt-24 container mx-auto py-16">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground shadow">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Tujuan & Sasaran</h1>
          <p className="text-base md:text-lg opacity-90">Tujuan dan sasaran pembangunan desa Banyuanyar</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Sasaran Pembangunan Desa</h2>
          <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
            {sasaran?.value ? sasaran.value : <span className="text-muted-foreground">Belum ada data sasaran desa.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}