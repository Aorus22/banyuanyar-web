'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateVillageProfile(key: string, value: string) {
  try {
    const profile = await prisma.villageProfile.update({
      where: { key },
      data: { 
        value,
        updatedAt: new Date()
      }
    });

    revalidatePath('/admin/village-profile');
    revalidatePath(`/admin/village-profile/${key}`);
    
    return { success: true, data: profile };
  } catch (error) {
    console.error('Error updating village profile:', error);
    return { success: false, error: 'Failed to update village profile' };
  }
}

export async function updateMultipleVillageProfiles(updates: { key: string; value: string }[]) {
  try {
    const results = await Promise.all(
      updates.map(update => 
        prisma.villageProfile.update({
          where: { key: update.key },
          data: { 
            value: update.value,
            updatedAt: new Date()
          }
        })
      )
    );

    revalidatePath('/admin/village-profile');
    
    return { success: true, data: results };
  } catch (error) {
    console.error('Error updating multiple village profiles:', error);
    return { success: false, error: 'Failed to update village profiles' };
  }
} 