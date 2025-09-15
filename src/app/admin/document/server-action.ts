'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { deleteDocumentFromGoogleDrive } from './upload-action';

export async function createDocument(data: {
  title: string;
  description?: string;
  fileUrl: string;
  filename: string;
  fileSize?: bigint;
  fileType?: string;
}) {
  try {
    const document = await prisma.document.create({
      data
    });

    revalidatePath('/admin/document');
    return { success: true, data: document };
  } catch (error) {
    console.error('Error creating document:', error);
    return { success: false, error: 'Failed to create document' };
  }
}

export async function deleteDocument(id: number) {
  try {
    // Get document info before deleting
    const document = await prisma.document.findUnique({
      where: { id }
    });

    if (!document) {
      return { success: false, error: 'Document not found' };
    }

    // Delete from database first
    await prisma.document.delete({
      where: { id }
    });

    // Try to delete from Google Drive (don't fail if this fails)
    try {
      await deleteDocumentFromGoogleDrive(document.filename);
    } catch (driveError) {
      console.warn('Failed to delete from Google Drive:', driveError);
      // Continue with success since database deletion succeeded
    }

    revalidatePath('/admin/document');
    return { success: true };
  } catch (error) {
    console.error('Error deleting document:', error);
    return { success: false, error: 'Failed to delete document' };
  }
}
