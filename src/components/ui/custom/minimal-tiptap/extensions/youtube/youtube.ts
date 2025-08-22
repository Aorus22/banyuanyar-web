import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { YouTubeEmbed } from './youtube-embed'
import { extractYouTubeVideoId } from '@/components/ui/custom/minimal-tiptap/extensions/utils'

export interface YouTubeOptions {
  HTMLAttributes: Record<string, any>
  inline: boolean
  allowFullscreen: boolean
  width: number
  height: number
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      setYouTube: (options: { src: string; width?: number; height?: number }) => ReturnType
    }
  }
}

export const YouTube = Node.create<YouTubeOptions>({
  name: 'youtube',

  addOptions() {
    return {
      HTMLAttributes: {},
      inline: false,
      allowFullscreen: true,
      width: 640,
      height: 480,
    }
  },

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-youtube]',
        getAttrs: (node) => {
          if (typeof node === 'string') return {}
          const element = node as HTMLElement
          const iframe = element.querySelector('iframe')
          if (!iframe) return {}
          
          return {
            src: iframe.getAttribute('src'),
            width: iframe.getAttribute('width'),
            height: iframe.getAttribute('height'),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    try {
      const videoId = extractYouTubeVideoId(HTMLAttributes.src)
      if (!videoId) {
        return [
          'div', 
          { 'data-youtube': 'error', class: 'youtube-error' }, 
          'Invalid YouTube URL or no URL provided'
        ]
      }
      
      const embedUrl = `https://www.youtube.com/embed/${videoId}`
      
      return [
        'div',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-youtube': '' }),
        [
          'iframe',
          {
            src: embedUrl,
            width: HTMLAttributes.width || this.options.width,
            height: HTMLAttributes.height || this.options.height,
            frameborder: '0',
            allowfullscreen: this.options.allowFullscreen,
            title: 'YouTube video',
          },
        ],
      ]
    } catch (error) {
      console.error('Error rendering YouTube HTML:', error)
      return ['div', { 'data-youtube': 'error', class: 'youtube-error' }, 'Error rendering YouTube video']
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(YouTubeEmbed)
  },

  addCommands() {
    return {
      setYouTube:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-y': () => this.editor.commands.setYouTube({ src: '' }),
    }
  },
}) 