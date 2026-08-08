'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'

const COPY = {
  fr: {
    title: 'Que voulez-vous rendre possible dans votre entreprise ?',
    lead: 'Expliquez votre besoin à Alma. Elle prépare la mission, implique les bonnes personnes et vérifie quel Collaborateur IA peut la prendre en charge.',
    cta: 'Parler à Alma',
    secondary: 'Explorer les missions',
    micro: '7 jours gratuits · Sans carte bancaire · Hébergé en France',
  },
  en: {
    title: 'What do you want to make possible in your company?',
    lead: 'Explain your need to Alma. It prepares the mission, involves the right people and checks which AI Collaborator can take it on.',
    cta: 'Talk to Alma',
    secondary: 'Explore missions',
    micro: '7 days free · No credit card · Hosted in France',
  },
} as const

export function CtaFinal() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]

  return (
    <section className="bg-[#F4F1EA] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#1C1A17] sm:text-[2.6rem]">
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-[#5A5348]">{t.lead}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => openAlma()}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA] sm:w-auto"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <Link
            href="/missions"
            className="inline-flex min-h-12 items-center justify-center text-[15px] font-semibold text-[#4E483F] transition-colors hover:text-[#1C1A17]"
          >
            {t.secondary}
          </Link>
        </div>

        <p className="mt-6 text-[13px] text-[#857C6E]">{t.micro}</p>
      </div>
    </section>
  )
}
