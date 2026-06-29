'use client'
// src/components/ui/LoadingScreen.tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [pct,     setPct]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    const dur   = 1800
    const tick  = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(e * 100))
      if (p < 1) requestAnimationFrame(tick)
      else setTimeout(() => setVisible(false), 300)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9000] bg-dark-bg flex flex-col items-center justify-center gap-8"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.85, ease: [0.87, 0, 0.13, 1] } }}
        >
          <motion.div
            className="font-display font-black text-6xl tracking-[-0.07em] text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            KS.
          </motion.div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-48 h-px bg-white/10 rounded overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-xs text-white/30 tracking-widest">{pct}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
