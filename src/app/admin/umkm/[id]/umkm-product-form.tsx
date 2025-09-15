'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { MediaManager } from '@/components/ui/custom/media-manager/media-manager';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, 'Nama produk harus diisi'),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, 'Harga harus diisi')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Harga harus berupa angka yang valid dan lebih dari 0'
    }),
  unit: z.string().min(1, 'Satuan harus diisi'),
  isActive: z.boolean()
});

type FormValues = z.infer<typeof formSchema>;

interface UmkmProductFormProps {
  product?: {
    id: number;
    name: string;
    description: string | null;
    price: number;
    unit: string | null;
    isActive: boolean;
    umkmId: number;
  };
  umkmId: number;
  createProduct?: (
    umkmId: number,
    formData: FormData
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  updateProduct?: (
    id: number,
    formData: FormData
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
}

export function UmkmProductForm({
  product,
  umkmId,
  createProduct,
  updateProduct
}: UmkmProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price ? product.price.toString() : '',
      unit: product?.unit || '',
      isActive: product?.isActive ?? true
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, String(value));
        }
      });

      let result;
      if (product && updateProduct) {
        result = await updateProduct(product.id, formData);
      } else if (createProduct) {
        result = await createProduct(umkmId, formData);
      } else {
        throw new Error('No action provided');
      }

      if (result?.success) {
        toast.success(
          product ? 'Produk berhasil diperbarui' : 'Produk berhasil dibuat'
        );
        router.push(`/admin/umkm/${umkmId}`);
      } else {
        toast.error(result?.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>
            {product ? 'Edit Produk UMKM' : 'Tambah Produk Baru'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Nama Produk *</Label>
                <Input
                  id='name'
                  {...form.register('name')}
                  placeholder='Masukkan nama produk'
                />
                {form.formState.errors.name && (
                  <p className='text-destructive text-sm'>
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='price'>Harga *</Label>
                <Input
                  id='price'
                  type='number'
                  step='0.01'
                  {...form.register('price')}
                  placeholder='Masukkan harga'
                />
                {form.formState.errors.price && (
                  <p className='text-destructive text-sm'>
                    {form.formState.errors.price.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='unit'>Satuan *</Label>
                <Input
                  id='unit'
                  {...form.register('unit')}
                  placeholder='Contoh: kg, pcs, liter, dll'
                />
                {form.formState.errors.unit && (
                  <p className='text-destructive text-sm'>
                    {form.formState.errors.unit.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='isActive'>Status Aktif</Label>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='isActive'
                    checked={form.watch('isActive')}
                    onCheckedChange={(checked) =>
                      form.setValue('isActive', checked)
                    }
                  />
                  <Label htmlFor='isActive'>
                    {form.watch('isActive') ? 'Aktif' : 'Tidak Aktif'}
                  </Label>
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Deskripsi</Label>
              <Textarea
                id='description'
                {...form.register('description')}
                placeholder='Masukkan deskripsi produk'
                rows={3}
              />
            </div>

            <div className='flex justify-end space-x-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : product ? 'Update' : 'Simpan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Media Manager for Product */}
      {product && (
        <MediaManager
          entityType='umkm_product'
          entityId={product.id}
          title='Media untuk Produk'
          description='Kelola gambar dan media untuk produk ini'
          maxFiles={5}
          acceptedFileTypes={[
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'image/gif'
          ]}
          maxFileSize={5}
        />
      )}
    </div>
  );
}
