import { prisma } from '@/lib/prisma';

export async function getVillageProfileByKey(key: string) {
  try {
    const profile = await prisma.villageProfile.findUnique({
      where: { key }
    });
    return profile;
  } catch (error) {
    console.error('Error fetching village profile:', error);
    return null;
  }
}

export async function getVillageProfileByKeys(keys: string[]) {
  try {
    const profiles = await prisma.villageProfile.findMany({
      where: {
        key: { in: keys }
      }
    });
    return profiles;
  } catch (error) {
    console.error('Error fetching village profiles:', error);
    return [];
  }
}

export async function getAllVillageProfiles() {
  try {
    const profiles = await prisma.villageProfile.findMany({
      where: { isActive: true },
      orderBy: { key: 'asc' }
    });
    return profiles;
  } catch (error) {
    console.error('Error fetching all village profiles:', error);
    return [];
  }
}
