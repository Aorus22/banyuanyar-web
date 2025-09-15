'use client';

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import {
  ChevronRightIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ArrowLeftIcon
} from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  isServerSide?: boolean;
  currentPage?: number;
  lastPage?: number;
  perPage?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

export function DataTablePagination<TData>({
  table,
  isServerSide = false,
  currentPage = 1,
  lastPage = 1,
  perPage = 10,
  total = 0,
  onPageChange,
  onPerPageChange
}: DataTablePaginationProps<TData>) {
  return (
    <div className='flex flex-col gap-y-4 px-2 lg:flex-row lg:items-center lg:justify-between'>
      <div className='text-muted-foreground text-sm'>
        {table.getFilteredRowModel().rows.length} baris
      </div>

      <div className='flex flex-col gap-y-4 lg:flex-row lg:items-center lg:space-x-6'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Baris per halaman</p>
          <Select
            value={
              isServerSide
                ? `${perPage}`
                : `${table.getState().pagination.pageSize}`
            }
            onValueChange={(value) => {
              if (isServerSide) {
                onPerPageChange?.(parseInt(value));
              } else {
                table.setPageSize(parseInt(value));
              }
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue
                placeholder={
                  isServerSide
                    ? `${perPage}`
                    : `${table.getState().pagination.pageSize}`
                }
              />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        {isServerSide ? (
          <div className='text-center text-sm font-medium lg:w-[100px]'>
            Hal {currentPage} dari {lastPage}
          </div>
        ) : (
          <div className='text-center text-sm font-medium lg:w-[100px]'>
            Hal {table.getState().pagination.pageIndex + 1} dari{' '}
            {table.getPageCount()}
          </div>
        )}

        {/* Pagination buttons */}
        <div className='flex items-center justify-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            disabled={
              isServerSide ? currentPage === 1 : !table.getCanPreviousPage()
            }
            onClick={() => {
              if (isServerSide) {
                onPageChange?.(1);
              } else {
                table.setPageIndex(0);
              }
            }}
          >
            <span className='sr-only'>Go to first page</span>
            <ArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            disabled={
              isServerSide ? currentPage === 1 : !table.getCanPreviousPage()
            }
            onClick={() => {
              if (isServerSide) {
                onPageChange?.(currentPage - 1);
              } else {
                table.previousPage();
              }
            }}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => {
              if (isServerSide) {
                onPageChange?.(currentPage + 1);
              } else {
                table.nextPage();
              }
            }}
            disabled={
              isServerSide ? currentPage === lastPage : !table.getCanNextPage()
            }
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            disabled={
              isServerSide ? currentPage === lastPage : !table.getCanNextPage()
            }
            onClick={() => {
              if (isServerSide) {
                onPageChange?.(lastPage);
              } else {
                table.setPageIndex(table.getPageCount() - 1);
              }
            }}
          >
            <span className='sr-only'>Go to last page</span>
            <ArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
