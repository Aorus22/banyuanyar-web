"use client"

import { MinimalTiptapEditor } from "@/components/ui/custom/minimal-tiptap"
import { TiptapViewer } from "@/components/ui/custom/tiptap-viewer/tiptap-viewer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { useCallback, useRef, useState, useEffect } from "react"
import type { Editor } from "@tiptap/react"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function MinimalTiptapDemoPage() {
  const editorRef = useRef<Editor | null>(null)
  const [rawHtml, setRawHtml] = useState("")
  const [renderedContent, setRenderedContent] = useState("")
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues("description") && editor.isEmpty) {
        editor.commands.setContent(form.getValues("description"))
      }
      editorRef.current = editor
      
      // Debug: Check if extensions are loaded
      console.log('=== EDITOR DEBUG ===')
      console.log('Editor extensions:', editor.extensionManager.extensions.map(ext => ext.name))
      
      const imageExtension = editor.extensionManager.extensions.find(ext => ext.name === 'image')
      console.log('Image extension found:', !!imageExtension)
      
      const tableExtension = editor.extensionManager.extensions.find(ext => ext.name === 'table')
      console.log('Table extension found:', !!tableExtension)
      
      if (imageExtension) {
        console.log('Image extension options:', imageExtension.options)
      }
      
      if (tableExtension) {
        console.log('Table extension options:', tableExtension.options)
      }
      
      console.log('Current content:', editor.getHTML())
      console.log('Current JSON:', editor.getJSON())
      console.log('====================')
    },
    [form]
  )

  const onSubmit = (values: FormValues) => {
    console.log("==Form Values==")
    console.log(values)
    
    // Get raw HTML from editor
    if (editorRef.current && editorRef.current.isEditable) {
      const html = editorRef.current.getHTML()
      setRawHtml(html)
      
      // Get rendered content (text only)
      const text = editorRef.current.getText()
      setRenderedContent(text)
      
      console.log("==Raw HTML==")
      console.log(html)
      console.log("==Rendered Content==")
      console.log(text)
    } else {
      console.log("Editor not ready yet")
    }
  }

  const handleEditorChange = (content: any) => {
    // Update raw HTML when editor content changes
    if (editorRef.current && editorRef.current.isEditable) {
      const html = editorRef.current.getHTML()
      setRawHtml(html)
      
      // Also update rendered content
      const text = editorRef.current.getText()
      setRenderedContent(text)
      
      // Update form field value
      form.setValue("description", html)
    }
  }

  // Monitor editor changes and update HTML
  useEffect(() => {
    const updateHTML = () => {
      if (editorRef.current && editorRef.current.isEditable) {
        const html = editorRef.current.getHTML() || ""
        const text = editorRef.current.getText() || ""
        setRawHtml(html)
        setRenderedContent(text)
      }
    }

    // Update immediately
    updateHTML()

    // Set up interval to check for changes
    const interval = setInterval(updateHTML, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Minimal Tiptap Editor Demo</h1>
        <p className="text-muted-foreground">
          A rich text editor component built with Tiptap and Shadcn UI
        </p>
      </div>

      {/* Basic Editor Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Rich Text Editor</CardTitle>
          <CardDescription>
            Try typing, formatting, and inserting content. The editor supports:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Text formatting (bold, italic, underline, strikethrough)</p>
              <p>• Headings (H1-H6)</p>
              <p>• Lists (ordered and unordered)</p>
              <p>• Links with editing capabilities</p>
              <p>• Images with drag & drop support</p>
              <p>• Code blocks with syntax highlighting</p>
              <p>• Blockquotes</p>
              <p>• Horizontal rules</p>
              <p>• Tables with resizable columns</p>
              <p>• Text color customization</p>
            </div>
            
            <div className="border rounded-lg">
              <MinimalTiptapEditor
                placeholder="Start typing your content here..."
                className="min-h-[400px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Integration Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Form Integration with Shadcn Form</CardTitle>
          <CardDescription>
            Example of integrating the editor with React Hook Form and Zod validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title..." {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        value={field.value}
                        onChange={(content) => {
                          handleEditorChange(content)
                          field.onChange(content)
                        }}
                        throttleDelay={0}
                        className={cn("w-full", {
                          "border-destructive focus-within:border-destructive":
                            form.formState.errors.description,
                        })}
                        output="html"
                        placeholder="Type your description here..."
                        onCreate={handleCreate}
                        autofocus={true}
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
              
              <Button type="submit" size="lg" className="w-full">
                Submit Form
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Raw HTML Display */}
      <Card>
        <CardHeader>
          <CardTitle>Raw HTML Output</CardTitle>
          <CardDescription>
            The HTML content generated by the editor (for debugging)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
              {rawHtml || "No content yet. Start typing in the editor above..."}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Rendered Content Display */}
      <Card>
        <CardHeader>
          <CardTitle>Rendered Content (User View)</CardTitle>
          <CardDescription>
            How the content will appear to end users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="min-h-[100px] border rounded-lg">
              <TiptapViewer 
                content={rawHtml || "<p>No content yet. Start typing in the editor above...</p>"}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Values Display */}
      <Card>
        <CardHeader>
          <CardTitle>Form Values</CardTitle>
          <CardDescription>
            Current form state and values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Title:</h4>
              <p className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {form.watch("title") || "No title entered"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Description (Form Field Value):</h4>
              <div className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded min-h-[50px]">
                <pre className="whitespace-pre-wrap overflow-x-auto">
                  {form.watch("description") || "No description entered"}
                </pre>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Description (Rendered HTML):</h4>
              <div className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded min-h-[50px] prose prose-sm max-w-none">
                <TiptapViewer 
                  content={rawHtml || "<p>No description entered</p>"}
                  className="min-h-[50px]"
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Description (Text Only):</h4>
              <p className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded min-h-[50px]">
                {renderedContent || "No description entered"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Form Errors:</h4>
              <p className="text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                {Object.keys(form.formState.errors).length > 0 
                  ? JSON.stringify(form.formState.errors, null, 2)
                  : "No errors"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 