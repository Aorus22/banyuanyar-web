import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { GovernmentOfficialForm } from './government-official-form';
import { getGovernmentOfficialById } from '../../query';
import { GovernmentOfficial } from '../../columns';

interface EditGovernmentOfficialPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditGovernmentOfficialPage({ params }: EditGovernmentOfficialPageProps) {
  const { id } = await params;
  const official = await getGovernmentOfficialById(parseInt(id));

  if (!official) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title="Edit Perangkat Desa"
        description={`Edit data ${official.name}`}
      />
      <Separator />
      
      <GovernmentOfficialForm initialData={official} />
    </div>
  );
} 