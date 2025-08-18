"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
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
import { deleteUmkm } from "./server-action"
import { confirmModal } from "@/components/ui"
import { toast } from "sonner"

export type Umkm = {
  id: number
  name: string
  ownerName: string | null
  description: string | null
  address: string | null
  phone: string | null
  email: string | null
  latitude: number | null
  longitude: number | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  _count: {
    products: number
  }
}

export const columns: ColumnDef<Umkm>[] = [
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
    header: "Nama UMKM",
    cell: ({ row }) => (
      <div className="min-w-[200px]">
        <div className="font-medium">{row.getValue("name")}</div>
        {row.original.ownerName && (
          <div className="text-sm text-muted-foreground">
            Pemilik: {row.original.ownerName}
          </div>
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 250,
  },

  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => {
      const address = row.getValue("address") as string | null
      return (
        <div className="max-w-[200px]">
          {address ? (
            <div className="text-sm text-muted-foreground line-clamp-2">
              {address}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          )}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 200,
  },
  {
    accessorKey: "phone",
    header: "Telepon",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string | null
      return (
        <div className="min-w-[120px]">
          {phone || <span className="text-muted-foreground text-sm">-</span>}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 120,
  },
  {
    accessorKey: "_count.products",
    header: "Jumlah Produk",
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="secondary">
          {row.original._count.products} produk
        </Badge>
      </div>
    ),
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
      const umkm = row.original

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
              <Link href={`/admin/umkm/${umkm.id}`} className="w-full">
                <div className="flex items-center w-full px-2 py-1.5 text-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat Detail
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/umkm/${umkm.id}/edit`} className="w-full">
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
                    "Hapus UMKM",
                    `Apakah Anda yakin ingin menghapus UMKM "${umkm.name}"? Tindakan ini tidak dapat dibatalkan.`
                  ))) {
                    return
                  }

                  try {
                    const result = await deleteUmkm(umkm.id);
                    if (result.success) {
                      toast.success("UMKM berhasil dihapus");
                      window.location.reload();
                    } else {
                      toast.error(`Gagal menghapus UMKM: ${result.error || 'Unknown error'}`);
                    }
                  } catch (error) {
                    console.error('Error deleting UMKM:', error);
                    toast.error('Gagal menghapus UMKM');
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