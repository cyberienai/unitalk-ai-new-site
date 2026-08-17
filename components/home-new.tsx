'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { AlmaProvider } from './home/alma-panel-context'
import { HeroHybrid } from './home/hero-hybrid'
import { SectionWorkspace } from './home/section-workspace'
import { SectionHermesVoices } from './home/section-hermes-voices'
import { HomeCollaboratorAnatomy, HomeEvolution, HomeFinalCta, HomeIntentDoors } from './home/home-final-sections'
import { SiteFooter } from './site-footer'

/**
 * Homepage as a continuous demonstration, not a SaaS landing page.
 * A single AlmaProvider mounts one Alma panel that every "Parler à Alma" CTA
 * (hero, vision) opens. Scenes alternate ivory / anthracite and the
 * "mission thread" motif recurs in the Workspace scene.
 */
export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <AlmaProvider>
      <div className="min-h-screen bg-[#F4F1EA] text-[#1C1A17]">
        <Navbar />

        {/* 1. Hero + product theatre (anthracite) */}
        <HeroHybrid lang={lang} />

        <HomeIntentDoors lang={lang} />
        <SectionWorkspace lang={lang} />
        <HomeCollaboratorAnatomy lang={lang} />
        <HomeEvolution lang={lang} />
        <SectionHermesVoices lang={lang} />
        <HomeFinalCta lang={lang} />

        <SiteFooter />
      </div>
    </AlmaProvider>
  )
}
