'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/ui/pagination';

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export function ClientPagination({
  currentPage,
  totalPages,
  baseUrl,
  className = 'mt-8'
}: ClientPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams || '');
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    router.push(url);
  };

  // Always show pagination, but with different styling for single page
  return (
    <div className={className}>
      {totalPages <= 1 ? (
        // Single page - show disabled pagination
        <div className='flex justify-center'>
          <div className='bg-muted/50 inline-flex rounded-md border shadow-sm'>
            <button
              disabled
              className='text-muted-foreground bg-muted/50 cursor-not-allowed border-r px-3 py-2 text-sm font-medium'
            >
              1
            </button>
          </div>
        </div>
      ) : (
        // Multiple pages - show full pagination
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
