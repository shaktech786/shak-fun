# Development Guide

> Setup, workflow, and standards for VeryGoodMelon.Fun development

## Quick Start

### Prerequisites
- Node.js v22.19.0 (use `.nvmrc` for version locking)
- npm v11.6.0+
- Git

### Installation

```bash
# Use correct Node version
nvm use

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your API keys to .env.local

# Start development server
npm run dev
```

Visit http://localhost:3000

---

## Environment Variables

Create `.env.local` (never commit this file):

```env
# Supabase (for future game data)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# AI Services
GOOGLE_GEMINI_API_KEY=your_gemini_key
GOOGLE_GEMINI_MODEL=gemini-2.0-flash-exp
GOOGLE_PROJECT_ID=your_project_id
OPENAI_API_KEY=your_openai_key

# Site Configuration
NEXT_PUBLIC_SITE_NAME=VeryGoodMelon.Fun
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set these in Vercel dashboard.

---

## npm Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Production build
npm run start            # Start production server

# Testing
npm test                 # Run all tests
npm run test:integration # Run integration tests (real API)
npm run test:watch       # Watch mode
npm run test:ui          # Visual test UI

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking (if added)
```

---

## Project Structure

```
verygoodmelon.fun/
├── app/                       # Next.js App Router
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   ├── about/                # About page
│   ├── games/                # Games directory (future)
│   └── globals.css           # Global styles
├── components/
│   ├── accessibility/        # Accessibility controls
│   │   ├── AccessibilityButton.tsx
│   │   ├── AccessibilityPanel.tsx
│   │   └── AccessibilityControls.tsx
│   ├── games/                # Game components
│   └── ui/                   # Reusable UI components
│       ├── Header.tsx
│       ├── LoadingSpinner.tsx
│       └── EmptyState.tsx
├── lib/
│   ├── ai/                   # AI integration
│   │   └── gemini.ts         # Gemini wrapper
│   ├── hooks/                # React hooks
│   │   └── useAccessibility.ts
│   └── utils/                # Utilities
│       └── cn.ts             # Classname utility
├── types/                    # TypeScript types
│   └── accessibility.ts
├── tests/
│   ├── integration/          # Integration tests (real API)
│   │   └── gemini.test.ts
│   └── setup.ts              # Test setup
├── docs/                     # Documentation
├── public/                   # Static assets
│   ├── logo.png              # Watermelon logo
│   └── icon.png              # Favicon
├── .claude/                  # Claude Code memory
│   └── CLAUDE.md
├── vitest.config.ts          # Vitest configuration
└── package.json
```

---

## Code Standards

### TypeScript
- Use TypeScript strict mode
- Define types for all props and functions
- Avoid `any` - use `unknown` if needed
- Export types from dedicated `types/` files

```typescript
// ✅ Good
interface GameProps {
  title: string
  onComplete?: () => void
}

export function Game({ title, onComplete }: GameProps) {
  // ...
}

// ❌ Bad
export function Game(props: any) {
  // ...
}
```

### React Components
- Use function components, not classes
- Use hooks for state and effects
- Extract complex logic to custom hooks
- Keep components small and focused

```typescript
// ✅ Good: Small, focused component
export function GameCard({ game }: { game: Game }) {
  return (
    <div className="card">
      <h3>{game.title}</h3>
      <p>{game.description}</p>
    </div>
  )
}

// ❌ Bad: Too much in one component
export function GamePage() {
  // 500 lines of code...
}
```

### Accessibility
**Non-negotiable requirements:**

```typescript
// ✅ Good: Accessible component
<button
  onClick={handleClick}
  aria-label="Clear and descriptive action"
  className="focus:ring-2 focus:ring-accent"
>
  {icon && <Icon aria-hidden="true" />}
  Label Text
</button>

// ❌ Bad: Not accessible
<div onClick={handleClick}>
  <Icon />
</div>
```

**Checklist:**
- ✅ Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- ✅ ARIA labels when needed
- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Color not sole indicator
- ✅ Screen reader tested

### Styling
- Use Tailwind utility classes
- Use custom CSS variables for colors
- Respect `prefers-reduced-motion`
- Mobile-first responsive design

```typescript
// ✅ Good: Utility classes + responsive
<div className="
  px-4 py-2
  bg-white
  rounded
  transition-transform
  hover:scale-105
  focus:ring-2 focus:ring-accent
  sm:px-6
  md:px-8
">
  Content
</div>

// ❌ Bad: Inline styles
<div style={{ padding: '8px', background: '#fff' }}>
  Content
</div>
```

### AI Integration
- NEVER expose "AI" to users
- Always have fallbacks
- Handle errors gracefully
- Test with real API

```typescript
// ✅ Good: Invisible AI
const content = await generateGameContent('story', context)
if (!content) {
  return FALLBACK_CONTENT
}

// ❌ Bad: Exposes AI
<p>AI is generating your story...</p>
```

---

## Testing Strategy

### Unit Tests
Test individual functions and utilities.

```typescript
// lib/utils/cn.test.ts
import { cn } from './cn'

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
})
```

### Integration Tests
Test real API integrations (NO MOCKS).

```typescript
// tests/integration/gemini.test.ts
describe('Gemini Integration', () => {
  it('should generate text', async () => {
    const result = await generateText('Hello')
    expect(result).toBeTruthy()
  }, 30000)
})
```

Run with:
```bash
npm run test:integration
```

**Why real API tests?**
- Ensures production functionality
- Catches API changes
- No mock drift
- Validates prompts

### Accessibility Testing
**Manual tests (required before shipping):**

1. **Keyboard-only navigation**
   - Tab through all interactive elements
   - Test with `Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`

2. **Screen reader**
   - macOS: VoiceOver (`Cmd + F5`)
   - Windows: NVDA (free)
   - Verify all content is announced

3. **Reduced motion**
   - Enable system preference
   - Verify animations disabled

4. **Mobile**
   - Test on iOS Safari
   - Test on Android Chrome
   - Verify touch targets 44x44px minimum

5. **Lighthouse**
   ```bash
   npm run build
   npm run start
   # Open DevTools > Lighthouse
   # Run audit (Accessibility, Performance, Best Practices, SEO)
   # Aim for 90+ in all categories
   ```

---

## Git Workflow

### Branching
- `main` - Production branch (auto-deploys to Vercel)
- Feature branches not strictly required (small project)
- Commit directly to `main` for quick iterations

### Commit Messages
Use clear, descriptive commits:

```bash
# Good
git commit -m "Add Calm Garden game with AI plant suggestions"
git commit -m "Fix accessibility panel keyboard trap"
git commit -m "Update integration tests for new AI functions"

# Bad
git commit -m "fix bug"
git commit -m "updates"
git commit -m "wip"
```

### Pre-commit Checklist
Before committing:
- [ ] Code builds without errors
- [ ] TypeScript type checks pass
- [ ] Tests pass (`npm test`)
- [ ] Accessibility tested (keyboard, screen reader)
- [ ] Mobile tested
- [ ] No console errors

### Commit Template
```bash
<Type>: <Subject>

<Body (optional)>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, no code change
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## Deployment

### Vercel (Production)
- **Auto-deploy:** Push to `main` branch triggers deployment
- **URL:** https://verygoodmelon.fun
- **Environment variables:** Set in Vercel dashboard

### Environment Variables in Vercel
1. Go to project settings
2. Environment Variables tab
3. Add each variable:
   - `GOOGLE_GEMINI_API_KEY`
   - `GOOGLE_GEMINI_MODEL`
   - `GOOGLE_PROJECT_ID`
   - `OPENAI_API_KEY`
   - Supabase variables

### Deployment Checklist
Before deploying:
- [ ] All tests pass
- [ ] Build succeeds locally
- [ ] Environment variables set in Vercel
- [ ] Accessibility tested
- [ ] Mobile tested
- [ ] Lighthouse score 90+

---

## Common Tasks

### Adding a New Game

1. **Choose concept** from `docs/GAME_IDEAS.md`

2. **Create component**
   ```bash
   # Create game component
   touch components/games/CalmGarden.tsx
   ```

3. **Implement game**
   ```typescript
   // components/games/CalmGarden.tsx
   'use client'

   import { useAccessibility } from '@/lib/hooks/useAccessibility'

   export function CalmGarden() {
     const { settings } = useAccessibility()

     return (
       <div
         role="application"
         aria-label="Calm Garden game"
         className="container mx-auto px-6 py-12"
       >
         {/* Game content */}
       </div>
     )
   }
   ```

4. **Add route**
   ```bash
   mkdir app/games/calm-garden
   touch app/games/calm-garden/page.tsx
   ```

   ```typescript
   // app/games/calm-garden/page.tsx
   import { CalmGarden } from '@/components/games/CalmGarden'

   export default function CalmGardenPage() {
     return <CalmGarden />
   }
   ```

5. **Test accessibility**
   - Keyboard-only navigation
   - Screen reader
   - Reduced motion
   - Mobile

6. **Add to game list**
   - Update game data source
   - Add thumbnail image
   - Write description

### Adding AI Features

1. **Use existing helpers**
   ```typescript
   import { generateGameContent } from '@/lib/ai/gemini'

   const content = await generateGameContent('story', context, {
     style: 'playful',
     length: 'short'
   })
   ```

2. **Add fallback**
   ```typescript
   const finalContent = content || FALLBACK_CONTENT
   ```

3. **Test integration**
   ```bash
   npm run test:integration
   ```

### Updating Accessibility Controls

1. **Update types** in `types/accessibility.ts`
2. **Update hook** in `lib/hooks/useAccessibility.ts`
3. **Update UI** in `components/accessibility/AccessibilityPanel.tsx`
4. **Test** all controls work

---

## Troubleshooting

### Build Errors

**Issue:** TypeScript errors
```bash
# Check types
npx tsc --noEmit

# Fix auto-fixable issues
npm run lint -- --fix
```

**Issue:** Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Test Failures

**Issue:** Integration tests fail
```bash
# Check API keys
cat .env.local | grep GEMINI

# Run with verbose logging
npm run test:integration -- --reporter=verbose
```

**Issue:** Timeout errors
- Increase timeout in test: `it('test', async () => { ... }, 60000)`
- Check network connection
- Verify API key is valid

### Development Server Issues

**Issue:** Port 3000 in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

**Issue:** Hot reload not working
- Restart dev server
- Clear `.next` directory: `rm -rf .next`
- Check file watchers limit (Linux)

---

## Resources

### Documentation
- **Project Docs:** `/docs` directory
- **Next.js:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Gemini API:** https://ai.google.dev/docs

### Tools
- **Accessibility:** https://wave.webaim.org/
- **Lighthouse:** Chrome DevTools
- **Screen Readers:** VoiceOver (Mac), NVDA (Windows)

### Community
- **GitHub:** https://github.com/shakeelbhamani/verygoodmelon.fun
- **Issues:** Report bugs or request features

---

## Questions?

1. Check `/docs` for detailed guides
2. Read `.claude/CLAUDE.md` for Claude Code context
3. Search existing code for examples
4. Create GitHub issue

---

**Remember:** Quality over speed. Ship when it's ready, not when it's rushed.
