/**
 * Google Gemini AI Integration
 *
 * IMPORTANT: AI must be completely invisible to users.
 * Never expose "AI" or "Powered by..." labels in the UI.
 */

import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'

// Configuration
const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY || ''
const GEMINI_MODEL = process.env.GOOGLE_GEMINI_MODEL || 'gemini-2.0-flash-exp'

// Initialize the AI client
let genAI: GoogleGenerativeAI | null = null
let model: GenerativeModel | null = null

/**
 * Initialize the Gemini client
 * Call this once at app startup
 */
export function initializeGemini(): void {
  if (!GEMINI_API_KEY) {
    console.warn('GOOGLE_GEMINI_API_KEY not found. AI features will use fallback behavior.')
    return
  }

  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    model = genAI.getGenerativeModel({ model: GEMINI_MODEL })
    console.log('✨ Gemini AI initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Gemini:', error)
    genAI = null
    model = null
  }
}

/**
 * Check if AI is available
 */
export function isAIAvailable(): boolean {
  return model !== null
}

/**
 * Generate text from a prompt
 *
 * @param prompt - The input prompt
 * @param options - Generation options
 * @returns Generated text or null if AI unavailable
 */
export async function generateText(
  prompt: string,
  options?: {
    temperature?: number
    maxTokens?: number
    systemInstruction?: string
  }
): Promise<string | null> {
  if (!model) {
    console.warn('AI not available, returning null')
    return null
  }

  try {
    const generationConfig = {
      temperature: options?.temperature ?? 0.9,
      maxOutputTokens: options?.maxTokens ?? 1024,
    }

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    })

    const response = result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error('Error generating text:', error)
    return null
  }
}

/**
 * Generate text with streaming (for longer responses)
 *
 * @param prompt - The input prompt
 * @param onChunk - Callback for each text chunk
 * @param options - Generation options
 * @returns Full generated text or null if AI unavailable
 */
export async function generateTextStream(
  prompt: string,
  onChunk: (chunk: string) => void,
  options?: {
    temperature?: number
    maxTokens?: number
  }
): Promise<string | null> {
  if (!model) {
    console.warn('AI not available, returning null')
    return null
  }

  try {
    const generationConfig = {
      temperature: options?.temperature ?? 0.9,
      maxOutputTokens: options?.maxTokens ?? 2048,
    }

    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    })

    let fullText = ''

    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      fullText += chunkText
      onChunk(chunkText)
    }

    return fullText
  } catch (error) {
    console.error('Error generating text stream:', error)
    return null
  }
}

/**
 * Multi-turn conversation
 * Maintains conversation history for context
 */
export class GeminiConversation {
  private history: Array<{ role: 'user' | 'model'; text: string }> = []
  private model: GenerativeModel | null

  constructor() {
    this.model = model
  }

  /**
   * Send a message and get a response
   */
  async sendMessage(message: string): Promise<string | null> {
    if (!this.model) {
      return null
    }

    try {
      // Add user message to history
      this.history.push({ role: 'user', text: message })

      // Build conversation context
      const contents = this.history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }))

      const result = await this.model.generateContent({ contents })
      const response = result.response.text()

      // Add model response to history
      this.history.push({ role: 'model', text: response })

      return response
    } catch (error) {
      console.error('Error in conversation:', error)
      return null
    }
  }

  /**
   * Get conversation history
   */
  getHistory() {
    return [...this.history]
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.history = []
  }
}

/**
 * Helper: Generate creative game content
 *
 * Example: "Generate a whimsical story about a watermelon"
 */
export async function generateGameContent(
  type: 'story' | 'riddle' | 'description' | 'dialogue',
  context: string,
  options?: {
    style?: 'playful' | 'mysterious' | 'calming' | 'thoughtful'
    length?: 'short' | 'medium' | 'long'
  }
): Promise<string | null> {
  const lengthMap = {
    short: '1-2 sentences',
    medium: '3-5 sentences',
    long: '1-2 paragraphs',
  }

  const prompt = `Generate a ${options?.style || 'thoughtful'} ${type} ${
    options?.length ? `(${lengthMap[options.length]})` : ''
  } based on: ${context}

Important:
- Keep it light and engaging
- Avoid anxiety-inducing content
- Make it accessible and clear
- Add a touch of whimsy or curiosity`

  return generateText(prompt, {
    temperature: 0.9,
    maxTokens: options?.length === 'long' ? 512 : 256,
  })
}

/**
 * Helper: Make content more accessible
 * Simplifies complex text for better understanding
 */
export async function simplifyText(text: string): Promise<string | null> {
  const prompt = `Simplify this text to be more accessible and clear, while keeping its meaning:

"${text}"

Make it:
- Easy to understand
- Concise and direct
- Neurodivergent-friendly
- Warm and welcoming`

  return generateText(prompt, { temperature: 0.3 })
}

/**
 * Helper: Generate variations
 * Creates similar but different content for replayability
 */
export async function generateVariation(
  originalContent: string,
  variationHint?: string
): Promise<string | null> {
  const prompt = `Create a variation of this content that's similar but different:

Original: "${originalContent}"

${variationHint ? `Variation hint: ${variationHint}` : ''}

Keep the same tone and length, but change the details to make it fresh.`

  return generateText(prompt, { temperature: 1.0 })
}

// Initialize on module load (server-side only)
if (typeof window === 'undefined') {
  initializeGemini()
}
