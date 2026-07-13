'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroNew } from './hero-new'
import { AnatomySection } from './anatomy-section'
import {
  EmmaWorksSection,
  EmmaLearnsSection,
  DeployTeamSection,
  SharedContextSection,
} from './emma-story-sections'
import { AlmaOnboardingSection, DispersedIASection, MigrationBanner } from './alma-ia-sections'
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

      {/* 2. Hero — "Ils travaillent" */}
      <HeroNew lang={lang} />

      {/* Ils possèdent — anatomie d'un collaborateur (identité / outils / mémoire / intelligence) */}
      <AnatomySection lang={lang} />

      {/* Ils travaillent — une vraie journée de travail */}
      <EmmaWorksSection lang={lang} />

      {/* Ils sont une équipe — déployez autant de collaborateurs que nécessaire */}
      <DeployTeamSection lang={lang} />

      {/* Ils collaborent — humains et agents, un même annuaire */}
      <SharedContextSection lang={lang} />

      {/* Ils naissent avec Alma — apprentissage puis onboarding guidé */}
      <EmmaLearnsSection lang={lang} />
      <AlmaOnboardingSection lang={lang} />

      {/* Ils vivent chez vous — souveraineté / serveur privé */}
      <SovereigntySection />

      {/* Le contraste — l'IA dispersée, chacun pour soi */}
      <DispersedIASection lang={lang} />

      {/* AI Gateway */}
      <AIGatewaySection />

      {/* Offres Solo / Teams / Business */}
      <OffersSection />

      {/* Migration banner — reassurance for OpenClaw / Hermes users, right after pricing */}
      <MigrationBanner lang={lang} />

      {/* FAQ courte */}
      <HomeFaq />

      {/* 11. CTA final */}
      <FinalCtaSection />

      {/* 12. Footer */}
      <SiteFooter />
    </div>
  )
}
