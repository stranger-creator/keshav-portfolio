'use client'
// src/components/ui/TiltCard.tsx
import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className = '', intensity = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rx  = useMotionValue(0)
  const ry  = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 250, damping: 22, mass: 0.6 })
  const sry = useSpring(ry, { stiffness: 250, damping: 22, mass: 0.6 })

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const xPct = (e.clientX - r.left) / r.width  - 0.5
    const yPct = (e.clientY - r.top)  / r.height - 0.5
    ry.set( xPct * intensity)
    rx.set(-yPct * intensity)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      className={`${className} transform-gpu`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}
