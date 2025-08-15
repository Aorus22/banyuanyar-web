"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import Link from "next/link"
import { deleteNewsCategory } from "./server-action"
import { confirmModal } from "@/components/ui"
import { toast } from "sonner"

export type NewsCategory = {
  id: number
  name: string
  slug: string
  description: string | null
  color: string
  createdAt: Date
  updatedAt: Date
  _count: {
    news: number
  }
}

export const columns: ColumnDef<NewsCategory>[] = [
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
        <div className="text-sm text-muted-foreground">
          {row.original.slug}
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 250,
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | null
      return (
        <div className="max-w-[300px]">
          {description ? (
            <div className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          )}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 300,
  },
  {
    accessorKey: "color",
    header: "Warna",
    cell: ({ row }) => {
      const color = row.getValue("color") as string
      return (
        <div className="flex items-center gap-3">
          <div 
            className="w-6 h-6 rounded-full border border-border"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-mono">{color}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
    size: 150,
  },
  {
    accessorKey: "_count.news",
    header: "Jumlah News",
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="secondary">
          {row.original._count.news} berita
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
      const date = row.getValue("createdAt") as Date
      return format(date, "dd MMM yyyy", { locale: id })
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
              <Link href={`/admin/news-category/${category.id}/edit`} className="w-full">
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
                    `Apakah Anda yakin ingin menghapus kategori "${category.name}"? Tindakan ini tidak dapat dibatalkan.`
                  ))) {
                    return
                  }

                  try {
                    const result = await deleteNewsCategory(category.id);
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