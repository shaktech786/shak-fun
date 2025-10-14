/**
 * Token Efficiency Manager
 *
 * Keeps AI costs low through:
 * - Smart caching (localStorage + memory)
 * - Rate limiting
 * - Token budgets
 * - Efficient prompts
 * - Request deduplication
 */

import { generateText, generateTextStream } from './gemini'

// Token budgets (approximate, Gemini doesn't expose exact counts)
const TOKEN_BUDGETS = {
  SHORT: 100,    // ~75 words
  MEDIUM: 256,   // ~200 words
  LONG: 512,     // ~400 words
} as const

// Cache durations
const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000,        // 5 minutes
  MEDIUM: 30 * 60 * 1000,      // 30 minutes
  LONG: 24 * 60 * 60 * 1000,   // 24 hours
  PERMANENT: Infinity,         // Until cleared
} as const

// Rate limiting
const RATE_LIMITS = {
  PER_MINUTE: 10,
  PER_HOUR: 100,
  PER_DAY: 500,
} as const

interface CacheEntry<T> {
  value: T
  timestamp: number
  expiresAt: number
}

class TokenManager {
  private memoryCache = new Map<string, CacheEntry<any>>()
  private requestCounts = {
    minute: 0,
    hour: 0,
    day: 0,
    lastMinute: Date.now(),
    lastHour: Date.now(),
    lastDay: Date.now(),
  }

  /**
   * Get from cache or generate
   */
  async getCached<T>(
    key: string,
    generator: () => Promise<T>,
    options: {
      duration?: number
      useLocalStorage?: boolean
    } = {}
  ): Promise<T> {
    const duration = options.duration ?? CACHE_DURATION.MEDIUM
    const useLocalStorage = options.useLocalStorage ?? true

    // Check memory cache first
    const memoryCached = this.memoryCache.get(key)
    if (memoryCached && Date.now() < memoryCached.expiresAt) {
      return memoryCached.value
    }

    // Check localStorage
    if (useLocalStorage && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`ai:cache:${key}`)
        if (stored) {
          const parsed: CacheEntry<T> = JSON.parse(stored)
          if (Date.now() < parsed.expiresAt) {
            // Restore to memory cache
            this.memoryCache.set(key, parsed)
            return parsed.value
          }
          // Expired, remove
          localStorage.removeItem(`ai:cache:${key}`)
        }
      } catch (error) {
        console.warn('Cache read failed:', error)
      }
    }

    // Not in cache, generate
    const value = await generator()

    // Cache the result
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      expiresAt: Date.now() + duration,
    }

    this.memoryCache.set(key, entry)

    if (useLocalStorage && typeof window !== 'undefined') {
      try {
        localStorage.setItem(`ai:cache:${key}`, JSON.stringify(entry))
      } catch (error) {
        console.warn('Cache write failed:', error)
      }
    }

    return value
  }

  /**
   * Check if request is rate limited
   */
  isRateLimited(): boolean {
    const now = Date.now()

    // Reset counters if time windows passed
    if (now - this.requestCounts.lastMinute > 60 * 1000) {
      this.requestCounts.minute = 0
      this.requestCounts.lastMinute = now
    }
    if (now - this.requestCounts.lastHour > 60 * 60 * 1000) {
      this.requestCounts.hour = 0
      this.requestCounts.lastHour = now
    }
    if (now - this.requestCounts.lastDay > 24 * 60 * 60 * 1000) {
      this.requestCounts.day = 0
      this.requestCounts.lastDay = now
    }

    // Check limits
    return (
      this.requestCounts.minute >= RATE_LIMITS.PER_MINUTE ||
      this.requestCounts.hour >= RATE_LIMITS.PER_HOUR ||
      this.requestCounts.day >= RATE_LIMITS.PER_DAY
    )
  }

  /**
   * Increment request counter
   */
  incrementRequests(): void {
    this.requestCounts.minute++
    this.requestCounts.hour++
    this.requestCounts.day++
  }

  /**
   * Generate with token budget and caching
   */
  async generateEfficient(
    prompt: string,
    options: {
      maxTokens?: number
      temperature?: number
      cacheKey?: string
      cacheDuration?: number
    } = {}
  ): Promise<string | null> {
    // Check rate limit
    if (this.isRateLimited()) {
      console.warn('Rate limit exceeded, using fallback')
      return null
    }

    // Use cached result if available
    if (options.cacheKey) {
      return this.getCached(
        options.cacheKey,
        async () => {
          this.incrementRequests()
          return generateText(prompt, {
            maxTokens: options.maxTokens ?? TOKEN_BUDGETS.MEDIUM,
            temperature: options.temperature ?? 0.9,
          })
        },
        { duration: options.cacheDuration }
      )
    }

    // Generate without caching
    this.incrementRequests()
    return generateText(prompt, {
      maxTokens: options.maxTokens ?? TOKEN_BUDGETS.MEDIUM,
      temperature: options.temperature ?? 0.9,
    })
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.memoryCache.clear()

    if (typeof window !== 'undefined') {
      const keys = Object.keys(localStorage)
      for (const key of keys) {
        if (key.startsWith('ai:cache:')) {
          localStorage.removeItem(key)
        }
      }
    }
  }

  /**
   * Get cache stats
   */
  getCacheStats() {
    return {
      memoryCacheSize: this.memoryCache.size,
      requestCounts: { ...this.requestCounts },
      isRateLimited: this.isRateLimited(),
    }
  }
}

// Singleton instance
export const tokenManager = new TokenManager()

/**
 * Efficient content generation with automatic caching
 */
export async function generateCached(
  key: string,
  prompt: string,
  options: {
    maxTokens?: number
    temperature?: number
    cacheDuration?: number
  } = {}
): Promise<string | null> {
  return tokenManager.getCached(
    key,
    async () => {
      if (tokenManager.isRateLimited()) {
        return null
      }

      tokenManager.incrementRequests()
      return generateText(prompt, {
        maxTokens: options.maxTokens ?? TOKEN_BUDGETS.MEDIUM,
        temperature: options.temperature ?? 0.9,
      })
    },
    { duration: options.cacheDuration }
  )
}

/**
 * Daily content with automatic caching
 * Perfect for "daily wisdom" or "daily challenge"
 */
export async function generateDaily(
  contentType: string,
  generator: () => Promise<string | null>
): Promise<string | null> {
  const today = new Date().toDateString()
  const key = `daily:${contentType}:${today}`

  return tokenManager.getCached(key, generator, {
    duration: CACHE_DURATION.LONG, // Cache for 24 hours
    useLocalStorage: true,
  })
}

/**
 * Efficient prompt builder
 * Keeps prompts concise to reduce input tokens
 */
export function buildPrompt(parts: {
  task: string
  context?: string
  style?: string
  constraints?: string[]
}): string {
  const lines: string[] = []

  // Task (required)
  lines.push(parts.task)

  // Context (optional)
  if (parts.context) {
    lines.push(`Context: ${parts.context}`)
  }

  // Style (optional)
  if (parts.style) {
    lines.push(`Style: ${parts.style}`)
  }

  // Constraints (optional)
  if (parts.constraints && parts.constraints.length > 0) {
    lines.push(`Rules: ${parts.constraints.join(', ')}`)
  }

  return lines.join('\n')
}

/**
 * Batch similar requests to reduce overhead
 */
export async function generateBatch(
  prompts: string[],
  options: {
    maxTokens?: number
    temperature?: number
  } = {}
): Promise<(string | null)[]> {
  // Check rate limit
  if (tokenManager.isRateLimited()) {
    return prompts.map(() => null)
  }

  // Combine into single request if possible
  if (prompts.length <= 3) {
    const combined = prompts.map((p, i) => `${i + 1}. ${p}`).join('\n')
    tokenManager.incrementRequests()

    const result = await generateText(combined, {
      maxTokens: options.maxTokens ?? TOKEN_BUDGETS.LONG,
      temperature: options.temperature ?? 0.9,
    })

    if (!result) {
      return prompts.map(() => null)
    }

    // Split results
    return result.split('\n').filter((line) => line.trim())
  }

  // Too many prompts, process individually with caching
  return Promise.all(
    prompts.map(async (prompt, i) => {
      return tokenManager.generateEfficient(prompt, {
        ...options,
        cacheKey: `batch:${i}:${prompt.slice(0, 50)}`,
      })
    })
  )
}

/**
 * Get token usage stats
 */
export function getTokenStats() {
  return tokenManager.getCacheStats()
}

/**
 * Clear all AI caches
 */
export function clearAICache() {
  tokenManager.clearCache()
}
