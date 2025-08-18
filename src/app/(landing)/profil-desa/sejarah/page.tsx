
import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { TiptapViewer } from '@/components/ui/custom/tiptap-viewer/tiptap-viewer';

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

      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-muted rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Sejarah Singkat</h2>
          {sejarah?.value ? (
            <TiptapViewer 
              content={sejarah.value}
              className="min-h-[200px] border-none"
            />
          ) : (
            <span className="text-muted-foreground">Belum ada data sejarah desa.</span>
          )}
        </div>
      </div>
    </>
  );
}