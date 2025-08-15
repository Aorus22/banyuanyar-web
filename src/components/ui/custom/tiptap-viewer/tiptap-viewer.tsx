"use client"

import { EditorContent } from '@tiptap/react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useMinimalTiptapEditor } from '@/components/ui/custom/minimal-tiptap/hooks/use-minimal-tiptap'
import { MeasuredContainer } from '@/components/ui/custom/minimal-tiptap/components/measured-container'
import './tiptap-viewer.css'

interface TiptapViewerProps {
  content: string
  className?: string
}

export function TiptapViewer({ content, className }: TiptapViewerProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useMinimalTiptapEditor({
    value: content,
    editable: false, // Make it read-only
    immediatelyRender: false, // Fix SSR hydration issues
    onUpdate: () => {},
  })

  // Update content when it changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // Use queueMicrotask to avoid React rendering conflicts
      queueMicrotask(() => {
        editor.commands.setContent(content)
      })
    }
  }, [editor, content])

  // Don't render until client-side
  if (!isMounted) {
    return (
      <div className={cn("tiptap-viewer", className)}>
        <div className="min-h-[100px] focus:outline-none prose prose-sm max-w-none p-4">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div className="text-muted-foreground">No content to display</div>
          )}
        </div>
      </div>
    )
  }

  if (!editor) {
    return (
      <div className={cn("tiptap-viewer", className)}>
        <div className="min-h-[100px] focus:outline-none prose prose-sm max-w-none p-4">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <MeasuredContainer
      as="div"
      name="viewer"
      className={cn(
        "border-input min-data-[orientation=vertical]:h-72 flex h-auto w-full flex-col rounded-md border shadow-xs",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        className
      )}
    >
      <EditorContent
        editor={editor}
        className="minimal-tiptap-editor p-4 min-h-[100px] focus:outline-none"
      />
    </MeasuredContainer>
  )
} 