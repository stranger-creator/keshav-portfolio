// src/lib/github.ts
import type { GitHubRepo } from '@/types'

const GITHUB_USERNAME = 'keshavcreation02'

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20&type=public`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 }, // ISR — revalidate every hour
      }
    )

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
    const repos: GitHubRepo[] = await res.json()

    return repos
      .filter((r) => !r.fork && r.name !== GITHUB_USERNAME)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch {
    console.error('Failed to fetch GitHub repos — falling back to empty array')
    return []
  }
}

export async function fetchGitHubUser() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
    return res.json()
  } catch {
    return null
  }
}

// Map real GitHub repo names → project IDs for overlay data
export const GITHUB_REPO_MAP: Record<string, string> = {
  'Weather-App':          'weather-app',
  'Portfolio':            'portfolio-v1',
  '-Password-Generator':  'password-generator',
  'Photo_gallery':        'photo-gallery',
  'Calculator-':          'calculator',
}
