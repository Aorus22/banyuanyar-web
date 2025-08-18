'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateGovernmentOfficial } from '../../server-action';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { GovernmentOfficial } from '../../columns';

interface GovernmentOfficialFormProps {
  initialData: GovernmentOfficial;
}

export function GovernmentOfficialForm({ initialData }: GovernmentOfficialFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photoUrl: '',
    bio: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      whatsapp: ''
    },
    sortOrder: 0
  });

  useEffect(() => {
    if (initialData) {
      const socialMedia = (initialData.socialMedia as any) || {};
      setFormData({
        name: initialData.name,
        position: initialData.position,
        photoUrl: initialData.photoUrl || '',
        bio: initialData.bio || '',
        socialMedia: {
          facebook: socialMedia.facebook || '',
          instagram: socialMedia.instagram || '',
          twitter: socialMedia.twitter || '',
          whatsapp: socialMedia.whatsapp || ''
        },
        sortOrder: initialData.sortOrder
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.position.trim()) {
      toast.error("Nama dan jabatan harus diisi");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateGovernmentOfficial(initialData.id, formData);
      
      if (result.success) {
        toast.success("Perangkat desa berhasil diperbarui");
        router.push('/admin/government-officials');
      } else {
        toast.error(result.error || "Gagal memperbarui perangkat desa");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.users className="h-5 w-5" />
            Informasi Dasar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Jabatan *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Masukkan jabatan"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photoUrl">URL Foto</Label>
            <Input
              id="photoUrl"
              value={formData.photoUrl}
              onChange={(e) => handleInputChange('photoUrl', e.target.value)}
              placeholder="https://example.com/photo.jpg"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografi</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tulis biografi singkat..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortOrder">Urutan</Label>
            <Input
              id="sortOrder"
              value={formData.sortOrder}
              onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
              placeholder="0"
              type="number"
              min="0"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.share className="h-5 w-5" />
            Media Sosial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={formData.socialMedia.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                placeholder="Username atau URL Facebook"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.socialMedia.instagram}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                placeholder="Username Instagram"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={formData.socialMedia.twitter}
                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                placeholder="Username Twitter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={formData.socialMedia.whatsapp}
                onChange={(e) => handleSocialMediaChange('whatsapp', e.target.value)}
                placeholder="Nomor WhatsApp"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Icons.check className="mr-2 h-4 w-4" />
              Simpan
            </>
          )}
        </Button>
      </div>
    </form>
  );
} 