import { TourismHouseForm } from '../tourism-house-form';
import { createTourismHouse } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function CreateTourismHousePage() {
  return (
    <div className="space-y-6">
      <Heading
        title='Tambah Omah Wisata Baru'
        description='Buat omah wisata baru'
      />
      <Separator />
      
      <TourismHouseForm createTourismHouse={createTourismHouse} />
    </div>
  );
} 