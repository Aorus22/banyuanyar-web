'use client';

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { XIcon, CheckIcon, ListFilter, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  children
}: DataTableToolbarProps<TData>) {
  const [searchInput, setSearchInput] = React.useState('');
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const globalFilter = React.useMemo(
    () => table.getState().globalFilter ?? '',
    [table]
  );

  React.useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      table.setGlobalFilter(searchInput);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchInput, table]);

  const isFiltered = React.useMemo(
    () => globalFilter.length > 0,
    [globalFilter]
  );

  const allColumns = React.useMemo(() => {
    return table
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== 'undefined' && column.getCanHide()
      );
  }, [table]);

  const toggleColumnVisibility = React.useCallback(
    (columnId: string) => {
      const column = table.getColumn(columnId);
      if (column) {
        column.toggleVisibility(!column.getIsVisible());
      }
    },
    [table]
  );

  const getColumnTitle = React.useCallback((column: any) => {
    const header = column.columnDef.header;
    if (typeof header === 'function') {
      const titleMatch = header.toString().match(/title:\s*"([^"]+)"/);
      return titleMatch ? titleMatch[1] : column.id;
    }
    return header?.toString() || column.id;
  }, []);

  return (
    <div className='mb-4 flex flex-col justify-between gap-2 lg:flex-row lg:items-center'>
      <div className='order-2 flex flex-1 items-center space-x-2 lg:order-1'>
        <div className='relative'>
          <Search className='absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
          <Input
            placeholder='Cari...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='h-8 w-[150px] pl-8 lg:w-[250px]'
          />
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            className='h-8 px-2 lg:px-3'
            onClick={() => {
              setSearchInput('');
              table.setGlobalFilter('');
            }}
          >
            Reset
            <XIcon className='ml-2 h-4 w-4' />
          </Button>
        )}

        {allColumns.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='flex h-8 items-center'
              >
                <ListFilter className='mr-1 h-4 w-4' />
                Kolom
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuLabel>Tampilkan Kolom</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className='max-h-48 overflow-y-auto'>
                {allColumns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onSelect={() => toggleColumnVisibility(column.id)}
                  >
                    {getColumnTitle(column)}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className='order-1 mb-2 flex items-center space-x-2 lg:order-2'>
        {children}
      </div>
    </div>
  );
}
