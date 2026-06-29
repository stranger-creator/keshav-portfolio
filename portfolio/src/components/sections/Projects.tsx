'use client'
// src/components/sections/Projects.tsx
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, ChevronRight } from 'lucide-react'
import { PROJECTS } from '@/lib/data'
import type { Project, ProjectCategory } from '@/types'
import { TiltCard } from '@/components/ui/TiltCard'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

const FILTERS: { label: string; value: ProjectCategory }[] = [
  { label: 'All',        value: 'all' },
  { label: 'Frontend',   value: 'frontend' },
  { label: 'Full-Stack', value: 'fullstack' },
  { label: 'AI / ML',   value: 'ai-ml' },
  { label: 'Tools',      value: 'tools' },
]

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <TiltCard>
      <motion.article
        layout
        onClick={onClick}
        className="project-card relative bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden cursor-pointer group h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top gradient bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${project.heroColor}88, transparent)` }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${project.heroColor}10, transparent 60%)`,
          }}
        />

        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <span className="text-3xl">{project.emoji}</span>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-[var(--color-text-2)] hover:text-[var(--color-text)] transition-colors"
                >
                  <Github size={16} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-[var(--color-text-2)] hover:text-[var(--color-text)] transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-[17px] text-[var(--color-text)] mb-1.5 leading-tight">
            {project.title}
          </h3>
          <p className="text-xs text-[var(--color-text-2)] mb-3 font-mono">{project.tagline}</p>
          <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed line-clamp-2 mb-4 font-light flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-2)]"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] font-mono px-2 py-0.5 text-[var(--color-text-3)]">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
            <span
              className={cn(
                'text-[10px] font-mono px-2 py-0.5 rounded-full',
                project.status === 'live'        && 'bg-green-500/10 text-green-400',
                project.status === 'in-progress' && 'bg-amber-500/10 text-amber-400',
                project.status === 'completed'   && 'bg-accent/10 text-alight',
              )}
            >
              {project.status === 'in-progress' ? 'In Progress' : project.status === 'live' ? 'Live' : 'Completed'}
            </span>
            <span className="text-[10px] font-mono text-[var(--color-text-3)]">{project.year}</span>
          </div>
        </div>

        {/* Case-study CTA */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[var(--color-card)] to-transparent flex items-end justify-center pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-mono text-accent flex items-center gap-1">
            View Case Study <ChevronRight size={12} />
          </span>
        </div>
      </motion.article>
    </TiltCard>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] z-10"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Hero strip */}
        <div
          className={`relative h-40 bg-gradient-to-br ${project.heroGradient} flex items-end p-6 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <div className="text-4xl mb-2">{project.emoji}</div>
            <h2 className="font-display font-black text-2xl text-white tracking-tight leading-none">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-[var(--color-text-2)] leading-relaxed font-light">{project.longDescription}</p>

          {/* Tech stack */}
          <div>
            <h3 className="sec-tag mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-alight"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3-col: features / challenges / solutions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Features',    items: project.features,   color: 'text-teal' },
              { title: 'Challenges',  items: project.challenges, color: 'text-amber-400' },
              { title: 'Solutions',   items: project.solutions,  color: 'text-violet' },
            ].map(({ title, items, color }) => (
              <div key={title} className="bg-[var(--color-card)] rounded-xl p-4 border border-[var(--color-border)]">
                <div className={`sec-tag mb-3 ${color}`}>{title}</div>
                <ul className="space-y-1.5">
                  {items.map((item, i) => (
                    <li key={i} className="text-[12px] text-[var(--color-text-2)] flex gap-2 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Results */}
          <div>
            <h3 className="sec-tag mb-3">Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.results.map((result, i) => (
                <div
                  key={i}
                  className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-3 text-[12px] text-[var(--color-text-2)] leading-relaxed"
                >
                  ✦ {result}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white font-display font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-alight transition-colors"
              >
                <Github size={15} /> View on GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] font-display font-medium text-sm px-5 py-2.5 rounded-lg hover:border-[var(--color-border-a)] transition-colors"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = PROJECTS.filter(
    (p) => filter === 'all' || p.category === filter
  )
  const flagship = filtered.filter((p) => p.type === 'flagship')
  const featured  = filtered.filter((p) => p.type === 'featured')
  const mini      = filtered.filter((p) => p.type === 'mini')

  return (
    <section id="projects" className="py-28 px-6 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="sec-tag mb-4">// Featured Work</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-black text-[clamp(36px,5vw,60px)] leading-[1.02] tracking-tight text-[var(--color-text)]">
              Projects &<br />
              <span className="text-gradient">Case Studies</span>
            </h2>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(({ label, value }) => (
                <MagneticButton key={value}>
                  <button
                    onClick={() => setFilter(value)}
                    className={cn(
                      'px-4 py-1.5 rounded-full text-xs font-mono transition-all border',
                      filter === value
                        ? 'bg-accent text-white border-accent'
                        : 'border-[var(--color-border)] text-[var(--color-text-2)] hover:border-[var(--color-border-a)]'
                    )}
                  >
                    {label}
                  </button>
                </MagneticButton>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Flagship — full width */}
        <AnimatePresence mode="wait">
          {flagship.length > 0 && (
            <motion.div layout className="mb-6">
              {flagship.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
              ))}
            </motion.div>
          )}

          {/* Featured grid — 3-col */}
          {featured.length > 0 && (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
              ))}
            </motion.div>
          )}

          {/* Mini projects */}
          {mini.length > 0 && (
            <>
              <SectionReveal>
                <div className="sec-tag mb-4 mt-8">// Also Built</div>
              </SectionReveal>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mini.map((p) => (
                  <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Project modal */}
        <AnimatePresence>
          {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      </div>
    </section>
  )
}
