# Shak.Fun - Thoughtful Games

A relaxing collection of creative, pixelated games. Inspired by neal.fun and classic game portals, built with modern web technologies. No ads, no accounts, no distractions - just thoughtful games.

## Features

### Core Features (Phase 1 - Infrastructure)
- **Game Catalog** - Clean, minimal browsing experience
- **Pixelated Aesthetic** - Retro gaming visual style with crisp pixel art
- **Accessible Design** - WCAG 2.1 AA compliant, neurodivergent-friendly
- **Performance Monitoring** - Vercel Speed Insights integration
- **Future Plans** - Charitable giving integration (Phase 3)

### Current Status
- ✅ Site infrastructure complete
- ✅ Minimal, accessible design system
- 🚧 Games coming in Phase 2
- 🔮 Charity integration planned for Phase 3

### Tech Stack
- **Framework**: Next.js 15.5.4 (App Router with Turbopack)
- **Runtime**: Node.js v24.10.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL) - for future game data
- **Deployment**: Vercel
- **Analytics**: Vercel Speed Insights

## Getting Started

### Prerequisites
- Node.js v24.10.0+ (uses `.nvmrc` for version locking)
- npm v11.6.0+

### Installation

1. Use the correct Node version
```bash
nvm use
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm run start
```

## Project Structure

```
shak.fun/
├── app/                      # Next.js app directory
│   ├── games/                # Games listing page (games coming in Phase 2)
│   ├── icon.png              # Favicon (watermelon logo)
│   ├── globals.css           # Global styles with custom CSS variables
│   ├── layout.tsx            # Root layout with header/footer
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── ui/                   # Reusable UI components (Button, Card, Header, etc.)
│   └── games/                # Game-related components (for Phase 2)
├── lib/                      # Utility functions and hooks
│   ├── hooks/                # Custom React hooks
│   └── utils/                # Helper functions (cn for classnames)
├── types/                    # TypeScript type definitions
├── public/                   # Static assets
│   └── logo.png              # Watermelon logo
├── .nvmrc                    # Node version specification
└── vercel.json               # Vercel deployment config
```

## Design System

### Colors (Watermelon-Inspired)
- **Background**: Light grey (#fafafa)
- **Foreground**: Dark grey (#1a1a1a)
- **Primary**: Charcoal (#2d3748)
- **Accent**: Coral red (#e63946) - from watermelon
- **Success**: Light green (#74c69d) - from watermelon rind
- **Melon Green**: Dark green (#1a4d2e)

### Logo
- Pixelated watermelon slice
- Palestinian flag colors (red, white, green, black)
- Displays with crisp pixel rendering (`image-rendering: pixelated`)

### Typography
- System font stack for performance
- Font weights: 400 (normal), 500 (medium), 600 (semibold)

### Style Philosophy
- **Minimal**: Clean, uncluttered interfaces inspired by neal.fun
- **Accessible**: WCAG 2.1 AA compliant, neurodivergent-friendly
- **Fast**: 75ms transitions for instant feel
- **Thoughtful**: Every element has purpose, no decoration for decoration's sake
- **Pixel Art**: Crisp edges, retro gaming aesthetic

## Adding Games (Phase 2)

Games will be React components in `components/games/`. Planned approach:
- Self-contained game logic
- Minimal dependencies
- Accessible controls
- Thoughtful, creative gameplay
- No scores/points needed (free play)

Details will be refined in Phase 2.

## Deployment

The site auto-deploys to Vercel when pushing to `master` branch.

**Live Site**: [shakfun.vercel.app](https://shakfun.vercel.app)

Manual deployment (if needed):
```bash
git push origin master
# Vercel automatically deploys
```

## Accessibility Features

- **Skip to content** link for keyboard users
- **ARIA labels** and semantic HTML throughout
- **Reduced motion** support via `prefers-reduced-motion`
- **High contrast** text for readability
- **Focus indicators** on all interactive elements
- **Screen reader** friendly component structure

## Future Plans

- **Phase 2**: Build creative, thoughtful games
- **Phase 3**: Add optional charitable giving integration
- Keep it simple, keep it free, keep it accessible

---

Made with purpose. Every pixel has meaning.
