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
import { deleteNews } from "./server-action"
import { confirmModal } from "@/components/ui"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type News = {
  id: number
  title: string
  slug: string
  content: string
  featuredImage: string | null
  authorId: number | null
  categoryId: number | null
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  publishedAt: Date | null
  viewCount: number
  createdAt: Date
  updatedAt: Date
  author: {
    id: number
    name: string
    username: string
  } | null
  category: {
    id: number
    name: string
    color: string
  } | null
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    DRAFT: { label: "Draft", variant: "secondary" as const },
    PUBLISHED: { label: "Published", variant: "default" as const },
    ARCHIVED: { label: "Archived", variant: "outline" as const },
  }
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export const columns: ColumnDef<News>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <div className="text-center font-medium">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
    size: 60,
  },
  {
    accessorKey: "featuredImage",
    header: "Gambar",
    cell: ({ row }) => {
      const image = row.getValue("featuredImage") as string | null
      return (
        <Avatar className="w-12 h-12">
          <AvatarImage src={image || undefined} alt={row.original.title} />
          <AvatarFallback>
            {row.original.title.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false,
    enableHiding: true,
    size: 80,
  },
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => (
      <div className="min-w-[300px] max-w-[500px]">
        <div className="font-medium break-words">{row.getValue("title")}</div>
        <div className="text-sm text-muted-foreground break-all">
          {row.original.slug}
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 400,
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => {
      const category = row.original.category
      if (!category) return <span className="text-muted-foreground">-</span>
      
      return (
        <div className="min-w-[120px]">
          <Badge 
            variant="outline" 
            style={{ borderColor: category.color, color: category.color }}
          >
            {category.name}
          </Badge>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 150,
  },
  {
    accessorKey: "author",
    header: "Penulis",
    cell: ({ row }) => {
      const author = row.original.author
      return author ? (
        <div className="text-sm min-w-[150px]">
          <div className="font-medium break-words">{author.name}</div>
          <div className="text-muted-foreground break-all">@{author.username}</div>
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 180,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
    enableSorting: true,
    enableHiding: true,
    size: 120,
  },
  {
    accessorKey: "viewCount",
    header: "Views",
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("viewCount")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 100,
  },
  {
    accessorKey: "publishedAt",
    header: "Published",
    cell: ({ row }) => {
      const date = row.getValue("publishedAt") as Date | null
      return date ? format(date, "dd MMM yyyy", { locale: id }) : "-"
    },
    enableSorting: true,
    enableHiding: true,
    size: 130,
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
      const news = row.original

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
              <Link className="!px-0" href={`/informasi/berita/${news.slug}`}>
                <div className="flex items-center w-full px-2 py-1.5 text-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link className="!px-0" href={`/admin/news/${news.id}/edit`}>
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
                    "Hapus News",
                    `Apakah Anda yakin ingin menghapus news "${news.title}"? Tindakan ini tidak dapat dibatalkan.`
                  ))) {
                    return
                  }

                  try {
                    const result = await deleteNews(news.id);
                    if (result.success) {
                      toast.success("News berhasil dihapus");
                      window.location.reload();
                    } else {
                      toast.error(`Gagal menghapus news: ${result.error || 'Unknown error'}`);
                    }
                  } catch (error) {
                    console.error('Error deleting news:', error);
                    toast.error('Gagal menghapus news');
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