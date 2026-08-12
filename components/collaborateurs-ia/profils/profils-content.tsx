'use client'

import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AlmaProvider } from '@/components/home/alma-panel-context'
import { ProfilsHero } from './hero'
import { SectionAlma } from './section-alma'
import { SectionDistinction } from './section-distinction'
import { SectionCatalogue } from './section-catalogue'
import { SectionPreuve } from './section-preuve'
import { SectionLiens } from './section-liens'
import { BandExperts } from '../band-experts'
import { CtaFinal } from './cta-final'

/**
 * /collaborateurs-ia/profils-metier — a dedicated page that answers one
 * question: "Which durable role should your AI Collaborator hold?" Alma sits
 * ABOVE the catalogue (never a competing tab), the catalogue lists the nine
 * real profils with search + domain filter only, and the Lucas story proves
 * that a Collaborator can hold several profils while keeping one identity.
 */
export function ProfilsContent() {
  return (
    <AlmaProvider>
      <div className="min-h-screen bg-[#F4F1EA] text-[#1C1A17]">
        <Navbar />

        {/* HERO — the question + the evolving fiche */}
        <ProfilsHero />

        {/* ALMA — describe the responsibility (above the catalogue) */}
        <SectionAlma />

        {/* DISTINCTION — profil ≠ mission ≠ compétence ≠ application */}
        <SectionDistinction />

        {/* CATALOGUE — the nine real profils, search + domain filter */}
        <SectionCatalogue />

        {/* PREUVE — several profils, one identity */}
        <SectionPreuve />

        {/* LIENS — compétences · applications · missions */}
        <SectionLiens />

        {/* EXPERTS — human support */}
        <BandExperts />

        {/* CTA */}
        <CtaFinal />

        <SiteFooter />
      </div>
    </AlmaProvider>
  )
}
