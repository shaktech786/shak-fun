# VeryGoodMelon.Fun Documentation

> Centralized documentation for AI tools, developers, and contributors.

This directory contains all project documentation to help AI tools (Claude Code, GitHub Copilot) and developers understand the project context, philosophy, and implementation details.

---

## 📚 Documentation Index

### Core Philosophy & Vision
- **[DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md)** - Core principles, quality bar, game design guidelines
  - Project vision and emotional goals
  - Accessibility standards
  - UX/UI guidelines
  - "Does this belong?" quality checklist
  - Success metrics

### Technical Specifications
- **[ACCESSIBILITY_CONTROLS.md](./ACCESSIBILITY_CONTROLS.md)** - Complete accessibility system specification
  - Visual, audio, and interaction controls
  - Preset modes (Calm, Focus, Sensory-Friendly)
  - Implementation patterns
  - Testing checklist

- **[AI_INTEGRATION.md](./AI_INTEGRATION.md)** - AI integration guide
  - Invisible AI philosophy
  - Gemini API usage patterns
  - Helper functions and examples
  - Testing strategies

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development guidelines
  - Setup and installation
  - Code standards
  - Testing approach
  - Git workflow
  - Deployment process

### Game Design
- **[GAME_IDEAS.md](./GAME_IDEAS.md)** - 10 validated game concepts
  - Detailed game descriptions
  - AI integration patterns
  - Technical implementation notes
  - Priority recommendations

### AI Tool Context
- **[AI_CONTEXT.md](./AI_CONTEXT.md)** - Quick context for AI assistants
  - Project overview
  - Key principles (one-page summary)
  - Common patterns
  - Quality checklist

---

## 🤖 For AI Tools

If you're an AI assistant (Claude Code, GitHub Copilot, etc.) working on this project:

1. **Start here:** Read [AI_CONTEXT.md](./AI_CONTEXT.md) for a quick overview
2. **Before any work:** Review [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md)
3. **For games:** Check [GAME_IDEAS.md](./GAME_IDEAS.md)
4. **For accessibility:** Reference [ACCESSIBILITY_CONTROLS.md](./ACCESSIBILITY_CONTROLS.md)
5. **For AI features:** See [AI_INTEGRATION.md](./AI_INTEGRATION.md)

### Critical Reminders
- ✅ Users should feel **LESS ANXIOUS** after using the site
- ✅ AI must be **completely invisible** (no "AI" labels)
- ✅ Accessibility is **non-negotiable** (keyboard, screen reader, sensory controls)
- ❌ No clones (e.g., "Flappy Bird with watermelons")
- ❌ Nothing that increases stress or anxiety

---

## 📖 For Developers

### Quick Start
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Run integration tests (requires API keys)
npm run test:integration
```

### Key Files
- `.claude/CLAUDE.md` - Claude Code project memory
- `docs/` - All documentation (you are here)
- `lib/ai/` - AI integration helpers
- `lib/hooks/` - React hooks (including useAccessibility)
- `components/accessibility/` - Accessibility control UI
- `tests/integration/` - Real API integration tests

### Before Building Anything
Read the quality bar questions in [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md#quality-bar):
1. Will users feel less anxious after?
2. Is it unique (not a clone)?
3. Is it fully accessible?
4. Is it polished?
5. Is it lighter than the real world?

If any answer is "no" or "maybe" → Don't build it or fix it first.

---

## 🔗 External Resources

- **Live Site:** https://verygoodmelon.fun
- **GitHub Repo:** https://github.com/shakeelbhamani/verygoodmelon.fun
- **Inspiration:** [neal.fun](https://neal.fun) (but we're not copying!)
- **WCAG Guidelines:** [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📝 Documentation Standards

When adding new documentation:

1. **Be concise** - Developers and AI tools need quick answers
2. **Use examples** - Code snippets > long explanations
3. **Update this index** - Keep README.md current
4. **Markdown format** - Consistent formatting
5. **Link liberally** - Cross-reference related docs

---

## 🎯 Project Goals Reminder

**VeryGoodMelon.Fun exists to:**
- Create moments of calm in a chaotic world
- Make accessibility delightful, not an afterthought
- Use AI invisibly to create magical experiences
- Build games that add genuine value to people's lives
- Never waste users' time or attention

**Success = Users feel better after visiting than before.**

---

**Made with purpose. Every pixel has meaning.**
