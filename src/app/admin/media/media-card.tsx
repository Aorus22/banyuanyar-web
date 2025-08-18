'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MoreVertical, 
  Trash2, 
  Download, 
  Copy, 
  ExternalLink
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteMediaAction } from './server-action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface MediaCardProps {
  media: {
    id: number;
    fileName: string;
    fileSize: number;
    fileUrl: string;
    mimeType: string;
    entityType: string;
    entityId: number;
    createdAt: Date;
  };
}

export function MediaCard({ media }: MediaCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getEntityTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      news: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      gallery: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      umkm: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      tourism: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      event: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      general: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    };
    return colors[type] || colors.general;
  };

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus file media ini?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteMediaAction(media.id);
      
      if (result.success) {
        toast.success("File media berhasil dihapus");
        router.refresh();
      } else {
        toast.error(result.error || "Gagal menghapus file media");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan yang tidak terduga");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("URL berhasil disalin ke clipboard");
    } catch (error) {
      toast.error("Gagal menyalin ke clipboard");
    }
  };

  const downloadFile = async () => {
    try {
      const response = await fetch(media.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = media.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Gagal mengunduh file");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={media.fileUrl}
          alt={media.fileName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* File name */}
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
              {media.fileName}
            </h3>
          </div>

          {/* File info */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span className="font-medium">{formatFileSize(media.fileSize)}</span>
              
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
                  <DropdownMenuItem onClick={() => copyToClipboard(media.fileUrl)}>
                    <Copy className="mr-2 h-3 w-3" />
                    Salin URL
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={downloadFile}>
                    <Download className="mr-2 h-3 w-3" />
                    Unduh
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open(media.fileUrl, '_blank')}>
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Buka di tab baru
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

          {/* Entity info */}
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className={`text-xs ${getEntityTypeColor(media.entityType)}`}
            >
              {media.entityType}
            </Badge>
            {media.entityId > 0 && (
              <span className="text-xs text-muted-foreground">
                ID: {media.entityId}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 