/**
 * Gemini AI Integration Tests
 *
 * IMPORTANT: These tests use REAL API calls (no mocks).
 * This ensures our AI integration actually works with the live service.
 *
 * Requirements:
 * - GOOGLE_GEMINI_API_KEY must be set in .env.local
 * - Tests will consume API quota
 * - Tests may be slower due to network calls
 */

import { describe, it, expect, beforeAll } from 'vitest'
import {
  initializeGemini,
  isAIAvailable,
  generateText,
  generateTextStream,
  generateGameContent,
  simplifyText,
  generateVariation,
  GeminiConversation,
} from '@/lib/ai/gemini'

describe('Gemini AI Integration (Real API)', () => {
  beforeAll(() => {
    // Initialize Gemini before tests
    initializeGemini()
  })

  describe('Initialization', () => {
    it('should initialize Gemini successfully', () => {
      expect(isAIAvailable()).toBe(true)
    })
  })

  describe('generateText', () => {
    it('should generate text from a simple prompt', async () => {
      const result = await generateText('Say hello in a playful way')

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      expect(result!.length).toBeGreaterThan(0)
      console.log('✅ Generated text:', result)
    }, 30000) // 30s timeout for API call

    it('should handle temperature parameter', async () => {
      const result = await generateText('Generate a number between 1 and 10', {
        temperature: 0.1, // Low temperature for consistent output
      })

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      console.log('✅ Low-temperature result:', result)
    }, 30000)

    it('should handle max tokens parameter', async () => {
      const result = await generateText(
        'Tell me a very long story about a watermelon',
        {
          maxTokens: 50, // Limit output
        }
      )

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      // Result should be relatively short due to token limit
      expect(result!.split(' ').length).toBeLessThan(100)
      console.log('✅ Token-limited result:', result)
    }, 30000)
  })

  describe('generateTextStream', () => {
    it('should stream text in chunks', async () => {
      const chunks: string[] = []

      const result = await generateTextStream(
        'Count from 1 to 5 slowly',
        (chunk) => {
          chunks.push(chunk)
        }
      )

      expect(result).not.toBeNull()
      expect(chunks.length).toBeGreaterThan(0)
      expect(chunks.join('')).toBe(result)
      console.log('✅ Streamed', chunks.length, 'chunks')
      console.log('✅ Full result:', result)
    }, 30000)
  })

  describe('generateGameContent', () => {
    it('should generate a playful story', async () => {
      const result = await generateGameContent('story', 'a pixelated watermelon', {
        style: 'playful',
        length: 'short',
      })

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      expect(result!.length).toBeGreaterThan(0)
      console.log('✅ Playful story:', result)
    }, 30000)

    it('should generate a mysterious riddle', async () => {
      const result = await generateGameContent('riddle', 'the color green', {
        style: 'mysterious',
        length: 'short',
      })

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      console.log('✅ Mysterious riddle:', result)
    }, 30000)

    it('should generate calming descriptions', async () => {
      const result = await generateGameContent(
        'description',
        'a peaceful garden',
        {
          style: 'calming',
          length: 'medium',
        }
      )

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      console.log('✅ Calming description:', result)
    }, 30000)
  })

  describe('simplifyText', () => {
    it('should simplify complex text', async () => {
      const complexText =
        'The implementation of algorithmic paradigms necessitates comprehensive evaluation of computational efficacy.'

      const result = await simplifyText(complexText)

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      expect(result!.length).toBeGreaterThan(0)
      // Simplified text should be different from original
      expect(result).not.toBe(complexText)
      console.log('✅ Original:', complexText)
      console.log('✅ Simplified:', result)
    }, 30000)
  })

  describe('generateVariation', () => {
    it('should generate a variation of content', async () => {
      const original = 'The red watermelon sat in the sunny field.'

      const result = await generateVariation(original)

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      // Variation should be different from original
      expect(result).not.toBe(original)
      console.log('✅ Original:', original)
      console.log('✅ Variation:', result)
    }, 30000)

    it('should follow variation hints', async () => {
      const original = 'The watermelon was red and juicy.'
      const hint = 'make it about a different fruit'

      const result = await generateVariation(original, hint)

      expect(result).not.toBeNull()
      expect(typeof result).toBe('string')
      // Should mention a different fruit
      expect(result!.toLowerCase()).not.toContain('watermelon')
      console.log('✅ Original:', original)
      console.log('✅ Variation with hint:', result)
    }, 30000)
  })

  describe('GeminiConversation', () => {
    it('should maintain conversation context', async () => {
      const conversation = new GeminiConversation()

      // First message
      const response1 = await conversation.sendMessage(
        'My favorite color is green.'
      )
      expect(response1).not.toBeNull()
      console.log('✅ Response 1:', response1)

      // Second message (should remember context)
      const response2 = await conversation.sendMessage('What is my favorite color?')
      expect(response2).not.toBeNull()
      expect(response2!.toLowerCase()).toContain('green')
      console.log('✅ Response 2:', response2)

      // Check history
      const history = conversation.getHistory()
      expect(history.length).toBe(4) // 2 user + 2 model messages
      console.log('✅ Conversation history length:', history.length)
    }, 60000) // 60s timeout for multiple API calls

    it('should clear history', async () => {
      const conversation = new GeminiConversation()

      await conversation.sendMessage('Hello')
      expect(conversation.getHistory().length).toBeGreaterThan(0)

      conversation.clearHistory()
      expect(conversation.getHistory().length).toBe(0)
    }, 30000)
  })

  describe('Error Handling', () => {
    it('should handle invalid prompts gracefully', async () => {
      const result = await generateText('')

      // Should either return empty/null or handle gracefully
      expect(result === null || result === '' || typeof result === 'string').toBe(
        true
      )
    }, 30000)
  })
})
