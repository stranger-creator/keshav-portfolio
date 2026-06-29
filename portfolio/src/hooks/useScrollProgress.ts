// src/hooks/useScrollProgress.ts
'use client'
import { useState, useEffect, RefObject } from 'react'

export function useScrollProgress(ref?: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      if (ref?.current) {
        const { top, height } = ref.current.getBoundingClientRect()
        const p = Math.max(0, Math.min(1, (-top) / (height - window.innerHeight)))
        setProgress(p)
      } else {
        const p = window.scrollY / (document.body.scrollHeight - window.innerHeight)
        setProgress(Math.min(1, Math.max(0, p)))
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [ref])

  return progress
}
