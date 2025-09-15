import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ObjectivesForm } from './objectives-form';
import { getVillageProfileByKey } from '../query';

export default async function ObjectivesPage() {
  const objectivesProfile = await getVillageProfileByKey('objectives');

  return (
    <div className='space-y-6'>
      <Heading
        title='Tujuan & Sasaran Desa'
        description='Edit tujuan dan sasaran pembangunan desa Banyuanyar'
      />
      <Separator />

      <ObjectivesForm
        initialValue={objectivesProfile?.value || ''}
        profileKey='objectives'
      />
    </div>
  );
}
