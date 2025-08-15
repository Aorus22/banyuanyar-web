import { notFound } from 'next/navigation';
import { getUmkmById } from '../../query';
import { updateUmkm } from './server-action';
import { UmkmForm } from '../../umkm-form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface EditUmkmPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUmkmPage({ params }: EditUmkmPageProps) {
  const { id: umkmId } = await params;
  const umkm = await getUmkmById(parseInt(umkmId));

  if (!umkm) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title="Edit UMKM"
        description={`Edit data UMKM: ${umkm.name}`}
      />
      <Separator />
      
      <UmkmForm umkm={umkm} updateUmkm={updateUmkm} />
    </div>
  );
} 