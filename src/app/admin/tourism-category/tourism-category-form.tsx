"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload, Image as ImageIcon } from "lucide-react"
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
import { MinimalTiptapEditor } from "@/components/ui/custom/minimal-tiptap"
import { MediaManager } from "@/components/ui/custom/media-manager"
import type { Editor } from "@tiptap/react"

const formSchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi"),
  description: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

interface TourismCategoryFormProps {
  category?: {
    id: number
    name: string
    description: string | null
  }
  createTourismCategory?: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
  updateTourismCategory?: (id: number, formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>
}

export function TourismCategoryForm({ category, createTourismCategory, updateTourismCategory }: TourismCategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<Array<{ id: number; fileUrl: string; fileName: string }>>([])
  const editorRef = useRef<Editor | null>(null)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || ""
    },
  })

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues("description") && editor.isEmpty) {
        const description = form.getValues("description")
        if (description) {
          editor.commands.setContent(description)
        }
      }
      editorRef.current = editor
    },
    [form]
  )

  const handleEditorChange = (content: any) => {
    if (editorRef.current && editorRef.current.isEditable) {
      const html = editorRef.current.getHTML()
      form.setValue("description", html)
    }
  }

  const handleMediaSelect = (media: Array<{ id: number; fileUrl: string; fileName: string }>) => {
    setSelectedMedia(media)
  }

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('description', values.description || '')
      
      // Add selected media IDs
      selectedMedia.forEach((media, index) => {
        formData.append(`mediaIds[${index}]`, media.id.toString())
      })

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
    <div className="space-y-6">
      {/* Basic Information */}
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Kategori</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        value={field.value}
                        onChange={handleEditorChange}
                        throttleDelay={0}
                        className="w-full min-h-[300px]"
                        output="html"
                        placeholder="Jelaskan detail kategori wisata ini..."
                        onCreate={handleCreate}
                        autofocus={false}
                        immediatelyRender={false}
                        editable={true}
                        injectCSS={true}
                        editorClassName="focus:outline-hidden"
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

      {/* Media Management */}
      <MediaManager
        entityType="tourism_category"
        entityId={category?.id || 0}
        title="Media Kategori"
        description="Pilih media untuk kategori wisata ini. Media akan ditampilkan di halaman landing."
        maxFiles={5}
        acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
        className="min-h-[200px]"
      />
    </div>
  )
} 