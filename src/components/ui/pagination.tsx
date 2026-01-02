"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  getPageHref?: (page: number) => string
  className?: string
  maxVisiblePages?: number
  showFirstLast?: boolean
  showEllipsis?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  getPageHref,
  className,
  maxVisiblePages = 5,
  showFirstLast = true,
  showEllipsis = true,
}: PaginationProps) {
  const visiblePages = React.useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
    let endPage = startPage + maxVisiblePages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [currentPage, totalPages, maxVisiblePages])

  const showFirstPageButton = React.useMemo(() => {
    return showFirstLast && visiblePages[0] > 1
  }, [visiblePages, showFirstLast])

  const showLastPageButton = React.useMemo(() => {
    return showFirstLast && visiblePages[visiblePages.length - 1] < totalPages
  }, [visiblePages, totalPages, showFirstLast])

  const showLeftEllipsis = React.useMemo(() => {
    return showEllipsis && visiblePages[0] > 2
  }, [visiblePages, showEllipsis])

  const showRightEllipsis = React.useMemo(() => {
    return showEllipsis && visiblePages[visiblePages.length - 1] < totalPages - 1
  }, [visiblePages, totalPages, showEllipsis])

  const handlePageChange = React.useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page)
    }
  }, [currentPage, totalPages, onPageChange])

  if (totalPages <= 1) {
    return null
  }

  const renderPageButton = (page: number, content: React.ReactNode, isActive: boolean = false, isDisabled: boolean = false) => {
    const button = (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "border-r last:border-r-0",
          isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
        disabled={isDisabled}
        onClick={getPageHref ? undefined : () => handlePageChange(page)}
      >
        {content}
      </Button>
    );

    if (getPageHref && !isDisabled) {
      return (
        <Link href={getPageHref(page)} prefetch={true}>
          {button}
        </Link>
      );
    }

    return button;
  };

  return (
    <div className={cn("flex justify-center py-8", className)}>
      <div className="inline-flex rounded-md shadow-sm bg-card border">
        {/* Previous page button */}
        {renderPageButton(
          currentPage - 1,
          <>
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous page</span>
          </>,
          false,
          currentPage <= 1
        )}

        {/* First page when not in view */}
        {showFirstPageButton && renderPageButton(1, "1")}

        {/* Ellipsis for skipped pages at start */}
        {showLeftEllipsis && (
          <Button variant="ghost" size="sm" className="border-r" disabled>
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More pages</span>
          </Button>
        )}

        {/* Page number buttons */}
        {visiblePages.map((page) => (
          <React.Fragment key={page}>
            {renderPageButton(page, page.toString(), currentPage === page, currentPage === page)}
          </React.Fragment>
        ))}

        {/* Ellipsis for skipped pages at end */}
        {showRightEllipsis && (
          <Button variant="ghost" size="sm" className="border-r" disabled>
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More pages</span>
          </Button>
        )}

        {/* Last page when not in view */}
        {showLastPageButton && renderPageButton(totalPages, totalPages.toString())}

        {/* Next page button */}
        {renderPageButton(
          currentPage + 1,
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next page</span>
          </>,
          false,
          currentPage >= totalPages
        )}
      </div>
    </div>
  )
}
