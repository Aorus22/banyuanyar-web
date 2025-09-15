'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createTourismHouse(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const location = formData.get('location') as string;
    const contactPerson = formData.get('contactPerson') as string;
    const contactPhone = formData.get('contactPhone') as string;

    const house = await prisma.tourismHouse.create({
      data: {
        name,
        description: description || null,
        category: category || null,
        location: location || null,
        contactPerson: contactPerson || null,
        contactPhone: contactPhone || null,
        isActive: true
      }
    });

    revalidatePath('/admin/tourism-house');
    return { success: true, data: house };
  } catch (error) {
    console.error('Error creating tourism house:', error);
    return { success: false, error: 'Failed to create tourism house' };
  }
}
