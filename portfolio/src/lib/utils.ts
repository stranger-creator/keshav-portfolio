// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

/** Stagger delay for lists — returns Framer Motion delay in seconds */
export function staggerDelay(index: number, base = 0.08): number {
  return index * base
}

export const EASING = {
  spring:   [0.16, 1, 0.3, 1],
  expOut:   [0.16, 1, 0.3, 1],
  expIn:    [0.7, 0, 0.84, 0],
  expInOut: [0.87, 0, 0.13, 1],
} as const

export const MOTION = {
  fadeUp: {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASING.spring } },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASING.spring } },
  },
  scale: {
    hidden:  { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASING.spring } },
  },
}
