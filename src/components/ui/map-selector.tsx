"use client"

import * as React from "react"
import { MapPin, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Import Leaflet CSS
import "leaflet/dist/leaflet.css"

export interface Location {
  lat: number
  lng: number
}

interface MapSelectorProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onLocationSelected?: (location: Location) => void
  initialLat?: number
  initialLng?: number
  className?: string
}

export function MapSelector({
  open = false,
  onOpenChange,
  onLocationSelected,
  initialLat = -6.2088,
  initialLng = 106.8456,
  className,
}: MapSelectorProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = React.useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(false)
  const [selectedLat, setSelectedLat] = React.useState(initialLat)
  const [selectedLng, setSelectedLng] = React.useState(initialLng)
  const [manualLat, setManualLat] = React.useState(initialLat.toString())
  const [manualLng, setManualLng] = React.useState(initialLng.toString())
  const [recentLocations, setRecentLocations] = React.useState<Location[]>([])

  // Leaflet map and marker references
  const mapRef = React.useRef<any>(null)
  const markerRef = React.useRef<any>(null)

  const isValidLocation = React.useMemo(() => {
    const lat = parseFloat(selectedLat.toString())
    const lng = parseFloat(selectedLng.toString())
    return !isNaN(lat) && lat >= -90 && lat <= 90 &&
            !isNaN(lng) && lng >= -180 && lng <= 180
  }, [selectedLat, selectedLng])

  const initMap = React.useCallback(async () => {
    if (!mapContainerRef.current) return

    try {
      // Dynamically import Leaflet
      const L = await import("leaflet")

      // Fix Leaflet marker icon issue with better fallback
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      // Clean up existing map if any
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }

      // Wait a bit for the container to be ready
      await new Promise(resolve => setTimeout(resolve, 100))

      mapRef.current = L.map(mapContainerRef.current, {
        center: [selectedLat, selectedLng],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      }).addTo(mapRef.current)

      markerRef.current = L.marker([selectedLat, selectedLng], {
        draggable: true,
        autoPan: true
      }).addTo(mapRef.current)

      // Direct click to update coordinates
      mapRef.current.on("click", (e: any) => {
        updateMarker(e.latlng.lat, e.latlng.lng)
      })

      // Marker drag events
      markerRef.current.on("dragend", (e: any) => {
        const marker = e.target
        const position = marker.getLatLng()
        updateMarker(position.lat, position.lng)
      })

      setMapLoaded(true)
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapLoaded(false)
    }
  }, [selectedLat, selectedLng])

  const updateMarker = React.useCallback((lat: number, lng: number) => {
    const newLat = parseFloat(lat.toFixed(6))
    const newLng = parseFloat(lng.toFixed(6))

    setSelectedLat(newLat)
    setSelectedLng(newLng)
    setManualLat(newLat.toString())
    setManualLng(newLng.toString())

    if (markerRef.current && mapRef.current) {
      markerRef.current.setLatLng([newLat, newLng])
      mapRef.current.panTo([newLat, newLng])
    }
  }, [])

  const getCurrentLocation = React.useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolokasi tidak didukung oleh browser ini.")
      return
    }

    setIsLoadingLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateMarker(position.coords.latitude, position.coords.longitude)
        setIsLoadingLocation(false)
      },
      (error) => {
        setIsLoadingLocation(false)
        let errorMessage = "Terjadi kesalahan saat mengambil lokasi."
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Izin lokasi ditolak. Silakan izinkan akses lokasi di pengaturan browser."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informasi lokasi tidak tersedia."
            break
          case error.TIMEOUT:
            errorMessage = "Waktu permintaan lokasi habis."
            break
        }
        
        alert(errorMessage)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }, [updateMarker])

  const updateFromManual = React.useCallback(() => {
    const lat = parseFloat(manualLat)
    const lng = parseFloat(manualLng)

    if (!isNaN(lat) && !isNaN(lng)) {
      updateMarker(lat, lng)
    }
  }, [manualLat, manualLng, updateMarker])

  const handleClose = React.useCallback(() => {
    // Clean up map when closing modal
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
      markerRef.current = null
    }
    setMapLoaded(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  const confirmSelection = React.useCallback(() => {
    if (!isValidLocation) {
      alert("Koordinat tidak valid!")
      return
    }

    const location: Location = {
      lat: selectedLat,
      lng: selectedLng,
    }

    // Save to recent locations
    setRecentLocations(prev => {
      const existingIndex = prev.findIndex(
        loc => Math.abs(loc.lat - location.lat) < 0.0001 && Math.abs(loc.lng - location.lng) < 0.0001
      )

      if (existingIndex === -1) {
        const newLocations = [location, ...prev]
        if (newLocations.length > 5) {
          newLocations.pop()
        }
        return newLocations
      }
      return prev
    })

    onLocationSelected?.(location)
    handleClose()
  }, [isValidLocation, selectedLat, selectedLng, onLocationSelected, handleClose])

  // Load recent locations from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem("mapSelector_recentLocations")
    if (saved) {
      try {
        setRecentLocations(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading recent locations:", error)
      }
    }
  }, [])

  // Save recent locations to localStorage
  React.useEffect(() => {
    localStorage.setItem("mapSelector_recentLocations", JSON.stringify(recentLocations))
  }, [recentLocations])

  // Initialize map when modal opens
  React.useEffect(() => {
    if (open) {
      setMapLoaded(false)
      // Give more time for the modal to fully render
      const timer = setTimeout(() => {
        initMap()
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [open, initMap])

  // Update marker when coordinates change
  React.useEffect(() => {
    if (mapRef.current && markerRef.current && mapLoaded) {
      markerRef.current.setLatLng([selectedLat, selectedLng])
      mapRef.current.panTo([selectedLat, selectedLng])
    }
  }, [selectedLat, selectedLng, mapLoaded])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={cn("max-w-5xl max-h-[90vh] p-6 rounded-xl shadow-2xl overflow-y-auto", className)}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Pilih Lokasi
          </DialogTitle>
          <DialogDescription>
            Klik pada peta untuk memilih lokasi atau masukkan koordinat secara manual
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <div
              ref={mapContainerRef}
              className="w-full h-96 rounded-xl border border-border bg-muted/20 shadow-inner"
              style={{ cursor: "crosshair" }}
            >
              {!mapLoaded && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Memuat peta...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">
                      Latitude
                    </Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      placeholder="-6.2088"
                      value={manualLat}
                      onChange={(e) => setManualLat(e.target.value)}
                      onBlur={updateFromManual}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">
                      Longitude
                    </Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      placeholder="106.8456"
                      value={manualLng}
                      onChange={(e) => setManualLng(e.target.value)}
                      onBlur={updateFromManual}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-between">
            <Button
              size="lg"
              variant="secondary"
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className="flex-1"
            >
              {!isLoadingLocation ? (
                <MapPin className="h-5 w-5 mr-2" />
              ) : (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              )}
              Lokasi Saya
            </Button>
            <div className="flex gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={handleClose}
              >
                Batal
              </Button>
              <Button
                size="lg"
                onClick={confirmSelection}
                disabled={!isValidLocation}
              >
                Pilih Lokasi
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 