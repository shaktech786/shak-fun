# Quick Start Guide

## Infrastructure Complete! 🎉

The Shak.Fun game portal infrastructure is ready. Here's what's been built:

### ✅ Completed Features

**Frontend**
- Homepage with hero section and charity tracker
- Authentication pages (login/signup with email + Google OAuth)
- Games listing page with card grid
- User profile page with stats
- Global leaderboard
- Retro-modern UI design (2005 inspired, modern execution)

**Backend & Database**
- Supabase integration
- Complete database schema (profiles, games, scores, achievements)
- Points system logic
- Authentication flow
- Row Level Security policies

**Infrastructure**
- Next.js 15 with TypeScript
- Tailwind CSS v4 (CSS-based config)
- Custom hooks for data fetching
- Middleware for auth protection
- Vercel-ready deployment

## Next Steps

### 1. Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Once ready, go to **Settings → API**
4. Copy your **Project URL** and **anon public key**
5. Update `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-actual-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-key-here
```

### 2. Create Database Tables (2 minutes)

1. In Supabase dashboard, go to **SQL Editor**
2. Open `supabase/schema.sql` from this project
3. Copy and paste the entire SQL into the editor
4. Click "Run"
5. Verify tables were created in **Table Editor**

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 4. Optional: Enable Google OAuth

1. In Supabase: **Authentication → Providers**
2. Enable **Google**
3. Follow Supabase's guide to set up Google OAuth
4. Add authorized redirect: `http://localhost:3000/auth/callback`

### 5. Deploy to Vercel

```bash
vercel
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Phase 2: Build Games

Now you're ready to build games! Each game should:

1. Be a React component in `components/games/`
2. Accept `onGameEnd(score: number)` prop
3. Call the callback when game completes
4. Be added to database via SQL

### Example Game Structure

```typescript
// components/games/ExampleGame.tsx
interface GameProps {
  onGameEnd: (score: number) => void
}

export function ExampleGame({ onGameEnd }: GameProps) {
  // Game logic here
  const handleComplete = () => {
    const score = 100 // Calculate score
    onGameEnd(score)
  }

  return <div>Your game UI</div>
}
```

### Add Game to Database

```sql
INSERT INTO games (
  slug, title, description, thumbnail_url,
  category, difficulty, points_to_play, points_reward
) VALUES (
  'example-game',
  'Example Game',
  'A fun example game',
  '/games/example-thumb.png',
  'puzzle',
  'easy',
  0,
  10
);
```

## Game Ideas

1. **Memory Match** - Classic card matching
2. **Typing Test** - Speed typing challenge
3. **Math Blast** - Quick math problems
4. **Word Chain** - Word association game
5. **Pattern Master** - Remember and repeat patterns

## Project Structure

```
shak.fun/
├── app/                 # Pages
│   ├── page.tsx        # Homepage ✅
│   ├── auth/           # Login/Signup ✅
│   ├── games/          # Games listing ✅
│   ├── profile/        # User profile ✅
│   └── leaderboard/    # Leaderboard ✅
├── components/
│   ├── ui/             # Reusable UI ✅
│   └── games/          # Game components (build these next!)
├── lib/
│   ├── supabase/       # DB clients ✅
│   ├── hooks/          # Custom hooks ✅
│   └── utils/          # Helpers ✅
└── types/              # TypeScript types ✅
```

## Design System

The site uses a nostalgic 2005 game portal aesthetic:

- **Colors**: Blue primary, Amber secondary, Purple accent
- **Shadows**: Retro offset shadows
- **Animations**: Float, pulse-glow, slide-in
- **Typography**: Rounded sans-serif, clean and modern

## Support

- See `README.md` for full documentation
- See `SETUP.md` for detailed setup instructions
- Database schema in `supabase/schema.sql`

---

**Ready to build games and make a difference!** 🎮❤️
