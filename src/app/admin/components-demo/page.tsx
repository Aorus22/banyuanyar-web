'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DatePickerMonthYear,
  DatePickerWithTime,
  MultiSelect,
  Pagination,
  SearchableValueSelect,
  MapSelector,
  MapLocation
} from '@/components/ui';
import { ImagePreviewCarousel } from '@/components/ui/custom';
import {
  MapPin,
  Calendar,
  Clock,
  List,
  Search,
  FileText,
  Globe
} from 'lucide-react';

export default function ComponentsDemoPage() {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedDateTime, setSelectedDateTime] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCity, setSelectedCity] = React.useState('');
  const [editorContent, setEditorContent] = React.useState('');
  const [isMapOpen, setIsMapOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] =
    React.useState<MapLocation | null>(null);

  const multiSelectOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' }
  ];

  const cityOptions = [
    { label: 'Jakarta', value: 'jakarta' },
    { label: 'Bandung', value: 'bandung' },
    { label: 'Surabaya', value: 'surabaya' },
    { label: 'Medan', value: 'medan' },
    { label: 'Semarang', value: 'semarang' },
    { label: 'Yogyakarta', value: 'yogyakarta' },
    { label: 'Palembang', value: 'palembang' },
    { label: 'Makassar', value: 'makassar' }
  ];

  const handleLocationSelected = (location: MapLocation) => {
    setSelectedLocation(location);
    setIsMapOpen(false);
  };

  return (
    <div className='container mx-auto space-y-8 py-8'>
      <div className='space-y-4 text-center'>
        <h1 className='text-4xl font-bold'>React Components Demo</h1>
        <p className='text-muted-foreground text-lg'>
          Koleksi komponen React yang diadaptasi dari referensi Vue.js
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* DatePickerMonthYear */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Calendar className='h-5 w-5' />
              DatePickerMonthYear
            </CardTitle>
            <CardDescription>
              Pemilih tanggal dengan selector bulan dan tahun
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <DatePickerMonthYear
              value={selectedDate}
              onValueChange={setSelectedDate}
              placeholder='Pilih tanggal'
            />
            <div className='text-muted-foreground text-sm'>
              Selected: {selectedDate || 'None'}
            </div>
          </CardContent>
        </Card>

        {/* DatePickerWithTime */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='h-5 w-5' />
              DatePickerWithTime
            </CardTitle>
            <CardDescription>
              Pemilih tanggal dan waktu dengan selector jam dan menit
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <DatePickerWithTime
              value={selectedDateTime}
              onValueChange={setSelectedDateTime}
              placeholder='Pilih tanggal dan waktu'
            />
            <div className='text-muted-foreground text-sm'>
              Selected: {selectedDateTime || 'None'}
            </div>
          </CardContent>
        </Card>

        {/* MultiSelect */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <List className='h-5 w-5' />
              MultiSelect
            </CardTitle>
            <CardDescription>
              Multi-select dengan fitur pencarian dan animasi
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <MultiSelect
              options={multiSelectOptions}
              value={selectedItems}
              onValueChange={setSelectedItems}
              placeholder='Pilih teknologi'
              maxCount={3}
              animation={0.3}
            />
            <div className='text-muted-foreground text-sm'>
              Selected:{' '}
              {selectedItems.length > 0 ? selectedItems.join(', ') : 'None'}
            </div>
          </CardContent>
        </Card>

        {/* SearchableValueSelect */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Search className='h-5 w-5' />
              SearchableValueSelect
            </CardTitle>
            <CardDescription>
              Select dengan fitur pencarian dan virtual scrolling
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <SearchableValueSelect
              items={cityOptions}
              value={selectedCity}
              onValueChange={setSelectedCity}
              placeholder='Pilih kota'
            />
            <div className='text-muted-foreground text-sm'>
              Selected: {selectedCity || 'None'}
            </div>
          </CardContent>
        </Card>

        {/* MapSelector */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='h-5 w-5' />
              MapSelector
            </CardTitle>
            <CardDescription>
              Pemilih lokasi dengan peta interaktif
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Button
              onClick={() => setIsMapOpen(true)}
              className='flex items-center gap-2'
            >
              <MapPin className='h-4 w-4' />
              Pilih Lokasi
            </Button>
            {selectedLocation && (
              <div className='text-muted-foreground text-sm'>
                Selected: Lat {selectedLocation.lat.toFixed(6)}, Lng{' '}
                {selectedLocation.lng.toFixed(6)}
              </div>
            )}
            <MapSelector
              open={isMapOpen}
              onOpenChange={setIsMapOpen}
              onLocationSelected={handleLocationSelected}
            />
          </CardContent>
        </Card>

        {/* Pagination */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Pagination</CardTitle>
            <CardDescription>
              Komponen pagination yang diperbaiki dengan tema yang konsisten
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Pagination
              currentPage={currentPage}
              totalPages={20}
              onPageChange={setCurrentPage}
              maxVisiblePages={5}
              showFirstLast={true}
              showEllipsis={true}
            />
            <div className='text-muted-foreground text-center text-sm'>
              Current Page: {currentPage} of 20
            </div>
          </CardContent>
        </Card>

        {/* ImagePreviewCarousel */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <FileText className='h-5 w-5' />
              ImagePreviewCarousel
            </CardTitle>
            <CardDescription>
              Komponen carousel untuk preview gambar dengan fitur auto-slide dan
              thumbnail navigation
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <ImagePreviewCarousel
              images={[
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
              ]}
              autoPlay={true}
              interval={5000}
              thumbnailSize='md'
            />
            <div className='text-muted-foreground text-sm'>
              Fitur: Auto-slide setiap 5 detik, thumbnail navigation, play/pause
              control
            </div>

            {/* Demo dengan 1 gambar */}
            <div className='mt-6'>
              <h4 className='mb-3 text-sm font-medium'>
                Demo dengan 1 gambar (tidak ada carousel):
              </h4>
              <ImagePreviewCarousel
                images={[
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
                ]}
                autoPlay={true}
                interval={5000}
                thumbnailSize='md'
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className='space-y-4 text-center'>
        <h2 className='text-2xl font-semibold'>Fitur Komponen</h2>
        <div className='text-muted-foreground grid grid-cols-1 gap-4 text-sm md:grid-cols-3'>
          <div className='space-y-2'>
            <h3 className='text-foreground font-medium'>🎨 Tema Konsisten</h3>
            <p>Semua komponen menggunakan sistem tema yang sama</p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-foreground font-medium'>📱 Responsive</h3>
            <p>Desain yang responsif untuk mobile dan desktop</p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-foreground font-medium'>♿ Accessible</h3>
            <p>Mendukung accessibility dengan ARIA attributes</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Media Uploader Demo Link */}
      <div className='space-y-4 text-center'>
        <h2 className='text-2xl font-semibold'>Media Uploader Demo</h2>
        <p className='text-muted-foreground'>
          Lihat demo komponen media uploader universal untuk Cloudinary
        </p>
        <Button asChild>
          <a href='/admin/components-demo/media-uploader-demo'>
            Lihat Media Uploader Demo
          </a>
        </Button>
      </div>
    </div>
  );
}
