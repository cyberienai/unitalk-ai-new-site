'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { AlmaProvider } from './home/alma-panel-context'
import { HeroHybrid } from './home/hero-hybrid'
import { SectionDefinition } from './home/section-definition'
import { SectionProfilesEarly } from './home/section-profiles-early'
import { SectionWorkspace } from './home/section-workspace'
import { SectionComparison } from './home/section-comparison'
import { SectionVision } from './home/section-vision'
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

        {/* 2. Profiles early — Alma prepares, the Collaborator executes */}
        <SectionProfilesEarly lang={lang} />

        {/* 3. Product definition — mission, preparation, work, experience */}
        <SectionDefinition lang={lang} />

        {/* 4. Comparison — a tool vs a durable Collaborator */}
        <SectionComparison />

        {/* 5. Workspace proof — the mission thread stops at the human gate */}
        <SectionWorkspace lang={lang} />

        {/* 6. Ownership & governance — the company owns what was learned; what
             stays private vs shared by choice; then the final conversion moment */}
        <SectionVision />

        <SiteFooter />
      </div>
    </AlmaProvider>
  )
}
