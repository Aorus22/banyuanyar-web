import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { HistoryForm } from './history-form';
import { getVillageProfileByKey } from '../query';

export default async function HistoryPage() {
  const historyProfile = await getVillageProfileByKey('history');

  return (
    <div className='space-y-6'>
      <Heading
        title='Sejarah Desa'
        description='Edit sejarah dan cerita rakyat desa Banyuanyar'
      />
      <Separator />

      <HistoryForm
        initialValue={historyProfile?.value || ''}
        profileKey='history'
      />
    </div>
  );
}
