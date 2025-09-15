'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadGalleryMediaAction } from '../server-action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';

interface UploadGalleryMediaModalProps {
  children: React.ReactNode;
  galleryId: number;
}

export function UploadGalleryMediaModal({
  children,
  galleryId
}: UploadGalleryMediaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Silakan pilih minimal satu file untuk diupload');
      return;
    }

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (const file of uploadedFiles) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadGalleryMediaAction(galleryId, formData);

        if (result.success) {
          successCount++;
        } else {
          errorCount++;
          console.error('Upload failed:', result.error);
        }
      } catch (error) {
        errorCount++;
        console.error('Upload error:', error);
      }
    }

    setIsUploading(false);

    if (successCount > 0) {
      toast.success(
        `Berhasil upload ${successCount} foto${errorCount > 0 ? `, ${errorCount} gagal` : ''}`
      );
      setUploadedFiles([]);
      setIsOpen(false);
      router.refresh();
    } else {
      toast.error(`Gagal upload ${errorCount} foto`);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Upload Foto ke Galeri</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Drag & Drop Zone */}
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <div className='space-y-4'>
              <div className='bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full'>
                <Upload className='text-muted-foreground h-8 w-8' />
              </div>
              <div>
                <p className='text-lg font-medium'>
                  {isDragActive
                    ? 'Jatuhkan foto di sini'
                    : 'Drag & drop foto di sini'}
                </p>
                <p className='text-muted-foreground mt-1 text-sm'>
                  atau klik untuk memilih file
                </p>
                <p className='text-muted-foreground/70 mt-2 text-xs'>
                  Mendukung: JPG, PNG, WebP, GIF (Maks: 10MB)
                </p>
              </div>
            </div>
          </div>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <div className='space-y-3'>
              <Label>File Terpilih ({uploadedFiles.length})</Label>
              <div className='max-h-40 space-y-2 overflow-y-auto'>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className='bg-muted flex items-center justify-between rounded-lg p-3'
                  >
                    <div className='flex items-center space-x-3'>
                      <ImageIcon className='text-muted-foreground h-5 w-5' />
                      <div>
                        <p className='text-sm font-medium'>{file.name}</p>
                        <p className='text-muted-foreground text-xs'>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => removeFile(index)}
                      className='text-red-500 hover:text-red-700'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className='flex justify-end space-x-3'>
            <Button
              variant='outline'
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Batal
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploadedFiles.length === 0 || isUploading}
              className='min-w-[100px]'
            >
              {isUploading ? (
                <>
                  <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                  Mengupload...
                </>
              ) : (
                <>
                  <Upload className='mr-2 h-4 w-4' />
                  Upload
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
