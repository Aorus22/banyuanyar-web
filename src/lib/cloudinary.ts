import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  url: process.env.CLOUDINARY_URL
});

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  size: number;
}

export interface UploadOptions {
  folder?: string;
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  };
  allowedFormats?: string[];
  maxFileSize?: number; // in bytes
}

export async function uploadImage(
  file: File | Buffer,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    // Validate file size
    if (
      options.maxFileSize &&
      file instanceof File &&
      file.size > options.maxFileSize
    ) {
      throw new Error(
        `File size exceeds maximum allowed size of ${options.maxFileSize} bytes`
      );
    }

    // Validate file format
    if (options.allowedFormats && file instanceof File) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !options.allowedFormats.includes(fileExtension)) {
        throw new Error(
          `File format not allowed. Allowed formats: ${options.allowedFormats.join(', ')}`
        );
      }
    }

    // Convert File to buffer if needed
    let buffer: Buffer;
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      buffer = file;
    }

    // Prepare upload parameters
    const uploadParams: any = {
      resource_type: 'image',
      folder: options.folder || 'banyuanyar'
    };

    // Add transformations if specified
    if (options.transformation) {
      uploadParams.transformation = [];

      if (options.transformation.width || options.transformation.height) {
        uploadParams.transformation.push({
          width: options.transformation.width,
          height: options.transformation.height,
          crop: options.transformation.crop || 'fill'
        });
      }

      if (options.transformation.quality) {
        uploadParams.transformation.push({
          quality: options.transformation.quality
        });
      }

      if (options.transformation.format) {
        uploadParams.transformation.push({
          format: options.transformation.format
        });
      }
    }

    // Upload to Cloudinary
    const result = await new Promise<UploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadParams,
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error('Upload failed - no result returned'));
            return;
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            size: result.bytes
          });
        }
      );

      uploadStream.end(buffer);
    });

    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error(
      `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function uploadMultipleImages(
  files: (File | Buffer)[],
  options: UploadOptions = {}
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadImage(file, options));
  return Promise.all(uploadPromises);
}

export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
}

export function getOptimizedImageUrl(
  publicId: string,
  transformation: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}
): string {
  const baseUrl = cloudinary.url(publicId, {
    transformation: [transformation],
    secure: true
  });

  return baseUrl;
}

export function isValidCloudinaryUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname.includes('cloudinary.com') ||
      urlObj.hostname.includes('res.cloudinary.com')
    );
  } catch {
    return false;
  }
}
