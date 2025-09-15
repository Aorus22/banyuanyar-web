'use client';

import { useEffect, useState } from 'react';

interface GoogleMapsViewerProps {
  latitude: number | null;
  longitude: number | null;
  className?: string;
  height?: string;
  zoom?: number;
}

export function GoogleMapsViewer({
  latitude,
  longitude,
  className = '',
  height = '300px',
  zoom = 15
}: GoogleMapsViewerProps) {
  const [mapUrl, setMapUrl] = useState<string>('');

  useEffect(() => {
    if (latitude && longitude) {
      const url = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=eng&z=${zoom}&output=embed&markers=color:red|label:📍|${latitude},${longitude}`;
      setMapUrl(url);
    }
  }, [latitude, longitude, zoom]);

  if (!latitude || !longitude || !mapUrl) {
    return (
      <div
        className={`bg-muted/50 border-muted-foreground/30 text-muted-foreground flex items-center justify-center rounded-lg border-2 border-dashed ${className}`}
        style={{ height }}
      >
        <div className='text-center'>
          <div className='mb-2 text-4xl'>🗺️</div>
          <p className='text-sm'>Pilih lokasi di peta untuk melihat preview</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border ${className}`}
      style={{ height }}
    >
      <iframe
        src={mapUrl}
        width='100%'
        height='100%'
        style={{ border: 0 }}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        title='Google Maps Location'
      />
    </div>
  );
}
