"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableSkeleton } from "./data-table-skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  hideToolbar?: boolean
  isLoading?: boolean
  currentPage?: number
  lastPage?: number
  perPage?: number
  total?: number
  isServerSide?: boolean
  enableBulkActions?: boolean
  onPageChange?: (page: number) => void
  onPerPageChange?: (perPage: number) => void
  onRowSelectionChange?: (selectedRows: TData[]) => void
  bulkActions?: React.ReactNode
  toolbarActions?: React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hideToolbar = false,
  isLoading = false,
  currentPage = 1,
  lastPage = 1,
  perPage = 10,
  total = 0,
  isServerSide = false,
  enableBulkActions = false,
  onPageChange,
  onPerPageChange,
  onRowSelectionChange,
  bulkActions,
  toolbarActions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})

  // Computed columns that will add select column if enableBulkActions = true
  const computedColumns = React.useMemo(() => {
    if (!enableBulkActions) {
      return columns
    }

    // Checkbox column for bulk selection
    const selectColumn: ColumnDef<TData, TValue> = {
      id: "select",
      header: ({ table }) => (
        <div className="px-1">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    }

    return [selectColumn, ...columns]
  }, [columns, enableBulkActions])

  const table = useReactTable({
    data,
    columns: computedColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: enableBulkActions,
    manualPagination: isServerSide,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...(isServerSide
      ? {}
      : {
          getPaginationRowModel: getPaginationRowModel(),
        }),
  })

  // Computed to get selected data
  const selectedRows = React.useMemo(() => {
    const selected = Object.keys(rowSelection).map(
      (key) => data[parseInt(key)]
    )
    return selected
  }, [rowSelection, data])

  // Notify parent component when selected rows change
  React.useEffect(() => {
    if (typeof onRowSelectionChange === 'function') {
      onRowSelectionChange(selectedRows)
    }
  }, [selectedRows, onRowSelectionChange])

  // Computed to check if there are selected rows
  const hasSelectedRows = React.useMemo(() => {
    const count = Object.keys(rowSelection).length
    return count > 0
  }, [rowSelection])

  // Function to clear selection
  const clearSelection = React.useCallback(() => {
    setRowSelection({})
  }, [])

  // Function to execute bulk action
  const executeBulkAction = React.useCallback(async (action: (selectedRows: TData[]) => Promise<void>) => {
    try {
      await action(selectedRows)
      clearSelection()
    } catch (error) {
      console.error('Bulk action failed:', error)
    }
  }, [selectedRows, clearSelection])

  if (isLoading) {
    return <DataTableSkeleton columns={computedColumns.length} rows={5} />
  }

  return (
    <div className="space-y-4">
      {!hideToolbar && (
        <DataTableToolbar table={table}>
          {enableBulkActions && hasSelectedRows ? (
            <div className="lg:flex justify-center items-center gap-4">
              <span className="text-sm text-muted-foreground block mb-2 lg:mb-0">
                {Object.keys(rowSelection).length} item terpilih
              </span>
              <div className="flex flex-wrap sm:flex-row sm:items-center gap-2 mr-4">
                {bulkActions}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap sm:flex-row sm:items-start justify-start items-center gap-2">
              {toolbarActions}
            </div>
          )}
        </DataTableToolbar>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={computedColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        table={table}
        isServerSide={isServerSide}
        currentPage={currentPage}
        lastPage={lastPage}
        perPage={perPage}
        total={total}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
      />
    </div>
  )
}
