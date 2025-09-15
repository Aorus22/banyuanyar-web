import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { GovernmentOfficialForm } from './government-official-form';

export default function CreateGovernmentOfficialPage() {
  return (
    <div className='space-y-6'>
      <Heading
        title='Tambah Perangkat Desa'
        description='Tambah data perangkat desa baru'
      />
      <Separator />

      <GovernmentOfficialForm />
    </div>
  );
}
