'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from '../navbar'
import { HeroV2 } from '../home-v2/hero-v2'
import { SectionDemo } from './section-demo'
import { SectionWorkspace } from './section-workspace'
import { SectionPricing } from './section-pricing'
import { SectionTrust } from './section-trust'
import { SectionFaq } from './section-faq'
import { SectionFinalCta } from './section-final-cta'
import { SiteFooter } from '../site-footer'

export function HomeFinal() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar
        ctaLabel={{ fr: 'Découvrir mon Collaborateur IA', en: 'Discover my AI Collaborator' }}
        ctaShortLabel={{ fr: 'Découvrir', en: 'Discover' }}
      />

      {/* 1. Hero — Il vous manque quelqu'un. */}
      <HeroV2 lang={lang} />

      {/* 2. Démonstration produit — donnez une nouvelle expertise à Emma (interactif) */}
      <SectionDemo lang={lang} />

      {/* 3. Workspace — Emma passe à l'action */}
      <SectionWorkspace lang={lang} />

      {/* 4. Tarifs — une offre pour commencer */}
      <SectionPricing lang={lang} />

      {/* 5. Confiance — vous gardez le contrôle */}
      <SectionTrust lang={lang} />

      {/* 6. Questions essentielles */}
      <SectionFaq lang={lang} />

      {/* 7. Action finale */}
      <SectionFinalCta lang={lang} />

      <SiteFooter />
    </div>
  )
}
