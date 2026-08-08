'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'

const COPY = {
  fr: {
    title: 'Que voulez-vous rendre possible dans votre entreprise ?',
    lead: 'Décrivez le travail, le rôle ou le savoir-faire dont vous avez besoin. Alma vérifie ce qui existe déjà et recommande la bonne évolution.',
    cta: 'Parler à Alma',
    secondary: 'Explorer les missions',
  },
  en: {
    title: 'What do you want to make possible in your company?',
    lead: 'Describe the work, the role or the know-how you need. Alma checks what already exists and recommends the right evolution.',
    cta: 'Talk to Alma',
    secondary: 'Explore missions',
  },
} as const

export function CtaFinal() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]

  return (
    <section className="bg-[#1C1A17] px-6 py-20 text-[#F4F1EA] sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-5xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-[#B8B0A4]">{t.lead}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => openAlma()}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2BCD3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17] sm:w-auto"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <Link
            href="/missions"
            className="inline-flex min-h-12 items-center justify-center text-[15px] font-semibold text-[#E8DFD2] underline-offset-4 transition-colors hover:text-[#FBF9F3] hover:underline"
          >
            {t.secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
