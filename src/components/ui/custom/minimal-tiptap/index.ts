export * from "./minimal-tiptap"

// Extensions
export { YouTube } from "./extensions/youtube"
export { PDF } from "./extensions/pdf"

// AI Components
export { AISection } from "./components/section/ai"

// AI Services
export { aiService, AIService } from "./services"
export type { 
  AIGenerationOptions, 
  AIImprovementOptions, 
  AISuggestionOptions 
} from "./services"

// Gemini AI Service
export { geminiAIService, GeminiAIService } from "./services"
export type { 
  GeminiAIConfig,
  GeminiGenerationOptions, 
  GeminiImprovementOptions, 
  GeminiSuggestionOptions 
} from "./services"

// AI Factory
export { AIFactory } from "./services/ai-factory"

// AI Configuration
export { 
  createAIConfig, 
  validateAIConfig, 
  defaultAIConfig 
} from "./config/ai-config"
export type { AIConfig } from "./config/ai-config" 