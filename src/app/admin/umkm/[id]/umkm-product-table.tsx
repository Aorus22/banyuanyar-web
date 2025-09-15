'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { deleteUmkmProduct } from './product/[productId]/edit/server-action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { safeFormatDateOnly } from '@/lib/date-utils';
import Link from 'next/link';
import { DataTable } from '@/components/ui/custom/datatable/data-table';

export type UmkmProduct = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  umkmId: number;
};

interface UmkmProductTableProps {
  umkmId: number;
  products: UmkmProduct[];
  showCreateButton?: boolean;
}

export default function UmkmProductTable({
  umkmId,
  products,
  showCreateButton = false
}: UmkmProductTableProps) {
  const router = useRouter();

  const handleDelete = async (productId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        const result = await deleteUmkmProduct(productId);
        if (result.success) {
          toast.success('Produk berhasil dihapus');
          router.refresh();
        } else {
          toast.error(result.error || 'Gagal menghapus produk');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Terjadi kesalahan saat menghapus produk');
      }
    }
  };
  const columns: ColumnDef<UmkmProduct>[] = [
    {
      id: 'no',
      header: 'No',
      cell: ({ row }) => (
        <div className='text-center font-medium'>{row.index + 1}</div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 60
    },
    {
      accessorKey: 'name',
      header: 'Nama Produk',
      cell: ({ row }) => (
        <div className='min-w-[200px]'>
          <div className='font-medium'>{row.getValue('name')}</div>
          {row.original.description && (
            <div className='text-muted-foreground line-clamp-1 text-sm'>
              {row.original.description}
            </div>
          )}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
      size: 250
    },
    {
      accessorKey: 'price',
      header: 'Harga',
      cell: ({ row }) => {
        const price = row.getValue('price') as number;
        return (
          <div className='min-w-[120px]'>
            <span className='font-medium'>
              Rp {price.toLocaleString('id-ID')}
            </span>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
      size: 120
    },
    {
      accessorKey: 'unit',
      header: 'Satuan',
      cell: ({ row }) => {
        const unit = row.getValue('unit') as string;
        return (
          <div className='min-w-[80px]'>
            <Badge variant='outline'>{unit}</Badge>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
      size: 100
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => {
        const isActive = row.getValue('isActive') as boolean;
        return (
          <div className='min-w-[80px]'>
            <Badge variant={isActive ? 'default' : 'secondary'}>
              {isActive ? 'Aktif' : 'Tidak Aktif'}
            </Badge>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
      size: 100
    },
    {
      accessorKey: 'createdAt',
      header: 'Dibuat',
      cell: ({ row }) => {
        const dateValue = row.getValue('createdAt');
        return safeFormatDateOnly(dateValue);
      },
      enableSorting: true,
      enableHiding: true,
      size: 130
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Buka menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/admin/umkm/${umkmId}/product/${product.id}/edit`}
                  className='w-full'
                >
                  <div className='flex w-full items-center px-2 py-1.5 text-sm'>
                    <Edit className='mr-2 h-4 w-4' />
                    Edit Produk
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(product.id)}
                className='text-destructive focus:text-destructive'
              >
                <div className='flex w-full items-center px-2 py-1.5 text-sm'>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Hapus Produk
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  return (
    <div className='space-y-4'>
      {showCreateButton && (
        <div className='flex justify-end'>
          <Button asChild size='sm'>
            <Link href={`/admin/umkm/${umkmId}/product/create`}>
              Tambah Produk
            </Link>
          </Button>
        </div>
      )}
      <DataTable columns={columns} data={products} hideToolbar={false} />
    </div>
  );
}
