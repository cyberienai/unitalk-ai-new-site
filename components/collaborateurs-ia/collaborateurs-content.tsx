'use client'

import { Navbar } from '@/components/navbar'
import { CollabSubNav } from '@/components/collab-subnav'
import { SiteFooter } from '@/components/site-footer'
import { AlmaProvider } from '@/components/home/alma-panel-context'
import { CollabHero } from './hero'
import { SectionAlmaMissions } from './section-alma-missions'
import { SectionContinuite } from './section-continuite'
import { SectionCollaboration } from './section-collaboration'
import { SectionCapital } from './section-capital'
import { SectionEvolution } from './section-evolution'
import { BandExperts } from './band-experts'
import { CtaFinal } from './cta-final'

/**
 * /collaborateurs-ia — the story of Lucas, a durable AI Collaborator whose
 * fiche visibly evolves. One AlmaProvider mounts a single Alma panel that
 * every "Parler à Alma" CTA opens. Scenes alternate ivory / anthracite and
 * the mission-thread motif recurs, breaking only at the human decision gate.
 */
export function CollaborateursContent() {
  return (
    <AlmaProvider>
      <div className="min-h-screen bg-[#F4F1EA] text-[#1C1A17]">
        <Navbar />
        <CollabSubNav active="/collaborateurs-ia" />

        {/* 1. Hero — the promise + the evolving fiche */}
        <CollabHero />

        {/* 2. Alma & missions — the work comes first */}
        <SectionAlmaMissions />

        {/* 3. Continuity — identity, memory, resources */}
        <SectionContinuite />

        {/* 4. Collaboration — the mission thread + human gate */}
        <SectionCollaboration />

        {/* 5. Capital — validated know-how becomes a company asset */}
        <SectionCapital />

        {/* 6. Evolution — profiles, skills, applications */}
        <SectionEvolution />

        {/* 7. Human support */}
        <BandExperts />

        {/* 8. Conversion */}
        <CtaFinal />

        <SiteFooter />
      </div>
    </AlmaProvider>
  )
}
