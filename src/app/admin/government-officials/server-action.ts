'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createGovernmentOfficial(data: {
  name: string;
  position: string;
  photoUrl?: string;
  bio?: string;
  socialMedia?: any;
  sortOrder?: number;
}) {
  try {
    const official = await prisma.governmentOfficial.create({
      data: {
        ...data,
        sortOrder: data.sortOrder || 0
      }
    });

    revalidatePath('/admin/government-officials');
    return { success: true, data: official };
  } catch (error) {
    console.error('Error creating government official:', error);
    return { success: false, error: 'Failed to create government official' };
  }
}

export async function updateGovernmentOfficial(id: number, data: {
  name: string;
  position: string;
  photoUrl?: string;
  bio?: string;
  socialMedia?: any;
  sortOrder?: number;
}) {
  try {
    const official = await prisma.governmentOfficial.update({
      where: { id },
      data: {
        ...data,
        sortOrder: data.sortOrder || 0
      }
    });

    revalidatePath('/admin/government-officials');
    return { success: true, data: official };
  } catch (error) {
    console.error('Error updating government official:', error);
    return { success: false, error: 'Failed to update government official' };
  }
}

export async function deleteGovernmentOfficial(id: number) {
  try {
    await prisma.governmentOfficial.update({
      where: { id },
      data: { isActive: false }
    });

    revalidatePath('/admin/government-officials');
    return { success: true };
  } catch (error) {
    console.error('Error deleting government official:', error);
    return { success: false, error: 'Failed to delete government official' };
  }
}

export async function toggleGovernmentOfficialStatus(id: number) {
  try {
    const official = await prisma.governmentOfficial.findUnique({
      where: { id }
    });

    if (!official) {
      return { success: false, error: 'Government official not found' };
    }

    const updatedOfficial = await prisma.governmentOfficial.update({
      where: { id },
      data: { isActive: !official.isActive }
    });

    revalidatePath('/admin/government-officials');
    return { success: true, data: updatedOfficial };
  } catch (error) {
    console.error('Error toggling government official status:', error);
    return { success: false, error: 'Failed to toggle status' };
  }
} 