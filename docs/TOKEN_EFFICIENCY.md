# Token Efficiency Guide

> Keeping AI costs low for VeryGoodMelon.Fun

## Overview

This document outlines strategies to minimize AI token usage in two areas:
1. **User-facing AI features** (games, content generation)
2. **AI tool context** (Claude Code, Copilot reading docs)

---

## User-Facing AI Efficiency

### Smart Caching System

**Token Manager** (`lib/ai/token-manager.ts`) provides:

#### 1. Multi-Level Caching
```typescript
import { generateCached } from '@/lib/ai/token-manager'

// Cached for 30 minutes by default
const content = await generateCached(
  'unique-key',
  'Generate a calming description',
  { maxTokens: 256, cacheDuration: 30 * 60 * 1000 }
)
```

**Cache Hierarchy:**
- **Memory cache** (fastest, session-only)
- **localStorage** (persists across sessions)
- **Automatic expiration** (configurable)

#### 2. Daily Content Pattern
```typescript
import { generateDaily } from '@/lib/ai/token-manager'

// Only generates once per day, cached for 24 hours
const wisdom = await generateDaily('wisdom', async () => {
  return generateGameContent('description', 'daily wisdom', {
    style: 'thoughtful',
    length: 'short'
  })
})
```

**Use Cases:**
- Daily wisdom
- Daily challenges
- Rotating content

**Savings:** 99% reduction (1 generation per day vs unlimited)

#### 3. Rate Limiting
```typescript
// Automatic rate limiting:
// - 10 requests per minute
// - 100 requests per hour
// - 500 requests per day

// Returns null if rate limited
const result = await tokenManager.generateEfficient(prompt, options)

if (!result) {
  // Use fallback content
  return CURATED_FALLBACK
}
```

**Savings:** Prevents abuse, caps costs

#### 4. Token Budgets
```typescript
// Predefined budgets
const TOKEN_BUDGETS = {
  SHORT: 100,    // ~75 words
  MEDIUM: 256,   // ~200 words
  LONG: 512,     // ~400 words
}

// Enforce budget
const result = await generateText(prompt, {
  maxTokens: TOKEN_BUDGETS.SHORT  // Limit response size
})
```

**Savings:** 50-75% reduction by limiting output length

#### 5. Efficient Prompts
```typescript
import { buildPrompt } from '@/lib/ai/token-manager'

// Concise prompt builder
const prompt = buildPrompt({
  task: 'Generate plant name',           // Clear, direct
  context: 'peaceful garden',             // Minimal context
  style: 'calming',                       // One word
  constraints: ['1-2 words', 'no emoji']  // Brief rules
})

// Result: ~20 tokens vs 100+ tokens for verbose prompts
```

**Savings:** 60-80% reduction in input tokens

#### 6. Batch Requests
```typescript
import { generateBatch } from '@/lib/ai/token-manager'

// Combine multiple requests into one API call
const results = await generateBatch([
  'Generate plant 1',
  'Generate plant 2',
  'Generate plant 3'
], { maxTokens: 100 })

// Single API call instead of 3
```

**Savings:** 66% reduction (1 API call vs 3)

#### 7. Fallback Content
```typescript
// Always have curated fallback
const FALLBACK_CONTENT = [
  "A peaceful garden welcomes you.",
  "Sunlight filters through the leaves.",
  // ...10-20 curated options
]

async function getContent() {
  const generated = await generateCached(key, prompt)

  if (!generated) {
    // Use fallback if AI unavailable or rate limited
    return FALLBACK_CONTENT[Math.floor(Math.random() * FALLBACK_CONTENT.length)]
  }

  return generated
}
```

**Savings:** Zero tokens when using fallback

---

## AI Tool Context Efficiency

### Problem
AI tools (Claude Code, Copilot) read documentation to understand context. Large docs = many tokens consumed per session.

### Solutions

#### 1. Tiered Context Files

**Ultra-Quick** (`.claude/CONTEXT_QUICK.md`)
- ~500 tokens
- Core rules + patterns only
- Read this first, full docs only if needed

**Medium** (`docs/AI_CONTEXT.md`)
- ~2000 tokens
- Complete patterns + examples
- Read when building features

**Full** (`docs/DESIGN_PHILOSOPHY.md`, etc.)
- ~5000+ tokens each
- Deep philosophy and specifications
- Read only when necessary

**Usage in .claude/CLAUDE.md:**
```markdown
# Quick Reference
[500 tokens of essential context]

**Need more?** Read `/docs/AI_CONTEXT.md` (full patterns)
```

**Savings:** 80-90% token reduction per Claude Code session

#### 2. Context Pointers, Not Duplication
```markdown
<!-- ❌ BAD: Repeat everything -->
## Accessibility
- Keyboard navigation required
- Screen reader support required
- ARIA labels on all interactive elements
- Focus indicators must be visible
- Reduced motion support required
[...500 more words...]

<!-- ✅ GOOD: Point to docs -->
## Accessibility
Required. See `docs/ACCESSIBILITY_CONTROLS.md` for full spec.

**Quick:** Use `useAccessibility()` hook, add ARIA labels, test keyboard-only.
```

**Savings:** 75% reduction (50 tokens vs 200 tokens)

#### 3. Compressed Patterns
```markdown
<!-- ❌ BAD: Verbose -->
When you need to generate AI content, you should import the
generateGameContent function from the lib/ai/gemini.ts file.
Then call it with the type of content you want to generate...

<!-- ✅ GOOD: Concise -->
**AI:** `import { generateCached } from '@/lib/ai/token-manager'`
```

**Savings:** 60% reduction

#### 4. Code Examples Only
```markdown
<!-- ❌ BAD: Explain everything -->
To create an accessible button, you need to ensure that it
has proper ARIA labels, keyboard focus indicators, and semantic
HTML. Here's how you do it step by step...

<!-- ✅ GOOD: Show, don't tell -->
```ts
<button aria-label="Clear action" className="focus:ring-2">
  Action
</button>
```
```

**Savings:** 70% reduction

#### 5. Optimize .claude/CLAUDE.md

**Before:** ~5000 tokens (everything duplicated)
**After:** ~1500 tokens (quick ref + pointers)

**Structure:**
1. Core principles (200 tokens)
2. Critical rules (300 tokens)
3. Code patterns (500 tokens)
4. Pointers to full docs (100 tokens)
5. "Read full docs only if needed" (reminder)

**Savings:** 70% reduction per session

---

## Cost Projections

### Without Efficiency System
- **User features:** ~100 generations/day × 500 tokens = 50K tokens/day
- **AI tool context:** ~20 sessions/day × 5000 tokens = 100K tokens/day
- **Total:** ~150K tokens/day = ~4.5M tokens/month
- **Cost:** ~$13.50/month (Gemini Flash at $0.30/1M tokens)

### With Efficiency System
- **User features:** ~10 unique generations/day × 250 tokens = 2.5K tokens/day (95% cache hit)
- **AI tool context:** ~20 sessions/day × 1000 tokens = 20K tokens/day (80% smaller docs)
- **Total:** ~22.5K tokens/day = ~675K tokens/month
- **Cost:** ~$2/month

**Savings:** ~$11.50/month (85% reduction)

---

## Implementation Checklist

### For New Games
- [ ] Use `generateCached()` instead of `generateText()`
- [ ] Set appropriate cache duration
- [ ] Define token budget (`maxTokens`)
- [ ] Have curated fallback content
- [ ] Use `buildPrompt()` for concise prompts
- [ ] Consider daily content pattern if appropriate

### For Documentation
- [ ] Keep context files under 2000 tokens
- [ ] Use pointers instead of duplication
- [ ] Provide code examples instead of prose
- [ ] Link to full docs, don't inline them
- [ ] Test with AI tools (check token usage)

---

## Monitoring

### Check Token Usage
```typescript
import { getTokenStats } from '@/lib/ai/token-manager'

const stats = getTokenStats()
console.log('Cache size:', stats.memoryCacheSize)
console.log('Requests today:', stats.requestCounts.day)
console.log('Rate limited:', stats.isRateLimited)
```

### Clear Cache (if needed)
```typescript
import { clearAICache } from '@/lib/ai/token-manager'

// Clear all cached content
clearAICache()
```

### Audit Context Files
```bash
# Count tokens in context files (rough estimate)
wc -w .claude/*.md docs/*.md

# Aim for:
# - .claude/CONTEXT_QUICK.md: <300 words (~400 tokens)
# - docs/AI_CONTEXT.md: <1500 words (~2000 tokens)
# - Other docs: As needed, but link instead of duplicate
```

---

## Best Practices

### Do
- ✅ Cache aggressively
- ✅ Use daily content pattern for unchanging content
- ✅ Enforce token budgets
- ✅ Write efficient prompts
- ✅ Have curated fallbacks
- ✅ Keep context files concise
- ✅ Use code examples over prose

### Don't
- ❌ Generate same content repeatedly
- ❌ Use verbose prompts
- ❌ Set unlimited token budgets
- ❌ Duplicate docs in context files
- ❌ Explain everything in prose
- ❌ Skip fallback content

---

## Future Optimizations

### 1. Server-Side Caching
Move caching to API routes:
```typescript
// api/generate/route.ts
export async function POST(req: Request) {
  const cached = await redis.get(cacheKey)
  if (cached) return Response.json(cached)

  const generated = await generateText(prompt)
  await redis.set(cacheKey, generated, 'EX', 3600)

  return Response.json(generated)
}
```

**Savings:** Shared cache across all users

### 2. Precomputed Variations
Generate variations in advance:
```typescript
// Generate 10 variations at build time
const variations = await generateBatch(prompts)

// Store in database
// Serve random variation on request (zero tokens)
```

**Savings:** Near-zero runtime costs

### 3. Semantic Deduplication
Detect similar requests:
```typescript
// "calming garden" ≈ "peaceful garden" ≈ "tranquil garden"
// Return same cached result for semantically similar prompts
```

**Savings:** 30-50% reduction via smart cache hits

---

## Summary

**Token Manager Features:**
- Multi-level caching (memory + localStorage)
- Rate limiting (10/min, 100/hr, 500/day)
- Token budgets (SHORT: 100, MEDIUM: 256, LONG: 512)
- Efficient prompt builder
- Daily content pattern
- Batch requests
- Fallback handling

**Context Optimization:**
- Tiered docs (quick, medium, full)
- Pointers instead of duplication
- Code examples over prose
- Compressed patterns
- ~70% token reduction per AI tool session

**Expected Savings:**
- 85% cost reduction overall
- ~$11.50/month saved
- Better UX (faster responses via caching)

---

## Practical Examples

### Integration Tests
See `tests/integration/token-manager.test.ts` for comprehensive tests demonstrating:
- Caching behavior and cache hits
- Daily content pattern
- Efficient prompt building
- Batch request optimization
- Real-world game content generation

### React Component Examples
See `components/examples/TokenManagerExample.tsx` for practical implementations:
- **DailyWisdomExample**: Content generated once per day (99% savings)
- **GameIntroExample**: Per-game cached content (99%+ savings)
- **PersonalizedHintExample**: Per-user session caching (95%+ savings)
- **VariationExample**: Pre-generated variations (zero runtime cost)

Each example includes:
- Complete working code
- Cache duration strategies
- Fallback handling
- Best practices commentary

---

**Remember:** Every token saved is money saved AND a faster user experience.
