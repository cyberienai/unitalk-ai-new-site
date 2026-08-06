'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroV2 } from './home-v2/hero-v2'
import { SectionThreeWays } from './home-v2/section-three-ways'
import { SectionCapabilities } from './home-v2/section-capabilities'
import { SectionVersus } from './home-v2/section-versus'
import { SectionPricingSimple } from './home-v2/section-pricing-simple'
import { FaqSection } from './faq-section'
import { SectionFinalCta } from './home-v2/section-final-cta'
import { SiteFooter } from './site-footer'

export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* Header / Navigation */}
      <Navbar />

      {/* 1. Hero — Il vous manque quelqu'un. Votre Collaborateur IA est prêt à… */}
      <HeroV2 lang={lang} />

      {/* 2. Trois façons de commencer — un point de départ pour chaque entreprise */}
      <SectionThreeWays lang={lang} />

      {/* 3. Un Collaborateur IA travaille comme un membre de votre équipe */}
      <SectionCapabilities lang={lang} />

      {/* 4. Pourquoi Unitalk ? — la différence assistant IA vs Collaborateur IA */}
      <SectionVersus lang={lang} />

      {/* 5. Une offre simple — 49 € / mois par Collaborateur IA */}
      <SectionPricingSimple lang={lang} />

      {/* 6. Questions fréquentes */}
      <FaqSection />

      {/* 7. CTA final — vos Collaborateurs IA vous appartiennent */}
      <SectionFinalCta lang={lang} />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
