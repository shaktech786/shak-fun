# Accessibility Controls Specification

> Comprehensive, intelligent, and non-intrusive controls for every game.

---

## Overview

Every game on Shak.Fun includes a **unified accessibility control panel** that allows users to customize their experience. These controls respect neurodivergent needs and provide granular control without overwhelming the user.

---

## Control Categories

### 1. Visual Controls

#### Reduce Motion
- **System Detection**: Auto-detect `prefers-reduced-motion` media query
- **Manual Toggle**: ON/OFF switch
- **Effect**:
  - Disable all animations
  - Replace transitions with instant state changes
  - Show static alternatives for animated content
- **Icon**: 🎬 (when enabled) / 🎬🚫 (when disabled)

#### Contrast Mode
- **Options**: Normal / High Contrast / Extra High
- **Effect**:
  - High: Increase text contrast to 7:1
  - Extra High: Maximum contrast with bold text
  - Adjust background/foreground colors
- **Icon**: ⚫⚪

#### Animation Speed
- **Options**: 0.5x / 1x / 1.5x / 2x / Pause
- **Effect**: Control CSS animation-duration multiplier
- **Only shown when**: Game has speed-adjustable animations
- **Icon**: ⏩

#### Colorblind Modes
- **Options**: None / Deuteranopia / Protanopia / Tritanopia / Monochrome
- **Effect**: Apply color filters to entire game
- **Implementation**: CSS filters + SVG patterns as backups
- **Icon**: 🎨

---

### 2. Audio Controls

#### Master Volume
- **Type**: Slider (0-100%)
- **Persistence**: Saved to localStorage
- **Effect**: Controls all game audio
- **Keyboard**: Arrow keys to adjust
- **Icon**: 🔊 (unmuted) / 🔇 (muted)

#### Mute Toggle
- **Type**: Quick toggle button
- **Effect**: Instant mute/unmute
- **Keyboard Shortcut**: `M` key
- **Visual Indicator**: Audio icon changes, subtle banner appears
- **Icon**: 🔊/🔇

#### Audio Descriptions
- **Type**: Toggle
- **Effect**: Enable screen-reader friendly audio descriptions
- **Only shown when**: Game has audio-dependent content
- **Icon**: 📢

---

### 3. Interaction Controls

#### Keyboard Shortcuts
- **Type**: Info panel (not a control)
- **Content**: List all available keyboard shortcuts
- **Always Available**: Press `?` to view
- **Format**:
  ```
  SPACE - Pause/Resume
  R - Reset
  ? - Show shortcuts
  ESC - Exit game
  ```

#### Timing Flexibility
- **Type**: Toggle
- **Effect**: Remove time-based challenges (if game has them)
- **Label**: "Remove time pressure"
- **Icon**: ⏱️🚫

#### Click Assistance
- **Type**: Toggle
- **Effect**: Larger click targets, forgive mis-clicks
- **Label**: "Easier clicking"
- **Icon**: 🖱️➕

---

### 4. Content Controls

#### Instruction Visibility
- **Type**: Toggle (Show/Hide)
- **Effect**: Display in-game instructions permanently or hide after first view
- **Default**: Show
- **Icon**: ℹ️

#### Tutorial Mode
- **Type**: Toggle
- **Effect**: Show step-by-step guidance
- **Auto-enable**: On first play
- **Icon**: 🎓

#### Pause/Freeze
- **Type**: Button + Keyboard shortcut
- **Keyboard**: SPACE bar
- **Effect**: Freeze all dynamic content
- **Always Available**: Even in "real-time" games
- **Icon**: ⏸️/▶️

---

## Control Panel UI

### Location
- **Position**: Floating settings icon (⚙️) in top-right corner
- **Z-index**: Always on top (999)
- **Mobile**: Bottom-right to avoid thumb reach issues

### Activation
- **Click/Tap**: Opens slide-out panel from right
- **Keyboard**: `Ctrl + ,` or `Cmd + ,`
- **Animation**: Smooth 200ms slide (or instant if reduced motion enabled)

### Panel Design
```
┌─────────────────────────────┐
│ Accessibility Settings   ✕  │
├─────────────────────────────┤
│                             │
│ 🎬 Reduce Motion      [ON]  │
│ ⚫⚪ Contrast        Normal   │
│ 🔊 Volume           ▓▓▓▓░  │
│ ⏸️  Pause/Resume    [SPACE] │
│                             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                             │
│ 🎨 Colorblind Mode          │
│   ○ None                    │
│   ○ Deuteranopia            │
│   ○ Protanopia              │
│   ○ Tritanopia              │
│                             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                             │
│ Presets:                    │
│ [Calm Mode] [Focus Mode]    │
│                             │
└─────────────────────────────┘
```

### Responsive Behavior
- **Desktop**: 320px wide panel
- **Mobile**: Full-screen overlay with bottom sheet
- **Tablet**: 300px wide panel

---

## Presets (One-Click Modes)

### Calm Mode
- Reduce Motion: ON
- Volume: 30%
- Animation Speed: 0.75x
- Contrast: Normal
- Tutorial: Always visible

### Focus Mode
- Reduce Motion: OFF
- Volume: OFF
- Hide Instructions: ON
- Contrast: High
- Minimal UI

### Sensory-Friendly Mode
- Reduce Motion: ON
- Volume: OFF
- Contrast: Extra High
- Colorblind: Monochrome
- Animation Speed: 0.5x

---

## Persistence

### localStorage Schema
```typescript
interface AccessibilitySettings {
  reduceMotion: boolean
  contrast: 'normal' | 'high' | 'extra-high'
  volume: number // 0-100
  muted: boolean
  colorblindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'monochrome'
  animationSpeed: 0.5 | 1 | 1.5 | 2
  showInstructions: boolean
  tutorialMode: boolean
  clickAssist: boolean
  timingFlexibility: boolean
}
```

### Storage Key
`shakfun:accessibility:settings`

### Sync Behavior
- Settings apply immediately on change
- Persist on every change (debounced 500ms)
- Load on page load before first render
- Respect system preferences as defaults

---

## System Preference Detection

### prefers-reduced-motion
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```
**Effect**: Auto-enable Reduce Motion if true

### prefers-contrast
```typescript
const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches
```
**Effect**: Auto-enable High Contrast if true

### prefers-color-scheme: dark
```typescript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
```
**Effect**: Adjust default color palette (future enhancement)

---

## Implementation Guidelines

### React Hook
```typescript
export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings)

  // Auto-save on change
  useEffect(() => {
    saveSettings(settings)
    applySettings(settings)
  }, [settings])

  return { settings, updateSetting }
}
```

### CSS Variable Application
```typescript
function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement

  // Reduce motion
  root.style.setProperty('--transition-duration',
    settings.reduceMotion ? '0ms' : '75ms')

  // Animation speed
  root.style.setProperty('--animation-speed',
    String(settings.animationSpeed))

  // Contrast
  root.style.setProperty('--contrast-multiplier',
    settings.contrast === 'extra-high' ? '1.5' :
    settings.contrast === 'high' ? '1.2' : '1')
}
```

### Component Structure
```
components/
├── accessibility/
│   ├── AccessibilityPanel.tsx       # Main panel
│   ├── AccessibilityButton.tsx      # Floating settings button
│   ├── VolumeSlider.tsx             # Audio control
│   ├── PresetButtons.tsx            # Calm/Focus mode buttons
│   ├── ColorblindModeSelector.tsx   # Colorblind options
│   └── useAccessibility.ts          # React hook
```

---

## Accessibility of the Accessibility Panel (Meta!)

The control panel itself must be accessible:
- ✅ Keyboard navigable (Tab order makes sense)
- ✅ Screen reader labels on all controls
- ✅ ARIA roles (`role="dialog"`, `aria-labelledby`)
- ✅ Focus trap when open
- ✅ ESC to close
- ✅ Focus returns to settings button on close

---

## Testing Checklist

Before shipping:
- [ ] Test all controls with keyboard only
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Test localStorage persistence across refreshes
- [ ] Test system preference detection
- [ ] Test on mobile (touch targets 44x44px minimum)
- [ ] Test preset buttons apply correct settings
- [ ] Test settings apply in real-time (no page reload needed)
- [ ] Test panel closes on ESC and outside click
- [ ] Verify all icons have `aria-label` attributes
- [ ] Verify color contrast of panel itself (7:1 in high contrast mode)

---

## Future Enhancements

- **Profiles**: Save multiple accessibility profiles
- **Game-Specific**: Per-game settings overrides
- **Sync**: Cross-device sync with account (Phase 3)
- **Voice Control**: Voice commands for settings (experimental)
- **Smart Recommendations**: Suggest settings based on play patterns

---

## References

- WCAG 2.1 Level AAA: https://www.w3.org/WAI/WCAG21/quickref/
- Game Accessibility Guidelines: http://gameaccessibilityguidelines.com/
- Inclusive Design Principles: https://inclusivedesignprinciples.org/

---

**Remember**: These controls are not optional nice-to-haves. They are **required** for every game.
