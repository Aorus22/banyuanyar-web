"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { XIcon, CheckIcon, ListFilter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  children?: React.ReactNode
}

export function DataTableToolbar<TData>({
  table,
  children,
}: DataTableToolbarProps<TData>) {
  const [searchInput, setSearchInput] = React.useState("")
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const globalFilter = React.useMemo(
    () => table.getState().globalFilter ?? "",
    [table]
  )

  React.useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      table.setGlobalFilter(searchInput)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchInput, table])

  const isFiltered = React.useMemo(() => globalFilter.length > 0, [globalFilter])

  const allColumns = React.useMemo(() => {
    return table.getAllColumns().filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    )
  }, [table])

  const toggleColumnVisibility = React.useCallback(
    (columnId: string) => {
      const column = table.getColumn(columnId)
      if (column) {
        column.toggleVisibility(!column.getIsVisible())
      }
    },
    [table]
  )

  const getColumnTitle = React.useCallback((column: any) => {
    const header = column.columnDef.header
    if (typeof header === "function") {
      const titleMatch = header.toString().match(/title:\s*"([^"]+)"/)
      return titleMatch ? titleMatch[1] : column.id
    }
    return header?.toString() || column.id
  }, [])

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center justify-between mb-4">
      <div className="flex items-center space-x-2 order-2 lg:order-1 flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px] pl-8"
          />
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => {
              setSearchInput("")
              table.setGlobalFilter("")
            }}
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {allColumns.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 flex items-center">
                <ListFilter className="h-4 w-4 mr-1" />
                Kolom
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tampilkan Kolom</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-48 overflow-y-auto">
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
      <div className="flex items-center space-x-2 order-1 lg:order-2 mb-2">
        {children}
      </div>
    </div>
  )
}
