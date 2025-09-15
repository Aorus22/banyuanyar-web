'use client';

import { useState } from 'react';
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
import { createGalleryAction } from './server-action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CreateGalleryModalProps {
  children: React.ReactNode;
}

export function CreateGalleryModal({ children }: CreateGalleryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: ''
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Judul galeri wajib diisi');
      return;
    }

    setIsCreating(true);

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('eventDate', formData.eventDate);

      const result = await createGalleryAction(form);

      if (result.success) {
        toast.success('Galeri berhasil dibuat');
        setFormData({ title: '', description: '', eventDate: '' });
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || 'Gagal membuat galeri');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan yang tidak terduga');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Buat Galeri Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Judul Galeri *</Label>
            <Input
              id='title'
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder='Masukkan judul galeri'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Deskripsi</Label>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder='Masukkan deskripsi galeri (opsional)'
              rows={3}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='eventDate'>Tanggal Acara</Label>
            <Input
              id='eventDate'
              type='date'
              value={formData.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
            />
          </div>

          <div className='flex justify-end space-x-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setIsOpen(false)}
              disabled={isCreating}
            >
              Batal
            </Button>
            <Button
              type='submit'
              disabled={isCreating}
              className='min-w-[100px]'
            >
              {isCreating ? (
                <>
                  <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                  Membuat...
                </>
              ) : (
                'Buat Galeri'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
