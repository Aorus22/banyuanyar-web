"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, "Nama UMKM harus diisi"),
  ownerName: z.string().optional(),
  description: z.string().optional(),
  productType: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  latitude: z.string().optional().refine((val) => !val || !isNaN(parseFloat(val)), {
    message: "Latitude harus berupa angka yang valid"
  }),
  longitude: z.string().optional().refine((val) => !val || !isNaN(parseFloat(val)), {
    message: "Longitude harus berupa angka yang valid"
  })
})

type FormValues = z.infer<typeof formSchema>

interface UmkmFormProps {
  umkm?: {
    id: number
    name: string
    ownerName: string | null
    description: string | null
    productType: string | null
    address: string | null
    phone: string | null
    email: string | null
    latitude: number | null
    longitude: number | null
  }
  createUmkm?: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
  updateUmkm?: (id: number, formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
}

export function UmkmForm({ umkm, createUmkm, updateUmkm }: UmkmFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: umkm?.name || "",
      ownerName: umkm?.ownerName || "",
      description: umkm?.description || "",
      productType: umkm?.productType || "",
      address: umkm?.address || "",
      phone: umkm?.phone || "",
      email: umkm?.email || "",
      latitude: umkm?.latitude !== null && umkm?.latitude !== undefined ? umkm?.latitude.toString() : "",
      longitude: umkm?.longitude !== null && umkm?.longitude !== undefined ? umkm?.longitude.toString() : ""
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value);
        }
      });

      let result;
      if (umkm && updateUmkm) {
        result = await updateUmkm(umkm.id, formData);
      } else if (createUmkm) {
        result = await createUmkm(formData);
      } else {
        throw new Error('No action provided');
      }

      if (result?.success) {
        toast.success(umkm ? 'UMKM berhasil diperbarui' : 'UMKM berhasil dibuat');
        router.push('/admin/umkm');
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
    <Card>
      <CardHeader>
        <CardTitle>{umkm ? 'Edit UMKM' : 'Tambah UMKM Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama UMKM *</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Masukkan nama UMKM"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerName">Nama Pemilik</Label>
              <Input
                id="ownerName"
                {...form.register("ownerName")}
                placeholder="Masukkan nama pemilik"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productType">Jenis Produk</Label>
              <Input
                id="productType"
                {...form.register("productType")}
                placeholder="Contoh: Makanan, Kerajinan, dll"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                {...form.register("phone")}
                placeholder="Masukkan nomor telepon"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="Masukkan email"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                {...form.register("latitude")}
                placeholder="Contoh: -6.2088"
              />
              {form.formState.errors.latitude && (
                <p className="text-sm text-destructive">{form.formState.errors.latitude.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                {...form.register("longitude")}
                placeholder="Contoh: 106.8456"
              />
              {form.formState.errors.longitude && (
                <p className="text-sm text-destructive">{form.formState.errors.longitude.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Masukkan deskripsi UMKM"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              id="address"
              {...form.register("address")}
              placeholder="Masukkan alamat lengkap"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : (umkm ? 'Update' : 'Simpan')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 