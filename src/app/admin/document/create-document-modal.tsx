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
import { Upload, X, FileText, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { createDocument } from './server-action';
import { uploadDocumentToGoogleDrive } from './upload-action';

export function CreateDocumentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        toast.success(`File ${file.name} berhasil dipilih`);
      } else {
        toast.error('Hanya file PDF yang diperbolehkan');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024, // 50MB max
    multiple: false
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      toast.error('Silakan pilih file PDF untuk diupload');
      return;
    }

    if (!formData.title.trim()) {
      toast.error('Judul dokumen harus diisi');
      return;
    }

    setIsUploading(true);

    try {
      // Upload file to Google Drive first
      const uploadResult = await uploadDocumentToGoogleDrive(
        uploadedFile,
        uploadedFile.name
      );

      if (!uploadResult.success) {
        toast.error(`Gagal upload file: ${uploadResult.error}`);
        return;
      }

      // Create document record with uploaded file info
      const result = await createDocument({
        title: formData.title,
        description: formData.description || undefined,
        fileUrl: uploadResult.data!.url,
        filename: uploadedFile.name,
        fileSize: BigInt(uploadResult.data!.size),
        fileType: uploadedFile.type
      });

      if (result.success) {
        toast.success('Dokumen berhasil dibuat');
        setIsOpen(false);
        setFormData({ title: '', description: '' });
        setUploadedFile(null);
        window.location.reload();
      } else {
        toast.error(
          `Gagal membuat dokumen: ${result.error || 'Unknown error'}`
        );
      }
    } catch (error) {
      console.error('Error creating document:', error);
      toast.error('Gagal membuat dokumen');
    } finally {
      setIsUploading(false);
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
      <DialogTrigger asChild>
        <Button className='button-primary flex items-center gap-2'>
          <Plus className='h-4 w-4' /> Tambah Dokumen
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Tambah Dokumen Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Form Fields */}
          <div className='space-y-4'>
            <div>
              <Label htmlFor='title'>Judul Dokumen *</Label>
              <Input
                id='title'
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder='Masukkan judul dokumen'
                required
              />
            </div>

            <div>
              <Label htmlFor='description'>Deskripsi (Opsional)</Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value
                  }))
                }
                placeholder='Masukkan deskripsi dokumen'
                rows={3}
              />
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
                    ? 'Jatuhkan file PDF di sini'
                    : 'Drag & drop file PDF di sini'}
                </p>
                <p className='text-muted-foreground mt-1 text-sm'>
                  atau klik untuk memilih file
                </p>
                <p className='text-muted-foreground/70 mt-2 text-xs'>
                  Hanya mendukung: PDF (Maks: 50MB per file)
                </p>
              </div>
            </div>
          </div>

          {/* File Preview */}
          {uploadedFile && (
            <div className='bg-muted space-y-3 rounded-lg p-4'>
              <Label>File Terpilih</Label>
              <div className='bg-background flex items-center justify-between rounded border p-3'>
                <div className='flex items-center gap-3'>
                  <FileText className='h-8 w-8 text-red-500' />
                  <div className='text-sm'>
                    <p className='font-medium'>{uploadedFile.name}</p>
                    <p className='text-muted-foreground'>
                      {formatFileSize(uploadedFile.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={removeFile}
                  className='text-destructive hover:text-destructive'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className='flex justify-end gap-3'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Batal
            </Button>
            <Button
              type='submit'
              disabled={!uploadedFile || !formData.title.trim() || isUploading}
              className='button-primary'
            >
              {isUploading ? 'Menyimpan...' : 'Simpan Dokumen'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
