'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from '../navbar'
import { HeroV2 } from './hero-v2'
import { SectionVersus } from './section-versus'
import { CollaboratorsShowcase } from '../collaborators-showcase'
import { SectionMissions } from '../home/section-missions'
import { SectionPricing } from '../home/section-pricing'
import { FaqSection } from '../faq-section'
import { SiteFooter } from '../site-footer'

export function HomeV2() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />

      {/* 1. Hook — recruter, pas s'abonner */}
      <HeroV2 lang={lang} />

      {/* 2. La rupture — logiciel vs Collaborateur IA */}
      <SectionVersus lang={lang} />

      {/* 3. Rencontrez vos Collaborateurs IA */}
      <div id="collaborateurs-ia">
        <CollaboratorsShowcase lang={lang} />
      </div>

      {/* 4. Que voulez-vous lui confier ? */}
      <div id="missions">
        <SectionMissions lang={lang} />
      </div>

      {/* 5. Un seul plan tout compris */}
      <SectionPricing lang={lang} />

      {/* Questions fréquentes */}
      <FaqSection />

      <SiteFooter />
    </div>
  )
}
