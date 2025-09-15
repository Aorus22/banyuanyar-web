'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface DataTableSkeletonProps {
  columns: number;
  rows?: number;
}

export function DataTableSkeleton({
  columns,
  rows = 5
}: DataTableSkeletonProps) {
  return (
    <div className='w-full space-y-4'>
      <div className='flex flex-wrap gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-full max-w-[250px] sm:w-[250px]' />
        </div>
        <div className='flex items-center justify-end gap-2 sm:justify-start'>
          <Skeleton className='h-8 w-[80px] sm:w-[100px]' />
          <Skeleton className='h-8 w-[80px] sm:w-[100px]' />
        </div>
      </div>

      <div className='overflow-hidden rounded-md border'>
        <div className='bg-foreground/10 border-b'>
          <div className='hidden items-center gap-4 p-4 md:flex'>
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className='h-4 min-w-[80px] flex-1' />
            ))}
          </div>
          <div className='p-4 md:hidden'>
            <Skeleton className='h-4 w-full' />
          </div>
        </div>

        <div className='divide-y'>
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className='p-4'>
              <div className='flex items-center gap-4'>
                {Array.from({ length: columns }).map((_, j) => (
                  <Skeleton key={j} className='h-4 min-w-[80px] flex-1' />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between'>
        <Skeleton className='h-4 w-full max-w-[200px] sm:w-[150px]' />
        <div className='flex items-center justify-center gap-2 sm:justify-end'>
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
        </div>
      </div>
    </div>
  );
}
