# Keshav Sharma — Premium Portfolio

> Built with Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · GSAP

Award-winning portfolio inspired by Linear, Vercel, Stripe, Framer, and Awwwards.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, ThemeProvider
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Design tokens, grain, base styles
│
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx  # Sticky nav, scroll pill, mobile drawer, ⌘K trigger
│   │   └── Footer.tsx      # Socials, quick links, copyright
│   │
│   ├── sections/
│   │   ├── Hero.tsx        # Particle canvas, typing effect, GSAP char reveal
│   │   ├── About.tsx       # Bento grid, infinite marquee
│   │   ├── Projects.tsx    # Filter tabs, 3D tilt cards, case-study modal
│   │   ├── Skills.tsx      # Bento stats, animated bars, skill cloud
│   │   ├── Experience.tsx  # GSAP scroll timeline, education, certs
│   │   └── Contact.tsx     # Magnetic form, social links, toast feedback
│   │
│   └── ui/
│       ├── CustomCursor.tsx    # Framer Motion dot + lagged ring
│       ├── LoadingScreen.tsx   # Clip-path curtain wipe loader
│       ├── CommandPalette.tsx  # ⌘K spotlight search
│       ├── MagneticButton.tsx  # Spring-based magnetic hover
│       ├── TiltCard.tsx        # 3D perspective tilt on mouse move
│       ├── SectionReveal.tsx   # whileInView fade-up wrapper
│       └── SmoothScroll.tsx    # Lenis + GSAP ScrollTrigger sync
│
├── lib/
│   ├── data.ts             # All projects, skills, experience data
│   ├── github.ts           # GitHub API fetcher with ISR caching
│   └── utils.ts            # cn(), clamp(), lerp(), motion presets
│
├── hooks/
│   ├── useMousePosition.ts
│   ├── useScrollProgress.ts
│   └── (useLenis lives inside SmoothScroll.tsx)
│
└── types/
    └── index.ts            # Project, Skill, Experience, Education interfaces
```

---

## 🎨 Design System

### Colour Tokens (CSS variables in globals.css)
| Token | Dark | Light |
|---|---|---|
| `--color-bg` | `#07080D` | `#F4F6FF` |
| `--color-surface` | `#0E1525` | `#FFFFFF` |
| `--color-card` | `#121C2E` | `#ECEFFE` |
| `--color-accent` | `#6366F1` | `#4F52D9` |
| `--color-violet` | `#A78BFA` | — |
| `--color-teal` | `#5CF4C8` | — |

### Typography
| Role | Font | Weight |
|---|---|---|
| Display / headings | Syne | 800 |
| Body text | Inter | 300–500 |
| Code / labels | JetBrains Mono | 400–500 |

---

## 🔧 Customisation

### 1. Update your data
Edit `src/lib/data.ts` — all projects, skills, experience, education, and personal info live here. Zero other files need changing for content updates.

### 2. Add a project
```typescript
// src/lib/data.ts
{
  id: 'my-project',
  title: 'My New Project',
  tagline: 'One-line hook',
  description: '2–3 sentence overview.',
  longDescription: 'Full case-study narrative...',
  heroColor: '#FF6B6B',
  heroGradient: 'from-[#1A0000] via-[#2D0000] to-[#07080D]',
  emoji: '🚀',
  tags: ['React', 'TypeScript', 'Supabase'],
  category: 'fullstack',            // 'frontend' | 'fullstack' | 'ai-ml' | 'tools'
  features: ['...'],
  challenges: ['...'],
  solutions: ['...'],
  results: ['...'],
  github: 'https://github.com/...',
  live: 'https://...',
  status: 'completed',              // 'live' | 'in-progress' | 'completed'
  year: '2026',
  featured: true,
  type: 'featured',                 // 'flagship' | 'featured' | 'mini'
}
```

### 3. Change accent colour
```css
/* src/app/globals.css */
:root { --color-accent: #YOUR_COLOR; }
```

### 4. Enable GitHub API (higher rate limits)
```env
# .env.local
GITHUB_TOKEN=ghp_your_personal_access_token
```

---

## 🚀 Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel --prod
```
Set `GITHUB_TOKEN` in Vercel dashboard → Project → Settings → Environment Variables.

### Other platforms (Netlify, Railway, Render)
```bash
npm run build
# Upload the .next/ output directory
```

---

## ✨ Premium Features Checklist

| Feature | Status |
|---|---|
| Custom cursor (dot + lagged ring) | ✅ |
| Loading screen (clip-path wipe) | ✅ |
| WebGL / Canvas particle field | ✅ |
| GSAP character-split text reveal | ✅ |
| Typing effect with multiple roles | ✅ |
| Infinite marquee | ✅ |
| Command palette (⌘K) | ✅ |
| Dark / Light theme | ✅ |
| Lenis smooth scrolling | ✅ |
| Framer Motion scroll reveals | ✅ |
| Magnetic buttons | ✅ |
| 3D tilt cards | ✅ |
| Project case-study modal | ✅ |
| Project category filter | ✅ |
| Animated skill bars + counters | ✅ |
| GSAP scroll timeline | ✅ |
| Bento grid layouts | ✅ |
| GitHub API integration (ISR) | ✅ |
| SEO metadata + OG image | ✅ |
| Mobile-first responsive | ✅ |
| Grain texture overlay | ✅ |
| Toast notifications | ✅ |

---

## 📊 Performance Notes (Lighthouse 95+)

- `next/font` — zero layout shift from fonts
- ISR on GitHub API — fresh data, static speed
- `once: true` on all scroll animations — no re-triggers
- Canvas particle field — `requestAnimationFrame` with object pooling
- Lazy motion imports via dynamic components where possible
- `optimizePackageImports` in next.config.ts for Framer Motion + GSAP

---

*Built by Keshav Sharma · keshavcreation02 · Bengaluru 2026*
