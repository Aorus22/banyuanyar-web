'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MinimalTiptapEditor } from '@/components/ui/custom/minimal-tiptap';
import { updateMultipleVillageProfiles } from '../server-action';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import type { Content } from '@tiptap/react';

interface DemographicsFormProps {
  demographicsData: string;
}

export function DemographicsForm({ demographicsData }: DemographicsFormProps) {
  const [demographicsContent, setDemographicsContent] =
    useState<Content>(demographicsData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const demographicsText =
      typeof demographicsContent === 'string'
        ? demographicsContent
        : JSON.stringify(demographicsContent);

    if (!demographicsText.trim()) {
      toast.error('Data demografi & geografis tidak boleh kosong');
      return;
    }

    setIsLoading(true);
    try {
      const updates = [{ key: 'demographics_data', value: demographicsText }];

      const result = await updateMultipleVillageProfiles(updates);

      if (result.success) {
        toast.success(
          'Informasi demografi & geografis desa berhasil diperbarui'
        );
      } else {
        toast.error(
          result.error ||
            'Gagal memperbarui informasi demografi & geografis desa'
        );
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menyimpan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Demographics Data Section */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Icons.map className='h-5 w-5' />
            Data Demografi & Geografis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='min-h-[400px] rounded-lg border'>
            <MinimalTiptapEditor
              value={demographicsContent}
              onChange={setDemographicsContent}
              placeholder='Tulis informasi demografi dan geografis desa di sini (lokasi geografis, batas wilayah, data klimatologi)...'
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className='flex justify-end'>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className='min-w-[120px]'
        >
          {isLoading ? (
            <>
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              Menyimpan...
            </>
          ) : (
            <>
              <Icons.check className='mr-2 h-4 w-4' />
              Simpan
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
