'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroV2 } from './home-v2/hero-v2'
import { SectionStartWebsite } from './home-v2/section-start-website'
import { CollaboratorsShowcase } from './collaborators-showcase'
import { SectionMissions } from './home/section-missions'
import { SectionCompanyMemory } from './home-v2/section-company-memory'
import { SectionEvolvesDelivers } from './home-v2/section-evolves-delivers'
import { SectionPricingSimple } from './home-v2/section-pricing-simple'
import { FaqSection } from './faq-section'
import { SectionFinalCta } from './home-v2/section-final-cta'
import { SiteFooter } from './site-footer'

type Lang = 'fr' | 'en'

// Thin "ou / or" rule between the three entry sections — reinforces that they are
// alternative ways in, not sequential steps.
function OrDivider({ lang }: { lang: Lang }) {
  return (
    <div className="bg-[#F3EFE6] px-5">
      <div className="mx-auto flex max-w-md items-center gap-4 py-9">
        <span className="h-px flex-1 bg-[#D8D0C2]" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A9284]">
          {lang === 'fr' ? 'ou' : 'or'}
        </span>
        <span className="h-px flex-1 bg-[#D8D0C2]" />
      </div>
    </div>
  )
}

// Closing line after the triptych: the three paths converge on the same memory.
function ConvergeLine({ lang }: { lang: Lang }) {
  return (
    <div className="border-t border-[#E9E2D4] bg-[#FBF9F3] px-5 py-20 sm:py-24">
      <p className="mx-auto max-w-2xl text-balance text-center font-sf text-xl font-semibold leading-snug tracking-[-0.02em] text-[#5F594F] sm:text-2xl">
        {lang === 'fr' ? (
          <>
            Peu importe par où vous commencez —{' '}
            <span className="text-[#1C1A17]">Alma construit la même mémoire d’entreprise.</span>
          </>
        ) : (
          <>
            Wherever you start,{' '}
            <span className="text-[#1C1A17]">Alma builds the same company memory.</span>
          </>
        )}
      </p>
    </div>
  )
}

export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* Header / Navigation */}
      <Navbar />

      {/* 1. Hero — Recrutez votre premier Collaborateur IA. */}
      <HeroV2 lang={lang} />

      {/* 2. Voie 1 — Si vous partez de zéro : le site web */}
      <SectionStartWebsite lang={lang} />

      <OrDivider lang={lang} />

      {/* 3. Voie 2 — Si vous avez une mission en tête */}
      <div id="missions">
        <SectionMissions lang={lang} />
      </div>

      <OrDivider lang={lang} />

      {/* 4. Voie 3 — Si vous savez déjà qui recruter */}
      <div id="collaborateurs-ia">
        <CollaboratorsShowcase lang={lang} />
      </div>

      {/* Les trois chemins convergent vers la même mémoire */}
      <ConvergeLine lang={lang} />

      {/* 5. La mémoire d'entreprise partagée par tous les Collaborateurs IA */}
      <SectionCompanyMemory lang={lang} />

      {/* 6. Le Collaborateur IA évolue et livre dans le workspace */}
      <SectionEvolvesDelivers lang={lang} />

      {/* 7. Une offre simple */}
      <SectionPricingSimple lang={lang} />

      {/* 8. Questions fréquentes */}
      <FaqSection />

      {/* 9. CTA final — vos Collaborateurs IA vous appartiennent */}
      <SectionFinalCta lang={lang} />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
