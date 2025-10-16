# AI Integration Guide

> How to use AI invisibly in VeryGoodMelon.Fun games

## Philosophy: Invisible Magic

**CRITICAL:** AI must be completely invisible to users. They should never know they're interacting with AI—they should just experience something that feels alive, responsive, or impossibly smart.

### The Goal
Create "How did it know that?" moments without revealing "It's AI!"

### Never Do This
- ❌ Show "AI" labels or branding
- ❌ Display "AI is generating..." messages
- ❌ Expose "Powered by..." text
- ❌ Use "typing..." indicators for AI responses
- ❌ Mention machine learning or models

### Always Do This
- ✅ Make responses feel instant or natural
- ✅ Have deterministic fallbacks
- ✅ Handle errors gracefully (never "AI failed")
- ✅ Make it feel like magic, not technology

---

## Setup

### Environment Variables
```env
# .env.local (never commit this file)
GOOGLE_GEMINI_API_KEY=your_key_here
GOOGLE_GEMINI_MODEL=gemini-2.0-flash-exp
GOOGLE_PROJECT_ID=your_project_id
```

### Initialization
AI initializes automatically on import (server-side only):

```typescript
import { isAIAvailable, generateText } from '@/lib/ai/gemini'

// Check if AI is available
if (isAIAvailable()) {
  // AI is ready
} else {
  // Fall back to deterministic behavior
}
```

---

## Core Functions

### 1. Generate Text
Simple text generation for short content.

```typescript
import { generateText } from '@/lib/ai/gemini'

const result = await generateText('Write a calming description of a garden', {
  temperature: 0.9,  // Higher = more creative (0.0-2.0)
  maxTokens: 256,    // Limit response length
})

// result: "A peaceful garden with gentle sunlight..."
```

**Use Cases:**
- Short descriptions
- Single-response content
- Quick variations

**Best Practices:**
- Keep prompts clear and specific
- Set appropriate temperature (0.3 = consistent, 0.9 = creative, 1.5 = wild)
- Limit maxTokens to prevent long responses
- Always have fallback content

---

### 2. Stream Text
For longer content, stream chunks as they arrive.

```typescript
import { generateTextStream } from '@/lib/ai/gemini'

const fullText = await generateTextStream(
  'Tell a short story about a watermelon',
  (chunk) => {
    // Update UI with each chunk (invisibly!)
    setText(prev => prev + chunk)
  },
  {
    temperature: 1.0,
    maxTokens: 512,
  }
)
```

**Use Cases:**
- Longer stories or descriptions
- Real-time content generation
- Better UX for slow responses

**Best Practices:**
- Update UI smoothly (no "typing..." indicators)
- Show content immediately, not after full generation
- Handle stream interruptions gracefully

---

### 3. Generate Game Content
Pre-configured helper for common game content types.

```typescript
import { generateGameContent } from '@/lib/ai/gemini'

// Generate a playful story
const story = await generateGameContent(
  'story',
  'a pixelated watermelon on an adventure',
  {
    style: 'playful',    // 'playful' | 'mysterious' | 'calming' | 'thoughtful'
    length: 'short',     // 'short' | 'medium' | 'long'
  }
)

// Generate a riddle
const riddle = await generateGameContent(
  'riddle',
  'the color green',
  { style: 'mysterious', length: 'short' }
)

// Generate a description
const desc = await generateGameContent(
  'description',
  'a peaceful forest',
  { style: 'calming', length: 'medium' }
)

// Generate dialogue
const dialogue = await generateGameContent(
  'dialogue',
  'meeting a friendly stranger',
  { style: 'thoughtful', length: 'medium' }
)
```

**Content Types:**
- `story` - Narrative content
- `riddle` - Mysterious questions or puzzles
- `description` - Descriptive passages
- `dialogue` - Conversational text

**Styles:**
- `playful` - Light, fun, whimsical
- `mysterious` - Intriguing, curious, enigmatic
- `calming` - Peaceful, gentle, soothing
- `thoughtful` - Reflective, meaningful, deep

**Lengths:**
- `short` - 1-2 sentences
- `medium` - 3-5 sentences
- `long` - 1-2 paragraphs

---

### 4. Conversations
Multi-turn dialogues with context memory.

```typescript
import { GeminiConversation } from '@/lib/ai/gemini'

const conversation = new GeminiConversation()

// First message
const response1 = await conversation.sendMessage('My favorite color is green.')
// AI: "Green is a wonderful choice! It's the color of nature..."

// Follow-up (AI remembers context)
const response2 = await conversation.sendMessage('What is my favorite color?')
// AI: "You mentioned that green is your favorite color..."

// Get history
const history = conversation.getHistory()
// [{ role: 'user', text: '...' }, { role: 'model', text: '...' }, ...]

// Clear history
conversation.clearHistory()
```

**Use Cases:**
- The Conversation Bench game
- Interactive storytelling
- Guided experiences
- Contextual responses

**Best Practices:**
- Clear history when conversation ends
- Limit history length (trim old messages if needed)
- Handle context reset gracefully

---

### 5. Utility Functions

#### Simplify Text
Make complex text more accessible.

```typescript
import { simplifyText } from '@/lib/ai/gemini'

const complex = "The implementation of algorithmic paradigms necessitates comprehensive evaluation."

const simple = await simplifyText(complex)
// "When we use computer programs, we need to check if they work well."
```

**Use Cases:**
- Making game instructions clearer
- Adapting content for different reading levels
- Neurodivergent-friendly text

#### Generate Variations
Create similar but different content for replayability.

```typescript
import { generateVariation } from '@/lib/ai/gemini'

const original = "The red watermelon sat in the sunny field."

const variation = await generateVariation(
  original,
  "make it about a different fruit"  // Optional hint
)
// "A ripe golden pineapple rested under the warm afternoon sun."
```

**Use Cases:**
- Procedural content generation
- Replayability without repetition
- Daily/hourly content updates

---

## Patterns & Examples

### Pattern 1: Invisible Suggestions

```typescript
// ✅ GOOD: AI suggests without revealing itself
async function getPlantSuggestion(userStyle: string) {
  const suggestion = await generateText(
    `Based on a ${userStyle} garden style, suggest one complementary plant.
    Just the plant name, no explanation.`,
    { temperature: 0.8, maxTokens: 20 }
  )

  // User sees: "Try adding a fern"
  // User thinks: "Wow, this app understands my style!"
}

// ❌ BAD: Exposes AI
function getBadSuggestion() {
  return "Our AI recommends: Lavender"  // NO!
}
```

---

### Pattern 2: Seamless Fallbacks

```typescript
// ✅ GOOD: Graceful degradation
async function getWisdom(): Promise<string> {
  const aiWisdom = await generateGameContent(
    'description',
    'daily wisdom',
    { style: 'thoughtful', length: 'short' }
  )

  if (aiWisdom) {
    return aiWisdom
  }

  // Fallback to curated content
  return CURATED_WISDOM[Math.floor(Math.random() * CURATED_WISDOM.length)]
}

// User never knows if it's AI or curated—both feel intentional
```

---

### Pattern 3: Contextual Adaptation

```typescript
// ✅ GOOD: AI adapts to user without revealing how
let userPreference: 'calm' | 'playful' | 'mysterious' = 'calm'

async function generateContent(context: string) {
  const content = await generateGameContent(
    'description',
    context,
    { style: userPreference, length: 'medium' }
  )

  return content
}

// User clicks "playful" preset
function onPresetChange(preset: string) {
  userPreference = preset as any
  // Future content adapts invisibly
}
```

---

### Pattern 4: Procedural Replayability

```typescript
// ✅ GOOD: Infinite variations without repetition
async function getDailyContent(seed: string) {
  const cached = getFromCache(seed)
  if (cached) return cached

  const content = await generateGameContent(
    'story',
    `Create unique content with theme: ${seed}`,
    { style: 'thoughtful', length: 'medium' }
  )

  cacheContent(seed, content)
  return content
}

// Each day, user, or session gets unique content
// Feels handcrafted, not algorithmic
```

---

## Error Handling

### Never Expose AI Errors

```typescript
// ✅ GOOD: Graceful error handling
async function getContent(): Promise<string> {
  try {
    const content = await generateText(prompt)
    return content || FALLBACK_CONTENT
  } catch (error) {
    console.error('Content generation failed:', error)
    return FALLBACK_CONTENT  // User never knows
  }
}

// ❌ BAD: Exposes AI failure
function getBadContent() {
  try {
    return await generateText(prompt)
  } catch (error) {
    return "AI generation failed. Please try again."  // NO!
  }
}
```

---

## Testing

### Integration Tests (Real API)

We test with REAL API calls, NO MOCKS:

```typescript
// tests/integration/gemini.test.ts
describe('Gemini Integration', () => {
  it('should generate text from prompt', async () => {
    const result = await generateText('Say hello in a playful way')

    expect(result).not.toBeNull()
    expect(typeof result).toBe('string')
    expect(result!.length).toBeGreaterThan(0)
  }, 30000) // 30s timeout for API call
})
```

Run integration tests:
```bash
npm run test:integration
```

**Why real API tests?**
- Ensures AI actually works in production
- Catches API changes early
- Validates prompts and responses
- No mock drift

---

## Performance Considerations

### 1. Caching
```typescript
const cache = new Map<string, string>()

async function getCachedContent(key: string) {
  if (cache.has(key)) {
    return cache.get(key)!
  }

  const content = await generateText(prompt)
  cache.set(key, content)
  return content
}
```

### 2. Prefetching
```typescript
// Generate content before user needs it
useEffect(() => {
  prefetchContent()
}, [])

async function prefetchContent() {
  const content = await generateGameContent('story', context)
  setPreloadedContent(content)
}
```

### 3. Streaming for Perceived Speed
```typescript
// Start showing content immediately
await generateTextStream(prompt, (chunk) => {
  setText(prev => prev + chunk)  // Updates in real-time
})
```

---

## Best Practices Summary

### Do
- ✅ Make AI completely invisible
- ✅ Have deterministic fallbacks
- ✅ Cache frequently used content
- ✅ Handle errors gracefully
- ✅ Test with real API
- ✅ Adapt to user preferences invisibly
- ✅ Generate variations for replayability

### Don't
- ❌ Show "AI", "Powered by...", "Generating..." labels
- ❌ Use mocks in integration tests
- ❌ Expose AI failures to users
- ❌ Make users wait without feedback
- ❌ Generate content synchronously (blocks UI)
- ❌ Store user data without consent

---

## Example: Complete Game Implementation

```typescript
// components/games/TinyWisdom.tsx
'use client'

import { useState, useEffect } from 'react'
import { generateGameContent } from '@/lib/ai/gemini'

const FALLBACK_WISDOM = [
  "Every small step forward is still progress.",
  "Kindness costs nothing but means everything.",
]

export function TinyWisdom() {
  const [wisdom, setWisdom] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWisdom()
  }, [])

  async function loadWisdom() {
    const seed = new Date().toDateString() // Same content per day
    const cached = localStorage.getItem(`wisdom:${seed}`)

    if (cached) {
      setWisdom(cached)
      setLoading(false)
      return
    }

    // Generate new wisdom
    const generated = await generateGameContent(
      'description',
      'a thoughtful reflection on life',
      { style: 'thoughtful', length: 'short' }
    )

    const finalWisdom = generated ||
      FALLBACK_WISDOM[Math.floor(Math.random() * FALLBACK_WISDOM.length)]

    localStorage.setItem(`wisdom:${seed}`, finalWisdom)
    setWisdom(finalWisdom)
    setLoading(false)
  }

  return (
    <div className="text-center py-12">
      {loading ? (
        <p className="text-primary-light">Loading...</p>
      ) : (
        <p className="text-2xl text-foreground leading-relaxed">
          {wisdom}
        </p>
      )}
    </div>
  )
}

// User experience:
// - Sees wisdom immediately (cached or generated)
// - Never knows if it's AI or curated
// - Same wisdom for the day (consistent)
// - No "AI" labels anywhere
// - Graceful fallback if generation fails
```

---

## Resources

- **Gemini API Docs:** https://ai.google.dev/docs
- **Project Integration:** `lib/ai/gemini.ts`
- **Integration Tests:** `tests/integration/gemini.test.ts`
- **Type Definitions:** TypeScript for full autocomplete

---

**Remember:** The best AI is the one users don't know they're using.
