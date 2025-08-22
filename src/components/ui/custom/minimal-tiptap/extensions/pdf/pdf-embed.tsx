import React, { useState, useCallback } from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit, FileText, Download, X, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export const PDFEmbed: React.FC<NodeViewProps> = ({ node, updateAttributes, deleteNode }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempSrc, setTempSrc] = useState(node.attrs.src || '')
  const [tempTitle, setTempTitle] = useState(node.attrs.title || 'PDF Document')
  const [tempWidth, setTempWidth] = useState(node.attrs.width || 800)
  const [tempHeight, setTempHeight] = useState(node.attrs.height || 600)

  const handleSave = useCallback(() => {
    if (tempSrc) {
      updateAttributes({
        src: tempSrc,
        title: tempTitle,
        width: tempWidth,
        height: tempHeight,
      })
      setIsEditing(false)
    }
  }, [tempSrc, tempTitle, tempWidth, tempHeight, updateAttributes])

  const handleCancel = useCallback(() => {
    setTempSrc(node.attrs.src || '')
    setTempTitle(node.attrs.title || 'PDF Document')
    setTempWidth(node.attrs.width || 800)
    setTempHeight(node.attrs.height || 600)
    setIsEditing(false)
  }, [node.attrs])

  const handleDownload = useCallback(() => {
    if (tempSrc) {
      const link = document.createElement('a')
      link.href = tempSrc
      link.download = tempTitle || 'document.pdf'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [tempSrc, tempTitle])

  const handleOpenInNewTab = useCallback(() => {
    if (tempSrc) {
      window.open(tempSrc, '_blank')
    }
  }, [tempSrc])

  if (!tempSrc) {
    return (
      <NodeViewWrapper className="pdf-embed-node">
        <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 mb-2">No PDF file URL</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mr-2"
            >
              <Edit className="w-4 h-4 mr-1" />
              Add PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteNode()}
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper className="pdf-embed-node group">
      <div className="relative">
        {/* PDF Header */}
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg border-b">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-500" />
            <span className="font-medium text-sm">{tempTitle}</span>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleOpenInNewTab}
              className="h-8 px-2"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDownload}
              className="h-8 px-2"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 px-2">
                  <Edit className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit PDF Document</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pdf-url">PDF URL</Label>
                    <Input
                      id="pdf-url"
                      value={tempSrc}
                      onChange={(e) => setTempSrc(e.target.value)}
                      placeholder="https://example.com/document.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pdf-title">Document Title</Label>
                    <Input
                      id="pdf-title"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      placeholder="PDF Document"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pdf-width">Width</Label>
                      <Input
                        id="pdf-width"
                        type="number"
                        value={tempWidth}
                        onChange={(e) => setTempWidth(Number(e.target.value))}
                        min="300"
                        max="1200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pdf-height">Height</Label>
                      <Input
                        id="pdf-height"
                        type="number"
                        value={tempHeight}
                        onChange={(e) => setTempHeight(Number(e.target.value))}
                        min="200"
                        max="800"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      Save
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteNode()}
              className="h-8 px-2 text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* PDF iframe */}
        <div className="relative w-full" style={{ aspectRatio: `${tempWidth}/${tempHeight}` }}>
          <iframe
            src={tempSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            title={tempTitle}
            className="absolute inset-0 w-full h-full rounded-b-lg"
          />
        </div>
      </div>
    </NodeViewWrapper>
  )
} 