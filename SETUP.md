# VeryGoodMelon.Fun Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

## Initial Setup

### 1. Supabase Configuration

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once the project is ready, go to **Settings** > **API**
3. Copy your **Project URL** and **anon public** key
4. Update `.env.local` with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Setup

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the SQL to create all tables, indexes, and policies
4. Verify tables were created in **Table Editor**

### 3. Enable Google OAuth (Optional)

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Google** provider
3. Follow Supabase's guide to set up Google OAuth credentials
4. Add authorized redirect URLs

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Database Schema

### Tables

- **profiles**: User profiles with username, points, and stats
- **games**: Game catalog with metadata and scoring info
- **scores**: Game scores and points earned per play
- **achievements**: Achievement definitions
- **user_achievements**: Unlocked achievements per user

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `NEXT_PUBLIC_SITE_NAME` | Site name | No |
| `NEXT_PUBLIC_INITIAL_POINTS` | Starting points for new users | No |
| `NEXT_PUBLIC_DAILY_LOGIN_BONUS` | Daily login bonus points | No |

## Deployment

### Vercel

```bash
vercel
```

Make sure to add environment variables in Vercel dashboard.

## Adding Games

Games will be added as React components in the `components/games` directory. Each game should:

1. Accept `onGameEnd(score: number)` callback prop
2. Handle its own game logic and rendering
3. Call `onGameEnd` when the game is complete
4. Be registered in the `games` table via SQL or admin interface

## Points System

- Users start with 100 points (configurable)
- Some games cost points to play
- Games reward points based on score
- Daily login bonuses
- Achievement rewards

## Charity Transparency

100% of any future paid features go to charity (configurable percentage in `.env`).
