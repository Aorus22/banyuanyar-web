import React from 'react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen pt-24 container mx-auto py-16">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center text-primary-foreground shadow">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Dokumen Desa</h1>
          <p className="text-base md:text-lg opacity-90">Kumpulan dokumen resmi Desa Banyuanyar</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {documents.length === 0 ? (
          <div className="text-center text-muted-foreground">Belum ada dokumen desa.</div>
        ) : (
          <div className="space-y-6">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white dark:bg-muted rounded-xl shadow p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="font-semibold text-lg text-primary mb-1">{doc.title}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-2">{doc.description}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Ukuran: {doc.fileSize !== null && doc.fileSize !== undefined
                      ? (Number(doc.fileSize) / 1024 / 1024).toFixed(2) + ' MB'
                      : 'Tidak diketahui'}
                  </div>
                </div>
                <a
                  href={`/files/${doc.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
