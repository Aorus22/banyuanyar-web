"use client"

import { useState, useEffect } from "react"
import { Editor } from "@tiptap/react"
import { Sparkles, Wand2, Lightbulb, Zap, Loader2, Languages, FileText, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { aiService } from "../../services"
import { AIFactory, createAIConfig } from "../../index"

interface AISectionProps {
  editor: Editor
}

export const AISection = ({ editor }: AISectionProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImproving, setIsImproving] = useState(false)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [isExpanding, setIsExpanding] = useState(false)
  
  // AI Service state
  const [currentAIService, setCurrentAIService] = useState<any>(aiService)
  const [aiProvider, setAiProvider] = useState<'mock' | 'gemini' | 'openai'>('mock')

  // Initialize AI service based on environment
  useEffect(() => {
    const initializeAIService = async () => {
      try {
        // Check for Gemini API key first
        if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
          const config = createAIConfig({
            provider: 'gemini',
            geminiConfig: {
              apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
              model: 'gemini-2.0-flash'
            }
          })
          
          const service = AIFactory.createService(config)
          setCurrentAIService(service)
          setAiProvider('gemini')
          console.log('✅ Gemini AI service initialized')
          return
        }
        
        // Check for OpenAI API key
        if (process.env.NEXT_PUBLIC_OPENAI_API_KEY && process.env.NEXT_PUBLIC_OPENAI_BASE_URL) {
          const config = createAIConfig({
            provider: 'openai',
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            baseUrl: process.env.NEXT_PUBLIC_OPENAI_BASE_URL
          })
          
          const service = AIFactory.createService(config)
          setCurrentAIService(service)
          setAiProvider('openai')
          console.log('✅ OpenAI AI service initialized')
          return
        }
        
        // Fallback to mock AI
        setCurrentAIService(aiService)
        setAiProvider('mock')
        console.log('ℹ️ Using Mock AI service (no API keys found)')
        
      } catch (error) {
        console.error('❌ Failed to initialize AI service:', error)
        // Fallback to mock AI
        setCurrentAIService(aiService)
        setAiProvider('mock')
      }
    }
    
    initializeAIService()
  }, [])

  const generateText = async () => {
    if (!editor) return
    
    const selection = editor.state.selection
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
    
    if (!selectedText.trim()) {
      toast.error("Pilih teks terlebih dahulu untuk memberikan konteks")
      return
    }

    setIsGenerating(true)
    try {
      const generatedText = await currentAIService.generateText({
        prompt: selectedText,
        tone: 'formal',
        language: 'id'
      })
      
      const insertPosition = selection.to
      editor.commands.insertContentAt(insertPosition, `\n\n${generatedText}`)
      
      toast.success("Teks berhasil digenerate dengan AI")
    } catch (error) {
      toast.error("Gagal generate teks dengan AI")
    } finally {
      setIsGenerating(false)
    }
  }

  const improveContent = async () => {
    if (!editor) return
    
    const selection = editor.state.selection
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
    
    if (!selectedText.trim()) {
      toast.error("Pilih teks terlebih dahulu untuk diperbaiki")
      return
    }

    setIsImproving(true)
    try {
      const improvedText = await currentAIService.improveText({
        text: selectedText,
        focus: 'grammar',
        language: 'id'
      })
      
      editor.commands.insertContent(improvedText)
      
      toast.success("Konten berhasil diperbaiki dengan AI")
    } catch (error) {
      toast.error("Gagal memperbaiki konten dengan AI")
    } finally {
      setIsImproving(false)
    }
  }

  const getSuggestions = async () => {
    if (!editor) return
    
    const selection = editor.state.selection
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
    
    if (!selectedText.trim()) {
      toast.error("Pilih teks terlebih dahulu untuk mendapatkan saran")
      return
    }

    setIsSuggesting(true)
    try {
      const suggestions = await currentAIService.getSuggestions({
        text: selectedText,
        type: 'content',
        language: 'id'
      })
      
      const suggestionsText = `\n\n💡 Saran AI:\n${suggestions.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}`
      
      const insertPosition = selection.to
      editor.commands.insertContentAt(insertPosition, suggestionsText)
      
      toast.success("Saran AI berhasil ditambahkan")
    } catch (error) {
      toast.error("Gagal mendapatkan saran AI")
    } finally {
      setIsSuggesting(false)
    }
  }

  const expandContent = async () => {
    if (!editor) return
    
    const selection = editor.state.selection
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
    
    if (!selectedText.trim()) {
      toast.error("Pilih teks terlebih dahulu untuk diperluas")
      return
    }

    setIsExpanding(true)
    try {
      const expandedText = await currentAIService.expandContent(selectedText, 'id')
      
      const insertPosition = selection.to
      editor.commands.insertContentAt(insertPosition, expandedText)
      
      toast.success("Konten berhasil diperluas dengan AI")
    } catch (error) {
      toast.error("Gagal memperluas konten dengan AI")
    } finally {
      setIsExpanding(false)
    }
  }

  const translateText = async () => {
    if (!editor) return
    
    const selection = editor.state.selection
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
    
    if (!selectedText.trim()) {
      toast.error("Pilih teks terlebih dahulu untuk diterjemahkan")
      return
    }

    setIsTranslating(true)
    try {
      const translatedText = await currentAIService.translateText(selectedText, 'en')
      
      const insertPosition = selection.to
      editor.commands.insertContentAt(insertPosition, `\n\n🌐 Terjemahan:\n${translatedText}`)
      
      toast.success("Teks berhasil diterjemahkan dengan AI")
    } catch (error) {
      toast.error("Gagal menerjemahkan teks dengan AI")
    } finally {
      setIsTranslating(false)
    }
  }

  const summarizeText = async () => {
    if (!editor) return
    
    const selection = editor.state.selection
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
    
    if (!selectedText.trim()) {
      toast.error("Pilih teks terlebih dahulu untuk diringkas")
      return
    }

    setIsSummarizing(true)
    try {
      const summary = await currentAIService.summarizeText(selectedText, 150)
      
      const insertPosition = selection.to
      editor.commands.insertContentAt(insertPosition, `\n\n📝 Ringkasan:\n${summary}`)
      
      toast.success("Teks berhasil diringkas dengan AI")
    } catch (error) {
      toast.error("Gagal meringkas teks dengan AI")
    } finally {
      setIsSummarizing(false)
    }
  }

  const generateSmartContent = async () => {
    if (!editor) return
    
    const selection = editor.state.selection
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
    
    if (!selectedText.trim()) {
      toast.error("Pilih teks terlebih dahulu untuk generate konten cerdas")
      return
    }

    setIsGenerating(true)
    try {
      // Generate multiple types of content
      const [ideas, improvements, suggestions] = await Promise.all([
        currentAIService.generateText({ prompt: selectedText, tone: 'creative', language: 'id' }),
        currentAIService.improveText({ text: selectedText, focus: 'style', language: 'id' }),
        currentAIService.getSuggestions({ text: selectedText, type: 'engagement', language: 'id' })
      ])
      
      const smartContent = `\n\n🧠 Konten Cerdas AI:\n\n💡 Ide Kreatif:\n${ideas}\n\n✨ Perbaikan Gaya:\n${improvements}\n\n🎯 Saran Engagement:\n${suggestions.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}`
      
      const insertPosition = selection.to
      editor.commands.insertContentAt(insertPosition, smartContent)
      
      toast.success("Konten cerdas berhasil digenerate dengan AI")
    } catch (error) {
      toast.error("Gagal generate konten cerdas dengan AI")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Separator orientation="vertical" className="mx-1" />
        
        {/* AI Provider Indicator */}
        <div className="flex items-center gap-1 px-2 text-xs">
          <Badge 
            variant={aiProvider === 'gemini' ? 'default' : aiProvider === 'openai' ? 'secondary' : 'outline'}
            className="text-xs"
          >
            {aiProvider === 'gemini' ? '🤖 Gemini' : aiProvider === 'openai' ? '🤖 OpenAI' : '🤖 Mock AI'}
          </Badge>
        </div>
        
        <Separator orientation="vertical" className="mx-1" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={generateText}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Generate teks dengan AI</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={improveContent}
              disabled={isImproving}
            >
              {isImproving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Perbaiki konten dengan AI</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={getSuggestions}
              disabled={isSuggesting}
            >
              {isSuggesting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dapatkan saran AI</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={expandContent}
              disabled={isExpanding}
            >
              {isExpanding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Perluas konten dengan AI</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={translateText}
              disabled={isTranslating}
            >
              {isTranslating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Languages className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Terjemahkan teks dengan AI</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={summarizeText}
              disabled={isSummarizing}
            >
              {isSummarizing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ringkas teks dengan AI</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={generateSmartContent}
              disabled={isGenerating}
            >
              <Brain className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Generate konten cerdas dengan AI</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
} 