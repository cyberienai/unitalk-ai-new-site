'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroNew } from './hero-new'
import {
  EmmaWorksSection,
  EmmaLearnsSection,
  DeployTeamSection,
  SharedContextSection,
} from './emma-story-sections'
import { AlmaOnboardingSection, DispersedIASection, MigrationBanner } from './alma-ia-sections'
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
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* 1. Header / Navigation */}
      <Navbar />

      {/* 2. Hero 2 colonnes + carte Sofia */}
      <HeroNew lang={lang} />

      {/* Story — Emma travaille */}
      <EmmaWorksSection lang={lang} />

      {/* Story — Emma apprend grâce à Alma */}
      <EmmaLearnsSection lang={lang} />

      {/* Story — Déployez toute votre équipe */}
      <DeployTeamSection lang={lang} />

      {/* Story — Tous vos collaborateurs partagent le même contexte */}
      <SharedContextSection lang={lang} />

      {/* 3. The real problem — IA dispersée + Solution Unitalk (MOVED HERE) */}
      <DispersedIASection lang={lang} />

      {/* 6. Cœur produit — 7 cards */}
      <CoreProductCards lang={lang} />

      {/* 7. AI Gateway */}
      <AIGatewaySection />

      {/* Démarrage assisté — Alma onboarding (moved above pricing) */}
      <AlmaOnboardingSection lang={lang} />

      {/* 8. Offres Solo / Teams / Business */}
      <OffersSection />

      {/* Migration banner — reassurance for OpenClaw / Hermes users, right after pricing */}
      <MigrationBanner lang={lang} />

      {/* 9. Souveraineté / réversibilité */}
      <SovereigntySection />

      {/* 10. FAQ courte */}
      <HomeFaq />

      {/* 11. CTA final */}
      <FinalCtaSection />

      {/* 12. Footer */}
      <SiteFooter />
    </div>
  )
}
