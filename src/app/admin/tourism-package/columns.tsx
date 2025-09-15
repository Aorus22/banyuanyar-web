'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
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
import { deleteTourismPackage } from './server-action';
import { confirmModal } from '@/components/ui';
import { toast } from 'sonner';

export type TourismPackage = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  duration: string | null;
  maxParticipants: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: number;
    name: string;
  } | null;
};

export const columns: ColumnDef<TourismPackage>[] = [
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
    header: 'Nama Paket',
    cell: ({ row }) => (
      <div className='min-w-[250px]'>
        <div className='font-medium'>{row.getValue('name')}</div>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    size: 250
  },
  {
    accessorKey: 'category.name',
    header: 'Kategori',
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <div className='min-w-[120px]'>
          {category ? (
            <Badge variant='outline'>{category.name}</Badge>
          ) : (
            <span className='text-muted-foreground text-sm'>-</span>
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    size: 150
  },
  {
    accessorKey: 'price',
    header: 'Harga',
    cell: ({ row }) => {
      const price = row.getValue('price') as number | null;
      return (
        <div className='min-w-[100px]'>
          {price ? (
            <span className='font-medium'>
              Rp {price.toLocaleString('id-ID')}
            </span>
          ) : (
            <span className='text-muted-foreground text-sm'>-</span>
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    size: 120
  },
  {
    accessorKey: 'duration',
    header: 'Durasi',
    cell: ({ row }) => {
      const duration = row.getValue('duration') as string | null;
      return (
        <div className='min-w-[100px]'>
          {duration || <span className='text-muted-foreground text-sm'>-</span>}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    size: 120
  },
  {
    accessorKey: 'maxParticipants',
    header: 'Max Peserta',
    cell: ({ row }) => {
      const maxParticipants = row.getValue('maxParticipants') as number | null;
      return (
        <div className='min-w-[100px] text-center'>
          {maxParticipants ? (
            <Badge variant='secondary'>{maxParticipants} orang</Badge>
          ) : (
            <span className='text-muted-foreground text-sm'>-</span>
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    size: 120
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
      const package_ = row.original;

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
                href={`/admin/tourism-package/${package_.id}/edit`}
                className='w-full'
              >
                <div className='flex w-full items-center px-2 py-1.5 text-sm'>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant='ghost'
                size='sm'
                className='text-destructive w-full justify-start'
                onClick={async () => {
                  if (
                    !(await confirmModal(
                      'Hapus Paket Wisata',
                      `Apakah Anda yakin ingin menghapus paket "${package_.name}"? Tindakan ini tidak dapat dibatalkan.`
                    ))
                  ) {
                    return;
                  }

                  try {
                    const result = await deleteTourismPackage(package_.id);
                    if (result.success) {
                      toast.success('Paket wisata berhasil dihapus');
                      window.location.reload();
                    } else {
                      toast.error(
                        `Gagal menghapus paket: ${result.error || 'Unknown error'}`
                      );
                    }
                  } catch (error) {
                    console.error('Error deleting package:', error);
                    toast.error('Gagal menghapus paket wisata');
                  }
                }}
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Hapus
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
