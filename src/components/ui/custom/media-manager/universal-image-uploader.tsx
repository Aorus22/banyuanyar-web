'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSize = 10, // 10MB default
  className
}: UniversalImageUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<Array<{
    id: number;
    fileName: string;
    fileUrl: string;
  }>>([]);

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes.map(type => type.replace('image/', '.'))
    },
    maxSize: maxFileSize * 1024 * 1024,
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Silakan pilih minimal satu file untuk diupload");
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
          setUploadedMedia(prev => [...prev, {
            id: result.mediaId!,
            fileName: result.fileName!,
            fileUrl: result.fileUrl!
          }]);
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
      toast.success(`Berhasil upload ${successCount} file${errorCount > 0 ? `, ${errorCount} gagal` : ''}`);
      
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
    return acceptedFileTypes.map(type => type.replace('image/', '.').toUpperCase()).join(', ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${className || ''}`}>
        <DialogHeader>
          <DialogTitle>Upload Gambar ke {entityType}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Entity Info */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">
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
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isDragActive ? 'Jatuhkan file di sini' : 'Drag & drop file di sini'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  atau klik untuk memilih file
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">
                  Mendukung: {getAcceptedExtensions()} (Maks: {maxFileSize}MB per file)
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Upload unlimited gambar
                </p>
              </div>
            </div>
          </div>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <Label>File Terpilih ({uploadedFiles.length}/{maxFiles})</Label>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recently Uploaded Media */}
          {uploadedMedia.length > 0 && (
            <div className="space-y-3">
              <Label>Media Terupload</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {uploadedMedia.map((media) => (
                  <div key={media.id} className="relative group">
                    <img
                      src={media.fileUrl}
                      alt={media.fileName}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:text-white"
                        onClick={() => window.open(media.fileUrl, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mt-1">
                      <p className="text-xs font-medium truncate">{media.fileName}</p>
                      {/* Removed media.description */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Batal
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploadedFiles.length === 0 || isUploading}
              className="min-w-[100px]"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Mengupload...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
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