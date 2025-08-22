import { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Youtube, FileText, Plus } from "lucide-react"
import { useState } from "react"

interface EmbedSectionProps {
  editor: Editor
}

export const EmbedSection = ({ editor }: EmbedSectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [pdfTitle, setPdfTitle] = useState("PDF Document")

  const handleInsertYouTube = () => {
    if (youtubeUrl.trim()) {
      editor.commands.setYouTube({ src: youtubeUrl.trim() })
      setYoutubeUrl("")
      setIsOpen(false)
    }
  }

  const handleInsertPDF = () => {
    if (pdfUrl.trim()) {
      editor.commands.setPDF({ 
        src: pdfUrl.trim(), 
        title: pdfTitle.trim() || "PDF Document" 
      })
      setPdfUrl("")
      setPdfTitle("PDF Document")
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          title="Insert embed"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Embed</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              PDF
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="youtube" className="space-y-4 pt-4">
            <div>
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <Input
                id="youtube-url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInsertYouTube()
                  }
                }}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleInsertYouTube} disabled={!youtubeUrl.trim()}>
                Insert YouTube Video
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="pdf" className="space-y-4 pt-4">
            <div>
              <Label htmlFor="pdf-url">PDF URL</Label>
              <Input
                id="pdf-url"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="https://example.com/document.pdf"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInsertPDF()
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="pdf-title">Document Title (Optional)</Label>
              <Input
                id="pdf-title"
                value={pdfTitle}
                onChange={(e) => setPdfTitle(e.target.value)}
                placeholder="PDF Document"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleInsertPDF} disabled={!pdfUrl.trim()}>
                Insert PDF Document
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 