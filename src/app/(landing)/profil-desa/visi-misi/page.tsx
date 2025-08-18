

import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';

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

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Visi</h2>
          {vision?.value ? (
            <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg font-medium">
                    {vision.value}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <span className="text-muted-foreground">Belum ada data visi desa.</span>
          )}
        </div>
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Misi</h2>
          {missions.length > 0 ? (
            <div className="space-y-4">
              {missions.map((misi, index) => (
                <div key={misi.key} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20 hover:border-primary/30 transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-base">
                      {misi.value || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">Belum ada data misi desa.</span>
          )}
        </div>
      </div>
    </>
  );
}