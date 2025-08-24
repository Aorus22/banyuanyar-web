"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, Eye, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { safeFormatDateOnly } from "@/lib/date-utils"
import { deleteDocument } from "./server-action"
import { confirmModal } from "@/components/ui"
import { toast } from "sonner"

export type Document = {
  id: number
  title: string
  fileUrl: string
  description: string | null
  filename: string
  fileSize: bigint | null
  fileType: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const formatFileSize = (bytes: bigint | null) => {
  if (!bytes) return '-';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === BigInt(0)) return '0 Bytes';
  
  const i = Math.floor(Math.log(Number(bytes)) / Math.log(1024));
  return Math.round(Number(bytes) / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

export const columns: ColumnDef<Document>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <div className="text-center font-medium">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
    size: 60,
  },
  {
    accessorKey: "title",
    header: "Judul Dokumen",
    cell: ({ row }) => (
      <div className="max-w-3xl">
        <p className="font-medium break-words whitespace-normal leading-tight">{row.getValue("title")}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 300,
  },
  {
    accessorKey: "filename",
    header: "Nama File",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-[200px] max-w-[300px]">
        <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
        <span className="text-sm break-all truncate">{row.getValue("filename")}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 250,
  },
  {
    accessorKey: "fileType",
    header: "Tipe File",
    cell: ({ row }) => {
      const fileType = row.getValue("fileType") as string
      return fileType ? (
        <Badge variant="outline" className="text-xs">
          {fileType.toUpperCase()}
        </Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 120,
  },
  {
    accessorKey: "fileSize",
    header: "Ukuran File",
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {formatFileSize(row.getValue("fileSize"))}
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
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Aktif" : "Nonaktif"}
        </Badge>
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
      const document = row.original

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
              <a 
                href={document.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center w-full px-2 py-1.5 text-sm cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                Lihat Dokumen
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-destructive"
                onClick={async () => {
                  if (!(await confirmModal(
                    "Hapus Dokumen",
                    `Apakah Anda yakin ingin menghapus dokumen "${document.title}"? Tindakan ini tidak dapat dibatalkan.`
                  ))) {
                    return
                  }

                  const loadingToast = toast.loading("Menghapus dokumen...");

                  try {
                    const result = await deleteDocument(document.id);
                    if (result.success) {
                      toast.success("Dokumen berhasil dihapus", { id: loadingToast });
                      window.location.reload();
                    } else {
                      toast.error(`Gagal menghapus dokumen: ${result.error || 'Unknown error'}`, { id: loadingToast });
                    }
                  } catch (error) {
                    console.error('Error deleting document:', error);
                    toast.error('Gagal menghapus dokumen', { id: loadingToast });
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
