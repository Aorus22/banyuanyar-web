"use client"

import { ColumnDef } from "@tanstack/react-table"
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
import { safeFormatDateTime, safeFormatDateOnly } from "@/lib/date-utils"
import Link from "next/link"
import { deleteEvent } from "./server-action"
import { confirmModal } from "@/components/ui"
import { toast } from "sonner"

export type Event = {
  id: number
  title: string
  description: string | null
  startDate: Date
  endDate: Date | null
  location: string | null
  organizer: string | null
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Event>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <div className="text-center font-medium">{row.index + 1}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "Judul Event",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Tanggal Mulai",
    cell: ({ row }) => {
      const dateValue = row.getValue("startDate")
      return safeFormatDateTime(dateValue)
    },
  },
  {
    accessorKey: "endDate",
    header: "Tanggal Selesai",
    cell: ({ row }) => {
      const dateValue = row.getValue("endDate")
      return safeFormatDateTime(dateValue)
    },
  },
  {
    accessorKey: "location",
    header: "Lokasi",
    cell: ({ row }) => row.getValue("location") || "-",
  },
  {
    accessorKey: "organizer",
    header: "Penyelenggara",
    cell: ({ row }) => row.getValue("organizer") || "-",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ row }) => {
      const dateValue = row.getValue("createdAt")
      return safeFormatDateOnly(dateValue)
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original

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
              <Link className="!p-0" href={`/admin/event/${event.id}/edit`}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-destructive"
                onClick={async () => {
                  if (!(await confirmModal(
                    "Hapus Event",
                    `Apakah Anda yakin ingin menghapus event "${event.title}"? Tindakan ini tidak dapat dibatalkan.`
                  ))) {
                    return
                  }

                  try {
                    const result = await deleteEvent(event.id);
                    if (result.success) {
                      toast.success("Event berhasil dihapus");
                      window.location.reload();
                    } else {
                      toast.error(`Gagal menghapus event: ${result.error || 'Unknown error'}`);
                    }
                  } catch (error) {
                    console.error('Error deleting event:', error);
                    toast.error('Gagal menghapus event');
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