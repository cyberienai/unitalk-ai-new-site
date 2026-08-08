'use client'

import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'

const COPY = {
  fr: {
    title: 'Quelle responsabilité voulez-vous confier durablement ?',
    lead: 'Décrivez le rôle attendu. Alma vérifie les profils existants et prépare la variante adaptée à votre entreprise.',
    cta: 'Parler à Alma',
    secondary: 'Explorer les profils métier',
  },
  en: {
    title: 'Which responsibility do you want to hand over for good?',
    lead: 'Describe the role you expect. Alma checks existing profiles and prepares the variant adapted to your company.',
    cta: 'Talk to Alma',
    secondary: 'Explore job profiles',
  },
} as const

export function CtaFinal() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]

  return (
    <section className="bg-[#1C1A17] px-6 py-20 text-center sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#F4F1EA] sm:text-4xl md:text-[2.8rem]">
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-[#B8B0A4]">{t.lead}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => openAlma()}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17] sm:w-auto"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <a
            href="#catalogue"
            className="inline-flex min-h-12 items-center justify-center text-[15px] font-semibold text-[#D4CCBE] transition-colors hover:text-[#F4F1EA]"
          >
            {t.secondary}
          </a>
        </div>
      </div>
    </section>
  )
}
