'use client'
// src/components/ui/CustomCursor.tsx
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const dotX    = useMotionValue(0)
  const dotY    = useMotionValue(0)
  const springX = useSpring(dotX, { stiffness: 120, damping: 14 })
  const springY = useSpring(dotY, { stiffness: 120, damping: 14 })
  const isHover = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)

    const addHover = () => {
      document.querySelectorAll('a,button,[data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => { isHover.current = true })
        el.addEventListener('mouseleave', () => { isHover.current = false })
      })
    }
    addHover()

    return () => window.removeEventListener('mousemove', move)
  }, [dotX, dotY])

  return (
    <>
      {/* Dot — exact cursor position */}
      <motion.div
        className="fixed z-[9999] top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ x: dotX, y: dotY }}
      />
      {/* Ring — lagged */}
      <motion.div
        className="fixed z-[9998] top-0 left-0 w-9 h-9 rounded-full border border-accent/40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ x: springX, y: springY }}
      />
    </>
  )
}
