// Helper function to extract YouTube video ID
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

// Helper function to validate PDF URL
export function isValidPdfUrl(url: string): boolean {
  if (!url) return false
  
  try {
    const urlObj = new URL(url)
    return urlObj.pathname.toLowerCase().endsWith('.pdf') || 
           urlObj.searchParams.get('type') === 'pdf' ||
           url.includes('pdf')
  } catch {
    return false
  }
}

// Helper function to get file extension from URL
export function getFileExtension(url: string): string | null {
  if (!url) return null
  
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const extension = pathname.split('.').pop()?.toLowerCase()
    return extension || null
  } catch {
    return null
  }
} 