// src/types/index.ts

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  longDescription: string
  heroColor: string
  heroGradient: string
  emoji: string
  tags: string[]
  category: ProjectCategory
  features: string[]
  challenges: string[]
  solutions: string[]
  results: string[]
  github?: string
  live?: string
  status: 'live' | 'in-progress' | 'completed'
  year: string
  featured: boolean
  type: 'flagship' | 'featured' | 'mini'
}

export type ProjectCategory = 'all' | 'frontend' | 'fullstack' | 'ai-ml' | 'tools' | 'mobile'

export interface Skill {
  name: string
  level: number        // 0–100
  category: SkillCategory
  icon?: string
  color: string
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'design' | 'ai-data'

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  type: 'full-time' | 'part-time' | 'freelance' | 'internship'
  description: string
  bullets: string[]
  color: string
  logo?: string
  current: boolean
}

export interface Education {
  degree: string
  field: string
  institution: string
  period: string
  status: 'completed' | 'in-progress'
  grade?: string
  highlights?: string[]
}

export interface Certification {
  name: string
  issuer: string
  year: string
  color: string
  icon: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  fork: boolean
}

export interface NavItem {
  label: string
  href: string
  shortcut?: string
}

export interface CommandItem {
  id: string
  title: string
  description?: string
  href?: string
  action?: () => void
  icon?: string
  category: 'navigation' | 'projects' | 'social' | 'actions'
}
