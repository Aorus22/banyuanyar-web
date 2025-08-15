import { TourismHouseForm } from '../../tourism-house-form';
import { notFound } from 'next/navigation';
import { getTourismHouseById } from '../../query';
import { updateTourismHouse } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface EditTourismHousePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTourismHousePage({ params }: EditTourismHousePageProps) {
  const { id } = await params;
  const house = await getTourismHouseById(parseInt(id));

  if (!house) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title='Edit Penginapan'
        description='Edit informasi penginapan yang sudah ada'
      />
      <Separator />
      
      <TourismHouseForm house={house} updateTourismHouse={updateTourismHouse} />
    </div>
  );
} 