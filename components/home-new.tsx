'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { AlmaProvider } from './home/alma-panel-context'
import { HeroHome } from './home/hero-home'
import { SectionDefinition } from './home/section-definition'
import { SectionHermes } from './home/section-hermes'
import { SectionWorkspace } from './home/section-workspace'
import { SectionComparison } from './home/section-comparison'
import { SectionMissions } from './home/section-missions'
import { SectionVision } from './home/section-vision'
import { SiteFooter } from './site-footer'

/**
 * Homepage as a continuous demonstration, not a SaaS landing page.
 * A single AlmaProvider mounts one Alma panel that every "Parler à Alma" CTA
 * (hero, missions, vision) opens. Scenes alternate ivory / anthracite and the
 * "mission thread" motif recurs in the Hermes and Workspace scenes.
 */
export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <AlmaProvider>
      <div className="min-h-screen bg-[#F4F1EA] text-[#1C1A17]">
        <Navbar />

        {/* 1. Hero + product theatre (anthracite) */}
        <HeroHome lang={lang} />

        {/* 2. Product definition — three plain-language truths */}
        <SectionDefinition lang={lang} />

        {/* 3. Hermes reveal — where know-how becomes a real capability */}
        <SectionHermes lang={lang} />

        {/* 4. Workspace proof — the mission thread stops at the human gate */}
        <SectionWorkspace lang={lang} />

        {/* 5. Missions — entrust one, Alma frames it */}
        <SectionMissions />

        {/* 6. Comparison — a tool vs a durable Collaborator */}
        <SectionComparison />

        {/* 7. Vision + conversion */}
        <SectionVision />

        <SiteFooter />
      </div>
    </AlmaProvider>
  )
}
