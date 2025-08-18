'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MoreVertical, 
  Trash2, 
  Edit,
  Eye,
  Image as ImageIcon,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteGalleryAction } from './server-action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface GalleryCardProps {
  gallery: {
    id: number;
    title: string;
    description: string | null;
    eventDate: Date | null;
    isActive: boolean;
    createdAt: Date;
  };
}

export function GalleryCard({ gallery }: GalleryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const formatDate = (date: Date | null) => {
    if (!date) return 'Tidak ada tanggal';
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus galeri ini? Semua foto dalam galeri ini juga akan dihapus.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteGalleryAction(gallery.id);
      
      if (result.success) {
        toast.success("Galeri berhasil dihapus");
        router.refresh();
      } else {
        toast.error(result.error || "Gagal menghapus galeri");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan yang tidak terduga");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Placeholder Image */}
      <div className="relative aspect-video bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-16 h-16 text-gray-400" />
        </div>
        <Badge 
          variant="secondary" 
          className={`absolute top-2 right-2 ${
            gallery.isActive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}
        >
          {gallery.isActive ? 'Aktif' : 'Nonaktif'}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title */}
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
              {gallery.title}
            </h3>
          </div>

          {/* Description */}
          {gallery.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {gallery.description}
            </p>
          )}

          {/* Event Date */}
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(gallery.eventDate)}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href={`/admin/gallery/${gallery.id}`}>
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <Eye className="w-3 h-3 mr-1" />
                  Lihat
                </Button>
              </Link>
            </div>
            
            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/gallery/${gallery.id}/edit`}>
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-3 w-3" />
                  {isDeleting ? 'Menghapus...' : 'Hapus'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 