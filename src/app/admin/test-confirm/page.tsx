"use client"

import { Button } from "@/components/ui/button"
import { confirmModal } from "@/components/ui"
import { toast } from "sonner"

export default function TestConfirmPage() {
  const handleTestConfirm = async () => {
    const result = await confirmModal(
      "Test Confirmation", 
      "Ini adalah test confirmation dialog. Apakah Anda ingin melanjutkan?"
    )
    
    if (result) {
      alert("Anda memilih Ya!")
    } else {
      alert("Anda memilih Batal!")
    }
  }

  const handleDeleteTest = async () => {
    if (!(await confirmModal("Apakah yakin ingin menghapus item ini?"))) {
      console.log("Delete dibatalkan")
      return
    }
    
    console.log("Item dihapus!")
    toast.success("Item berhasil dihapus!")
  }

  const handleTestToast = () => {
    toast.success("Ini adalah toast success!")
  }

  const handleTestToastError = () => {
    toast.error("Ini adalah toast error!")
  }

  const handleTestToastInfo = () => {
    toast.info("Ini adalah toast info!")
  }

  const handleTestToastWarning = () => {
    toast.warning("Ini adalah toast warning!")
  }

  const handleTestToastPromise = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Loading...',
        success: 'Berhasil!',
        error: 'Error!',
      }
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Test Confirmation Dialog</h1>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Confirmation Dialog Tests</h2>
          <div className="flex gap-2">
            <Button onClick={handleTestConfirm}>
              Test Confirmation Dialog
            </Button>
            
            <Button onClick={handleDeleteTest} variant="destructive">
              Test Delete Pattern
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Toast Tests</h2>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleTestToast} variant="default">
              Success Toast
            </Button>
            
            <Button onClick={handleTestToastError} variant="destructive">
              Error Toast
            </Button>
            
            <Button onClick={handleTestToastInfo} variant="secondary">
              Info Toast
            </Button>
            
            <Button onClick={handleTestToastWarning} variant="outline">
              Warning Toast
            </Button>
            
            <Button onClick={handleTestToastPromise} variant="ghost">
              Promise Toast
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 