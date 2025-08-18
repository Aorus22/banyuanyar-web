"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Image as ImageIcon } from "lucide-react"
import { DatePickerMonthYear } from "@/components/ui/custom/date-picker-month-year"
import { MediaManager } from "@/components/ui/custom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

const formSchema = z.object({
  title: z.string().min(1, "Judul event harus diisi"),
  description: z.string().optional(),
  date: z.string().min(1, "Tanggal event harus dipilih"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  organizer: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface EventFormProps {
  event?: {
    id: number
    title: string
    description: string | null
    date: Date
    startTime: string | null
    endTime: string | null
    location: string | null
    organizer: string | null
  }
  createEvent?: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
  updateEvent?: (id: number, formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
}

export function EventForm({ event, createEvent, updateEvent }: EventFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      date: event?.date ? event.date.toISOString().split('T')[0] : "",
      startTime: event?.startTime || "",
      endTime: event?.endTime || "",
      location: event?.location || "",
      organizer: event?.organizer || "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('description', values.description || '')
      formData.append('date', values.date)
      formData.append('startTime', values.startTime || '')
      formData.append('endTime', values.endTime || '')
      formData.append('location', values.location || '')
      formData.append('organizer', values.organizer || '')

      let result
      if (event && updateEvent) {
        result = await updateEvent(event.id, formData)
      } else if (createEvent) {
        result = await createEvent(formData)
      } else {
        throw new Error('Server action not provided')
      }

      if (result.success) {
        toast.success(event ? "Event berhasil diupdate" : "Event berhasil dibuat");
        router.push('/admin/event')
        router.refresh()
      } else {
        throw new Error(result.error || 'Failed to save event')
      }
    } catch (error) {
      console.error('Error saving event:', error)
      toast.error(event ? "Gagal update event" : "Gagal membuat event")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Event</CardTitle>
          <CardDescription>
            Isi detail event yang akan dibuat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Event *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan judul event"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Event *</FormLabel>
                      <FormControl>
                        <DatePickerMonthYear
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Pilih tanggal event"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Mulai</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="09:00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Selesai</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="17:00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan lokasi event"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penyelenggara</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama penyelenggara"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan deskripsi event"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {event ? 'Update Event' : 'Buat Event'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/event')}
                >
                  Batal
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Media Manager Section */}
      {event && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Media Event
            </CardTitle>
            <CardDescription>
              Upload dan kelola gambar untuk event ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MediaManager
              entityType="event"
              entityId={event.id}
              title={`Media untuk Event: ${event.title}`}
              description="Upload gambar untuk event ini. Gambar akan ditampilkan di halaman detail event."
              maxFiles={10}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}