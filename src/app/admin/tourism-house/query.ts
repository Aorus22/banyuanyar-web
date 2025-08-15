import { prisma } from '@/lib/prisma';

export async function getTourismHouses() {
  try {
    const houses = await prisma.tourismHouse.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return houses;
  } catch (error) {
    console.error('Error fetching tourism houses:', error);
    throw new Error('Failed to fetch tourism houses');
  }
}

export async function getTourismHouseById(id: number) {
  try {
    const house = await prisma.tourismHouse.findUnique({
      where: { id }
    });
    
    return house;
  } catch (error) {
    console.error('Error fetching tourism house:', error);
    throw new Error('Failed to fetch tourism house');
  }
} 