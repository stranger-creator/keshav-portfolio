import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark theme tokens
        'dark-bg':      '#07080D',
        'dark-surface': '#0E1525',
        'dark-card':    '#121C2E',
        'dark-border':  'rgba(255,255,255,0.06)',
        // Light theme
        'light-bg':      '#F4F6FF',
        'light-surface': '#FFFFFF',
        'light-card':    '#ECEFFE',
        'light-border':  'rgba(0,0,0,0.08)',
        // Accent
        accent:  '#6366F1',
        alight:  '#818CF8',
        violet:  '#A78BFA',
        teal:    '#5CF4C8',
        amber:   '#FFAE35',
        green:   '#10B981',
        // Lumen theme
        gold:    '#FFB300',
        'gold-light': '#FFD54F',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'spin-slow':   'spin 8s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'marquee':     'marquee 25s linear infinite',
        'marquee-rev': 'marquee-rev 25s linear infinite',
        'gradient':    'gradient 8s ease infinite',
        'glow':        'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          from: { transform: 'translateX(-50%)' },
          to:   { transform: 'translateX(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(99,102,241,0)' },
        },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern':     "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'spring':     'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-out':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':    'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-inout': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
}

export default config
