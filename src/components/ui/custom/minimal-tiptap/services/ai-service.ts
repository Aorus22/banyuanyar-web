export interface AIGenerationOptions {
  prompt: string
  maxLength?: number
  tone?: 'formal' | 'casual' | 'professional' | 'creative'
  language?: 'id' | 'en'
}

export interface AIImprovementOptions {
  text: string
  focus?: 'grammar' | 'style' | 'clarity' | 'tone'
  language?: 'id' | 'en'
}

export interface AISuggestionOptions {
  text: string
  type?: 'content' | 'structure' | 'style' | 'engagement'
  language?: 'id' | 'en'
}

export class AIService {
  private apiKey?: string
  private baseUrl?: string
  private useGemini: boolean = false
  private geminiService?: any

  constructor(apiKey?: string, baseUrl?: string, useGemini: boolean = false) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
    this.useGemini = useGemini
    
    if (useGemini && apiKey) {
      // Import Gemini service dynamically to avoid circular dependencies
      import('./gemini-ai-service').then(module => {
        this.geminiService = new module.GeminiAIService({ apiKey })
      }).catch(console.error)
    }
  }

  /**
   * Generate text based on a prompt
   */
  async generateText(options: AIGenerationOptions): Promise<string> {
    if (this.useGemini && this.geminiService) {
      try {
        const result = await this.geminiService.generateText(options)
        return this.sanitizeHTMLString(result)
      } catch (error) {
        console.warn('Gemini failed, falling back to mock AI:', error)
      }
    }
    
    if (this.apiKey && this.baseUrl) {
      return this.callRealAI('generate', options)
    }
    
    // Fallback to mock AI for demo purposes
    return this.mockGenerateText(options)
  }

  /**
   * Improve existing text
   */
  async improveText(options: AIImprovementOptions): Promise<string> {
    if (this.useGemini && this.geminiService) {
      try {
        const result = await this.geminiService.improveText(options)
        return this.sanitizeHTMLString(result)
      } catch (error) {
        console.warn('Gemini failed, falling back to mock AI:', error)
      }
    }
    
    if (this.apiKey && this.baseUrl) {
      return this.callRealAI('improve', options)
    }
    
    // Fallback to mock AI for demo purposes
    return this.mockImproveText(options)
  }

  /**
   * Get suggestions for text improvement
   */
  async getSuggestions(options: AISuggestionOptions): Promise<string[]> {
    if (this.useGemini && this.geminiService) {
      try {
        const result = await this.geminiService.getSuggestions(options)
        return result.map((suggestion: string) => this.sanitizeHTMLString(suggestion))
      } catch (error) {
        console.warn('Gemini failed, falling back to mock AI:', error)
      }
    }
    
    if (this.apiKey && this.baseUrl) {
      return this.callRealAI('suggest', options)
    }
    
    // Fallback to mock AI for demo purposes
    return this.mockGetSuggestions(options)
  }

  /**
   * Expand content with additional details
   */
  async expandContent(text: string, language: 'id' | 'en' = 'id'): Promise<string> {
    if (this.useGemini && this.geminiService) {
      try {
        const result = await this.geminiService.expandContent(text, language)
        return this.sanitizeHTMLString(result)
      } catch (error) {
        console.warn('Gemini failed, falling back to mock AI:', error)
      }
    }
    
    if (this.apiKey && this.baseUrl) {
      return this.callRealAI('expand', { text, language })
    }
    
    // Fallback to mock AI for demo purposes
    return this.mockExpandContent(text, language)
  }

  /**
   * Translate text to another language
   */
  async translateText(text: string, targetLanguage: 'id' | 'en'): Promise<string> {
    if (this.useGemini && this.geminiService) {
      try {
        const result = await this.geminiService.translateText(text, targetLanguage)
        return this.sanitizeHTMLString(result)
      } catch (error) {
        console.warn('Gemini failed, falling back to mock AI:', error)
      }
    }
    
    if (this.apiKey && this.baseUrl) {
      return this.callRealAI('translate', { text, targetLanguage })
    }
    
    // Fallback to mock AI for demo purposes
    return this.mockTranslateText(text, targetLanguage)
  }

  /**
   * Summarize long text
   */
  async summarizeText(text: string, maxLength: number = 200): Promise<string> {
    if (this.useGemini && this.geminiService) {
      try {
        const result = await this.geminiService.summarizeText(text, maxLength)
        return this.sanitizeHTMLString(result)
      } catch (error) {
        console.warn('Gemini failed, falling back to mock AI:', error)
      }
    }
    
    if (this.apiKey && this.baseUrl) {
      return this.callRealAI('summarize', { text, maxLength })
    }
    
    // Fallback to mock AI for demo purposes
    return this.mockSummarizeText(text, maxLength)
  }

  private async callRealAI(endpoint: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/ai/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`)
      }

      const result = await response.json()
      return this.sanitizeAIOutput(result)
    } catch (error) {
      console.error('AI API call failed:', error)
      throw error
    }
  }

  private sanitizeAIOutput(content: any): any {
    if (typeof content === 'string') {
      return this.sanitizeHTMLString(content)
    } else if (content && typeof content === 'object' && content.content) {
      return {
        ...content,
        content: this.sanitizeHTMLString(content.content)
      }
    }
    return content
  }

  private sanitizeHTMLString(content: string): string {
    if (!content || typeof content !== 'string') return content
    
    // Remove HTML code blocks
    content = content.replace(/```html\s*/g, '').replace(/```\s*$/g, '');
    
    // Remove class attributes from common tags
    content = content.replace(/class="[^"]*"/g, '');
    
    // Remove empty paragraphs and excessive whitespace
    content = content.replace(/<p>\s*<\/p>/g, '');
    content = content.replace(/>\s+</g, '><');
    content = content.replace(/\s+>/g, '>');
    content = content.replace(/>\s+/g, '>');
    
    // Remove excessive newlines and spaces
    content = content.replace(/\n\s*\n/g, '\n');
    content = content.replace(/\s{2,}/g, ' ');
    
    // Clean up the content
    content = content.trim();
    
    return content;
  }

  // Mock AI implementations for demo purposes
  private mockGenerateText(options: AIGenerationOptions): string {
    const { prompt, tone = 'formal', language = 'id' } = options
    
    let response: string
    
    if (language === 'id') {
      const responses = {
        formal: `<h2>Analisis Komprehensif: ${prompt}</h2><p>Topik "${prompt}" merupakan hal yang menarik untuk dikaji secara mendalam. Berbagai aspek dapat diidentifikasi dan dikembangkan untuk memberikan pemahaman yang lebih utuh.</p><h3>Poin-Poin Utama</h3><ul><li>Analisis mendalam tentang topik tersebut</li><li>Contoh praktis dan implementasi yang relevan</li><li>Dampak dan implikasi ke depannya</li><li>Rekomendasi dan saran tindak lanjut</li></ul><p>Dengan memahami aspek-aspek tersebut, kita dapat memperoleh wawasan yang lebih komprehensif dan dapat mengaplikasikannya dalam berbagai konteks.</p>`,
        casual: `<h2>Ide Kreatif: ${prompt}</h2><p>Oke, jadi tentang "${prompt}" nih, gue punya beberapa ide yang bisa kita kembangkan bareng:</p><h3>Yang Bisa Kita Lakukan</h3><ul><li>Bisa kita bahas dari sisi yang lebih santai dan relatable</li><li>Tambahin contoh-contoh yang gampang dipahami</li><li>Jangan lupa kasih tips praktis yang bisa langsung dipake</li><li>Terus gimana sih cara implementasinya yang gampang dan efektif</li></ul>`,
        professional: `<h2>Analisis Profesional: ${prompt}</h2><p>Mengenai topik "${prompt}", berikut adalah analisis komprehensif yang dapat dijadikan referensi:</p><h3>Evaluasi Komprehensif</h3><ul><li>Evaluasi komprehensif terhadap situasi terkini</li><li>Identifikasi peluang dan tantangan yang ada</li><li>Strategi implementasi yang terukur dan berkelanjutan</li><li>Metrik keberhasilan dan indikator kinerja</li></ul>`,
        creative: `<h2>Eksplorasi Kreatif: ${prompt}</h2><p>Mari kita eksplorasi "${prompt}" dengan pendekatan kreatif yang inovatif:</p><h3>Ide-Ide Inovatif</h3><ul><li>Ide-ide inovatif yang bisa dikembangkan lebih lanjut</li><li>Pendekatan unik dan out-of-the-box</li><li>Potensi transformasi dan breakthrough</li><li>Inspirasi untuk solusi kreatif</li></ul>`
      }
      response = responses[tone] || responses.formal
    } else {
      response = `<h2>Comprehensive Analysis: ${prompt}</h2><p>Based on the context "${prompt}", here are some key points to develop:</p><h3>Key Points</h3><ul><li>In-depth analysis of the topic</li><li>Practical examples and implementation</li><li>Future impact and implications</li><li>Recommendations and next steps</li></ul><p>By understanding these aspects, we can gain more comprehensive insights.</p>`
    }
    
    return this.sanitizeHTMLString(response)
  }

  private mockImproveText(options: AIImprovementOptions): string {
    const { text, focus = 'grammar', language = 'id' } = options
    
    if (language === 'id') {
      let improvedText = text
      
      if (focus === 'grammar') {
        improvedText = text
          .replace(/\b(dibuat|dibikin)\b/gi, "dibuat")
          .replace(/\b(untuk\s+itu)\b/gi, "oleh karena itu")
          .replace(/\b(yang\s+mana)\b/gi, "yang")
          .replace(/\b(adalah\s+sebagai\s+berikut)\b/gi, "adalah:")
          .replace(/\b(di\s+dalam)\b/gi, "dalam")
          .replace(/\b(untuk\s+dapat)\b/gi, "agar dapat")
      } else if (focus === 'style') {
        improvedText = text
          .replace(/\b(sangat\s+baik)\b/gi, "sempurna")
          .replace(/\b(banyak\s+sekali)\b/gi, "berlimpah")
          .replace(/\b(sudah\s+ada)\b/gi, "tersedia")
          .replace(/\b(membuat\s+lebih)\b/gi, "meningkatkan")
      } else if (focus === 'clarity') {
        improvedText = text
          .replace(/\b(hal\s+yang\s+penting)\b/gi, "poin kunci")
          .replace(/\b(dapat\s+dilihat)\b/gi, "terlihat")
          .replace(/\b(berdasarkan\s+pada)\b/gi, "berdasarkan")
          .replace(/\b(sehubungan\s+dengan)\b/gi, "terkait")
      }
      
      return improvedText
    } else {
      return text
        .replace(/\b(very\s+good)\b/gi, "excellent")
        .replace(/\b(a\s+lot\s+of)\b/gi, "numerous")
        .replace(/\b(already\s+have)\b/gi, "possess")
        .replace(/\b(make\s+better)\b/gi, "improve")
    }
  }

  private mockGetSuggestions(options: AISuggestionOptions): string[] {
    const { type = 'content', language = 'id' } = options
    
    if (language === 'id') {
      const suggestions = {
        content: [
          "Tambahkan contoh konkret dan relevan untuk memperkuat argumen",
          "Perjelas poin utama dengan data pendukung yang akurat",
          "Tambahkan data statistik atau penelitian terkini",
          "Buat kesimpulan yang lebih kuat dan actionable"
        ],
        structure: [
          "Atur ulang paragraf untuk alur yang lebih logis dan mudah dipahami",
          "Tambahkan subheading untuk organisasi konten yang lebih baik",
          "Gunakan bullet points untuk poin-poin penting dan mudah diingat",
          "Buat transisi yang lebih halus antar paragraf untuk kenyamanan membaca"
        ],
        style: [
          "Gunakan bahasa yang lebih aktif dan dinamis untuk engagement yang lebih baik",
          "Kurangi penggunaan kata-kata yang berlebihan untuk kejelasan",
          "Tambahkan variasi dalam struktur kalimat untuk menghindari monoton",
          "Gunakan analogi untuk penjelasan yang lebih jelas dan relatable"
        ],
        engagement: [
          "Tambahkan pertanyaan retorik untuk interaksi yang lebih aktif",
          "Gunakan storytelling untuk ilustrasi yang lebih menarik",
          "Buat call-to-action yang jelas dan actionable",
          "Tambahkan elemen visual atau diagram untuk pemahaman yang lebih baik"
        ]
      }
      return suggestions[type] || suggestions.content
    } else {
      return [
        "Add concrete and relevant examples to strengthen arguments",
        "Clarify main points with accurate supporting data",
        "Include current statistics or research data",
        "Create stronger and actionable conclusions"
      ]
    }
  }

  private mockExpandContent(text: string, language: 'id' | 'en' = 'id'): string {
    let response: string
    
    if (language === 'id') {
      response = `<h3>Penjelasan Lebih Lanjut</h3><p>${text} merupakan topik yang menarik untuk dibahas lebih dalam. Berbagai aspek dapat dikembangkan untuk memberikan pemahaman yang lebih utuh dan komprehensif.</p><h4>Aspek yang Dapat Dikembangkan</h4><ul><li>Konteks historis dan perkembangan dari waktu ke waktu</li><li>Analisis situasi terkini dan kondisi aktual</li><li>Proyeksi dan tren masa depan yang potensial</li><li>Implikasi praktis dan aplikasi dalam kehidupan nyata</li></ul><p>Dengan memahami aspek-aspek tersebut secara mendalam, kita dapat memperoleh wawasan yang lebih komprehensif tentang topik ini dan mengaplikasikannya dalam berbagai konteks yang relevan.</p>`
    } else {
      response = `<h3>Further Explanation</h3><p>${text} is an interesting topic to explore in depth. Various aspects can be developed to provide a more comprehensive understanding.</p><h4>Aspects That Can Be Developed</h4><ul><li>Historical context and development over time</li><li>Analysis of current situation and actual conditions</li><li>Future projections and potential trends</li><li>Practical implications and real-life applications</li></ul><p>By understanding these aspects in depth, we can gain more comprehensive insights about this topic and apply them in various relevant contexts.</p>`
    }
    
    return this.sanitizeHTMLString(response)
  }

  private mockTranslateText(text: string, targetLanguage: 'id' | 'en'): string {
    // Simple mock translation - in real implementation, this would call an AI translation service
    let response: string
    
    if (targetLanguage === 'en') {
      const translatedText = text
        .replace(/desa/g, 'village')
        .replace(/pemerintah/g, 'government')
        .replace(/masyarakat/g, 'community')
        .replace(/pembangunan/g, 'development')
        .replace(/wisata/g, 'tourism')
        .replace(/ekonomi/g, 'economy')
      
      response = `<p><strong>Translation:</strong> ${translatedText}</p>`
    } else {
      const translatedText = text
        .replace(/village/g, 'desa')
        .replace(/government/g, 'pemerintah')
        .replace(/community/g, 'masyarakat')
        .replace(/development/g, 'pembangunan')
        .replace(/tourism/g, 'wisata')
        .replace(/economy/g, 'ekonomi')
      
      response = `<p><strong>Terjemahan:</strong> ${translatedText}</p>`
    }
    
    return this.sanitizeHTMLString(response)
  }

  private mockSummarizeText(text: string, maxLength: number = 200): string {
    if (text.length <= maxLength) return `<p>${text}</p>`
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    let summary = ''
    
    for (const sentence of sentences) {
      if ((summary + sentence).length <= maxLength) {
        summary += sentence + '. '
      } else {
        break
      }
    }
    
    const finalSummary = summary.trim() || text.substring(0, maxLength) + '...'
    const response = `<h3>Ringkasan</h3><p>${finalSummary}</p>`
    
    return this.sanitizeHTMLString(response)
  }
}

// Export singleton instance
export const aiService = new AIService() 