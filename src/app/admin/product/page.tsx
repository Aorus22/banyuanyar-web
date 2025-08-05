"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreVertical, Eye, Edit, Trash2, Plus, Download, Upload } from "lucide-react"
import { DataTable } from "@/components/ui/custom/datatable/data-table"
import { DataTableColumnHeader } from "@/components/ui/custom/datatable/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { confirmModal } from "@/components/ui"
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Interface untuk data Product
interface Product {
  id: number
  photo_url: string
  name: string
  description: string
  price: number
  category: string
  created_at: string
  updated_at: string
}

// Mock data untuk contoh
const mockData: Product[] = [
  {
    id: 1,
    photo_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    name: "Laptop Gaming Pro",
    description: "Laptop gaming dengan performa tinggi untuk gaming dan multitasking",
    price: 15000000,
    category: "Electronics",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-20T14:45:00Z"
  },
  {
    id: 2,
    photo_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    name: "Headphone Wireless",
    description: "Headphone wireless dengan noise cancelling premium",
    price: 2500000,
    category: "Electronics",
    created_at: "2024-01-10T09:15:00Z",
    updated_at: "2024-01-18T11:20:00Z"
  },
  {
    id: 3,
    photo_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    name: "Sepatu Running",
    description: "Sepatu running dengan teknologi cushioning terbaru",
    price: 1200000,
    category: "Sports",
    created_at: "2024-01-05T16:45:00Z",
    updated_at: "2024-01-12T13:30:00Z"
  },
  {
    id: 4,
    photo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    name: "Smartphone Flagship",
    description: "Smartphone flagship dengan kamera terbaik di kelasnya",
    price: 8500000,
    category: "Electronics",
    created_at: "2024-01-08T12:00:00Z",
    updated_at: "2024-01-15T10:15:00Z"
  },
  {
    id: 5,
    photo_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    name: "Kacamata Hitam",
    description: "Kacamata hitam dengan lensa polarized premium",
    price: 800000,
    category: "Fashion",
    created_at: "2024-01-12T08:30:00Z",
    updated_at: "2024-01-19T15:45:00Z"
  }
]

export default function ProductPage() {
  const [data, setData] = React.useState<Product[]>(mockData)
  const [isLoading, setIsLoading] = React.useState(false)
  
  // State untuk melacak selected rows dari DataTable
  const [selectedRows, setSelectedRows] = React.useState<Product[]>([])
  
  // Debug: log selected rows changes
  React.useEffect(() => {
    console.log("Selected rows changed:", selectedRows.length, selectedRows)
  }, [selectedRows])
  


  // Action handlers
  const handleDetail = (product: Product) => {
    console.log("Detail product:", product)
    // Implement detail modal here
  }

  const handleEdit = (product: Product) => {
    console.log("Edit product:", product)
    // Implement edit logic here
  }

  const handleDelete = async (product: Product) => {
    if (!(await confirmModal(
      "Hapus Product",
      `Apakah Anda yakin ingin menghapus product "${product.name}"? Tindakan ini tidak dapat dibatalkan.`
    ))) {
      return
    }
    
    console.log("Delete product:", product)
    // Implement delete logic here
    setData(prev => prev.filter(item => item.id !== product.id))
  }

  const bulkDelete = async (selectedRows: Product[]) => {
    if (!(await confirmModal(
      "Hapus Multiple Products",
      `Apakah Anda yakin ingin menghapus ${selectedRows.length} product yang dipilih? Tindakan ini tidak dapat dibatalkan.`
    ))) {
      return
    }
    
    console.log("Bulk delete:", selectedRows)
    // Implement bulk delete logic here
    const selectedIds = selectedRows.map(row => row.id)
    setData(prev => prev.filter(item => !selectedIds.includes(item.id)))
    // Selection will be cleared automatically by DataTable when data changes
  }

  const handleExportProducts = () => {
    console.log("Export products data")
    // Implement export logic here
  }

  const handleImportProducts = () => {
    console.log("Import products data")
    // Implement import logic here
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Column definitions
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "photo_url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gambar" />
      ),
      cell: ({ row }) => (
        <Avatar className="w-12 h-12">
          <AvatarImage src={row.original.photo_url} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama Product" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Kategori" />
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue("category")}
        </Badge>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Harga" />
      ),
      cell: ({ row }) => (
        <div className="font-medium text-green-600">
          {formatCurrency(row.getValue("price"))}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Deskripsi" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate text-sm text-muted-foreground">
          {row.getValue("description")}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dibuat" />
      ),
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {new Date(row.getValue("created_at")).toLocaleDateString("id-ID")}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Aksi" />
      ),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDetail(row.original)}>
              <Eye className="mr-2 h-4 w-4" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: true,
    },
  ]

  return (
    <div className="space-y-6">
        <div className='flex items-start justify-between'>
          <Heading
            title='Products'
            description='Manage products with custom DataTable functionality.'
          />
          <Button className="flex items-center gap-2 button-primary">
            <Plus className="h-4 w-4" /> Add New
          </Button>
        </div>
        <Separator />
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Product yang Tersedia</CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
                      <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            enableBulkActions={true}
            onRowSelectionChange={setSelectedRows}
            toolbarActions={
                <>
                  <Button className="flex items-center gap-2 button-primary">
                    <Upload className="h-4 w-4" /> Import Product
                  </Button>
                  <Button
                    onClick={handleExportProducts}
                    className="flex items-center gap-2 button-primary justify-center"
                  >
                    <Download className="h-4 w-4" />
                    Export Product
                  </Button>
                </>
              }
                          bulkActions={
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  if (selectedRows.length === 0) {
                    console.log("No rows selected")
                    return
                  }
                  console.log("Selected rows:", selectedRows)
                  await bulkDelete(selectedRows)
                }}
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Hapus Terpilih</span>
                <span className="sm:hidden">Hapus</span>
              </Button>
            }
            />
          </CardContent>
        </Card>
    </div>
  )
}
