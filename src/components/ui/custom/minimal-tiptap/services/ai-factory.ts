import { AIService } from './ai-service'
import { GeminiAIService, GeminiAIConfig } from './gemini-ai-service'
import { AIConfig } from '../config/ai-config'

export class AIFactory {
  /**
   * Create AI service based on configuration
   */
  static createService(config: AIConfig): AIService | GeminiAIService {
    switch (config.provider) {
      case 'gemini':
        if (!config.geminiConfig?.apiKey) {
          throw new Error('Gemini API key is required when provider is set to gemini')
        }
        
        return new GeminiAIService({
          apiKey: config.geminiConfig.apiKey,
          model: config.geminiConfig.model || 'gemini-2.0-flash',
          maxTokens: config.geminiConfig.maxTokens || 2048,
          temperature: config.geminiConfig.temperature || 0.7
        })
      
      case 'openai':
        if (!config.apiKey || !config.baseUrl) {
          throw new Error('OpenAI API key and base URL are required when provider is set to openai')
        }
        
        return new AIService(config.apiKey, config.baseUrl)
      
      case 'mock':
      default:
        return new AIService()
    }
  }

  /**
   * Create AI service with Gemini fallback
   */
  static createServiceWithFallback(config: AIConfig): AIService {
    if (config.provider === 'gemini' && config.geminiConfig?.apiKey) {
      return new AIService(
        config.geminiConfig.apiKey, 
        undefined, 
        true // useGemini = true
      )
    }
    
    if (config.provider === 'openai' && config.apiKey && config.baseUrl) {
      return new AIService(config.apiKey, config.baseUrl)
    }
    
    return new AIService() // Mock AI
  }

  /**
   * Validate configuration for specific provider
   */
  static validateConfig(config: AIConfig): string[] {
    const errors: string[] = []
    
    if (config.provider === 'gemini') {
      if (!config.geminiConfig?.apiKey) {
        errors.push('Gemini API key is required')
      }
      if (config.geminiConfig?.maxTokens && config.geminiConfig.maxTokens < 100) {
        errors.push('Gemini maxTokens must be at least 100')
      }
      if (config.geminiConfig?.temperature && (config.geminiConfig.temperature < 0 || config.geminiConfig.temperature > 2)) {
        errors.push('Gemini temperature must be between 0 and 2')
      }
    }
    
    if (config.provider === 'openai') {
      if (!config.apiKey) {
        errors.push('OpenAI API key is required')
      }
      if (!config.baseUrl) {
        errors.push('OpenAI base URL is required')
      }
    }
    
    return errors
  }

  /**
   * Get available providers
   */
  static getAvailableProviders(): Array<{ value: string; label: string; description: string }> {
    return [
      {
        value: 'mock',
        label: 'Mock AI (Demo)',
        description: 'AI simulasi untuk demo dan testing'
      },
      {
        value: 'gemini',
        label: 'Google Gemini',
        description: 'AI canggih dari Google dengan performa tinggi'
      },
      {
        value: 'openai',
        label: 'OpenAI',
        description: 'AI dari OpenAI (GPT models)'
      }
    ]
  }

  /**
   * Get provider-specific configuration schema
   */
  static getProviderConfigSchema(provider: string) {
    switch (provider) {
      case 'gemini':
        return {
          geminiConfig: {
            apiKey: { type: 'string', required: true, label: 'Gemini API Key' },
            model: { 
              type: 'select', 
              options: [
                { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (Latest & Fastest)' },
                { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (Powerful)' },
                { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (Fast)' },
                { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro (Stable)' },
                { value: 'gemini-1.0-pro-vision', label: 'Gemini 1.0 Pro Vision (Text + Image)' }
              ],
              default: 'gemini-2.0-flash'
            },
            maxTokens: { type: 'number', min: 100, max: 8192, default: 2048, label: 'Max Output Tokens' },
            temperature: { type: 'number', min: 0, max: 2, step: 0.1, default: 0.7, label: 'Temperature (Creativity)' }
          }
        }
      
      case 'openai':
        return {
          apiKey: { type: 'string', required: true, label: 'OpenAI API Key' },
          baseUrl: { type: 'string', required: true, label: 'OpenAI Base URL' }
        }
      
      default:
        return {}
    }
  }
} 