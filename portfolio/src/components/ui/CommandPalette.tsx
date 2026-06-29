'use client'
// src/components/ui/CommandPalette.tsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Github, Linkedin, Mail, X } from 'lucide-react'
import { PROJECTS, PERSONAL } from '@/lib/data'

interface Item { id: string; label: string; sub?: string; icon: React.ReactNode; action: () => void }

export function CommandPalette() {
  const [open,  setOpen]  = useState(false)
  const [query, setQuery] = useState('')
  const [idx,   setIdx]   = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const ALL_ITEMS: Item[] = [
    { id: 'about',      label: 'Go to About',      sub: 'Section',  icon: '👤', action: () => scrollTo('#about') },
    { id: 'projects',   label: 'Go to Projects',   sub: 'Section',  icon: '📦', action: () => scrollTo('#projects') },
    { id: 'skills',     label: 'Go to Skills',     sub: 'Section',  icon: '⚡', action: () => scrollTo('#skills') },
    { id: 'experience', label: 'Go to Experience', sub: 'Section',  icon: '💼', action: () => scrollTo('#experience') },
    { id: 'contact',    label: 'Go to Contact',    sub: 'Section',  icon: '✉️', action: () => scrollTo('#contact') },
    ...PROJECTS.slice(0, 5).map(p => ({
      id: p.id,
      label: p.title,
      sub: 'Project',
      icon: p.emoji,
      action: () => { scrollTo('#projects'); setOpen(false) },
    })),
    { id: 'github',    label: 'Open GitHub',   sub: PERSONAL.github,   icon: <Github size={14} />,   action: () => { window.open(PERSONAL.github, '_blank'); setOpen(false) } },
    { id: 'linkedin',  label: 'Open LinkedIn', sub: PERSONAL.linkedin, icon: <Linkedin size={14} />, action: () => { window.open(PERSONAL.linkedin, '_blank'); setOpen(false) } },
    { id: 'email',     label: 'Send Email',    sub: PERSONAL.email,    icon: <Mail size={14} />,     action: () => { window.open(`mailto:${PERSONAL.email}`); setOpen(false) } },
  ]

  const filtered = query.trim()
    ? ALL_ITEMS.filter(i =>
        i.label.toLowerCase().includes(query.toLowerCase()) ||
        (i.sub?.toLowerCase().includes(query.toLowerCase()))
      )
    : ALL_ITEMS

  useEffect(() => { setIdx(0) }, [query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(v => !v) }
      if (!open) return
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowDown') setIdx(v => Math.min(v + 1, filtered.length - 1))
      if (e.key === 'ArrowUp')   setIdx(v => Math.max(v - 1, 0))
      if (e.key === 'Enter') { filtered[idx]?.action(); setOpen(false) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, filtered, idx])

  useEffect(() => { if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 100) } }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setOpen(false)} />
          <motion.div
            className="relative w-full max-w-xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border)]">
              <Search size={16} className="text-[var(--color-text-3)] flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search sections, projects, links..."
                className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-3)] outline-none font-light"
              />
              <button onClick={() => setOpen(false)} className="text-[var(--color-text-3)] hover:text-[var(--color-text)]">
                <X size={14} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-[var(--color-text-3)] py-8">No results found.</p>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => { item.action(); setOpen(false) }}
                    onMouseEnter={() => setIdx(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === idx ? 'bg-accent/10' : 'hover:bg-[var(--color-card)]'}`}
                  >
                    <span className="text-base flex-shrink-0 w-5 text-center">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--color-text)] font-medium truncate">{item.label}</p>
                      {item.sub && <p className="text-[11px] text-[var(--color-text-3)] font-mono truncate">{item.sub}</p>}
                    </div>
                    <ArrowRight size={12} className="text-[var(--color-text-3)] flex-shrink-0" />
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-[var(--color-border)] flex gap-4 text-[10px] font-mono text-[var(--color-text-3)]">
              <span>↑↓ Navigate</span><span>↵ Select</span><span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
