"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { DatePickerMonthYear } from "@/components/ui/date-picker-month-year"
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
  startDate: z.string().min(1, "Tanggal mulai harus dipilih"),
  endDate: z.string().optional(),
  location: z.string().optional(),
  organizer: z.string().optional(),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]).default("UPCOMING")
})

type FormValues = z.infer<typeof formSchema>

interface EventFormProps {
  event?: {
    id: number
    title: string
    description: string | null
    startDate: Date
    endDate: Date | null
    location: string | null
    organizer: string | null
    status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED"
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
      startDate: event?.startDate ? event.startDate.toISOString().split('T')[0] : "",
      endDate: event?.endDate ? event.endDate.toISOString().split('T')[0] : "",
      location: event?.location || "",
      organizer: event?.organizer || "",
      status: event?.status || "UPCOMING"
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('description', values.description || '')
      formData.append('startDate', values.startDate)
      formData.append('endDate', values.endDate || '')
      formData.append('location', values.location || '')
      formData.append('organizer', values.organizer || '')
      formData.append('status', values.status)

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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="UPCOMING">Mendatang</SelectItem>
                        <SelectItem value="ONGOING">Sedang Berlangsung</SelectItem>
                        <SelectItem value="COMPLETED">Selesai</SelectItem>
                        <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Mulai *</FormLabel>
                    <FormControl>
                      <DatePickerMonthYear
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Pilih tanggal mulai"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Selesai</FormLabel>
                    <FormControl>
                      <DatePickerMonthYear
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Pilih tanggal selesai"
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
  )
}