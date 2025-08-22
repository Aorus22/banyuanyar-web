import React, { useState, useCallback } from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit, Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { extractYouTubeVideoId } from '@/components/ui/custom/minimal-tiptap/extensions/utils'

export const YouTubeEmbed: React.FC<NodeViewProps> = ({ node, updateAttributes, deleteNode }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempSrc, setTempSrc] = useState(node.attrs.src || '')
  const [tempWidth, setTempWidth] = useState(node.attrs.width || 640)
  const [tempHeight, setTempHeight] = useState(node.attrs.height || 480)

  const handleSave = useCallback(() => {
    if (tempSrc && extractYouTubeVideoId(tempSrc)) {
      updateAttributes({
        src: tempSrc,
        width: tempWidth,
        height: tempHeight,
      })
      setIsEditing(false)
    } else {
      // Show error or validation message
      console.warn('Invalid YouTube URL provided')
    }
  }, [tempSrc, tempWidth, tempHeight, updateAttributes])

  const handleCancel = useCallback(() => {
    setTempSrc(node.attrs.src || '')
    setTempWidth(node.attrs.width || 640)
    setTempHeight(node.attrs.height || 480)
    setIsEditing(false)
  }, [node.attrs])

  const videoId = extractYouTubeVideoId(node.attrs.src)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null

  if (!embedUrl) {
    return (
      <NodeViewWrapper className="youtube-embed-node">
        <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="text-center">
            <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 mb-2">No YouTube video URL</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mr-2"
            >
              <Edit className="w-4 h-4 mr-1" />
              Add Video
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
    <NodeViewWrapper className="youtube-embed-node group">
      <div className="relative">
        {/* YouTube iframe */}
        <div className="relative w-full" style={{ aspectRatio: `${tempWidth}/${tempHeight}` }}>
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="YouTube video"
            className="absolute inset-0 w-full h-full rounded-lg"
          />
        </div>

        {/* Edit overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Edit className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit YouTube Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="youtube-url">YouTube URL</Label>
                    <Input
                      id="youtube-url"
                      value={tempSrc}
                      onChange={(e) => setTempSrc(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="youtube-width">Width</Label>
                      <Input
                        id="youtube-width"
                        type="number"
                        value={tempWidth}
                        onChange={(e) => setTempWidth(Number(e.target.value))}
                        min="200"
                        max="1200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube-height">Height</Label>
                      <Input
                        id="youtube-height"
                        type="number"
                        value={tempHeight}
                        onChange={(e) => setTempHeight(Number(e.target.value))}
                        min="150"
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
              variant="destructive"
              className="bg-red-500/90 hover:bg-red-500"
              onClick={() => deleteNode()}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  )
} 