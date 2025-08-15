"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
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
  name: z.string().min(1, "Nama penginapan harus diisi"),
  description: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

interface TourismHouseFormProps {
  house?: {
    id: number
    name: string
    description: string | null
    category: string | null
    location: string | null
    contactPerson: string | null
    contactPhone: string | null
  }
  createTourismHouse?: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
  updateTourismHouse?: (id: number, formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
}

export function TourismHouseForm({ house, createTourismHouse, updateTourismHouse }: TourismHouseFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: house?.name || "",
      description: house?.description || "",
      category: house?.category || "",
      location: house?.location || "",
      contactPerson: house?.contactPerson || "",
      contactPhone: house?.contactPhone || ""
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('description', values.description || '')
      formData.append('category', values.category || '')
      formData.append('location', values.location || '')
      formData.append('contactPerson', values.contactPerson || '')
      formData.append('contactPhone', values.contactPhone || '')

      let result
      if (house && updateTourismHouse) {
        result = await updateTourismHouse(house.id, formData)
      } else if (createTourismHouse) {
        result = await createTourismHouse(formData)
      } else {
        throw new Error('Server action not provided')
      }

      if (result.success) {
        toast.success(house ? "Penginapan berhasil diupdate" : "Penginapan berhasil dibuat");
        router.push('/admin/tourism-house')
        router.refresh()
      } else {
        throw new Error(result.error || 'Failed to save house')
      }
    } catch (error) {
      console.error('Error saving house:', error)
      toast.error(house ? "Gagal update penginapan" : "Gagal membuat penginapan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Penginapan</CardTitle>
        <CardDescription>
          Isi detail penginapan yang akan dibuat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Penginapan *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama penginapan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Homestay, Hotel, Villa"
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
                        placeholder="Masukkan lokasi penginapan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kontak Person</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama kontak person"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telepon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nomor telepon kontak"
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
                      placeholder="Masukkan deskripsi penginapan"
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
                {house ? 'Update Penginapan' : 'Buat Penginapan'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/tourism-house')}
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