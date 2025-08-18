import React from 'react';
import { prisma } from '@/lib/prisma';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { ClientPagination } from '@/components/ui/custom';

export const dynamic = 'force-dynamic';

interface DocumentIndexPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: DocumentIndexPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 6;
  const skip = (currentPage - 1) * itemsPerPage;

  // Get total count for pagination
  const totalDocuments = await prisma.document.count();
  const totalPages = Math.ceil(totalDocuments / itemsPerPage);

  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
    skip,
    take: itemsPerPage,
  });

  return (
    <>
      <PageHeaderEffect 
        title="Dokumen Desa"
        description="Kumpulan dokumen resmi Desa Banyuanyar"
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {documents.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            Belum ada dokumen desa.
          </div>
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
                  href={doc.fileUrl}
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

        <ClientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/informasi/dokumen"
        />
      </div>
    </>
  );
}
