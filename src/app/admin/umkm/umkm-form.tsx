"use client"

import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { MinimalTiptapEditor } from '@/components/ui/custom/minimal-tiptap';
import { MapSelector, Location } from '@/components/ui/map-selector';
import { GoogleMapsViewer } from '@/components/ui/custom/google-maps-viewer';
import { MediaManager } from '@/components/ui/custom/media-manager/media-manager';
import { MapPin, Instagram, Facebook, Twitter, MessageCircle, Youtube } from 'lucide-react';
import type { Editor } from '@tiptap/react';

const formSchema = z.object({
  name: z.string().min(1, "Nama UMKM harus diisi"),
  ownerName: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

interface UmkmFormProps {
  umkm?: {
    id: number
    name: string
    ownerName: string | null
    description: string | null
    address: string | null
    phone: string | null
    email: string | null
    latitude: number | null
    longitude: number | null
    socialMedia: any
  }
  createUmkm?: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
  updateUmkm?: (id: number, formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
}

export function UmkmForm({ umkm, createUmkm, updateUmkm }: UmkmFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(umkm?.description || "");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    umkm?.latitude && umkm?.longitude 
      ? { lat: umkm.latitude, lng: umkm.longitude }
      : null
  );
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (description && editor.isEmpty) {
        editor.commands.setContent(description)
      }
      editorRef.current = editor
    },
    [description]
  )

  const handleEditorChange = (content: any) => {
    if (editorRef.current && editorRef.current.isEditable) {
      const html = editorRef.current.getHTML()
      setDescription(html)
    }
  }

  const handleLocationSelected = (location: Location) => {
    setSelectedLocation(location);
    setIsMapOpen(false);
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: umkm?.name || "",
      ownerName: umkm?.ownerName || "",
      description: umkm?.description || "",
      address: umkm?.address || "",
      phone: umkm?.phone || "",
      email: umkm?.email || "",
      instagram: umkm?.socialMedia?.instagram || "",
      facebook: umkm?.socialMedia?.facebook || "",
      twitter: umkm?.socialMedia?.twitter || "",
      tiktok: umkm?.socialMedia?.tiktok || "",
      youtube: umkm?.socialMedia?.youtube || ""
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      
      // Add all form data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value);
        }
      });
      
      // Add description from Tiptap editor
      if (description && description.trim() !== '') {
        formData.append('description', description);
      }

      // Add location coordinates
      if (selectedLocation) {
        formData.append('latitude', selectedLocation.lat.toString());
        formData.append('longitude', selectedLocation.lng.toString());
      }

      // Add social media as JSON
      const socialMedia: any = {};
      if (data.instagram) socialMedia.instagram = data.instagram;
      if (data.facebook) socialMedia.facebook = data.facebook;
      if (data.twitter) socialMedia.twitter = data.twitter;
      if (data.tiktok) socialMedia.tiktok = data.tiktok;
      if (data.youtube) socialMedia.youtube = data.youtube;
      
      if (Object.keys(socialMedia).length > 0) {
        formData.append('socialMedia', JSON.stringify(socialMedia));
      }

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
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Card 1: Informasi Dasar */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Dasar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <MinimalTiptapEditor
                value={description}
                onChange={handleEditorChange}
                className="w-full min-h-[200px]"
                output="html"
                placeholder="Masukkan deskripsi UMKM..."
                throttleDelay={0}
                immediatelyRender={false}
                editable={true}
                injectCSS={true}
                onCreate={handleCreate}
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Lokasi */}
        <Card>
          <CardHeader>
            <CardTitle>Lokasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                id="address"
                {...form.register("address")}
                placeholder="Masukkan alamat lengkap"
              />
            </div>

            <div className="space-y-2">
              <Label>Koordinat Lokasi</Label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsMapOpen(true)}
                className="w-auto flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                {selectedLocation 
                  ? `Lat: ${selectedLocation.lat.toFixed(6)}, Lng: ${selectedLocation.lng.toFixed(6)}`
                  : 'Pilih Lokasi di Peta'
                }
              </Button>
              {selectedLocation && (
                <p className="text-xs text-muted-foreground">
                  Koordinat: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Preview Lokasi</Label>
              <GoogleMapsViewer
                latitude={selectedLocation?.lat || null}
                longitude={selectedLocation?.lng || null}
                height="400px"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Media Sosial */}
        <Card>
          <CardHeader>
            <CardTitle>Media Sosial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Instagram className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="instagram" className="text-sm font-medium">Instagram</Label>
                  <Input
                    id="instagram"
                    {...form.register("instagram")}
                    placeholder="@username atau username"
                  />
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Facebook className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="facebook" className="text-sm font-medium">Facebook</Label>
                  <Input
                    id="facebook"
                    {...form.register("facebook")}
                    placeholder="Nama halaman Facebook"
                  />
                </div>
              </div>

              {/* Twitter/X */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                  <Twitter className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="twitter" className="text-sm font-medium">Twitter/X</Label>
                  <Input
                    id="twitter"
                    {...form.register("twitter")}
                    placeholder="@username"
                  />
                </div>
              </div>

              {/* TikTok */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="tiktok" className="text-sm font-medium">TikTok</Label>
                  <Input
                    id="tiktok"
                    {...form.register("tiktok")}
                    placeholder="@username"
                  />
                </div>
              </div>

              {/* YouTube */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white">
                  <Youtube className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="youtube" className="text-sm font-medium">YouTube</Label>
                  <Input
                    id="youtube"
                    {...form.register("youtube")}
                    placeholder="Nama channel YouTube"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Media Manager */}
        <Card>
          <CardHeader>
            <CardTitle>Media & Foto</CardTitle>
          </CardHeader>
          <CardContent>
            <MediaManager
              entityType="umkm"
              entityId={umkm?.id}
              title="Media untuk UMKM"
              description="Kelola gambar dan media untuk UMKM ini"
              maxFiles={10}
              acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']}
              maxFileSize={5}
            />
          </CardContent>
        </Card>

        {/* Card 5: Actions */}
        <Card>
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>
      </form>

      {/* Map Selector Modal */}
      <MapSelector
        open={isMapOpen}
        onOpenChange={setIsMapOpen}
        onLocationSelected={handleLocationSelected}
        initialLat={selectedLocation?.lat || -6.2088}
        initialLng={selectedLocation?.lng || 106.8456}
      />
    </div>
  );
} 