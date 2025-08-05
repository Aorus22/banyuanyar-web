"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface WYSIFormProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  minHeight?: string
  maxHeight?: string
}

export function WYSIForm({
  value = "",
  onValueChange,
  placeholder = "Masukkan teks disini ...",
  className,
  disabled = false,
  readOnly = false,
  minHeight = "10rem",
  maxHeight = "150px",
}: WYSIFormProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = React.useState(false)

  const handleInput = React.useCallback((e: React.FormEvent<HTMLDivElement>) => {
    if (!disabled && !readOnly) {
      const content = e.currentTarget.innerHTML
      onValueChange?.(content)
    }
  }, [disabled, readOnly, onValueChange])

  const handleFocus = React.useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = React.useCallback(() => {
    setIsFocused(false)
  }, [])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled || readOnly) {
      e.preventDefault()
      return
    }

    // Handle basic formatting shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault()
          document.execCommand("bold", false)
          break
        case "i":
          e.preventDefault()
          document.execCommand("italic", false)
          break
        case "u":
          e.preventDefault()
          document.execCommand("underline", false)
          break
      }
    }
  }, [disabled, readOnly])

  // Update content when value prop changes
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  return (
    <div className={cn("wysiwyg-editor border border-foreground/20 rounded-md", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-foreground/10 bg-background/50">
        <button
          type="button"
          className="p-1 rounded hover:bg-accent disabled:opacity-50"
          disabled={disabled || readOnly}
          onClick={() => document.execCommand("bold", false)}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="p-1 rounded hover:bg-accent disabled:opacity-50"
          disabled={disabled || readOnly}
          onClick={() => document.execCommand("italic", false)}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className="p-1 rounded hover:bg-accent disabled:opacity-50"
          disabled={disabled || readOnly}
          onClick={() => document.execCommand("underline", false)}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button
          type="button"
          className="p-1 rounded hover:bg-accent disabled:opacity-50"
          disabled={disabled || readOnly}
          onClick={() => document.execCommand("insertUnorderedList", false)}
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          className="p-1 rounded hover:bg-accent disabled:opacity-50"
          disabled={disabled || readOnly}
          onClick={() => document.execCommand("insertOrderedList", false)}
          title="Numbered List"
        >
          1.
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        className={cn(
          "p-3 outline-none text-sm leading-relaxed",
          "min-h-[8rem] max-h-[12rem] overflow-y-auto",
          "focus:ring-0 focus:border-0",
          {
            "opacity-50 cursor-not-allowed": disabled,
            "cursor-text": !disabled && !readOnly,
          }
        )}
        contentEditable={!disabled && !readOnly}
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Rich text editor"
        data-placeholder={placeholder}
        style={{
          minHeight,
          maxHeight,
        }}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {/* Placeholder */}
      {!value && (
        <div className="absolute top-[calc(2.5rem+1px)] left-3 text-muted-foreground pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  )
} 