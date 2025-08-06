"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DatePickerMonthYear,
  DatePickerWithTime,
  MultiSelect,
  Pagination,
  SearchableValueSelect,
  MapSelector,
  MapLocation,
} from "@/components/ui"
import { MapPin, Calendar, Clock, List, Search, FileText, Globe } from "lucide-react"

export default function ComponentsDemoPage() {
  const [selectedDate, setSelectedDate] = React.useState("")
  const [selectedDateTime, setSelectedDateTime] = React.useState("")
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedCity, setSelectedCity] = React.useState("")
  const [editorContent, setEditorContent] = React.useState("")
  const [isMapOpen, setIsMapOpen] = React.useState(false)
  const [selectedLocation, setSelectedLocation] = React.useState<MapLocation | null>(null)

  const multiSelectOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" },
  ]

  const cityOptions = [
    { label: "Jakarta", value: "jakarta" },
    { label: "Bandung", value: "bandung" },
    { label: "Surabaya", value: "surabaya" },
    { label: "Medan", value: "medan" },
    { label: "Semarang", value: "semarang" },
    { label: "Yogyakarta", value: "yogyakarta" },
    { label: "Palembang", value: "palembang" },
    { label: "Makassar", value: "makassar" },
  ]

  const handleLocationSelected = (location: MapLocation) => {
    setSelectedLocation(location)
    setIsMapOpen(false)
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">React Components Demo</h1>
        <p className="text-muted-foreground text-lg">
          Koleksi komponen React yang diadaptasi dari referensi Vue.js
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DatePickerMonthYear */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              DatePickerMonthYear
            </CardTitle>
            <CardDescription>
              Pemilih tanggal dengan selector bulan dan tahun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DatePickerMonthYear
              value={selectedDate}
              onValueChange={setSelectedDate}
              placeholder="Pilih tanggal"
            />
            <div className="text-sm text-muted-foreground">
              Selected: {selectedDate || "None"}
            </div>
          </CardContent>
        </Card>

        {/* DatePickerWithTime */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              DatePickerWithTime
            </CardTitle>
            <CardDescription>
              Pemilih tanggal dan waktu dengan selector jam dan menit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DatePickerWithTime
              value={selectedDateTime}
              onValueChange={setSelectedDateTime}
              placeholder="Pilih tanggal dan waktu"
            />
            <div className="text-sm text-muted-foreground">
              Selected: {selectedDateTime || "None"}
            </div>
          </CardContent>
        </Card>

        {/* MultiSelect */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              MultiSelect
            </CardTitle>
            <CardDescription>
              Multi-select dengan fitur pencarian dan animasi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MultiSelect
              options={multiSelectOptions}
              value={selectedItems}
              onValueChange={setSelectedItems}
              placeholder="Pilih teknologi"
              maxCount={3}
              animation={0.3}
            />
            <div className="text-sm text-muted-foreground">
              Selected: {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
            </div>
          </CardContent>
        </Card>

        {/* SearchableValueSelect */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              SearchableValueSelect
            </CardTitle>
            <CardDescription>
              Select dengan fitur pencarian dan virtual scrolling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchableValueSelect
              items={cityOptions}
              value={selectedCity}
              onValueChange={setSelectedCity}
              placeholder="Pilih kota"
            />
            <div className="text-sm text-muted-foreground">
              Selected: {selectedCity || "None"}
            </div>
          </CardContent>
        </Card>

        {/* MapSelector */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              MapSelector
            </CardTitle>
            <CardDescription>
              Pemilih lokasi dengan peta interaktif
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setIsMapOpen(true)}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Pilih Lokasi
            </Button>
            {selectedLocation && (
              <div className="text-sm text-muted-foreground">
                Selected: Lat {selectedLocation.lat.toFixed(6)}, Lng {selectedLocation.lng.toFixed(6)}
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
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pagination</CardTitle>
            <CardDescription>
              Komponen pagination yang diperbaiki dengan tema yang konsisten
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Pagination
              currentPage={currentPage}
              totalPages={20}
              onPageChange={setCurrentPage}
              maxVisiblePages={5}
              showFirstLast={true}
              showEllipsis={true}
            />
            <div className="text-sm text-muted-foreground text-center">
              Current Page: {currentPage} of 20
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Fitur Komponen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">🎨 Tema Konsisten</h3>
            <p>Semua komponen menggunakan sistem tema yang sama</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">📱 Responsive</h3>
            <p>Desain yang responsif untuk mobile dan desktop</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">♿ Accessible</h3>
            <p>Mendukung accessibility dengan ARIA attributes</p>
          </div>
        </div>
      </div>
    </div>
  )
} 