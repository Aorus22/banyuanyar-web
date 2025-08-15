import { EventForm } from '../../event-form';
import { notFound } from 'next/navigation';
import { getEventById } from '../../query';
import { updateEvent } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface EditEventPageProps {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const event = await getEventById(parseInt(params.id));

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title='Edit Event'
        description='Edit informasi event yang sudah ada'
      />
      <Separator />
      
      <EventForm event={event} updateEvent={updateEvent} />
    </div>
  );
} 