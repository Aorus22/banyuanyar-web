import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { PDFEmbed } from './pdf-embed'

export interface PDFOptions {
  HTMLAttributes: Record<string, any>
  inline: boolean
  allowDownload: boolean
  width: number
  height: number
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pdf: {
      setPDF: (options: { src: string; title?: string; width?: number; height?: number }) => ReturnType
    }
  }
}

export const PDF = Node.create<PDFOptions>({
  name: 'pdf',

  addOptions() {
    return {
      HTMLAttributes: {},
      inline: false,
      allowDownload: true,
      width: 800,
      height: 600,
    }
  },

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: 'PDF Document',
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
        tag: 'div[data-pdf]',
        getAttrs: (node) => {
          if (typeof node === 'string') return {}
          const element = node as HTMLElement
          const iframe = element.querySelector('iframe')
          if (!iframe) return {}
          
          return {
            src: iframe.getAttribute('src'),
            title: element.getAttribute('data-title'),
            width: iframe.getAttribute('width'),
            height: iframe.getAttribute('height'),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    try {
      if (!HTMLAttributes.src) {
        return [
          'div', 
          { 'data-pdf': 'error', class: 'pdf-error' }, 
          'No PDF source provided'
        ]
      }
      
      return [
        'div',
        mergeAttributes(
          this.options.HTMLAttributes, 
          HTMLAttributes, 
          { 
            'data-pdf': '',
            'data-title': HTMLAttributes.title || 'PDF Document'
          }
        ),
        [
          'iframe',
          {
            src: HTMLAttributes.src,
            width: HTMLAttributes.width || this.options.width,
            height: HTMLAttributes.height || this.options.height,
            frameborder: '0',
            title: HTMLAttributes.title || 'PDF Document',
          },
        ],
      ]
    } catch (error) {
      console.error('Error rendering PDF HTML:', error)
      return ['div', { 'data-pdf': 'error', class: 'pdf-error' }, 'Error rendering PDF document']
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(PDFEmbed)
  },

  addCommands() {
    return {
      setPDF:
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
      'Mod-Alt-p': () => this.editor.commands.setPDF({ src: '' }),
    }
  },
}) 