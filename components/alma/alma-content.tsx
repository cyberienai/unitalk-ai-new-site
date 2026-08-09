'use client'

import { Navbar } from '@/components/navbar'
import { CollabSubNav } from '@/components/collab-subnav'
import { SiteFooter } from '@/components/site-footer'
import { AlmaProvider } from '@/components/home/alma-panel-context'
import { AlmaHero } from './hero'
import { SectionComprendre } from './section-comprendre'
import { SectionPreparer } from './section-preparer'
import { SectionImpliquer } from './section-impliquer'
import { SectionTransmettre } from './section-transmettre'
import { SectionRoles } from './section-roles'
import { CtaFinal } from './cta-final'

/**
 * /alma — answers one question: "What does Alma do before, during and around
 * a mission?" A single mission (Sophie's complaint-tracking) runs through the
 * whole page: need → structured mission → method understood → Collaborator
 * assigned → team informed → expert brought in if needed. Alma prepares,
 * recommends and hands over — she never accomplishes the mission herself, is
 * never a "Customer Success IA", a manager, or a human.
 */
export function AlmaContent() {
  return (
    <AlmaProvider>
      <div className="min-h-screen bg-[#F4F1EA] text-[#1C1A17]">
        <Navbar />
        <CollabSubNav active="/alma" />

        {/* HERO — speech becomes a structured mission */}
        <AlmaHero />

        {/* 1 — understand the real work */}
        <SectionComprendre />

        {/* 2 — prepare the right Collaborator (not necessarily a new one) */}
        <SectionPreparer />

        {/* 3 — involve the teams */}
        <SectionImpliquer />

        {/* 4 — hand over to a human without making them start over (dark) */}
        <SectionTransmettre />

        {/* Synthesis — who does what */}
        <SectionRoles />

        {/* CTA */}
        <CtaFinal />

        <SiteFooter />
      </div>
    </AlmaProvider>
  )
}
