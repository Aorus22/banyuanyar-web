import { prisma } from '@/lib/prisma';

export async function getDocuments() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw new Error('Failed to fetch documents');
  }
}

export async function getDocumentById(id: number) {
  try {
    const document = await prisma.document.findUnique({
      where: { id }
    });
    
    return document;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw new Error('Failed to fetch document');
  }
}
