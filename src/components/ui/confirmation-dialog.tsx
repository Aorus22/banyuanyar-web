"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmDialogState {
  isOpen: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialogContext = React.createContext<{
  state: ConfirmDialogState
  showConfirm: (title: string, description?: string) => Promise<boolean>
} | null>(null)

export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ConfirmDialogState>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
    onCancel: () => {},
  })

  const showConfirm = React.useCallback((title: string, description: string = "") => {
    return new Promise<boolean>((resolve) => {
      setState({
        isOpen: true,
        title,
        description,
        onConfirm: () => {
          setState(prev => ({ ...prev, isOpen: false }))
          resolve(true)
        },
        onCancel: () => {
          setState(prev => ({ ...prev, isOpen: false }))
          resolve(false)
        },
      })
    })
  }, [])

  return (
    <ConfirmDialogContext.Provider value={{ state, showConfirm }}>
      {children}
      <AlertDialog open={state.isOpen} onOpenChange={(open) => !open && state.onCancel()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{state.title}</AlertDialogTitle>
            {state.description && (
              <AlertDialogDescription>
                {state.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={state.onCancel}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={state.onConfirm}>
              Ya
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  )
}

export function useConfirmDialog() {
  const context = React.useContext(ConfirmDialogContext)
  if (!context) {
    throw new Error("useConfirmDialog must be used within a ConfirmDialogProvider")
  }
  return context.showConfirm
}

// Global instance for direct usage
let globalShowConfirm: ((title: string, description?: string) => Promise<boolean>) | null = null

export function setGlobalConfirmDialog(showConfirm: (title: string, description?: string) => Promise<boolean>) {
  globalShowConfirm = showConfirm
}

export function confirmModal(title: string, description?: string): Promise<boolean> {
  if (!globalShowConfirm) {
    throw new Error("confirmModal is not initialized. Please wrap your app with ConfirmDialogProvider and call setGlobalConfirmDialog")
  }
  return globalShowConfirm(title, description)
} 