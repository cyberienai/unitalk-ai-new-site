'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroV2 } from './home-v2/hero-v2'
import { SectionReassurance } from './home/section-reassurance'
import { SectionStartWebsite } from './home-v2/section-start-website'
import { SectionCollaboratorIdentity } from './home-v2/section-collaborator-identity'
import { CollaboratorsShowcase } from './collaborators-showcase'
import { SectionMissions } from './home/section-missions'
import { SectionWorkspace } from './home-v2/section-workspace'
import { SectionAlmaTimeline } from './home-v2/section-alma-timeline'
import { SectionPricingSimple } from './home-v2/section-pricing-simple'
import { SectionVersus } from './home-v2/section-versus'
import { FaqSection } from './faq-section'
import { SectionFinalCta } from './home-v2/section-final-cta'
import { SiteFooter } from './site-footer'

export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* Header / Navigation */}
      <Navbar />

      {/* 1. Hero — Recrutez votre premier Collaborateur IA. */}
      <HeroV2 lang={lang} />

      {/* Bande de réassurance factuelle */}
      <SectionReassurance lang={lang} />

      {/* 2. Voie 1 — Commencez par le site Web de votre entreprise */}
      <SectionStartWebsite lang={lang} />

      {/* 3. Voie 2 — Explorer les missions */}
      <div id="missions">
        <SectionMissions lang={lang} />
      </div>

      {/* 4. Voie 3 — Découvrir les Collaborateurs IA */}
      <div id="collaborateurs-ia">
        <CollaboratorsShowcase lang={lang} />
      </div>

      {/* 5. De véritables Collaborateurs IA — l'identité complète */}
      <SectionCollaboratorIdentity lang={lang} />

      {/* 6. Le workspace de votre organisation */}
      <SectionWorkspace lang={lang} />

      {/* 7. Alma vous accompagne dans la durée */}
      <SectionAlmaTimeline lang={lang} />

      {/* 8. Une offre simple */}
      <SectionPricingSimple lang={lang} />

      {/* 9. Pourquoi Unitalk ? — la différence */}
      <SectionVersus lang={lang} />

      {/* 10. Questions fréquentes */}
      <FaqSection />

      {/* 11. CTA final — vos Collaborateurs IA vous appartiennent */}
      <SectionFinalCta lang={lang} />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
