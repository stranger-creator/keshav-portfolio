'use client'
// src/components/ui/SmoothScroll.tsx
import { ReactNode, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

interface Props { children: ReactNode }

export function SmoothScroll({ children }: Props) {
  useEffect(() => {
    let lenis: InstanceType<typeof import('lenis').default> | null = null

    async function init() {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false })

      // Sync with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => lenis?.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    }

    init()
    return () => {
      lenis?.destroy()
      gsap.ticker.remove((time) => lenis?.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
