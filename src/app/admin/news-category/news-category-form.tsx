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
  name: z.string().min(1, "Nama kategori harus diisi"),
  description: z.string().optional(),
  color: z.string().min(1, "Warna harus dipilih").regex(/^#[0-9A-F]{6}$/i, "Format warna harus #RRGGBB")
})

type FormValues = z.infer<typeof formSchema>

interface NewsCategoryFormProps {
  category?: {
    id: number
    name: string
    description: string | null
    color: string
  }
  createNewsCategory?: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
  updateNewsCategory?: (id: number, formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
}

export function NewsCategoryForm({ category, createNewsCategory, updateNewsCategory }: NewsCategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      color: category?.color || "#000000"
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('description', values.description || '')
      formData.append('color', values.color)

      let result
      if (category && updateNewsCategory) {
        result = await updateNewsCategory(category.id, formData)
      } else if (createNewsCategory) {
        result = await createNewsCategory(formData)
      } else {
        throw new Error('Server action not provided')
      }

      if (result.success) {
        toast.success(category ? "Kategori berhasil diupdate" : "Kategori berhasil dibuat");
        router.push('/admin/news-category')
        router.refresh()
      } else {
        throw new Error(result.error || 'Failed to save category')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error(category ? "Gagal update kategori" : "Gagal membuat kategori")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Kategori</CardTitle>
        <CardDescription>
          Isi detail kategori yang akan dibuat
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
                    <FormLabel>Nama Kategori *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama kategori"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warna *</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          {...field}
                          className="w-20 h-10 p-1"
                        />
                        <Input
                          placeholder="#000000"
                          {...field}
                          className="font-mono"
                        />
                      </div>
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
                      placeholder="Masukkan deskripsi kategori (opsional)"
                      rows={3}
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
                {category ? 'Update Kategori' : 'Buat Kategori'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/news-category')}
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