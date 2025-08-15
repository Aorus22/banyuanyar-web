import { UmkmForm } from '../umkm-form';
import { createUmkm } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function CreateUmkmPage() {
  return (
    <div className="space-y-6">
      <Heading
        title="Tambah UMKM"
        description="Buat data UMKM baru"
      />
      <Separator />
      
      <UmkmForm createUmkm={createUmkm} />
    </div>
  );
} 