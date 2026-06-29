'use client'
// src/components/ui/SectionReveal.tsx
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export function SectionReveal({
  children,
  delay   = 0,
  direction = 'up',
  className = '',
  once    = true,
}: Props) {
  const initial = {
    opacity: 0,
    y:       direction === 'up'    ? 40  : 0,
    x:       direction === 'left'  ? -40 : direction === 'right' ? 40 : 0,
    scale:   direction === 'none'  ? 0.95 : 1,
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
