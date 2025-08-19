"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Package, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { updateTourismPackage } from './server-action'
import { MinimalTiptapEditor } from '@/components/ui/custom/minimal-tiptap'
import type { Editor } from '@tiptap/react'

interface TourismPackageData {
  id: number
  name: string
  description: string | null
  price: number | null
  duration: string | null
  isActive: boolean
  categoryId: number
}

interface TourismPackageEditFormProps {
  categoryId: number
  packageId: number
  initialData: TourismPackageData
}

export default function TourismPackageEditForm({ 
  categoryId, 
  packageId, 
  initialData 
}: TourismPackageEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const editorRef = useRef<Editor | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    isActive: true
  })

  // Initialize form with existing data
  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      description: initialData.description || '',
      price: initialData.price ? initialData.price.toString() : '',
      duration: initialData.duration || '',
      isActive: initialData.isActive
    })
  }, [initialData])

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (formData.description && editor.isEmpty) {
        editor.commands.setContent(formData.description)
      }
      editorRef.current = editor
    },
    [formData.description]
  )

  const handleEditorChange = (content: any) => {
    if (editorRef.current && editorRef.current.isEditable) {
      const html = editorRef.current.getHTML()
      setFormData(prev => ({
        ...prev,
        description: html
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateTourismPackage({
        id: packageId,
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        categoryId
      })

      if (result.success) {
        toast.success('Paket wisata berhasil diperbarui!')
        router.push(`/admin/tourism-category/${categoryId}`)
        router.refresh()
      } else {
        toast.error(`Gagal memperbarui paket wisata: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating tourism package:', error)
      toast.error('Gagal memperbarui paket wisata')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Paket Wisata *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Contoh: Paket Pelajar Half Day"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Paket</Label>
            <MinimalTiptapEditor
              value={formData.description}
              onChange={handleEditorChange}
              throttleDelay={0}
              className="w-full min-h-[300px]"
              output="html"
              placeholder="Jelaskan detail paket wisata, aktivitas yang termasuk, fasilitas, dll..."
              onCreate={handleCreate}
              autofocus={false}
              immediatelyRender={false}
              editable={true}
              injectCSS={true}
              editorClassName="focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Harga (Rp)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="150000"
                min="0"
                step="1000"
              />
              <p className="text-xs text-muted-foreground">
                Kosongkan jika harga sesuai permintaan
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durasi</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="Contoh: 4 jam, 1 hari"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="isActive">Paket aktif dan tersedia untuk pemesanan</Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button type="submit" disabled={isLoading} className="min-w-[120px]">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </form>
  )
} 