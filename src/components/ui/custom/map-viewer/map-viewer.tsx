'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import untuk Leaflet
const LeafletMap = dynamic(() => import('./leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Memuat peta...</p>
      </div>
    </div>
  )
})

interface UmkmLocation {
  id: number
  name: string
  address?: string | null
  latitude: number
  longitude: number
}

interface UmkmMapViewerProps {
  umkms: UmkmLocation[]
  height?: string
  className?: string
}

export function UmkmMapViewer({ umkms, height = "400px", className = "" }: UmkmMapViewerProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div 
        className={`bg-muted/30 flex items-center justify-center text-muted-foreground ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Memuat peta...</p>
        </div>
      </div>
    )
  }

  if (umkms.length === 0) {
    return (
      <div 
        className={`bg-muted/30 flex items-center justify-center text-muted-foreground ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p>Tidak ada lokasi UMKM yang tersedia</p>
        </div>
      </div>
    )
  }

  return (
    <LeafletMap 
      umkms={umkms}
      height={height}
      className={className}
    />
  )
} 