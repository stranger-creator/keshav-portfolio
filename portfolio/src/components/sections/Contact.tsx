'use client'
// src/components/sections/Contact.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, Linkedin, Instagram, Github, ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'
import { PERSONAL } from '@/lib/data'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

const SOCIALS = [
  { label: 'GitHub',    href: PERSONAL.github,    Icon: Github,    color: '#fff' },
  { label: 'LinkedIn',  href: PERSONAL.linkedin,  Icon: Linkedin,  color: '#0A66C2' },
  { label: 'Instagram', href: PERSONAL.instagram, Icon: Instagram, color: '#E1306C' },
  { label: 'Email',     href: `mailto:${PERSONAL.email}`, Icon: Mail, color: '#6366F1' },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setForm({ name: '', email: '', subject: '', message: '' })
    toast.success('Message sent! I\'ll reply within 24 hours.', {
      icon: '🚀',
      duration: 4000,
    })
  }

  const inputCls = `w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-3)] outline-none focus:border-accent transition-colors font-light`

  return (
    <section id="contact" className="py-28 px-6 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="sec-tag mb-4">// Contact</div>
          <h2 className="font-display font-black text-[clamp(36px,5vw,72px)] tracking-tight leading-[0.95] text-[var(--color-text)] mb-3">
            Let's Build<br />
            <span className="text-gradient">Together.</span>
          </h2>
          <p className="text-[var(--color-text-2)] font-light mb-16 max-w-lg text-[17px] leading-relaxed">
            Open to frontend roles, ASR/NLP data positions, and freelance projects.
            Response within 24 hours.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — info + socials */}
          <SectionReveal delay={0.1}>
            <div>
              {/* Contact details */}
              <div className="flex flex-col gap-3 mb-10">
                {[
                  { Icon: Mail,  label: PERSONAL.email,  href: `mailto:${PERSONAL.email}` },
                  { Icon: Phone, label: PERSONAL.phone,  href: `tel:${PERSONAL.phone.replace(/\s/g,'')}` },
                ].map(({ Icon, label, href }) => (
                  <MagneticButton key={label}>
                    <a
                      href={href}
                      className="flex items-center gap-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-5 py-4 text-[var(--color-text)] hover:border-[var(--color-border-a)] transition-all group"
                    >
                      <Icon size={18} className="text-accent flex-shrink-0" />
                      <span className="text-sm font-light">{label}</span>
                      <ArrowUpRight size={14} className="ml-auto text-[var(--color-text-3)] group-hover:text-accent transition-colors" />
                    </a>
                  </MagneticButton>
                ))}
              </div>

              {/* Social grid */}
              <div className="sec-tag mb-4">// Find Me Online</div>
              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map(({ label, href, Icon, color }) => (
                  <MagneticButton key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 hover:border-[var(--color-border-a)] transition-all group"
                    >
                      <Icon size={18} style={{ color }} className="flex-shrink-0" />
                      <span className="text-sm text-[var(--color-text-2)] group-hover:text-[var(--color-text)] transition-colors">
                        {label}
                      </span>
                    </a>
                  </MagneticButton>
                ))}
              </div>

              {/* Availability */}
              <div className="mt-8 bg-green-500/5 border border-green-500/20 rounded-xl px-5 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-400 uppercase tracking-wider">Currently Available</span>
                </div>
                <p className="text-xs text-[var(--color-text-2)] font-light">
                  Actively looking for frontend developer, ASR/NLP data, and data analytics roles.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Right — form */}
          <SectionReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
                    Your Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
                  Subject
                </label>
                <select name="subject" value={form.subject} onChange={handleChange} className={inputCls} required>
                  <option value="">Select a topic...</option>
                  <option>Frontend Developer Role</option>
                  <option>ASR / NLP Data Role</option>
                  <option>Freelance Project</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity..."
                  required
                  rows={5}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <MagneticButton>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-white font-display font-bold text-[15px] py-3.5 rounded-lg hover:bg-alight transition-colors disabled:opacity-60"
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>Send Message <Send size={15} /></>
                  )}
                </motion.button>
              </MagneticButton>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
