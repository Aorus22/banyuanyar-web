# Minimal Tiptap Editor with AI Features

A powerful rich text editor built with Tiptap and enhanced with AI capabilities for content creation, improvement, and optimization.

## Features

### Core Editor Features
- **Rich Text Formatting**: Bold, italic, underline, strikethrough, code
- **Headings**: H1-H6 with proper hierarchy
- **Lists**: Ordered and unordered lists
- **Links**: Editable links with validation
- **Images**: Drag & drop support with resizing
- **Code Blocks**: Syntax highlighting support
- **Tables**: Resizable columns and rows
- **Blockquotes**: Styled quote blocks
- **Text Colors**: Custom color picker
- **Horizontal Rules**: Visual separators

### 🤖 AI-Powered Features

#### 1. Text Generation (✨)
- Generate AI-powered content based on selected text
- Multiple tone options: formal, casual, professional, creative
- Indonesian and English language support
- Context-aware content generation

#### 2. Content Improvement (🪄)
- Grammar and style correction
- Language refinement and optimization
- Focus areas: grammar, style, clarity, tone
- Maintains original meaning while improving quality

#### 3. Smart Suggestions (💡)
- AI-powered content recommendations
- Multiple suggestion types: content, structure, style, engagement
- Actionable improvement tips
- Context-aware suggestions

#### 4. Content Expansion (⚡)
- Expand short text with detailed explanations
- Add context, examples, and insights
- Maintain logical flow and coherence
- Rich content development

#### 5. Translation (🌐)
- Multi-language translation support
- Indonesian ↔ English translation
- Context preservation
- Natural language output

#### 6. Text Summarization (📝)
- Intelligent text summarization
- Configurable summary length
- Key point extraction
- Maintains essential information

#### 7. Smart Content Generation (🧠)
- Comprehensive AI content creation
- Combines multiple AI models
- Generates ideas, improvements, and suggestions
- One-click comprehensive content enhancement

## Installation

```bash
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
```

## Quick Start with Gemini

### 1. Setup Gemini API Key

1. Kunjungi [Google AI Studio](https://aistudio.google.com/)
2. Login dengan Google account
3. Buat project baru
4. Copy API key yang diberikan

### 2. Environment Setup

```bash
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

**PENTING**: Gunakan `NEXT_PUBLIC_` prefix agar environment variable bisa diakses di client-side.

### 3. Basic Usage

```tsx
import { MinimalTiptapEditor, createAIConfig, AIFactory } from "@/components/ui/custom/minimal-tiptap"

// Konfigurasi Gemini
const aiConfig = createAIConfig({
  provider: 'gemini',
  geminiConfig: {
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-2.0-flash'
  }
})

// Buat AI service
const aiService = AIFactory.createService(aiConfig)

// Gunakan dalam komponen
function MyEditor() {
  return (
    <MinimalTiptapEditor
      placeholder="Start typing with AI assistance..."
      className="min-h-[400px]"
    />
  )
}
```

## Basic Usage

```tsx
import { MinimalTiptapEditor } from "@/components/ui/custom/minimal-tiptap"

function MyComponent() {
  const [content, setContent] = useState("")

  return (
    <MinimalTiptapEditor
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
      className="min-h-[400px]"
    />
  )
}
```

## AI Features Usage

### 1. Basic AI Operations

```tsx
import { MinimalTiptapEditor, aiService } from "@/components/ui/custom/minimal-tiptap"

// The AI features are automatically available in the toolbar
// Users can select text and use the AI buttons
```

### 2. Programmatic AI Usage

```tsx
import { aiService } from "@/components/ui/custom/minimal-tiptap"

// Generate text
const generatedText = await aiService.generateText({
  prompt: "Write about sustainable development",
  tone: "professional",
  language: "id"
})

// Improve content
const improvedText = await aiService.improveText({
  text: "Your text here",
  focus: "grammar",
  language: "id"
})

// Get suggestions
const suggestions = await aiService.getSuggestions({
  text: "Your text here",
  type: "content",
  language: "id"
})
```

## Configuration

### AI Configuration

```tsx
import { createAIConfig } from "@/components/ui/custom/minimal-tiptap"

const aiConfig = createAIConfig({
  apiKey: "your-openai-api-key",
  baseUrl: "https://api.openai.com/v1",
  features: {
    textGeneration: true,
    contentImprovement: true,
    translation: true,
    // ... other features
  },
  defaultLanguage: "id",
  defaultTone: "formal"
})
```

### Custom AI Service

```tsx
import { AIService } from "@/components/ui/custom/minimal-tiptap"

const customAIService = new AIService(
  "your-api-key",
  "https://your-ai-api.com"
)

// Use custom service
const result = await customAIService.generateText({
  prompt: "Your prompt",
  tone: "creative"
})
```

## API Reference

### AI Providers

#### Google Gemini (Recommended)
- **Cost-effective**: Gratis untuk 15 requests per menit
- **High Quality**: AI canggih dari Google
- **Fast Response**: Latency rendah
- **Indonesian Support**: Optimized untuk Bahasa Indonesia

#### OpenAI
- **Powerful**: GPT-4 dan model canggih lainnya
- **Wide Range**: Banyak model dan fitur
- **Cost**: Berbayar per token
- **Reliable**: Infrastructure yang stabil

#### Mock AI
- **Free**: Tidak memerlukan API key
- **Demo**: Perfect untuk testing dan demo
- **Offline**: Bekerja tanpa internet
- **Limited**: Fitur terbatas

### AIService Methods

#### `generateText(options: AIGenerationOptions)`
Generates AI-powered text based on a prompt.

```tsx
interface AIGenerationOptions {
  prompt: string
  maxLength?: number
  tone?: 'formal' | 'casual' | 'professional' | 'creative'
  language?: 'id' | 'en'
}
```

#### `improveText(options: AIImprovementOptions)`
Improves existing text using AI.

```tsx
interface AIImprovementOptions {
  text: string
  focus?: 'grammar' | 'style' | 'clarity' | 'tone'
  language?: 'id' | 'en'
}
```

#### `getSuggestions(options: AISuggestionOptions)`
Gets AI-powered suggestions for text improvement.

```tsx
interface AISuggestionOptions {
  text: string
  type?: 'content' | 'structure' | 'style' | 'engagement'
  language?: 'id' | 'en'
}
```

#### `expandContent(text: string, language?: 'id' | 'en')`
Expands text with additional AI-generated content.

#### `translateText(text: string, targetLanguage: 'id' | 'en')`
Translates text between supported languages.

#### `summarizeText(text: string, maxLength?: number)`
Summarizes long text to specified length.

## Integration with Real AI APIs

### Google Gemini (Recommended)

Gemini adalah pilihan terbaik untuk AI yang cost-effective dan powerful:

1. **Dapatkan API Key**:
   - Kunjungi [Google AI Studio](https://aistudio.google.com/)
   - Buat project baru dan dapatkan API key
   - Gemini Pro gratis untuk 15 requests per menit

2. **Konfigurasi Gemini**:
```tsx
import { createAIConfig, AIFactory } from "@/components/ui/custom/minimal-tiptap"

const aiConfig = createAIConfig({
  provider: 'gemini',
  geminiConfig: {
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-pro',
    maxTokens: 2048,
    temperature: 0.7
  }
})

const aiService = AIFactory.createService(aiConfig)
```

3. **Environment Variable**:
```bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
```

### OpenAI

Untuk menggunakan OpenAI GPT models:

1. **Set API Configuration**:
```tsx
const aiConfig = createAIConfig({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  baseUrl: "https://api.openai.com/v1"
})
```

2. **Update AI Service**:
```tsx
const aiService = new AIService(
  process.env.OPENAI_API_KEY,
  "https://api.openai.com/v1"
)
```

### Mock AI (Default)

Untuk demo dan testing tanpa API key:
```tsx
const aiConfig = createAIConfig({
  provider: 'mock'
})
```

## Styling

The AI toolbar buttons use the same styling as other toolbar buttons:

```css
/* Custom AI button styles */
.ai-button {
  @apply h-8 w-8 p-0;
}

.ai-button:hover {
  @apply bg-accent;
}

.ai-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo page at `/admin/components-demo/minimal-tiptap-demo`

## Changelog

### v2.0.0 - AI Features Release
- ✨ Added AI text generation
- 🪄 Added content improvement
- 💡 Added smart suggestions
- ⚡ Added content expansion
- 🌐 Added translation support
- 📝 Added text summarization
- 🧠 Added smart content generation
- ⚙️ Added AI configuration system
- 🔧 Added custom AI service support 