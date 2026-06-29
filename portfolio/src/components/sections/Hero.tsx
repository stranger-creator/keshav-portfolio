'use client'
// src/components/sections/Hero.tsx
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { PERSONAL } from '@/lib/data'
import { MagneticButton } from '@/components/ui/MagneticButton'

const TECH_ICONS = [
  { icon: '⚛️', label: 'React',     x: '12%',  y: '22%', delay: 0 },
  { icon: '▲',  label: 'Next.js',   x: '85%',  y: '18%', delay: 0.2 },
  { icon: '🎨', label: 'Figma',     x: '8%',   y: '65%', delay: 0.4 },
  { icon: '⚡', label: 'GSAP',      x: '88%',  y: '60%', delay: 0.6 },
  { icon: '💾', label: 'Supabase',  x: '18%',  y: '80%', delay: 0.8 },
  { icon: '🔷', label: 'TypeScript',x: '80%',  y: '78%', delay: 1.0 },
]

export function Hero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const sectionRef  = useRef<HTMLElement>(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })

  // ── TYPING EFFECT ──────────────────────────────────────────
  useEffect(() => {
    const role = PERSONAL.roles[roleIdx]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIdx((prev) => (prev + 1) % PERSONAL.roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIdx])

  // ── PARTICLE CANVAS ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      x!: number; y!: number
      vx!: number; vy!: number
      r!: number;  a!: number
      constructor() { this.reset() }
      reset() {
        this.x  = Math.random() * canvas.width
        this.y  = Math.random() * canvas.height
        this.vx = (Math.random() - .5) * .3
        this.vy = (Math.random() - .5) * .3
        this.r  = Math.random() * 1.2 + .3
        this.a  = Math.random() * .25 + .05
      }
      step() {
        this.x += this.vx; this.y += this.vy
        const dx = this.x - mouseRef.current.x
        const dy = this.y - mouseRef.current.y
        const d  = Math.hypot(dx, dy)
        if (d < 90 && d > 0) { this.x += (dx/d)*1.2; this.y += (dy/d)*1.2 }
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${this.a})`
        ctx.fill()
      }
    }

    const ps = Array.from({ length: 80 }, () => new Particle())

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ps.forEach((p) => {
        ps.forEach((q) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(99,102,241,${.08*(1-d/120)})`
            ctx.lineWidth = .5; ctx.stroke()
          }
        })
        p.step(); p.draw()
      })
      animId = requestAnimationFrame(tick)
    }
    tick()

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  // ── GSAP CHAR REVEAL ───────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      '.hero-char',
      { yPercent: 105, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: 'power4.out', delay: 0.6 }
    )
    gsap.fromTo(
      '.hero-fade',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 1.4 }
    )
  }, [])

  const splitName = (word: string) =>
    word.split('').map((char, i) => (
      <span key={i} className="hero-char inline-block overflow-hidden">
        <span className="inline-block">{char}</span>
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-radial from-accent/[0.16] to-transparent pointer-events-none" />

      {/* Floating tech icons */}
      {TECH_ICONS.map(({ icon, label, x, y, delay }) => (
        <motion.div
          key={label}
          className="absolute hidden lg:flex items-center gap-2 glass rounded-xl px-3 py-2 pointer-events-none"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: delay + 1.8, duration: 0.5 },
            scale:   { delay: delay + 1.8, duration: 0.5 },
            y:       { delay: delay + 1.8, duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="text-base">{icon}</span>
          <span className="text-xs font-mono text-[var(--color-text-2)]">{label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pt-32 pb-20 w-full">
        {/* Eyebrow */}
        <motion.div
          className="hero-fade inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8"
          initial={{ opacity: 0 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-glow" />
          <span className="font-mono text-xs text-[var(--color-alight)] tracking-widest uppercase">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <h1 className="font-display font-black leading-[0.88] tracking-[-0.06em] mb-6">
          <div className="overflow-hidden">
            <div className="text-[clamp(64px,10vw,130px)] text-[var(--color-text)]">
              {splitName('KESHAV')}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="text-[clamp(64px,10vw,130px)] text-gradient">
              {splitName('SHARMA')}
            </div>
          </div>
        </h1>

        {/* Typing role */}
        <div className="hero-fade font-mono text-[clamp(14px,2vw,20px)] text-[var(--color-teal)] tracking-widest uppercase mb-6 h-8">
          <AnimatePresence mode="wait">
            <motion.span
              key={displayed}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-1"
            >
              {displayed}
              <span className="inline-block w-0.5 h-5 bg-[var(--color-teal)] animate-pulse" />
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Description */}
        <p className="hero-fade text-[clamp(14px,1.6vw,18px)] text-[var(--color-text-2)] max-w-[520px] leading-relaxed font-light mb-10">
          I build premium web experiences and annotate audio data that trains AI to understand
          human speech. Based in Bengaluru — open globally.
        </p>

        {/* CTAs */}
        <div className="hero-fade flex flex-wrap items-center gap-4 mb-16">
          <MagneticButton>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 bg-accent text-white font-display font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-alight transition-colors"
            >
              View Work <ArrowRight size={16} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] font-display font-medium text-[15px] px-8 py-3.5 rounded-lg hover:border-[var(--color-border-a)] transition-colors glass"
            >
              Get in Touch
            </Link>
          </MagneticButton>
        </div>

        {/* Stats row */}
        <div className="hero-fade flex flex-wrap gap-10 pt-8 border-t border-[var(--color-border)]">
          {[
            { v: '18mo+', l: 'AI Data Exp.' },
            { v: '3',     l: 'AI Companies' },
            { v: '99%+',  l: 'Accuracy' },
            { v: '6',     l: 'Projects Built' },
          ].map(({ v, l }) => (
            <div key={l}>
              <div className="font-mono text-2xl font-medium text-accent">{v}</div>
              <div className="text-xs text-[var(--color-text-3)] mt-1 tracking-widest uppercase">{l}</div>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-4 self-end">
            {[
              { href: PERSONAL.github,    Icon: Github,   label: 'GitHub' },
              { href: PERSONAL.linkedin,  Icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${PERSONAL.email}`, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <MagneticButton key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:border-[var(--color-border-a)] transition-all"
                >
                  <Icon size={18} />
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
        <span className="font-mono text-[10px] text-[var(--color-text-3)] tracking-widest">SCROLL</span>
      </motion.div>
    </section>
  )
}
