export interface GeminiAIConfig {
  apiKey: string
  model?: 'gemini-2.0-flash' | 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-1.0-pro' | 'gemini-1.0-pro-vision'
  baseUrl?: string
  maxTokens?: number
  temperature?: number
  topP?: number
  topK?: number
}

export interface GeminiGenerationOptions {
  prompt: string
  maxLength?: number
  tone?: 'formal' | 'casual' | 'professional' | 'creative'
  language?: 'id' | 'en'
  context?: string
}

export interface GeminiImprovementOptions {
  text: string
  focus?: 'grammar' | 'style' | 'clarity' | 'tone'
  language?: 'id' | 'en'
  instructions?: string
}

export interface GeminiSuggestionOptions {
  text: string
  type?: 'content' | 'structure' | 'style' | 'engagement'
  language?: 'id' | 'en'
  targetAudience?: string
}

export class GeminiAIService {
  private config: GeminiAIConfig
  private defaultBaseUrl = 'https://generativelanguage.googleapis.com/v1/models'

  constructor(config: GeminiAIConfig) {
    this.config = {
      model: 'gemini-2.0-flash',
      maxTokens: 2048,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      ...config
    }
  }

  /**
   * Generate text using Gemini AI
   */
  async generateText(options: GeminiGenerationOptions): Promise<string> {
    const { prompt, tone = 'formal', language = 'id', context } = options
    
    const systemPrompt = this.buildSystemPrompt(tone, language, context)
    const userPrompt = this.buildUserPrompt(prompt, 'generate')
    
    try {
      const response = await this.callGeminiAPI(systemPrompt, userPrompt)
      return this.extractTextFromResponse(response)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error(`Gemini API error: ${error}`)
    }
  }

  /**
   * Improve text using Gemini AI
   */
  async improveText(options: GeminiImprovementOptions): Promise<string> {
    const { text, focus = 'grammar', language = 'id', instructions } = options
    
    const systemPrompt = this.buildImprovementPrompt(focus, language, instructions)
    const userPrompt = this.buildUserPrompt(text, 'improve')
    
    try {
      const response = await this.callGeminiAPI(systemPrompt, userPrompt)
      return this.extractTextFromResponse(response)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error(`Gemini API error: ${error}`)
    }
  }

  /**
   * Get suggestions using Gemini AI
   */
  async getSuggestions(options: GeminiSuggestionOptions): Promise<string[]> {
    const { text, type = 'content', language = 'id', targetAudience } = options
    
    const systemPrompt = this.buildSuggestionPrompt(type, language, targetAudience)
    const userPrompt = this.buildUserPrompt(text, 'suggest')
    
    try {
      const response = await this.callGeminiAPI(systemPrompt, userPrompt)
      const suggestionsText = this.extractTextFromResponse(response)
      return this.parseSuggestions(suggestionsText)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error(`Gemini API error: ${error}`)
    }
  }

  /**
   * Expand content using Gemini AI
   */
  async expandContent(text: string, language: 'id' | 'en' = 'id'): Promise<string> {
    const systemPrompt = this.buildExpansionPrompt(language)
    const userPrompt = this.buildUserPrompt(text, 'expand')
    
    try {
      const response = await this.callGeminiAPI(systemPrompt, userPrompt)
      return this.extractTextFromResponse(response)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error(`Gemini API error: ${error}`)
    }
  }

  /**
   * Translate text using Gemini AI
   */
  async translateText(text: string, targetLanguage: 'id' | 'en'): Promise<string> {
    const systemPrompt = this.buildTranslationPrompt(targetLanguage)
    const userPrompt = this.buildUserPrompt(text, 'translate')
    
    try {
      const response = await this.callGeminiAPI(systemPrompt, userPrompt)
      return this.extractTextFromResponse(response)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error(`Gemini API error: ${error}`)
    }
  }

  /**
   * Summarize text using Gemini AI
   */
  async summarizeText(text: string, maxLength: number = 200): Promise<string> {
    const systemPrompt = this.buildSummarizationPrompt(maxLength)
    const userPrompt = this.buildUserPrompt(text, 'summarize')
    
    try {
      const response = await this.callGeminiAPI(systemPrompt, userPrompt)
      return this.extractTextFromResponse(response)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error(`Gemini API error: ${error}`)
    }
  }

  /**
   * Generate comprehensive smart content
   */
  async generateSmartContent(text: string, language: 'id' | 'en' = 'id'): Promise<{
    ideas: string
    improvements: string
    suggestions: string[]
  }> {
    const systemPrompt = this.buildSmartContentPrompt(language)
    const userPrompt = this.buildUserPrompt(text, 'smart')
    
    try {
      const response = await this.callGeminiAPI(systemPrompt, userPrompt)
      const content = this.extractTextFromResponse(response)
      return this.parseSmartContent(content)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error(`Gemini API error: ${error}`)
    }
  }

  private async callGeminiAPI(systemPrompt: string, userPrompt: string): Promise<any> {
    const url = `${this.config.baseUrl || this.defaultBaseUrl}/${this.config.model}:generateContent?key=${this.config.apiKey}`
    
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\n${userPrompt}` }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: this.config.maxTokens,
        temperature: this.config.temperature,
        topP: this.config.topP,
        topK: this.config.topK
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`)
    }

    return await response.json()
  }

  private buildSystemPrompt(tone: string, language: string, context?: string): string {
    const languageMap = {
      'id': 'Bahasa Indonesia',
      'en': 'English'
    }
    
    const toneMap = {
      'formal': 'formal dan sopan',
      'casual': 'santai dan akrab',
      'professional': 'profesional dan bisnis',
      'creative': 'kreatif dan inovatif'
    }

    return `Saya adalah seorang penulis profesional yang ahli dalam ${languageMap[language as keyof typeof languageMap]} dan penulisan konten. 
    
PENTING: SAYA ADALAH WRITER, BUKAN ASISTEN YANG MEMBERI SARAN!

FORMAT OUTPUT YANG WAJIB:
- HANYA gunakan tag HTML dasar: <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- TIDAK ada class, id, atau atribut tambahan
- TIDAK ada kode HTML mentah atau spasi berlebihan
- TIDAK ada spasi kosong antara tag
- TIDAK ada <p class="text-node"> atau <h1 class="heading-node">
- TIDAK ada spasi atau newline antara > dan <
- Tag harus langsung bersambung: </p><h1> bukan </p> <h1>
- Output langsung konten HTML bersih yang siap digunakan

CONTOH OUTPUT YANG BENAR:
<h1>Judul Utama</h1><p>Paragraf pertama tanpa spasi kosong.</p><h2>Sub Judul</h2><p>Paragraf kedua langsung tanpa spasi.</p><ul><li>Item pertama</li><li>Item kedua</li></ul>

CONTOH OUTPUT YANG SALAH:
<p class="text-node">hal</p><h1 class="heading-node">Halo</h1><p class="text-node"></p><p class="text-node">Konten...</p>

PENTING: TIDAK BOLEH ADA SPASI KOSONG ANTARA TAG! Tag harus langsung bersambung tanpa spasi atau newline.

Instruksi:
- Saya akan menulis konten lengkap dan berkualitas tinggi dalam bahasa ${languageMap[language as keyof typeof languageMap]} dengan nada ${toneMap[tone as keyof typeof toneMap]}
- Saya TIDAK akan berikan saran atau instruksi, saya langsung tulis konten yang diminta
- Jika diminta untuk memperbaiki teks, saya langsung berikan teks yang sudah diperbaiki
- Jika diminta untuk menerjemahkan, saya langsung berikan terjemahan lengkap
- Jika diminta untuk generate konten, saya langsung tulis artikel/konten lengkap
- Saya SELALU gunakan format HTML bersih tanpa markdown
- Saya gunakan tag HTML seperti <p>, <h2>, <h3>, <ul>, <li>, <strong>, <em>
- Saya TIDAK gunakan simbol markdown seperti #, *, -, >, dll
- Saya TIDAK gunakan emoji sebagai bullet points, saya gunakan <ul> dan <li>
- Saya TIDAK menampilkan kode HTML mentah seperti \`\`\`html
- Saya TIDAK memberikan spasi kosong atau enter berlebihan
- Saya TIDAK menggunakan class yang tidak perlu seperti class="text-node" atau class="heading-node"
- Saya hanya menggunakan tag HTML dasar: <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Saya memberikan output yang rapi, bersih, dan langsung bisa digunakan

${context ? `Konteks tambahan: ${context}` : ''}

Saya langsung tulis konten yang diminta dalam format HTML yang bersih. Saya TIDAK berikan instruksi atau saran, saya langsung tulis konten lengkap. Saya TIDAK menampilkan kode HTML mentah, TIDAK memberikan spasi kosong berlebihan, TIDAK menggunakan class yang tidak perlu, TIDAK memberikan spasi kosong antara tag, dan TIDAK memberikan spasi antara > dan <. Tag harus langsung bersambung tanpa spasi. Saya hanya menggunakan tag HTML dasar yang bersih tanpa spasi. Format output: <h1>Judul</h1><p>Paragraf</p><h2>Sub judul</h2><p>Paragraf berikutnya</p>`
  }

  private buildImprovementPrompt(focus: string, language: string, instructions?: string): string {
    const focusMap = {
      'grammar': 'tata bahasa dan ejaan',
      'style': 'gaya penulisan dan ekspresi',
      'clarity': 'kejelasan dan kemudahan pemahaman',
      'tone': 'nada dan suasana penulisan'
    }

    return `Saya adalah seorang editor profesional yang akan memperbaiki teks dengan fokus pada ${focusMap[focus as keyof typeof focusMap]}.

Instruksi:
- Saya perbaiki kesalahan ${focusMap[focus as keyof typeof focusMap]}
- Saya pertahankan makna dan pesan asli
- Saya buat teks lebih mudah dibaca dan dipahami
- Saya gunakan bahasa yang ${language === 'id' ? 'Indonesia' : 'English'} yang baik dan benar
${instructions ? `- ${instructions}` : ''}

Saya langsung berikan teks yang sudah diperbaiki dalam format HTML yang bersih tanpa markdown. Saya TIDAK berikan saran, saya langsung berikan hasil perbaikan.`
  }

  private buildSuggestionPrompt(type: string, language: string, targetAudience?: string): string {
    const typeMap = {
      'content': 'konten dan ide',
      'structure': 'struktur dan organisasi',
      'style': 'gaya dan ekspresi',
      'engagement': 'keterlibatan dan interaksi'
    }

    return `Saya adalah seorang konsultan konten yang akan memberikan saran untuk meningkatkan ${typeMap[type as keyof typeof typeMap]} dari teks yang diberikan.

Instruksi:
- Saya berikan 4-5 saran yang spesifik dan actionable
- Saya fokus pada ${typeMap[type as keyof typeof typeMap]}
- Saran saya relevan dengan konteks teks
- Saya gunakan bahasa ${language === 'id' ? 'Indonesia' : 'English'}
${targetAudience ? `- Saya pertimbangkan target audiens: ${targetAudience}` : ''}

Saya langsung berikan saran dalam format HTML yang bersih menggunakan tag <ul> dan <li> tanpa markdown. Saya TIDAK berikan instruksi, saya langsung berikan saran.`
  }

  private buildExpansionPrompt(language: string): string {
    return `Saya adalah seorang penulis yang akan memperluas dan mengembangkan teks yang diberikan.

Instruksi:
- Saya tambahkan detail, contoh, dan penjelasan yang relevan
- Saya pertahankan struktur dan alur logis
- Saya buat konten lebih komprehensif dan informatif
- Saya gunakan bahasa ${language === 'id' ? 'Indonesia' : 'English'} yang baik
- Saya tambahkan poin-poin yang mendukung ide utama

Saya langsung berikan hasil ekspansi yang lengkap dan terstruktur dengan baik dalam format HTML yang bersih tanpa markdown. Saya TIDAK berikan instruksi, saya langsung berikan konten yang diperluas.`
  }

  private buildTranslationPrompt(targetLanguage: string): string {
    const targetLang = targetLanguage === 'id' ? 'Bahasa Indonesia' : 'English'
    const sourceLang = targetLanguage === 'id' ? 'English' : 'Bahasa Indonesia'
    
    return `Saya adalah seorang penerjemah profesional yang akan menerjemahkan teks dari ${sourceLang} ke ${targetLang}.

Instruksi:
- Saya terjemahkan dengan akurat dan natural
- Saya pertahankan makna dan nuansa asli
- Saya gunakan ${targetLang} yang baik dan benar
- Saya sesuaikan dengan konteks dan budaya ${targetLang}
- Jika ada istilah teknis, saya gunakan padanan yang tepat

Saya langsung berikan terjemahan yang natural dan mudah dipahami dalam format HTML yang bersih tanpa markdown. Saya TIDAK berikan instruksi, saya langsung berikan hasil terjemahan.`
  }

  private buildSummarizationPrompt(maxLength: number): string {
    return `Saya adalah seorang editor yang akan meringkas teks yang diberikan.

Instruksi:
- Saya buat ringkasan yang tidak lebih dari ${maxLength} karakter
- Saya pertahankan poin-poin penting dan informasi kunci
- Saya gunakan bahasa yang jelas dan ringkas
- Saya pastikan ringkasan tetap informatif dan koheren
- Saya fokus pada ide utama dan kesimpulan

Saya langsung berikan ringkasan yang padat namun lengkap dalam format HTML yang bersih tanpa markdown. Saya TIDAK berikan instruksi, saya langsung berikan hasil ringkasan.`
  }

  private buildSmartContentPrompt(language: string): string {
    return `Saya adalah seorang analis konten yang akan menganalisis teks dan memberikan konten cerdas yang komprehensif.

Instruksi:
- Saya berikan ide kreatif berdasarkan teks
- Saya berikan saran perbaikan untuk gaya dan struktur
- Saya berikan rekomendasi untuk meningkatkan engagement
- Saya gunakan bahasa ${language === 'id' ? 'Indonesia' : 'English'} yang baik
- Saya berikan output yang terstruktur dan mudah dipahami

Saya langsung berikan analisis lengkap dalam format HTML yang bersih tanpa markdown. Saya TIDAK berikan instruksi, saya langsung berikan konten analisis yang lengkap.`
  }

  private buildUserPrompt(text: string, action: string): string {
    const actionMap = {
      'generate': 'Berdasarkan teks berikut, generate konten yang relevan dan informatif:',
      'improve': 'Perbaiki teks berikut:',
      'suggest': 'Berikan saran untuk teks berikut:',
      'expand': 'Perluas dan kembangkan teks berikut:',
      'translate': 'Terjemahkan teks berikut:',
      'summarize': 'Ringkas teks berikut:',
      'smart': 'Analisis dan berikan konten cerdas untuk teks berikut:'
    }

    return `${actionMap[action as keyof typeof actionMap]}

"${text}"

Saya langsung berikan konten yang diminta dalam format HTML yang bersih tanpa markdown. Saya TIDAK berikan instruksi atau saran, saya langsung tulis konten lengkap. Saya TIDAK menampilkan kode HTML mentah, TIDAK memberikan spasi kosong berlebihan, TIDAK menggunakan class yang tidak perlu, TIDAK memberikan spasi kosong antara tag, dan TIDAK memberikan spasi antara > dan <. Tag harus langsung bersambung tanpa spasi. Saya hanya menggunakan tag HTML dasar yang bersih tanpa spasi. Format: <h1>Judul</h1><p>Paragraf</p><h2>Sub judul</h2><p>Paragraf berikutnya</p>`
  }

  private extractTextFromResponse(response: any): string {
    try {
      const candidates = response.candidates?.[0]
      if (!candidates) {
        throw new Error('No candidates in response')
      }

      const parts = candidates.content?.parts
      if (!parts || parts.length === 0) {
        throw new Error('No content parts in response')
      }

      const text = parts[0]?.text
      if (!text) {
        throw new Error('No text in content parts')
      }

      return text.trim()
    } catch (error) {
      console.error('Error extracting text from Gemini response:', error)
      throw new Error('Failed to extract text from Gemini response')
    }
  }

  private parseSuggestions(text: string): string[] {
    try {
      // Try to parse numbered or bulleted lists
      const lines = text.split('\n').filter(line => line.trim().length > 0)
      const suggestions: string[] = []

      for (const line of lines) {
        const cleanLine = line
          .replace(/^[\d\-•\*\.\s]+/, '') // Remove numbering/bullets
          .trim()
        
        if (cleanLine.length > 0) {
          suggestions.push(cleanLine)
        }
      }

      // If no suggestions found, split by sentences
      if (suggestions.length === 0) {
        return text.split(/[.!?]+/).filter(s => s.trim().length > 10).slice(0, 5)
      }

      return suggestions.slice(0, 5)
    } catch (error) {
      console.error('Error parsing suggestions:', error)
      return [text]
    }
  }

  private parseSmartContent(text: string): {
    ideas: string
    improvements: string
    suggestions: string[]
  } {
    try {
      const sections = text.split(/(?:💡|✨|🎯)/).filter(s => s.trim().length > 0)
      
      if (sections.length >= 3) {
        return {
          ideas: sections[0].replace(/^Ide Kreatif:\s*/i, '').trim(),
          improvements: sections[1].replace(/^Perbaikan Gaya:\s*/i, '').trim(),
          suggestions: this.parseSuggestions(sections[2].replace(/^Saran Engagement:\s*/i, ''))
        }
      }

      // Fallback parsing
      const lines = text.split('\n')
      const ideas: string[] = []
      const improvements: string[] = []
      const suggestions: string[] = []

      let currentSection = 'ideas'
      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.includes('Ide') || trimmed.includes('💡')) {
          currentSection = 'ideas'
        } else if (trimmed.includes('Perbaikan') || trimmed.includes('✨')) {
          currentSection = 'improvements'
        } else if (trimmed.includes('Saran') || trimmed.includes('🎯')) {
          currentSection = 'suggestions'
        } else if (trimmed.length > 0) {
          if (currentSection === 'ideas') ideas.push(trimmed)
          else if (currentSection === 'improvements') improvements.push(trimmed)
          else if (currentSection === 'suggestions') suggestions.push(trimmed)
        }
      }

      return {
        ideas: ideas.join('\n'),
        improvements: improvements.join('\n'),
        suggestions: suggestions
      }
    } catch (error) {
      console.error('Error parsing smart content:', error)
      return {
        ideas: text,
        improvements: text,
        suggestions: [text]
      }
    }
  }
}

// Export singleton instance
export const geminiAIService = new GeminiAIService({
  apiKey: process.env.GEMINI_API_KEY || '',
  model: 'gemini-2.0-flash'
}) 