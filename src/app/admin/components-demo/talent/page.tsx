"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreVertical, Eye, LogIn, Trash2, Import, Download } from "lucide-react"
import { DataTable } from "@/components/ui/custom/datatable/data-table"
import { DataTableColumnHeader } from "@/components/ui/custom/datatable/data-table-column-header"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


// Interface untuk data Talent (sesuai dengan Vue reference)
interface Talent {
  id: number
  user_id: number
  picture: string | null
  name: string
  email: string
  nik: string
  latest_education: string | null
  instance_name: string | null
  created_at: Date
  tanggal_lahir: string | null
  jenis_kelamin: string | null
  nomor_hp: string | null
  alamat_sekarang: string | null
  kabupaten_sekarang: string | null
  kecamatan_sekarang: string | null
  kecamatan: string | null
  alamat_asal: string | null
  deskripsi: string | null
  keahlian?: Array<{ id: number; name: string }> | null
}

// Mock data untuk contoh
const mockData: Talent[] = [
  {
    id: 1,
    user_id: 1,
    picture: null,
    name: "John Doe",
    email: "john.doe@example.com",
    nik: "1234567890123456",
    latest_education: "S1",
    instance_name: "Universitas Indonesia",
    created_at: new Date("2024-01-15"),
    tanggal_lahir: "1995-05-15",
    jenis_kelamin: "Laki-laki",
    nomor_hp: "081234567890",
    alamat_sekarang: "Jl. Sudirman No. 123",
    kabupaten_sekarang: "Jakarta Selatan",
    kecamatan_sekarang: "Kebayoran Baru",
    kecamatan: "Kebayoran Baru",
    alamat_asal: "Jl. Thamrin No. 456",
    deskripsi: "Pengalaman 5 tahun di bidang IT",
    keahlian: [
      { id: 1, name: "JavaScript" },
      { id: 2, name: "React" },
    ],
  },
  {
    id: 2,
    user_id: 2,
    picture: null,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    nik: "1234567890123457",
    latest_education: "S2",
    instance_name: "Institut Teknologi Bandung",
    created_at: new Date("2024-01-20"),
    tanggal_lahir: "1992-08-20",
    jenis_kelamin: "Perempuan",
    nomor_hp: "081234567891",
    alamat_sekarang: "Jl. Gatot Subroto No. 789",
    kabupaten_sekarang: "Jakarta Selatan",
    kecamatan_sekarang: "Kebayoran Lama",
    kecamatan: "Kebayoran Lama",
    alamat_asal: "Jl. Sudirman No. 321",
    deskripsi: "Spesialis di bidang Data Science",
    keahlian: [
      { id: 3, name: "Python" },
      { id: 4, name: "Machine Learning" },
    ],
  },
]

export default function TalentPage() {
  const [data, setData] = React.useState<Talent[]>(mockData)
  const [isLoading, setIsLoading] = React.useState(false)

  // Action handlers
  const handleDetail = (talent: Talent) => {
    console.log("Detail talent:", talent)
    // Implement detail modal here
  }

  const handleLogin = (talentId: number) => {
    console.log("Login as talent:", talentId)
    // Implement login logic here
  }

  const handleDelete = (talent: Talent) => {
    console.log("Delete talent:", talent)
    // Implement delete logic here
  }

  const bulkDelete = async (selectedRows: Talent[]) => {
    console.log("Bulk delete:", selectedRows)
    // Implement bulk delete logic here
  }

  const handleExportTalent = () => {
    console.log("Export talent data")
    // Implement export logic here
  }

  // Column definitions
  const columns: ColumnDef<Talent>[] = [
    {
      accessorKey: "picture",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Foto" />
      ),
      cell: ({ row }) => (
        <Avatar className="w-10 h-10">
          <AvatarImage src={row.original.picture || ""} />
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
        <DataTableColumnHeader column={column} title="Talent" />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "nik",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="NIK" />
      ),
      cell: ({ row }) => <div>{row.getValue("nik")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "latest_education",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pendidikan Terakhir" />
      ),
      cell: ({ row }) => <div>{row.getValue("latest_education")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "instance_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Instansi" />
      ),
      cell: ({ row }) => <div>{row.getValue("instance_name")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Terdaftar" />
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("created_at")
            ? new Date(row.getValue("created_at")).toLocaleDateString("id-ID")
            : "-"}
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
            <DropdownMenuItem onClick={() => handleLogin(row.original.user_id)}>
              <LogIn className="mr-2 h-4 w-4" />
              Login ke Akun
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
      <div>
        <h1 className="text-3xl font-bold">Daftar Talent</h1>
        <p className="text-muted-foreground">
          Kelola data talent yang terdaftar di sistem
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Talent yang Terdaftar di Disnaker Batang</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            enableBulkActions={true}
            toolbarActions={
              <>
                <Button className="flex items-center gap-2 button-primary">
                  <Import className="h-4 w-4" /> Import Talent
                </Button>
                <Button
                  onClick={handleExportTalent}
                  className="flex items-center gap-2 button-primary justify-center"
                >
                  <Download className="h-4 w-4" />
                  Download Talent
                </Button>
              </>
            }
            bulkActions={
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  // This would be handled by the parent component
                  console.log("Bulk delete action")
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