'use client'
// src/components/layout/Footer.tsx
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react'
import { PERSONAL } from '@/lib/data'
import { MagneticButton } from '@/components/ui/MagneticButton'

const SOCIALS = [
  { Icon: Github,    href: PERSONAL.github,    label: 'GitHub' },
  { Icon: Linkedin,  href: PERSONAL.linkedin,  label: 'LinkedIn' },
  { Icon: Instagram, href: PERSONAL.instagram, label: 'Instagram' },
  { Icon: Mail,      href: `mailto:${PERSONAL.email}`, label: 'Email' },
]

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--color-border)] py-10 px-6 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo('#hero')}
              className="font-display font-black text-2xl tracking-[-0.06em] text-accent mb-2 block"
            >
              KS.
            </button>
            <p className="text-sm text-[var(--color-text-2)] font-light max-w-xs">
              Frontend Developer & ASR Specialist<br />
              based in Bengaluru, India.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="text-sm font-mono text-[var(--color-text-2)] hover:text-[var(--color-text)] transition-colors uppercase tracking-wider"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ Icon, href, label }) => (
              <MagneticButton key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:border-[var(--color-border-a)] transition-all"
                >
                  <Icon size={15} />
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[var(--color-border)]">
          <p className="font-mono text-xs text-[var(--color-text-3)]">
            © {new Date().getFullYear()} Keshav Sharma. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[var(--color-text-3)] flex items-center gap-1.5">
            Built with <Heart size={10} className="text-accent" fill="currentColor" /> using Next.js, Framer Motion & GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
