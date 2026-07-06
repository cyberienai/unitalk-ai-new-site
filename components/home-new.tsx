'use client'

import { Navbar } from './navbar'
import { HeroNew } from './hero-new'
import { AlmaIaSections } from './alma-ia-sections'
import { CoreProductCards } from './core-product-cards'
import {
  AIGatewaySection,
  SovereigntySection,
  OffersSection,
  HomeFaq,
  FinalCtaSection,
} from './home-extra-sections'
import { SiteFooter } from './site-footer'

export function HomeNew() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* 1. Header / Navigation */}
      <Navbar />

      {/* 2 + 3. Hero 2 colonnes + carte Sofia */}
      <HeroNew lang="fr" />

      {/* 4 + 5. Alma onboarding + IA dispersée */}
      <AlmaIaSections lang="fr" />

      {/* 6. Cœur produit — 7 cards */}
      <CoreProductCards lang="fr" />

      {/* 7. AI Gateway */}
      <AIGatewaySection />

      {/* 8. Souveraineté / réversibilité */}
      <SovereigntySection />

      {/* 9. Offres Solo / Teams / Business */}
      <OffersSection />

      {/* 10. FAQ courte */}
      <HomeFaq />

      {/* 11. CTA final */}
      <FinalCtaSection />

      {/* 12. Footer */}
      <SiteFooter />
    </div>
  )
}
