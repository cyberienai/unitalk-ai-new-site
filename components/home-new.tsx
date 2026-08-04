'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroV2 } from './home-v2/hero-v2'
import { SectionReassurance } from './home/section-reassurance'
import { SectionVersus } from './home-v2/section-versus'
import { CollaboratorsShowcase } from './collaborators-showcase'
import { SectionMissions } from './home/section-missions'
import { SectionPricing } from './home/section-pricing'
import { FaqSection } from './faq-section'
import { SiteFooter } from './site-footer'

export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* Header / Navigation */}
      <Navbar />

      {/* 1. Hero — Ne prenez pas un abonnement. Recrutez un Collaborateur IA. */}
      <HeroV2 lang={lang} />

      {/* Bande de réassurance factuelle */}
      <SectionReassurance lang={lang} />

      {/* 2. La rupture — un logiciel IA vs un Collaborateur IA (argument le plus fort, cadre tout le reste) */}
      <SectionVersus lang={lang} />

      {/* Par mission — partez du besoin à confier */}
      <div id="missions">
        <SectionMissions lang={lang} />
      </div>

      {/* Par profil — faites connaissance avec les Collaborateurs IA */}
      <div id="collaborateurs-ia">
        <CollaboratorsShowcase lang={lang} />
      </div>

      {/* 5. Tarif — un seul plan tout compris */}
      <SectionPricing lang={lang} />

      {/* 5. Questions fréquentes */}
      <FaqSection />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
