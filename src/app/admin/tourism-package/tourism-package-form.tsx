"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  name: z.string().min(1, "Nama paket harus diisi"),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.string().optional().refine((val) => !val || !isNaN(parseFloat(val)), {
    message: "Harga harus berupa angka yang valid"
  }),
  duration: z.string().optional(),
  maxParticipants: z.string().optional().refine((val) => !val || !isNaN(parseInt(val)), {
    message: "Maksimal peserta harus berupa angka yang valid"
  })
})

type FormValues = z.infer<typeof formSchema>

interface TourismPackageFormProps {
  package_?: {
    id: number
    name: string
    description: string | null
    price: number | null
    duration: string | null
    maxParticipants: number | null
    categoryId: number | null
  }
  categories: Array<{
    id: number
    name: string
  }>
  createTourismPackage?: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
  updateTourismPackage?: (id: number, formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
}

export function TourismPackageForm({ package_, categories, createTourismPackage, updateTourismPackage }: TourismPackageFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: package_?.name || "",
      description: package_?.description || "",
      categoryId: package_?.categoryId?.toString() || "",
      price: package_?.price !== null && package_?.price !== undefined ? package_?.price.toString() : "",
      duration: package_?.duration || "",
      maxParticipants: package_?.maxParticipants !== null && package_?.maxParticipants !== undefined ? package_?.maxParticipants.toString() : ""
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('description', values.description || '')
      formData.append('categoryId', values.categoryId || '')
      formData.append('price', values.price || '')
      formData.append('duration', values.duration || '')
      formData.append('maxParticipants', values.maxParticipants || '')

      let result
      if (package_ && updateTourismPackage) {
        result = await updateTourismPackage(package_.id, formData)
      } else if (createTourismPackage) {
        result = await createTourismPackage(formData)
      } else {
        throw new Error('Server action not provided')
      }

      if (result.success) {
        toast.success(package_ ? "Paket wisata berhasil diupdate" : "Paket wisata berhasil dibuat");
        router.push('/admin/tourism-package')
        router.refresh()
      } else {
        throw new Error(result.error || 'Failed to save package')
      }
    } catch (error) {
      console.error('Error saving package:', error)
      toast.error(package_ ? "Gagal update paket wisata" : "Gagal membuat paket wisata")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Paket Wisata</CardTitle>
        <CardDescription>
          Isi detail paket wisata yang akan dibuat
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
                    <FormLabel>Nama Paket *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama paket wisata"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan harga"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durasi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: 2 hari 1 malam"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maksimal Peserta</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Jumlah maksimal peserta"
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
                      placeholder="Masukkan deskripsi paket wisata"
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
                {package_ ? 'Update Paket' : 'Buat Paket'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/tourism-package')}
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