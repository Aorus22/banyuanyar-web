'use server'

import { uploadImage } from '@/lib/cloudinary'

export async function uploadTiptapImage(formData: FormData) {
  try {
    const file = formData.get('file') as File
    
    if (!file) {
      return { error: 'No file provided' }
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { error: 'File must be an image' }
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return { error: 'File size must be less than 5MB' }
    }

    // Upload to Cloudinary with specific folder for TipTap images
    const result = await uploadImage(file, {
      folder: 'embed-tiptap',
      allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      maxFileSize: maxSize,
      transformation: {
        quality: 'auto',
        format: 'webp'
      }
    })

    return { 
      success: true, 
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height
    }
  } catch (error) {
    console.error('Error uploading TipTap image:', error)
    return { 
      error: error instanceof Error ? error.message : 'Failed to upload image' 
    }
  }
}
