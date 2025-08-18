'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { updateMultipleVillageProfiles } from '../server-action';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';

interface VisionMissionFormProps {
  vision: string;
  missions: string[];
}

export function VisionMissionForm({ vision, missions }: VisionMissionFormProps) {
  const [visionContent, setVisionContent] = useState<string>(vision);
  const [missionContents, setMissionContents] = useState<string[]>(missions);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!visionContent.trim()) {
      toast.error("Visi tidak boleh kosong");
      return;
    }

    setIsLoading(true);
    try {
      const updates = [
        { key: 'vision', value: visionContent },
        ...missionContents.map((content, index) => ({
          key: `mission_${index + 1}`,
          value: content
        }))
      ];

      const result = await updateMultipleVillageProfiles(updates);
      
      if (result.success) {
        toast.success("Visi & Misi desa berhasil diperbarui");
      } else {
        toast.error(result.error || "Gagal memperbarui visi & misi desa");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan");
    } finally {
      setIsLoading(false);
    }
  };

  const addMission = () => {
    setMissionContents([...missionContents, '']);
  };

  const removeMission = (index: number) => {
    if (missionContents.length > 1) {
      const newMissions = missionContents.filter((_, i) => i !== index);
      setMissionContents(newMissions);
    }
  };

  const updateMission = (index: number, value: string) => {
    const newMissions = [...missionContents];
    newMissions[index] = value;
    setMissionContents(newMissions);
  };

  return (
    <div className="space-y-6">
      {/* Vision Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.target className="h-5 w-5" />
            Visi Desa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={visionContent}
            onChange={(e) => setVisionContent(e.target.value)}
            placeholder="Tulis visi desa di sini..."
            className="min-h-[200px] resize-none"
          />
        </CardContent>
      </Card>

      {/* Missions Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icons.target className="h-5 w-5" />
              Misi Desa
            </CardTitle>
            <Button
              onClick={addMission}
              variant="outline"
              size="sm"
            >
              <Icons.add className="mr-2 h-4 w-4" />
              Tambah Misi
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {missionContents.map((mission, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Misi {index + 1}</label>
                {missionContents.length > 1 && (
                  <Button
                    onClick={() => removeMission(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Icons.trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Textarea
                value={mission}
                onChange={(e) => updateMission(index, e.target.value)}
                placeholder={`Tulis misi ${index + 1} di sini...`}
                className="min-h-[150px] resize-none"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
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
    </div>
  );
} 