/**
 * Token Manager Integration Tests
 * Demonstrates caching, rate limiting, and efficiency features
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateCached,
  generateDaily,
  buildPrompt,
  generateBatch,
  getTokenStats,
  clearAICache,
} from '@/lib/ai/token-manager'

describe('Token Manager Integration (Real API)', () => {
  beforeEach(() => {
    // Clear cache before each test for consistency
    clearAICache()
  })

  describe('Caching', () => {
    it('should cache results and return same value on second call', async () => {
      const key = 'test-cache-1'
      const prompt = 'Generate a random number and say only that number'

      // First call - should hit API
      const result1 = await generateCached(key, prompt, {
        maxTokens: 50,
        cacheDuration: 5 * 60 * 1000, // 5 minutes
      })

      // Second call - should return cached result (same value)
      const result2 = await generateCached(key, prompt, {
        maxTokens: 50,
        cacheDuration: 5 * 60 * 1000,
      })

      expect(result1).not.toBeNull()
      expect(result2).not.toBeNull()
      expect(result1).toBe(result2) // Same cached value

      console.log('✅ First call result:', result1)
      console.log('✅ Second call result (cached):', result2)
      console.log('✅ Cache hit confirmed - same value returned')
    }, 30000)

    it('should respect cache duration and regenerate after expiry', async () => {
      const key = 'test-cache-expire'
      const prompt = 'Say hello'

      // First call with 1 second cache
      const result1 = await generateCached(key, prompt, {
        maxTokens: 50,
        cacheDuration: 1000, // 1 second
      })

      // Immediately - should return cached
      const result2 = await generateCached(key, prompt, {
        maxTokens: 50,
        cacheDuration: 1000,
      })

      expect(result1).toBe(result2)

      // Wait for cache to expire
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // After expiry - should regenerate (different value)
      const result3 = await generateCached(key, prompt, {
        maxTokens: 50,
        cacheDuration: 1000,
      })

      expect(result3).not.toBeNull()
      // Note: result3 might be the same by chance, but the cache entry is new

      console.log('✅ Initial:', result1)
      console.log('✅ Cached:', result2)
      console.log('✅ After expiry:', result3)
    }, 35000)
  })

  describe('Daily Content Pattern', () => {
    it('should cache daily content for 24 hours', async () => {
      let apiCallCount = 0

      const generator = async () => {
        apiCallCount++
        return `Daily wisdom #${apiCallCount}`
      }

      // First call - should hit generator
      const result1 = await generateDaily('test-wisdom', generator)

      // Second call - should use cache (same day)
      const result2 = await generateDaily('test-wisdom', generator)

      expect(result1).toBe(result2)
      expect(apiCallCount).toBe(1) // Only called once

      console.log('✅ Daily content cached:', result1)
      console.log('✅ API calls:', apiCallCount)
    }, 5000)
  })

  describe('Efficient Prompts', () => {
    it('should build concise prompts', () => {
      const prompt = buildPrompt({
        task: 'Generate plant name',
        context: 'peaceful garden',
        style: 'calming',
        constraints: ['1-2 words', 'no emoji'],
      })

      expect(prompt).toContain('Generate plant name')
      expect(prompt).toContain('Context: peaceful garden')
      expect(prompt).toContain('Style: calming')
      expect(prompt).toContain('Rules: 1-2 words, no emoji')

      console.log('✅ Efficient prompt built:')
      console.log(prompt)
    })
  })

  describe('Batch Requests', () => {
    it('should batch multiple prompts into single request', async () => {
      const prompts = [
        'Say "one"',
        'Say "two"',
        'Say "three"',
      ]

      const results = await generateBatch(prompts, {
        maxTokens: 100,
      })

      expect(results).toHaveLength(3)
      expect(results.every((r) => r !== null)).toBe(true)

      console.log('✅ Batch results:')
      results.forEach((result, i) => {
        console.log(`  ${i + 1}. ${result}`)
      })
    }, 30000)
  })

  describe('Token Stats', () => {
    it('should track cache statistics', async () => {
      // Generate some cached content
      await generateCached('stats-test-1', 'Hello', { maxTokens: 50 })
      await generateCached('stats-test-2', 'World', { maxTokens: 50 })

      const stats = getTokenStats()

      expect(stats.memoryCacheSize).toBeGreaterThanOrEqual(2)
      expect(stats.requestCounts).toBeDefined()

      console.log('✅ Cache stats:', stats)
    }, 30000)
  })

  describe('Real-World Usage Example', () => {
    it('should demonstrate game content generation with caching', async () => {
      // Simulate generating game content with caching
      const gameId = 'test-game'
      const sessionId = 'session-123'

      // Generate intro text (cached per game)
      const intro = await generateCached(
        `game:${gameId}:intro`,
        buildPrompt({
          task: 'Generate calming intro',
          context: 'peaceful garden game',
          style: 'welcoming',
          constraints: ['2 sentences', 'calm tone'],
        }),
        { maxTokens: 100, cacheDuration: 24 * 60 * 60 * 1000 } // 24 hours
      )

      // Generate daily challenge (cached per day)
      const dailyChallenge = await generateDaily(
        `game:${gameId}:challenge`,
        async () => {
          return 'Today: Find the hidden butterfly in the garden'
        }
      )

      // Generate personalized content (cached per session)
      const personalizedHint = await generateCached(
        `game:${gameId}:hint:${sessionId}`,
        'Give a helpful hint for finding a butterfly',
        { maxTokens: 50, cacheDuration: 30 * 60 * 1000 } // 30 minutes
      )

      expect(intro).not.toBeNull()
      expect(dailyChallenge).not.toBeNull()
      expect(personalizedHint).not.toBeNull()

      console.log('✅ Game intro (24hr cache):', intro)
      console.log('✅ Daily challenge:', dailyChallenge)
      console.log('✅ Personalized hint (30min cache):', personalizedHint)

      // Second call to intro should use cache
      const introCached = await generateCached(
        `game:${gameId}:intro`,
        'This should not be called',
        { maxTokens: 100 }
      )

      expect(introCached).toBe(intro) // Same cached value

      console.log('✅ Cache efficiency confirmed!')
    }, 60000)
  })
})
