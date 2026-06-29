'use client'
// src/components/sections/Experience.tsx
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Calendar, Briefcase } from 'lucide-react'
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '@/lib/data'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 1.2,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="py-28 px-6 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="sec-tag mb-4">// Career</div>
          <h2 className="font-display font-black text-[clamp(36px,5vw,58px)] tracking-tight leading-[1.02] text-[var(--color-text)] mb-16">
            Experience &<br />
            <span className="text-gradient">Education</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Experience Timeline */}
          <div>
            <SectionReveal>
              <h3 className="font-display font-bold text-lg text-[var(--color-text)] mb-8 flex items-center gap-2">
                <Briefcase size={18} className="text-accent" /> Work History
              </h3>
            </SectionReveal>

            <div ref={timelineRef} className="relative">
              {/* Animated vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--color-border)]">
                <div
                  ref={lineRef}
                  className="absolute inset-0 bg-gradient-to-b from-accent via-violet to-transparent origin-top"
                />
              </div>

              <div className="space-y-10 pl-10">
                {EXPERIENCE.map((exp, i) => (
                  <SectionReveal key={exp.id} delay={i * 0.1}>
                    <div className="relative group">
                      {/* Dot */}
                      <div
                        className="absolute -left-[2.65rem] top-1.5 w-3 h-3 rounded-full border-2 border-[var(--color-bg)] transition-transform duration-300 group-hover:scale-125"
                        style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}66` }}
                      />

                      {/* Card */}
                      <motion.div
                        className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-border-a)] transition-all"
                        style={{ borderLeftColor: exp.color, borderLeftWidth: '3px' }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h4 className="font-display font-bold text-[16px] text-[var(--color-text)]">
                              {exp.role}
                            </h4>
                            <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>
                              {exp.company}
                            </p>
                          </div>
                          {exp.current && (
                            <span className="flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                              Current
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3 text-[11px] font-mono text-[var(--color-text-3)]">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} /> {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={10} /> {exp.location}
                          </span>
                        </div>

                        <ul className="space-y-1.5">
                          {exp.bullets.map((b, j) => (
                            <li key={j} className="flex gap-2 text-[13px] text-[var(--color-text-2)] leading-relaxed">
                              <span
                                className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: exp.color }}
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Education + Certifications */}
          <div className="space-y-12">
            {/* Education */}
            <div>
              <SectionReveal>
                <h3 className="font-display font-bold text-lg text-[var(--color-text)] mb-6 flex items-center gap-2">
                  🎓 Education
                </h3>
              </SectionReveal>
              <div className="space-y-4">
                {EDUCATION.map((edu, i) => (
                  <SectionReveal key={edu.degree} delay={i * 0.1}>
                    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-border-a)] transition-colors relative overflow-hidden">
                      {/* Watermark */}
                      <div className="absolute top-2 right-3 font-display font-black text-6xl text-[var(--color-border)] leading-none select-none">
                        {edu.field}
                      </div>
                      <span
                        className={cn(
                          'inline-block text-[10px] font-mono px-2 py-0.5 rounded-full mb-3',
                          edu.status === 'completed'
                            ? 'bg-accent/10 text-alight border border-accent/20'
                            : 'bg-green-500/10 text-green-400 border border-green-500/20'
                        )}
                      >
                        {edu.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                      <h4 className="font-display font-bold text-[15px] text-[var(--color-text)] mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-[var(--color-text-2)] mb-1">{edu.institution}</p>
                      <p className="font-mono text-xs text-[var(--color-text-3)]">{edu.period}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <SectionReveal>
                <h3 className="font-display font-bold text-lg text-[var(--color-text)] mb-6 flex items-center gap-2">
                  🏆 Certifications
                </h3>
              </SectionReveal>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, i) => (
                  <SectionReveal key={cert.name} delay={i * 0.07}>
                    <motion.div
                      className="flex items-center gap-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 hover:border-[var(--color-border-a)] transition-all"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-xl flex-shrink-0">{cert.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-[var(--color-text)] truncate">{cert.name}</p>
                        <p className="font-mono text-[10px] text-[var(--color-text-3)]">
                          {cert.issuer} · {cert.year}
                        </p>
                      </div>
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: cert.color }}
                      />
                    </motion.div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
