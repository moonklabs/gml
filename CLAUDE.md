# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GML (Global Mission Light)** - 크리스챤 기부 멘토링 플랫폼

미국 텍사스 소재 Non-profit 법인이 운영하는 플랫폼으로, 전문가 멘토가 재능기부로 멘토링을 제공하고, 멘티가 지불한 세션 비용이 **전액 기부금으로 전환**되어 한국 미자립/개척교회를 지원합니다.

### Core Value Proposition
- **멘토**: 재능으로 섬김 (무보수 자원봉사)
- **멘티**: 전문가 멘토링을 받으면서 기부에 참여
- **기부금**: 결제 금액 전액이 한국 미자립/개척교회 지원
- **수수료**: 멘티가 추가 부담 (Stripe 수수료를 기부금과 별도 청구)

## Technology Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth + PostgreSQL + Storage)
- **Payment**: Stripe Checkout (planned)
- **Deployment**: Vercel

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## Database & Supabase

### Initial Setup
```bash
# Copy environment variables
cp .env.local.example .env.local

# Start local Supabase (optional)
npx supabase start

# Push schema to remote Supabase project
npx supabase db push

# Seed initial data
npx supabase db seed
```

### Database Schema Architecture

**Core Entity Relationships:**
```
profiles (auth.users 1:1)
    ├── mentor_profiles (1:1, mentors only)
    │       ├── mentor_specialties (N:M)
    │       └── donations (1:N as mentor)
    └── donations (1:N as mentee)

specialties (master table)
donation_recipients (churches/organizations)
impact_reports (published reports)
donation_receipts (tax deduction receipts)
```

**Key Tables:**
- `profiles`: Base user profile (auto-created on signup via trigger)
- `mentor_profiles`: Extended info for mentors only
- `mentor_specialties`: N:M relationship between mentors and specialties
- `donations`: Payment records (all amounts are USD)
- `donation_receipts`: 501(c)(3) tax-deductible receipts

### Row Level Security (RLS)

All tables have RLS enabled. Key policies:
- `mentor_profiles`: Only approved (`is_approved=true`) and active (`is_active=true`) mentors are publicly visible
- `mentor_profiles`: Users can only INSERT/UPDATE their own mentor profile
- `donations`: Only visible to the mentee and associated mentor
- `donation_receipts`: Only visible to the donor (mentee)

## Authentication Architecture

### Supabase SSR Pattern

**Three separate Supabase client types:**

1. **Browser Client** (`src/lib/supabase/client.ts`)
   - Used in Client Components (`'use client'`)
   - Cookie-based session management

2. **Server Client** (`src/lib/supabase/server.ts`)
   - Used in Server Components and Server Actions
   - Reads cookies via Next.js `cookies()`

3. **Middleware Client** (`src/lib/supabase/middleware.ts`)
   - Used in `src/middleware.ts`
   - Refreshes session on every request
   - Protects `/dashboard/*` routes (redirects to `/auth/login` if unauthenticated)

**IMPORTANT**: Always use the correct client type based on context:
- Client Components → `@/lib/supabase/client`
- Server Components/Actions → `@/lib/supabase/server`
- Middleware → `@/lib/supabase/middleware`

### Auto-Profile Creation

When a user signs up (via Google OAuth or email/password), a database trigger automatically creates a `profiles` record:
```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## App Router Structure

### Route Groups

```
src/app/
├── (public)/          # Public pages with Header + Footer
│   ├── layout.tsx     # Shared layout for public routes
│   ├── mentors/       # Mentor listing and detail pages
│   └── impact/        # Impact dashboard (planned)
├── (auth)/            # Authentication pages
│   ├── layout.tsx     # Centered layout for auth forms
│   ├── login/
│   └── signup/
├── (dashboard)/       # Protected user dashboard (planned)
│   └── profile/       # Mentor profile management
└── auth/callback/     # OAuth callback handler
```

### Layout Inheritance

- Root `layout.tsx`: Global styles, Inter font
- `(public)/layout.tsx`: Header + Footer wrapper
- `(auth)/layout.tsx`: Centered form wrapper
- `(dashboard)/layout.tsx`: (planned) Authenticated user layout with sidebar

## Component Organization

### UI Components (`src/components/ui/`)

Built with shadcn/ui (Radix UI primitives + Tailwind):
- `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`
- Use `cn()` utility from `@/lib/utils` for className merging

### Layout Components (`src/components/layout/`)

- `header.tsx`: Main navigation (shows different UI based on auth state)
- `footer.tsx`: Site footer with links

### Feature Components

Future structure:
- `src/components/mentors/`: Mentor-related components
- `src/components/donations/`: Donation/payment components
- `src/components/impact/`: Impact dashboard components

## Key Implementation Patterns

### Server-Side Data Fetching

Mentor listing page uses Server Components with Supabase:
```typescript
const supabase = await createClient() // Server client
const { data: mentors } = await supabase
  .from('mentor_profiles')
  .select(`
    *,
    profiles:user_id (full_name, avatar_url),
    mentor_specialties(specialties(name_ko, slug))
  `)
  .eq('is_active', true)
  .eq('is_approved', true)
```

**Note**: RLS policies automatically filter results based on approval status.

### Dynamic Routes

Mentor detail page: `(public)/mentors/[id]/page.tsx`
```typescript
export default async function MentorDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params // Next.js 16 async params
  // ...
}
```

### Client-Side Forms

Authentication forms use `'use client'` with Supabase client:
```typescript
'use client'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
await supabase.auth.signInWithPassword({ email, password })
```

## Styling Conventions

- Use Tailwind utility classes
- shadcn/ui components provide consistent design system
- Color scheme: Blue primary (`blue-600`), minimal color palette
- Responsive: Mobile-first (`md:`, `lg:` breakpoints)

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=
```

## Development Phases

- [x] Phase 1: Foundation (Next.js, Supabase, DB schema)
- [x] Phase 2: Core features (Auth, Mentor listing) - In Progress
- [ ] Phase 3: Impact & Statistics dashboard
- [ ] Phase 4: Stripe payment integration
- [ ] Phase 5: Launch polish

## Important Notes

### Payment Flow (Future Implementation)

1. Mentee selects mentor session
2. Stripe Checkout Session created with `session_price_usd + processing_fee_usd`
3. Full `session_price_usd` goes to donation (100% to churches)
4. Processing fee is additional charge to mentee
5. Webhook creates `donations` record
6. 501(c)(3) receipt generated and emailed

### Mentor Approval Workflow

Mentors must be approved before appearing publicly:
1. User signs up and creates `mentor_profile`
2. Admin manually sets `is_approved = true` in Supabase Dashboard
3. Only then does the mentor appear in `/mentors` listing

### Calendar Integration

Mentors provide external calendar URLs (Calendly, Cal.com, etc.) in `calendar_url` field. Booking happens externally, not in-app.
