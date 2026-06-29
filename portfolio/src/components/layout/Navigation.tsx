'use client'
// src/components/layout/Navigation.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { PERSONAL } from '@/lib/data'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export function Navigation() {
  const [scrolled,    setScrolled]    = useState(false)
  const [activeId,    setActiveId]    = useState('')
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const { theme, setTheme }           = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(n => n.href.slice(1))
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 inset-x-0 z-[90] transition-all duration-300',
          scrolled
            ? 'py-0'
            : 'py-0'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            'mx-auto max-w-7xl px-6 lg:px-14 flex items-center justify-between transition-all duration-300',
            scrolled
              ? 'h-14 my-2 rounded-2xl bg-[var(--color-surface)]/90 backdrop-blur-xl border border-[var(--color-border)] shadow-xl'
              : 'h-20'
          )}
        >
          {/* Logo */}
          <MagneticButton>
            <button
              onClick={() => scrollTo('#hero')}
              className="font-display font-black text-xl tracking-[-0.06em] text-accent"
            >
              KS.
            </button>
          </MagneticButton>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              return (
                <MagneticButton key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={cn(
                      'relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors rounded-lg',
                      activeId === id
                        ? 'text-[var(--color-text)]'
                        : 'text-[var(--color-text-2)] hover:text-[var(--color-text)]'
                    )}
                  >
                    {activeId === id && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[var(--color-card)] rounded-lg border border-[var(--color-border-a)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                </MagneticButton>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Command palette trigger */}
            <MagneticButton>
              <button
                onClick={() => {
                  const ev = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
                  document.dispatchEvent(ev)
                }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-2)] hover:border-[var(--color-border-a)] transition-colors text-xs font-mono"
              >
                <Command size={12} />
                <span>⌘K</span>
              </button>
            </MagneticButton>

            {/* Theme toggle */}
            <MagneticButton>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:border-[var(--color-border-a)] transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </MagneticButton>

            {/* Hire me */}
            <MagneticButton>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="hidden md:inline-flex items-center gap-1.5 bg-accent text-white font-display font-bold text-xs px-4 py-2 rounded-lg hover:bg-alight transition-colors"
              >
                Hire Me
              </a>
            </MagneticButton>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              className="md:hidden w-9 h-9 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-2)]"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[80] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav
              className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--color-surface)] border-l border-[var(--color-border)] p-8 flex flex-col gap-2 pt-24"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="text-left py-3 px-4 rounded-xl font-display font-bold text-lg text-[var(--color-text)] hover:bg-[var(--color-card)] transition-colors"
                >
                  {label}
                </button>
              ))}
              <a
                href={`mailto:${PERSONAL.email}`}
                className="mt-4 text-center bg-accent text-white font-display font-bold py-3 rounded-xl"
              >
                Hire Me
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
