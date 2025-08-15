"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  name: z.string().min(1, "Nama kategori harus diisi")
})

type FormValues = z.infer<typeof formSchema>

interface TourismCategoryFormProps {
  category?: {
    id: number
    name: string
  }
  createTourismCategory?: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
  updateTourismCategory?: (id: number, formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
}

export function TourismCategoryForm({ category, createTourismCategory, updateTourismCategory }: TourismCategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || ""
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', values.name)

      let result
      if (category && updateTourismCategory) {
        result = await updateTourismCategory(category.id, formData)
      } else if (createTourismCategory) {
        result = await createTourismCategory(formData)
      } else {
        throw new Error('Server action not provided')
      }

      if (result.success) {
        toast.success(category ? "Kategori berhasil diupdate" : "Kategori berhasil dibuat");
        router.push('/admin/tourism-category')
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
        <CardTitle>Informasi Kategori Wisata</CardTitle>
        <CardDescription>
          Isi detail kategori yang akan dibuat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {category ? 'Update Kategori' : 'Buat Kategori'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/tourism-category')}
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