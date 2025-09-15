'use server';

import { uploadToGDrive, deleteFromGDrive } from '@/lib/gdrive-api';

export async function uploadDocumentToGoogleDrive(
  file: File,
  filename: string
) {
  return await uploadToGDrive(file, filename);
}

export async function deleteDocumentFromGoogleDrive(filename: string) {
  return await deleteFromGDrive(filename);
}
