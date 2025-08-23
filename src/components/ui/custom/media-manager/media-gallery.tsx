'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Trash2, Download, Image as ImageIcon, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { deleteMedia, deleteMultipleMedia } from '@/app/admin/media/universal-upload-action';
import { useRouter } from 'next/navigation';

interface Media {
  id: number;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  createdAt: Date;
}

interface MediaGalleryProps {
  media: Media[];
  entityType: string;
  entityId?: number;
  onMediaDeleted?: (mediaId: number) => void;
  className?: string;
}

export function MediaGallery({ 
  media, 
  entityType, 
  entityId, 
  onMediaDeleted,
  className 
}: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const router = useRouter();

  const handleSelectAll = () => {
    if (selectedIds.size === media.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(media.map(item => item.id)));
    }
  };

  const handleSelectItem = (mediaId: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(mediaId)) {
      newSelected.delete(mediaId);
    } else {
      newSelected.add(mediaId);
    }
    setSelectedIds(newSelected);
  };

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) {
      toast.error('Pilih media yang akan dihapus');
      return;
    }

    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.size} media?`)) {
      return;
    }

    setIsBatchDeleting(true);
    try {
      const result = await deleteMultipleMedia(Array.from(selectedIds));
      
      if (result.success) {
        toast.success(`Berhasil hapus ${result.deletedCount} media`);
        if (result.error) {
          toast.warning(result.error);
        }
        
        // Call individual delete callbacks
        Array.from(selectedIds).forEach(id => {
          onMediaDeleted?.(id);
        });
        
        setSelectedIds(new Set());
        router.refresh();
      } else {
        toast.error(result.error || 'Gagal menghapus media');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus media');
    } finally {
      setIsBatchDeleting(false);
    }
  };

  const handleDelete = async (mediaId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus media ini?')) {
      return;
    }

    setIsDeleting(mediaId);
    try {
      const result = await deleteMedia(mediaId);
      
      if (result.success) {
        toast.success('Media berhasil dihapus');
        onMediaDeleted?.(mediaId);
        router.refresh();
      } else {
        toast.error(result.error || 'Gagal menghapus media');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus media');
    } finally {
      setIsDeleting(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadImage = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (media.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className || ''}`}>
        <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Belum ada media yang diupload</p>
        <p className="text-sm">Upload gambar pertama untuk {entityType}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Media ({media.length})</h3>
        <div className="flex items-center gap-3">
          {/* <div className="text-sm text-muted-foreground">
            Entity: {entityType}
            {entityId && ` (ID: ${entityId})`}
          </div> */}
          
          {selectedIds.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBatchDelete}
              disabled={isBatchDeleting}
            >
              {isBatchDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash className="w-4 h-4 mr-2" />
                  Hapus {selectedIds.size} Media
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Select All Checkbox */}
      {media.length > 0 && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedIds.size === media.length && media.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Pilih Semua ({selectedIds.size}/{media.length})
          </label>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <Card key={item.id} className="group overflow-hidden">
            <CardContent className="p-0">
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={selectedIds.has(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                  className="bg-white/90 hover:bg-white"
                />
              </div>

              {/* Image Preview */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.fileUrl}
                  alt={item.fileName}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/20"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/20"
                    onClick={() => downloadImage(item.fileUrl, item.fileName)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/20"
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting === item.id}
                  >
                    {isDeleting === item.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-3 space-y-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate" title={item.fileName}>
                    {item.fileName}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatFileSize(item.fileSize)}</span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedMedia && (
        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedMedia.fileName}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Large Image */}
              <div className="flex justify-center">
                <img
                  src={selectedMedia.fileUrl}
                  alt={selectedMedia.fileName}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg"
                />
              </div>

              {/* Image Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Nama File:</span>
                  <p className="text-muted-foreground">{selectedMedia.fileName}</p>
                </div>
                
                <div>
                  <span className="font-medium">Ukuran:</span>
                  <p className="text-muted-foreground">{formatFileSize(selectedMedia.fileSize)}</p>
                </div>
                
                <div>
                  <span className="font-medium">Tipe File:</span>
                  <p className="text-muted-foreground">{selectedMedia.mimeType}</p>
                </div>
                
                <div>
                  <span className="font-medium">Tanggal Upload:</span>
                  <p className="text-muted-foreground">{formatDate(selectedMedia.createdAt)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => downloadImage(selectedMedia.fileUrl, selectedMedia.fileName)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(selectedMedia.id);
                    setSelectedMedia(null);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 