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
    take: itemsPerPage
  });

  return (
    <>
      <PageHeaderEffect
        title='Dokumen Desa'
        description='Kumpulan dokumen resmi Desa Banyuanyar'
      />

      <div className='container mx-auto max-w-7xl px-4 py-8'>
        {documents.length === 0 ? (
          <div className='text-muted-foreground py-12 text-center'>
            Belum ada dokumen desa.
          </div>
        ) : (
          <div className='space-y-6'>
            {documents.map((doc) => (
              <div
                key={doc.id}
                className='dark:bg-muted flex flex-col items-start gap-4 rounded-xl bg-white p-6 shadow md:flex-row md:items-center'
              >
                <div className='flex-1'>
                  <div className='text-primary mb-1 text-lg font-semibold'>
                    {doc.title}
                  </div>
                  <div className='mb-2 text-sm text-gray-700 dark:text-gray-200'>
                    {doc.description}
                  </div>
                  <div className='text-muted-foreground mb-2 text-xs'>
                    Ukuran:{' '}
                    {doc.fileSize !== null && doc.fileSize !== undefined
                      ? (Number(doc.fileSize) / 1024 / 1024).toFixed(2) + ' MB'
                      : 'Tidak diketahui'}
                  </div>
                </div>
                <a
                  href={doc.fileUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 font-medium shadow transition'
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
          baseUrl='/informasi/dokumen'
        />
      </div>
    </>
  );
}
