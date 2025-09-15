'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Upload, X, Image as ImageIcon, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { uploadImageToCloudinary } from '@/app/admin/media/universal-upload-action';

interface UniversalImageUploaderProps {
  children: React.ReactNode;
  entityType: string;
  entityId?: number;
  onUploadSuccess?: (mediaIds: number[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  className?: string;
}

export function UniversalImageUploader({
  children,
  entityType,
  entityId,
  onUploadSuccess,
  maxFiles = 999, // Set to very high number to allow unlimited
  acceptedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ],
  maxFileSize = 10, // 10MB default
  className
}: UniversalImageUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<
    Array<{
      id: number;
      fileName: string;
      fileUrl: string;
    }>
  >([]);

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes.map((type) => type.replace('image/', '.'))
    },
    maxSize: maxFileSize * 1024 * 1024
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
    const uploadedMediaIds: number[] = [];

    for (const file of uploadedFiles) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('entityType', entityType);
        if (entityId) {
          formData.append('entityId', entityId.toString());
        }

        const result = await uploadImageToCloudinary(formData);

        if (result.success && result.mediaId) {
          successCount++;
          uploadedMediaIds.push(result.mediaId);

          // Add to uploaded media list
          setUploadedMedia((prev) => [
            ...prev,
            {
              id: result.mediaId!,
              fileName: result.fileName!,
              fileUrl: result.fileUrl!
            }
          ]);
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
        `Berhasil upload ${successCount} file${errorCount > 0 ? `, ${errorCount} gagal` : ''}`
      );

      // Call success callback if provided
      if (onUploadSuccess) {
        onUploadSuccess(uploadedMediaIds);
      }

      // Reset form
      setUploadedFiles([]);
      setIsOpen(false);
      router.refresh();
    } else {
      toast.error(`Gagal upload ${errorCount} file`);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getAcceptedExtensions = () => {
    return acceptedFileTypes
      .map((type) => type.replace('image/', '.').toUpperCase())
      .join(', ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={`max-h-[90vh] max-w-4xl overflow-y-auto ${className || ''}`}
      >
        <DialogHeader>
          <DialogTitle>Upload Gambar ke {entityType}</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Entity Info */}
          <div className='bg-muted rounded-lg p-4'>
            <div className='text-muted-foreground text-sm'>
              <strong>Entity Type:</strong> {entityType}
              {entityId && (
                <>
                  <br />
                  <strong>Entity ID:</strong> {entityId}
                </>
              )}
            </div>
          </div>

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
                    ? 'Jatuhkan file di sini'
                    : 'Drag & drop file di sini'}
                </p>
                <p className='text-muted-foreground mt-1 text-sm'>
                  atau klik untuk memilih file
                </p>
                <p className='text-muted-foreground/70 mt-2 text-xs'>
                  Mendukung: {getAcceptedExtensions()} (Maks: {maxFileSize}MB
                  per file)
                </p>
                <p className='text-muted-foreground/70 text-xs'>
                  Upload unlimited gambar
                </p>
              </div>
            </div>
          </div>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <div className='space-y-3'>
              <Label>
                File Terpilih ({uploadedFiles.length}/{maxFiles})
              </Label>
              <div className='max-h-60 space-y-3 overflow-y-auto'>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className='bg-muted space-y-3 rounded-lg p-4'
                  >
                    <div className='flex items-center justify-between'>
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
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recently Uploaded Media */}
          {uploadedMedia.length > 0 && (
            <div className='space-y-3'>
              <Label>Media Terupload</Label>
              <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
                {uploadedMedia.map((media) => (
                  <div key={media.id} className='group relative'>
                    <img
                      src={media.fileUrl}
                      alt={media.fileName}
                      className='h-24 w-full rounded-lg object-cover'
                    />
                    <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-white hover:text-white'
                        onClick={() => window.open(media.fileUrl, '_blank')}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                    </div>
                    <div className='mt-1'>
                      <p className='truncate text-xs font-medium'>
                        {media.fileName}
                      </p>
                      {/* Removed media.description */}
                    </div>
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
