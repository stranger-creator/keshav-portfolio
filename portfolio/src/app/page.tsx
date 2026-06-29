// src/app/page.tsx
import { Navigation }   from '@/components/layout/Navigation'
import { Footer }       from '@/components/layout/Footer'
import { Hero }         from '@/components/sections/Hero'
import { About }        from '@/components/sections/About'
import { Projects }     from '@/components/sections/Projects'
import { Skills }       from '@/components/sections/Skills'
import { Experience }   from '@/components/sections/Experience'
import { Contact }      from '@/components/sections/Contact'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { CustomCursor }  from '@/components/ui/CustomCursor'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { SmoothScroll }  from '@/components/ui/SmoothScroll'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <CommandPalette />
      <SmoothScroll>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
