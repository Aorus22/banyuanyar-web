import { prisma } from '@/lib/prisma';

export async function getGovernmentOfficials() {
  try {
    const officials = await prisma.governmentOfficial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
    return officials;
  } catch (error) {
    console.error('Error fetching government officials:', error);
    return [];
  }
}

export async function getGovernmentOfficialById(id: number) {
  try {
    const official = await prisma.governmentOfficial.findUnique({
      where: { id }
    });
    return official;
  } catch (error) {
    console.error('Error fetching government official:', error);
    return null;
  }
} 