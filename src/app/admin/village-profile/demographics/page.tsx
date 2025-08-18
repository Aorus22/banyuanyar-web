import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DemographicsForm } from './demographics-form';
import { getVillageProfileByKeys } from '../query';

export default async function DemographicsPage() {
  const profiles = await getVillageProfileByKeys([
    'demographics_data'
  ]);

  const demographicsData = profiles.find(p => p.key === 'demographics_data')?.value || '';

  return (
    <div className="space-y-6">
      <Heading
        title="Demografi & Geografis Desa"
        description="Edit informasi demografi dan geografis desa Banyuanyar"
      />
      <Separator />
      
      <DemographicsForm 
        demographicsData={demographicsData}
      />
    </div>
  );
} 