import { prisma } from '@/lib/prisma';

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}

export async function getEventById(id: number) {
  try {
    const event = await prisma.event.findUnique({
      where: { id }
    });

    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw new Error('Failed to fetch event');
  }
}
