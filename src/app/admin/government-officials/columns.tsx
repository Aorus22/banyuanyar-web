'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  deleteGovernmentOfficial,
  toggleGovernmentOfficialStatus
} from './server-action';
import { toast } from 'sonner';
import Link from 'next/link';

export type GovernmentOfficial = {
  id: number;
  name: string;
  position: string;
  photoUrl?: string | null;
  bio?: string | null;
  socialMedia?: any;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<GovernmentOfficial>[] = [
  {
    accessorKey: 'sortOrder',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Urutan
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('sortOrder')}</div>
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nama
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'position',
    header: 'Jabatan'
  },
  {
    accessorKey: 'photoUrl',
    header: 'Foto',
    cell: ({ row }) => {
      const photoUrl = row.getValue('photoUrl') as string;
      if (photoUrl) {
        return (
          <div className='h-12 w-12 overflow-hidden rounded-full'>
            <img
              src={photoUrl}
              alt='Foto'
              className='h-full w-full object-cover'
            />
          </div>
        );
      }
      return (
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500'>
          -
        </div>
      );
    }
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Aktif' : 'Tidak Aktif'}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const official = row.original;

      const handleDelete = async () => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${official.name}?`)) {
          try {
            const result = await deleteGovernmentOfficial(official.id);
            if (result.success) {
              toast.success('Perangkat desa berhasil dihapus');
              window.location.reload();
            } else {
              toast.error(result.error || 'Gagal menghapus perangkat desa');
            }
          } catch (error) {
            toast.error('Terjadi kesalahan saat menghapus');
          }
        }
      };

      const handleToggleStatus = async () => {
        try {
          const result = await toggleGovernmentOfficialStatus(official.id);
          if (result.success) {
            toast.success(`Status ${official.name} berhasil diubah`);
            window.location.reload();
          } else {
            toast.error(result.error || 'Gagal mengubah status');
          }
        } catch (error) {
          toast.error('Terjadi kesalahan saat mengubah status');
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/government-officials/${official.id}`}>
                <Eye className='mr-2 h-4 w-4' />
                Lihat Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/government-officials/${official.id}/edit`}>
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleToggleStatus}>
              <Badge
                variant={official.isActive ? 'secondary' : 'default'}
                className='mr-2'
              >
                {official.isActive ? 'Nonaktifkan' : 'Aktifkan'}
              </Badge>
              {official.isActive ? 'Nonaktifkan' : 'Aktifkan'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className='text-red-600'>
              <Trash2 className='mr-2 h-4 w-4' />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
