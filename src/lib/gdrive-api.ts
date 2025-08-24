const GOOGLE_DRIVE_WORKER_URL = process.env.GOOGLE_DRIVE_WORKER_URL;

export interface GDriveUploadResult {
  success: boolean;
  data?: {
    url: string;
    publicId: string;
    format: string;
    size: number;
  };
  error?: string;
}

export interface GDriveDeleteResult {
  success: boolean;
  error?: string;
}

export async function uploadToGDrive(file: File, filename: string): Promise<GDriveUploadResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uniqueFilename = await generateUniqueFilename(filename);

    const response = await fetch(`${GOOGLE_DRIVE_WORKER_URL}/documents/${uniqueFilename}`, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: new Uint8Array(buffer)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return {
      success: true,
      data: {
        url: `${GOOGLE_DRIVE_WORKER_URL}/documents/${uniqueFilename}`,
        publicId: uniqueFilename,
        format: file.type,
        size: file.size,
      }
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    return {
      success: false,
      error: `Failed to upload: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function deleteFromGDrive(filename: string): Promise<GDriveDeleteResult> {
  try {
    const response = await fetch(`${GOOGLE_DRIVE_WORKER_URL}/documents/${filename}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Delete failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting from Google Drive:', error);
    return {
      success: false,
      error: `Failed to delete: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function getFileInfo(filename: string): Promise<GDriveUploadResult> {
  try {
    const response = await fetch(`${GOOGLE_DRIVE_WORKER_URL}/documents/${filename}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Get failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return {
      success: true,
      data: {
        url: `${GOOGLE_DRIVE_WORKER_URL}/documents/${filename}`,
        publicId: filename,
        format: 'application/pdf',
        size: 0,
      }
    };
  } catch (error) {
    console.error('Error getting file info from Google Drive:', error);
    return {
      success: false,
      error: `Failed to get file info: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function generateUniqueFilename(originalFilename: string): Promise<string> {
  const lastDotIndex = originalFilename.lastIndexOf('.');
  const extension = lastDotIndex !== -1 ? originalFilename.slice(lastDotIndex) : '';
  const nameWithoutExt = lastDotIndex !== -1 ? originalFilename.slice(0, lastDotIndex) : originalFilename;
  
  // Clean filename: remove special characters, replace spaces with hyphens
  const cleanName = nameWithoutExt
    .replace(/[^a-zA-Z0-9\s\-_]/g, '') // Remove special characters except spaces, hyphens, underscores
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  const timestamp = Date.now();
  let uniqueFilename = `${cleanName}_${timestamp}${extension}`;
  
  try {
    const response = await fetch(`${GOOGLE_DRIVE_WORKER_URL}/documents/${uniqueFilename}`, {
      method: 'HEAD'
    });
    
    if (response.ok) {
      let counter = 1;
        do {
          uniqueFilename = `${cleanName}_${counter}${extension}`;
          const checkResponse = await fetch(`${GOOGLE_DRIVE_WORKER_URL}/documents/${uniqueFilename}`, {
          method: 'HEAD'
        });
        if (!checkResponse.ok) break;
        counter++;
      } while (counter < 1000);
    }
  } catch (error) {
    console.warn('Could not check filename uniqueness, using timestamp:', error);
  }
  
  return uniqueFilename;
}
