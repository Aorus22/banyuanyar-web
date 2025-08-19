"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Eye, Package } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { safeFormatDateOnly } from "@/lib/date-utils"
import Link from "next/link"
import { deleteTourismCategory } from "./server-action"
import { confirmModal } from "@/components/ui"
import { toast } from "sonner"

export type TourismCategory = {
  id: number
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    packages: number
  }
}

export const columns: ColumnDef<TourismCategory>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <div className="text-center font-medium">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
    size: 60,
  },
  {
    accessorKey: "name",
    header: "Nama Kategori",
    cell: ({ row }) => (
      <div className="min-w-[200px]">
        <div className="font-medium">{row.getValue("name")}</div>
        {row.original.description && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {row.original.description}
          </div>
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 300,
  },
  {
    accessorKey: "_count.packages",
    header: "Jumlah Paket",
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="secondary">
          {row.original._count.packages} paket
        </Badge>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 120,
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ row }) => {
      const dateValue = row.getValue("createdAt")
      return safeFormatDateOnly(dateValue)
    },
    enableSorting: true,
    enableHiding: true,
    size: 130,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/tourism-category/${category.id}`} className="w-full">
                <div className="flex items-center w-full px-2 py-1.5 text-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat Detail
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/tourism-category/${category.id}/edit`} className="w-full">
                <div className="flex items-center w-full px-2 py-1.5 text-sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-destructive"
                onClick={async () => {
                  if (!(await confirmModal(
                    "Hapus Kategori",
                    `Apakah Anda yakin ingin menghapus kategori "${category.name}"? Semua paket dalam kategori ini juga akan dihapus. Tindakan ini tidak dapat dibatalkan.`
                  ))) {
                    return
                  }

                  try {
                    const result = await deleteTourismCategory(category.id);
                    if (result.success) {
                      toast.success("Kategori berhasil dihapus");
                      window.location.reload();
                    } else {
                      toast.error(`Gagal menghapus kategori: ${result.error || 'Unknown error'}`);
                    }
                  } catch (error) {
                    console.error('Error deleting category:', error);
                    toast.error('Gagal menghapus kategori');
                  }
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 