"use client"

import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableSkeletonProps {
  columns: number
  rows?: number
}

export function DataTableSkeleton({ columns, rows = 5 }: DataTableSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-full max-w-[250px] sm:w-[250px]" />
        </div>
        <div className="flex items-center gap-2 justify-end sm:justify-start">
          <Skeleton className="h-8 w-[80px] sm:w-[100px]" />
          <Skeleton className="h-8 w-[80px] sm:w-[100px]" />
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="border-b bg-foreground/10">
          <div className="hidden md:flex items-center gap-4 p-4">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1 min-w-[80px]" />
            ))}
          </div>
          <div className="md:hidden p-4">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        <div className="divide-y">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="p-4">
              <div className="flex items-center gap-4">
                {Array.from({ length: columns }).map((_, j) => (
                  <Skeleton key={j} className="h-4 flex-1 min-w-[80px]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
        <Skeleton className="h-4 w-full max-w-[200px] sm:w-[150px]" />
        <div className="flex items-center gap-2 justify-center sm:justify-end">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  )
}
