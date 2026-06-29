'use client'
// src/components/sections/About.tsx
import { motion } from 'framer-motion'
import { PERSONAL } from '@/lib/data'
import { SectionReveal } from '@/components/ui/SectionReveal'

const BENTO = [
  {
    id: 'bio', span: 'lg:col-span-4 lg:row-span-2',
    render: () => (
      <div className="flex flex-col justify-center h-full">
        <div className="sec-tag mb-4">// About Me</div>
        <h2 className="font-display font-black text-[clamp(28px,4vw,42px)] tracking-tight leading-[1.1] text-[var(--color-text)] mb-4">
          Building at the intersection of<br />
          <span className="text-gradient">code and AI</span>
        </h2>
        <p className="text-[15px] text-[var(--color-text-2)] leading-relaxed font-light mb-4">{PERSONAL.bio}</p>
        <p className="text-[14px] text-[var(--color-text-2)] leading-relaxed font-light">
          When I'm not annotating audio datasets or building web apps, I'm studying for my MCA,
          exploring new JavaScript frameworks, and contributing to the open-source ecosystem.
        </p>
      </div>
    ),
  },
  {
    id: 'status', span: 'lg:col-span-2',
    render: () => (
      <div className="flex flex-col justify-between h-full">
        <div className="text-2xl mb-3">🇮🇳</div>
        <div>
          <div className="font-display font-bold text-lg text-[var(--color-text)] mb-0.5">Bengaluru</div>
          <div className="font-mono text-xs text-[var(--color-text-3)] uppercase tracking-wider">Karnataka, India</div>
        </div>
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[var(--color-border)]">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-green-400">Open to work</span>
        </div>
      </div>
    ),
  },
  {
    id: 'exp', span: 'lg:col-span-2',
    render: () => (
      <div className="flex flex-col justify-between h-full">
        <div className="font-display font-black text-5xl tracking-tight text-accent leading-none">3</div>
        <div>
          <div className="font-mono text-xs text-[var(--color-text-3)] uppercase tracking-wider mb-1">AI Companies</div>
          <div className="text-xs text-[var(--color-text-2)]">Krutrim · Transsion · Kriya NW</div>
        </div>
      </div>
    ),
  },
  {
    id: 'accuracy', span: 'lg:col-span-2',
    render: () => (
      <div className="flex flex-col justify-between h-full">
        <div className="font-display font-black text-4xl tracking-tight text-teal leading-none">99%+</div>
        <div className="font-mono text-xs text-[var(--color-text-3)] uppercase tracking-wider">Accuracy Target</div>
      </div>
    ),
  },
  {
    id: 'langs', span: 'lg:col-span-2',
    render: () => (
      <div className="flex flex-col gap-2.5">
        <div className="sec-tag mb-1">// Languages</div>
        <div className="flex gap-2">
          {['HI', 'EN'].map((l, i) => (
            <span
              key={l}
              className="font-display font-black text-lg px-3 py-1.5 rounded-lg border"
              style={{
                color:        i === 0 ? 'var(--color-accent)' : 'var(--color-teal)',
                borderColor:  i === 0 ? 'rgba(99,102,241,0.3)' : 'rgba(92,244,200,0.3)',
                background:   i === 0 ? 'rgba(99,102,241,0.08)' : 'rgba(92,244,200,0.08)',
              }}
            >
              {l}
            </span>
          ))}
        </div>
        <p className="text-xs text-[var(--color-text-3)] font-light">Hindi + English ASR datasets</p>
      </div>
    ),
  },
  {
    id: 'openTo', span: 'lg:col-span-4',
    render: () => (
      <div className="flex flex-col gap-3">
        <div className="sec-tag">// Open To</div>
        <div className="flex flex-wrap gap-2">
          {PERSONAL.openTo.map((item) => (
            <span
              key={item}
              className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--color-border-a)] text-[var(--color-alight)] bg-accent/5"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
  },
]

export function About() {
  return (
    <section id="about" className="py-28 px-6 lg:px-14 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 auto-rows-[180px]">
            {BENTO.map(({ id, span, render }, i) => (
              <motion.div
                key={id}
                className={`bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-border-a)] transition-all relative overflow-hidden group ${span}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
                {render()}
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        {/* Infinite marquee strip */}
        <SectionReveal delay={0.3}>
          <div className="mt-12 overflow-hidden border-t border-b border-[var(--color-border)] py-4">
            <div className="flex animate-marquee whitespace-nowrap gap-0">
              {Array(2).fill(null).map((_, r) => (
                <span key={r} className="flex items-center gap-0">
                  {['ASR Validation', 'Data Annotation', 'React', 'Next.js', 'TypeScript',
                    'Framer Motion', 'Supabase', 'AI Training Data', 'Hindi', 'English', 'NLP'].map((item, j) => (
                    <span key={`${r}-${j}`} className="flex items-center">
                      <span className="font-display font-bold text-sm uppercase tracking-widest text-[var(--color-text-3)] px-6">
                        {item}
                      </span>
                      <span className="text-[var(--color-border)] text-xs">✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
