import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { VisionMissionForm } from './vision-mission-form';
import { getVillageProfileByKeys } from '../query';

export default async function VisionMissionPage() {
  const profiles = await getVillageProfileByKeys(['vision', 'mission_1', 'mission_2', 'mission_3', 'mission_4', 'mission_5', 'mission_6', 'mission_7', 'mission_8', 'mission_9', 'mission_10', 'mission_11']);

  const vision = profiles.find(p => p.key === 'vision')?.value || '';
  const missions = profiles
    .filter(p => p.key.startsWith('mission_'))
    .sort((a, b) => {
      const aNum = parseInt(a.key.split('_')[1]);
      const bNum = parseInt(b.key.split('_')[1]);
      return aNum - bNum;
    })
    .map(p => p.value || '');

  return (
    <div className="space-y-6">
      <Heading
        title="Visi & Misi Desa"
        description="Edit visi dan misi pembangunan desa Banyuanyar"
      />
      <Separator />
      
      <VisionMissionForm 
        vision={vision}
        missions={missions}
      />
    </div>
  );
} 