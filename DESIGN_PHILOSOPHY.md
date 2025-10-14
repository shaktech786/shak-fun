# Shak.Fun - Design Philosophy & Project Memory

> "Every pixel has meaning."

## Project Vision

Shak.Fun is a **diverse playground of unique web experiences** that prioritizes creativity, accessibility, and simplicity. Inspired by neal.fun but not a copy—this is a space where invisible AI creates magical moments, and every interaction respects users' attention and abilities.

### The Experience

Users should feel **all of it**:
- 😮 **Curious** - "What's this? I want to explore."
- 🧘 **Calm** - "This is a peaceful space."
- 🤔 **Intrigued** - "How does this work? What happens next?"
- 🎮 **Playful** - "This is fun, I want to try again."

The emotional palette is **diverse, not singular**. Some games meditative, some playful, some thought-provoking. Variety creates surprise.

### The Magic

**AI is completely invisible.** Users never know they're interacting with AI—they just experience something that feels alive, responsive, or impossibly smart. The magic is in the "How did it know that?" moment, not "This is an AI-powered feature!"

---

## Core Principles

### 1. **Creativity First**
- Every game should offer something unique or unexpected
- Push boundaries of web interactions while staying simple
- AI-powered experiences that feel magical, not gimmicky
- Favor originality over following trends

### 2. **Radical Accessibility**
- **WCAG 2.1 AA** as baseline, not ceiling
- **Neurodivergent-friendly**: Clear patterns, predictable interactions, sensory considerations
- **Keyboard-first**: All interactions accessible without mouse
- **Screen reader optimized**: Meaningful ARIA labels, logical flow
- **Reduced motion**: Respect user preferences
- **Color-blind safe**: Never rely solely on color to convey information

### 3. **Simplicity & Beauty**
- Minimal UI that gets out of the way
- Every element serves a purpose
- Crisp, pixelated aesthetic with retro charm
- Fast interactions (75ms transitions)
- No dark patterns, no engagement tricks

### 4. **Respect for Attention**
- No ads, no tracking, no notifications
- Games should be completable in one session
- No artificial difficulty or time-wasters
- Users control their experience

### 5. **Positive Emotional Impact**
- **Less anxious on exit than entry** - Core success metric
- **Return naturally** - Not through addiction, but genuine value
- **Add value to their life** - Help them relax, grow, or find motivation
- **Not too serious** - Lighter than the real world, but meaningful
- **Feel better** - Users should smile, relax, or think "that was worth it"

### 6. **Originality with Purpose**
- **Inspiration is OK** - Hard to be 100% original, and that's fine
- **Clones are NOT OK** - "Flappy Bird with watermelons" adds nothing
- **Innovation required** - What's the unique twist? What's new here?
- **Value-add required** - Must contribute something to the world
- **Fun + Substance** - Engaging AND meaningful, relaxing AND enriching

### 7. **Inspired by Neal.Fun, Not Copying**
- Neal.fun = educational/informational data visualization
- Shak.Fun = creative/artistic interactive experiences
- Focus on feeling and exploration over learning
- More personal, more experimental

---

## Technical Standards

### Performance
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+ across all categories
- **Bundle Size**: Keep each game under 100KB when possible

### Code Quality
- TypeScript strict mode
- Accessible-first components
- Progressive enhancement
- Mobile-first responsive design

### AI Integration (Invisible Magic)
- **Completely invisible** - Users never see "AI" or "Powered by..." labels
- Google Gemini 2.0 Flash for creative, fast, magical interactions
- AI creates "How did it know that?" moments without revealing itself
- Fallback to deterministic behavior when AI unavailable (seamlessly)
- The goal: Users think the experience is impossibly clever, not AI-powered

---

## UX Guidelines

### Visual Design
- **Color Palette**: Watermelon-inspired (coral red, soft green, charcoal)
- **Typography**: System fonts for performance, clear hierarchy
- **Spacing**: Generous whitespace, never cramped
- **Animations**: Purposeful, not decorative

### Interaction Design
- **Feedback**: Immediate visual/audio confirmation
- **States**: Clear hover, focus, active, disabled states
- **Loading**: Always indicate progress
- **Errors**: Helpful messages, never blame the user

### Content Design
- **Voice**: Friendly, direct, honest
- **Instructions**: Clear but not patronizing
- **Naming**: Descriptive, avoid jargon
- **Copy**: Concise, every word counts

---

## Game Design Principles

### Game Diversity (We Want It All)

Shak.Fun is a **diverse playground**, not a single genre. Games should span:

- 🔬 **Interactive Simulations** - Physics sandboxes, systems you can poke and prod
- 🧩 **Thoughtful Puzzles** - Brain teasers that make you think differently
- 🧘 **Meditative Experiences** - Calming, flow-state inducing interactions
- 🎨 **Experimental/Artistic** - Weird, beautiful, "what is this?" experiences
- 📖 **AI-Driven Stories** - Conversations, narratives, personalized journeys (invisibly powered)
- 🎮 **Playful Toys** - No goal, just fun to interact with

**Variety creates surprise.** Some games take 30 seconds, some take 10 minutes. Some make you think, some make you relax. The only constant: quality and accessibility.

### What Makes a Good Shak.Fun Game?

#### Must Have:
- ✅ Unique concept or execution
- ✅ Fully accessible (keyboard, screen reader, reduced motion)
- ✅ Completable in < 10 minutes
- ✅ Works on mobile and desktop
- ✅ No external dependencies (self-contained)

#### Should Have:
- 🎯 Thoughtful or meditative quality
- 🎯 Surprising moment or interaction
- 🎯 Replayability through variation
- 🎯 Clear purpose or theme

#### Nice to Have:
- ⭐ AI-powered personalization
- ⭐ Procedural generation
- ⭐ Social sharing (optional)
- ⭐ Subtle humor or wit

### What to Avoid:
- ❌ **Direct clones** - "Flappy Bird but with watermelons" is not OK
- ❌ **Increases anxiety** - Should reduce stress, not add to it
- ❌ **Purely addictive** - No value beyond "one more click"
- ❌ **No added value** - Already been done better elsewhere
- ❌ **Too serious** - Should be lighter than the real world
- ❌ **Precise timing requirements** (accessibility concern)
- ❌ **Loud sounds without warning**
- ❌ **Flashing or strobing effects**
- ❌ **Competitive pressure** (focus on experience, not leaderboards)

---

## Neurodivergent-Friendly Considerations

### Comprehensive Sensory Controls

Every game should include **intelligent, non-intrusive controls**:

#### Visual Controls
- ✅ **Reduce Motion** - Respect `prefers-reduced-motion` + manual toggle
- ✅ **Contrast Adjustment** - High contrast mode for better readability
- ✅ **Speed Controls** - Slow down/speed up animations when applicable
- ✅ **Pause/Freeze** - Ability to pause dynamic content
- ✅ **Colorblind Modes** - Never rely on color alone; offer patterns/icons

#### Audio Controls
- ✅ **Master Mute** - Global sound off/on
- ✅ **Volume Slider** - Granular control (0-100%)
- ✅ **No Autoplay** - Sounds only on user action or with warning
- ✅ **Visual Alternatives** - All audio has visual equivalent

#### Interaction Controls
- ✅ **Keyboard Shortcuts** - Always available, always documented
- ✅ **Click Speed** - No double-click requirements
- ✅ **Timing Flexibility** - No "you must click in 2 seconds" mechanics
- ✅ **Persistent Controls** - Settings saved to localStorage

### Control UI Design
- 🎚️ **Settings icon** (⚙️) always visible but unobtrusive
- 🎚️ **Slide-out panel** for controls (doesn't block game)
- 🎚️ **Smart defaults** - Reduced motion if system preference detected
- 🎚️ **One-click presets** - "Calm Mode", "Focus Mode", etc.

### Cognitive Support
- Clear, simple instructions (< 2 sentences ideal)
- Consistent interaction patterns across games
- Undo/reset options always available
- No time pressure unless optional (and clearly marked)
- Tutorial/guide accessible at any time

### Executive Function Support
- Break complex tasks into clear steps
- Save progress automatically (no manual saves)
- Clear completion criteria or "done" state
- Minimal decision fatigue (don't overwhelm with options)
- "Return to where you were" functionality

---

## Quality Bar

### "Does This Belong on Shak.Fun?" - Critical Questions

Before launching ANY game, ask these questions honestly:

#### 1. **Emotional Impact** (Most Important)
- ❓ Will users feel **less anxious** after playing than before?
- ❓ Will they **smile, relax, or think "that was worth it"**?
- ❓ Does it add **genuine value** to their life (relaxation, growth, motivation)?
- ❓ Will they **return naturally**, not compulsively?

**If any answer is "no" or "maybe"** → Don't ship until fixed.

#### 2. **Originality & Value**
- ❓ Is this more than a clone with different graphics?
- ❓ What's the **unique twist** or innovation?
- ❓ What **value does it add to the world**?
- ❓ Would this exist if Shak.Fun didn't build it?

**If it's just Flappy Bird with watermelons** → Scrap it.

#### 3. **Accessibility (Non-Negotiable)**
- ❓ Can it be played **keyboard-only**?
- ❓ Does it work with **screen readers**?
- ❓ Are **sensory controls** included (motion, sound, contrast)?
- ❓ No timing requirements that exclude users?

**If any answer is "no"** → Not ready to ship.

#### 4. **Quality & Polish**
- ❓ Is it **bug-free** and smooth?
- ❓ Does it feel **finished**, not rushed?
- ❓ Would you **show this to anyone** without caveats?
- ❓ Lighthouse score **90+**?

**If it feels janky or unfinished** → Polish before shipping.

#### 5. **Tone & Seriousness**
- ❓ Is it **lighter than the real world**?
- ❓ Does it avoid being **too serious or heavy**?
- ❓ Does it respect users without being patronizing?

**If it increases stress or feels like work** → Rethink the concept.

### Technical Checklist Before Launch
1. ✅ **Accessibility Audit**: Keyboard-only, screen reader, reduced motion
2. ✅ **Performance Check**: Lighthouse score 90+ all categories
3. ✅ **Cross-browser Test**: Chrome, Safari, Firefox
4. ✅ **Mobile Test**: iOS Safari, Android Chrome
5. ✅ **Settings Panel**: All sensory controls implemented
6. ✅ **AI Invisibility**: No "AI" labels or "powered by" text visible
7. ✅ **Emotional Test**: Play it yourself - do YOU feel better after?

### Continuous Improvement
- Gather feedback (anonymous contact form)
- Monitor performance metrics (Speed Insights)
- Iterate based on real usage patterns
- **Remove games** that don't meet the bar (it's OK to cut things)

---

## Inspirations (But Not To Copy)

- **Neal.fun**: Simplicity, creativity, web-native
- **Bartosz Ciechanowski**: Deep, interactive explanations
- **Studio Ghibli**: Thoughtful, calming aesthetics
- **Untitled Goose Game**: Playful simplicity
- **Monument Valley**: Beautiful, accessible puzzle design

---

## What Success Looks Like

- Users describe games as "thoughtful" or "unique"
- Accessibility praised by neurodivergent users
- Games shared because they're interesting, not viral
- Small but engaged audience over massive reach
- Pride in every game shipped

---

## Questions to Ask Before Building:

1. Is this game **truly unique**?
2. Is it **fully accessible**?
3. Does it **respect user attention**?
4. Is it **simple but beautiful**?
5. Would **you** want to play it twice?

If not all yes, reconsider or refine.

---

## Future Considerations

### Phase 2 (Current)
- Build 3-5 high-quality games
- Establish design patterns
- Validate accessibility approach

### Phase 3 (Later)
- Optional charitable giving
- Community contributions?
- Expanded game library

---

**Remember**: Quality over quantity. Every game should be something you're proud to have your name on.

Made with purpose. Every pixel has meaning.
