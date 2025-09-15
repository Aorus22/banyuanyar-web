'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createEvent(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const startTime = formData.get('startTime') as string;
    const endTime = formData.get('endTime') as string;
    const location = formData.get('location') as string;
    const organizer = formData.get('organizer') as string;

    // Validate required fields
    if (!title || !date) {
      return { success: false, error: 'Title and date are required' };
    }

    const event = await prisma.event.create({
      data: {
        title,
        description: description || null,
        date: new Date(date),
        startTime: startTime || null,
        endTime: endTime || null,
        location: location || null,
        organizer: organizer || null
      }
    });

    revalidatePath('/admin/event');
    revalidatePath('/informasi/agenda-kegiatan');
    return { success: true, data: event };
  } catch (error) {
    console.error('Error creating event:', error);
    return { success: false, error: 'Failed to create event' };
  }
}
