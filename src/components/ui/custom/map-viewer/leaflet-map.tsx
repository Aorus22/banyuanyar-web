'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

interface UmkmLocation {
  id: number;
  name: string;
  address?: string | null;
  latitude: number;
  longitude: number;
}

interface LeafletMapProps {
  umkms: UmkmLocation[];
  height?: string;
  className?: string;
}

export default function LeafletMap({
  umkms,
  height = '400px',
  className = ''
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || umkms.length === 0) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(
      [umkms[0].latitude, umkms[0].longitude],
      13
    );

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each UMKM
    umkms.forEach((umkm) => {
      const marker = L.marker([umkm.latitude, umkm.longitude]).addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg text-primary mb-2">${umkm.name}</h3>
            ${umkm.address ? `<p class="text-sm text-gray-600 mb-2">${umkm.address}</p>` : ''}
            <div class="text-xs text-gray-500">ID: ${umkm.id}</div>
          </div>
        `);
    });

    // Fit bounds to show all markers
    if (umkms.length > 1) {
      const group = new L.FeatureGroup(
        umkms.map((u) => L.marker([u.latitude, u.longitude]))
      );
      map.fitBounds(group.getBounds().pad(0.1));
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [umkms]);

  return <div ref={mapRef} className={className} style={{ height }} />;
}
