# Shak.Fun - Play Games for Good

A nostalgic game portal inspired by classic sites like Newgrounds and Miniclip, built with modern web technologies. Play intellectually stimulating games, earn points, compete on leaderboards, and support charity.

## Features

### Core Features
- **User Authentication** - Email/password and Google OAuth login via Supabase
- **Points System** - Earn and spend points playing games
- **Game Catalog** - Browse and play various games
- **Leaderboards** - Compete with other players globally
- **Achievements** - Unlock achievements and earn bonus points
- **User Profiles** - Track your stats and gaming history
- **Charity Focus** - 100% of proceeds go to charitable causes

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Install dependencies
```bash
npm install
```

2. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Set up the database

- Create a new Supabase project at [supabase.com](https://supabase.com)
- Go to SQL Editor in your Supabase dashboard
- Run the SQL from `supabase/schema.sql`

4. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
shak.fun/
├── app/                      # Next.js app directory
│   ├── auth/                 # Authentication pages
│   ├── games/                # Games listing and individual games
│   ├── profile/              # User profile page
│   ├── leaderboard/          # Leaderboard page
│   ├── layout.tsx            # Root layout with header/footer
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   ├── games/                # Game-related components
│   └── auth/                 # Auth-related components
├── lib/                      # Utility functions and hooks
│   ├── supabase/             # Supabase clients
│   ├── hooks/                # Custom React hooks
│   └── utils/                # Helper functions
├── types/                    # TypeScript type definitions
├── supabase/                 # Database schema and migrations
└── public/                   # Static assets
```

## Database Schema

### Tables
- **profiles** - User profiles with points and stats
- **games** - Game catalog with metadata
- **scores** - User game scores and points earned
- **achievements** - Achievement definitions
- **user_achievements** - User-unlocked achievements

See `supabase/schema.sql` and `SETUP.md` for full details.

## Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Amber (#f59e0b)
- **Accent**: Purple (#8b5cf6)

### Style
- Retro-inspired shadows and borders
- Smooth animations and transitions
- Modern gradient backgrounds
- Nostalgic 2005 game portal aesthetic

## Adding Games

Games are React components in `components/games/`. Each game should:
1. Accept `onGameEnd(score: number)` callback prop
2. Handle its own game logic and rendering
3. Call callback when game completes

See `SETUP.md` for detailed instructions.

## Deployment

Deploy to Vercel (already configured):

```bash
vercel
```

Make sure to add environment variables in Vercel dashboard.

## Charity Mission

100% of proceeds from this platform go to charitable causes. Our goal is to make gaming a force for good.

---

Built with ❤️ for charity
