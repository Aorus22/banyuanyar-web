import { TourismHouseForm } from '../tourism-house-form';
import { createTourismHouse } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function CreateTourismHousePage() {
  return (
    <div className="space-y-6">
      <Heading
        title='Tambah Penginapan Baru'
        description='Buat penginapan atau homestay baru'
      />
      <Separator />
      
      <TourismHouseForm createTourismHouse={createTourismHouse} />
    </div>
  );
} 