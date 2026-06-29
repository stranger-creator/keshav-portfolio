'use client'
// src/components/sections/Skills.tsx
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SKILLS } from '@/lib/data'
import type { SkillCategory } from '@/types'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { cn } from '@/lib/utils'

const CATS: { label: string; value: SkillCategory | 'all' }[] = [
  { label: 'All',         value: 'all' },
  { label: 'Frontend',    value: 'frontend' },
  { label: 'Backend',     value: 'backend' },
  { label: 'Tools',       value: 'tools' },
  { label: 'AI & Data',   value: 'ai-data' },
]

function SkillBar({ name, level, color, index }: {
  name: string; level: number; color: string; index: number
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated) {
        setAnimated(true)
        const start = performance.now()
        const dur = 1400 + index * 80
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(ease * level))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [animated, level, index])

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[var(--color-text)]">{name}</span>
        <span className="font-mono text-xs" style={{ color }}>{count}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function SkillCloud() {
  const cloudSkills = SKILLS.filter(s => s.level > 70)
  return (
    <div className="relative h-48 overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2">
        {cloudSkills.map((skill, i) => (
          <motion.span
            key={skill.name}
            className="px-3 py-1.5 rounded-full border text-xs font-mono cursor-default"
            style={{
              borderColor: `${skill.color}40`,
              color: skill.color,
              background: `${skill.color}0D`,
              fontSize: `${10 + (skill.level / 100) * 4}px`,
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 3 + (i % 5) * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
            whileHover={{ scale: 1.1, y: -6 }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />
    </div>
  )
}

// Bento cards data
const BENTO_STATS = [
  { label: 'Technologies', value: '20+', color: '#6366F1', span: '1' },
  { label: 'Accuracy Rate', value: '99%+', color: '#5CF4C8', span: '1' },
  { label: 'Certs', value: '5', color: '#A78BFA', span: '1' },
  { label: 'Months in AI', value: '18+', color: '#FFAE35', span: '1' },
]

export function Skills() {
  const [activeCat, setActiveCat] = useState<SkillCategory | 'all'>('all')

  const filtered = activeCat === 'all'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCat)

  const topSkills = SKILLS.filter(s => s.level >= 80).slice(0, 6)

  return (
    <section id="skills" className="py-28 px-6 lg:px-14 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="sec-tag mb-4">// Skills & Technologies</div>
          <h2 className="font-display font-black text-[clamp(36px,5vw,58px)] tracking-tight leading-[1.02] text-[var(--color-text)] mb-16">
            What I Work<br />
            <span className="text-gradient">With</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — skill bars + filter */}
          <div className="lg:col-span-2">
            <SectionReveal>
              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {CATS.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setActiveCat(value as SkillCategory | 'all')}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-mono border transition-all',
                      activeCat === value
                        ? 'bg-accent text-white border-accent'
                        : 'border-[var(--color-border)] text-[var(--color-text-2)] hover:border-[var(--color-border-a)]'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filtered.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <SkillBar
                      name={skill.name}
                      level={skill.level}
                      color={skill.color}
                      index={i}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </SectionReveal>
          </div>

          {/* Right — bento stats + skill cloud */}
          <div className="flex flex-col gap-4">
            <SectionReveal delay={0.2}>
              {/* Mini bento grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {BENTO_STATS.map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4 relative overflow-hidden group hover:border-[var(--color-border-a)] transition-colors"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `radial-gradient(ellipse at top left, ${color}0D, transparent)` }}
                    />
                    <div className="font-display font-black text-2xl tracking-tight" style={{ color }}>
                      {value}
                    </div>
                    <div className="text-xs font-mono text-[var(--color-text-3)] mt-1 uppercase tracking-wider">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill cloud */}
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4">
                <div className="sec-tag mb-4">// Proficient In</div>
                <SkillCloud />
              </div>

              {/* Top skills quick list */}
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4 mt-4">
                <div className="sec-tag mb-3">// Top Skills</div>
                <div className="flex flex-col gap-1.5">
                  {topSkills.map((s, i) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[var(--color-text-3)] w-4">{i + 1}.</span>
                      <span className="text-xs text-[var(--color-text)] flex-1">{s.name}</span>
                      <div className="w-16 h-1 rounded-full bg-[var(--color-border)] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.level}%`, background: s.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
