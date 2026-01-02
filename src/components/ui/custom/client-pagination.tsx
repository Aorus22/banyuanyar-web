"use client"

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
  className = "mt-8"
}: ClientPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Determine if we should use Link or manual navigation
  // If we can construct the URL synchronously, use getPageHref (Link)
  // Otherwise fallback to onPageChange (useRouter) if needed (though getPageHref covers most cases here)
  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams || '');
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // Always show pagination, but with different styling for single page
  return (
    <div className={className}>
      {totalPages <= 1 ? (
        // Single page - show disabled pagination
        <div className="flex justify-center">
          <div className="inline-flex rounded-md shadow-sm bg-muted/50 border">
            <button
              disabled
              className="px-3 py-2 text-sm font-medium text-muted-foreground bg-muted/50 border-r cursor-not-allowed"
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
          getPageHref={getPageHref}
        />
      )}
    </div>
  );
} 