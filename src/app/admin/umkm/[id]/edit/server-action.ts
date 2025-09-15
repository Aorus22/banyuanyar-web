'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateUmkm(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const ownerName = formData.get('ownerName') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const latitude = formData.get('latitude') as string;
    const longitude = formData.get('longitude') as string;
    const socialMedia = formData.get('socialMedia') as string;

    const umkm = await prisma.umkm.update({
      where: { id },
      data: {
        name,
        ownerName: ownerName || null,
        description: description || null,
        address: address || null,
        phone: phone || null,
        email: email || null,
        latitude:
          latitude && !isNaN(parseFloat(latitude))
            ? parseFloat(latitude)
            : null,
        longitude:
          longitude && !isNaN(parseFloat(longitude))
            ? parseFloat(longitude)
            : null,
        socialMedia: socialMedia ? JSON.parse(socialMedia) : {}
      }
    });

    revalidatePath('/admin/umkm');
    revalidatePath(`/admin/umkm/${id}`);
    return { success: true, data: umkm };
  } catch (error) {
    console.error('Error updating UMKM:', error);
    return { success: false, error: 'Failed to update UMKM' };
  }
}
