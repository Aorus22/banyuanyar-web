export interface AIConfig {
  // API Configuration
  apiKey?: string
  baseUrl?: string
  timeout?: number
  
  // AI Provider Selection
  provider: 'mock' | 'openai' | 'gemini'
  geminiConfig?: {
    apiKey?: string
    model?: 'gemini-2.0-flash' | 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-1.0-pro' | 'gemini-1.0-pro-vision'
    maxTokens?: number
    temperature?: number
  }
  
  // Feature Toggles
  features: {
    textGeneration: boolean
    contentImprovement: boolean
    suggestions: boolean
    contentExpansion: boolean
    translation: boolean
    summarization: boolean
    smartContent: boolean
  }
  
  // Language Settings
  defaultLanguage: 'id' | 'en'
  supportedLanguages: ('id' | 'en')[]
  
  // Tone and Style Settings
  defaultTone: 'formal' | 'casual' | 'professional' | 'creative'
  availableTones: ('formal' | 'casual' | 'professional' | 'creative')[]
  
  // Content Focus Settings
  improvementFocus: 'grammar' | 'style' | 'clarity' | 'tone'
  suggestionTypes: ('content' | 'structure' | 'style' | 'engagement')[]
  
  // UI Settings
  showTooltips: boolean
  showLoadingStates: boolean
  autoSave: boolean
  
  // Performance Settings
  maxTextLength: number
  batchProcessing: boolean
  cacheResults: boolean
}

export const defaultAIConfig: AIConfig = {
  // API Configuration
  apiKey: undefined,
  baseUrl: undefined,
  timeout: 30000,
  
  // AI Provider Selection
  provider: 'mock',
  geminiConfig: {
    apiKey: undefined,
    model: 'gemini-2.0-flash',
    maxTokens: 2048,
    temperature: 0.7
  },
  
  // Feature Toggles
  features: {
    textGeneration: true,
    contentImprovement: true,
    suggestions: true,
    contentExpansion: true,
    translation: true,
    summarization: true,
    smartContent: true,
  },
  
  // Language Settings
  defaultLanguage: 'id',
  supportedLanguages: ['id', 'en'],
  
  // Tone and Style Settings
  defaultTone: 'formal',
  availableTones: ['formal', 'casual', 'professional', 'creative'],
  
  // Content Focus Settings
  improvementFocus: 'grammar',
  suggestionTypes: ['content', 'structure', 'style', 'engagement'],
  
  // UI Settings
  showTooltips: true,
  showLoadingStates: true,
  autoSave: false,
  
  // Performance Settings
  maxTextLength: 5000,
  batchProcessing: false,
  cacheResults: true,
}

export const createAIConfig = (overrides: Partial<AIConfig> = {}): AIConfig => {
  return {
    ...defaultAIConfig,
    ...overrides,
  }
}

export const validateAIConfig = (config: AIConfig): string[] => {
  const errors: string[] = []
  
  if (config.maxTextLength < 100) {
    errors.push('maxTextLength must be at least 100 characters')
  }
  
  if (config.timeout && config.timeout < 5000) {
    errors.push('timeout must be at least 5000ms')
  }
  
  if (config.features.translation && config.supportedLanguages.length < 2) {
    errors.push('translation feature requires at least 2 supported languages')
  }
  
  return errors
} 