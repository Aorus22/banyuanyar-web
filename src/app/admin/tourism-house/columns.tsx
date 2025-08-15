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
import { deleteTourismHouse } from "./server-action"
import { confirmModal } from "@/components/ui"
import { toast } from "sonner"

export type TourismHouse = {
  id: number
  name: string
  description: string | null
  category: string | null
  location: string | null
  contactPerson: string | null
  contactPhone: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<TourismHouse>[] = [
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
    header: "Nama Penginapan",
    cell: ({ row }) => (
      <div className="min-w-[250px]">
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 250,
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => {
      const category = row.getValue("category") as string | null
      return (
        <div className="min-w-[120px]">
          {category ? (
            <Badge variant="outline">{category}</Badge>
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          )}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 150,
  },
  {
    accessorKey: "location",
    header: "Lokasi",
    cell: ({ row }) => {
      const location = row.getValue("location") as string | null
      return (
        <div className="min-w-[200px]">
          {location || <span className="text-muted-foreground text-sm">-</span>}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 200,
  },
  {
    accessorKey: "contactPerson",
    header: "Kontak Person",
    cell: ({ row }) => {
      const contactPerson = row.getValue("contactPerson") as string | null
      return (
        <div className="min-w-[150px]">
          {contactPerson || <span className="text-muted-foreground text-sm">-</span>}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 150,
  },
  {
    accessorKey: "contactPhone",
    header: "No. Telepon",
    cell: ({ row }) => {
      const contactPhone = row.getValue("contactPhone") as string | null
      return (
        <div className="min-w-[120px]">
          {contactPhone || <span className="text-muted-foreground text-sm">-</span>}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 120,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean
      return (
        <div className="min-w-[80px]">
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Aktif" : "Tidak Aktif"}
          </Badge>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 100,
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
      const house = row.original

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
              <Link href={`/admin/tourism-house/${house.id}/edit`} className="w-full">
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
                    "Hapus Penginapan",
                    `Apakah Anda yakin ingin menghapus penginapan "${house.name}"? Tindakan ini tidak dapat dibatalkan.`
                  ))) {
                    return
                  }

                  try {
                    const result = await deleteTourismHouse(house.id);
                    if (result.success) {
                      toast.success("Penginapan berhasil dihapus");
                      window.location.reload();
                    } else {
                      toast.error(`Gagal menghapus penginapan: ${result.error || 'Unknown error'}`);
                    }
                  } catch (error) {
                    console.error('Error deleting house:', error);
                    toast.error('Gagal menghapus penginapan');
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