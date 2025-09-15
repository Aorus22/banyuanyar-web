import { EventForm } from '../event-form';
import { createEvent } from './server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function CreateEventPage() {
  return (
    <div className='space-y-6'>
      <Heading
        title='Tambah Event Baru'
        description='Buat event dan kegiatan baru untuk desa'
      />
      <Separator />

      <EventForm createEvent={createEvent} />
    </div>
  );
}
