'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapSelector, Location } from '@/components/ui/map-selector';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function TestConfirmPage() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const handleLocationSelected = (location: Location) => {
    setSelectedLocation(location);
    console.log('Selected location:', location);
  };

  return (
    <div className='container mx-auto space-y-6 p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Test Map Selector</CardTitle>
          <CardDescription>
            Test halaman untuk komponen Map Selector
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button
            onClick={() => setIsMapOpen(true)}
            className='w-full md:w-auto'
          >
            Buka Map Selector
          </Button>

          {selectedLocation && (
            <div className='bg-muted/50 rounded-lg border p-4'>
              <h3 className='mb-2 font-semibold'>Lokasi yang Dipilih:</h3>
              <p className='text-sm'>
                <strong>Latitude:</strong> {selectedLocation.lat}
              </p>
              <p className='text-sm'>
                <strong>Longitude:</strong> {selectedLocation.lng}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <MapSelector
        open={isMapOpen}
        onOpenChange={setIsMapOpen}
        onLocationSelected={handleLocationSelected}
        initialLat={-6.2088}
        initialLng={106.8456}
      />
    </div>
  );
}
