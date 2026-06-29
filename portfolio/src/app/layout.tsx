// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Keshav Sharma — Frontend Developer & ASR Specialist',
    template: '%s | Keshav Sharma',
  },
  description:
    'Frontend developer and ASR specialist building premium web experiences and AI training datasets. Based in Bengaluru, India.',
  keywords: [
    'Keshav Sharma', 'Frontend Developer', 'React Developer', 'Next.js',
    'ASR Specialist', 'Data Annotation', 'Bengaluru', 'Portfolio',
  ],
  authors: [{ name: 'Keshav Sharma', url: 'https://github.com/keshavcreation02' }],
  creator: 'Keshav Sharma',
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         'https://keshavsharma.dev',
    title:       'Keshav Sharma — Frontend Developer & ASR Specialist',
    description: 'Premium web experiences and AI training data. Based in Bengaluru.',
    siteName:    'Keshav Sharma Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Keshav Sharma — Frontend Developer',
    description: 'Premium web experiences and AI training data.',
    images:      ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#07080D' },
    { media: '(prefers-color-scheme: light)', color: '#F4F6FF' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-dark-bg text-[var(--color-text)] antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster position="bottom-right" theme="dark" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
