'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MinimalTiptapEditor } from '@/components/ui/custom/minimal-tiptap';
import { updateVillageProfile } from '../server-action';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import type { Content } from '@tiptap/react';

interface ObjectivesFormProps {
  initialValue: string;
  profileKey: string;
}

export function ObjectivesForm({ initialValue, profileKey }: ObjectivesFormProps) {
  const [content, setContent] = useState<Content>(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const contentText = typeof content === 'string' ? content : JSON.stringify(content);
    if (!contentText.trim()) {
      toast.error("Konten tidak boleh kosong");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateVillageProfile(profileKey, contentText);
      
      if (result.success) {
        toast.success("Tujuan & Sasaran desa berhasil diperbarui");
      } else {
        toast.error(result.error || "Gagal memperbarui tujuan & sasaran desa");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.flag className="h-5 w-5" />
          Edit Tujuan & Sasaran Desa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[400px] border rounded-lg">
          <MinimalTiptapEditor
            value={content}
            onChange={setContent}
            placeholder="Tulis tujuan dan sasaran pembangunan desa di sini..."
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button
            onClick={handleSave}
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
      </CardContent>
    </Card>
  );
} 