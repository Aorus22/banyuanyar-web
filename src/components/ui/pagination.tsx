"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  maxVisiblePages?: number
  showFirstLast?: boolean
  showEllipsis?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
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
      onPageChange(page)
    }
  }, [currentPage, totalPages, onPageChange])

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={cn("flex justify-center py-8", className)}>
      <div className="inline-flex rounded-md shadow-sm bg-card border">
        {/* Previous page button */}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-l-md border-r"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        {/* First page when not in view */}
        {showFirstPageButton && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "border-r",
              currentPage === 1 && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>
        )}

        {/* Ellipsis for skipped pages at start */}
        {showLeftEllipsis && (
          <Button variant="ghost" size="sm" className="border-r" disabled>
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More pages</span>
          </Button>
        )}

        {/* Page number buttons */}
        {visiblePages.map((page) => (
          <Button
            key={page}
            variant="ghost"
            size="sm"
            className={cn(
              "border-r",
              currentPage === page && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}

        {/* Ellipsis for skipped pages at end */}
        {showRightEllipsis && (
          <Button variant="ghost" size="sm" className="border-r" disabled>
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More pages</span>
          </Button>
        )}

        {/* Last page when not in view */}
        {showLastPageButton && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "border-r",
              currentPage === totalPages && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        )}

        {/* Next page button */}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-r-md"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="w-4 h-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  )
}
