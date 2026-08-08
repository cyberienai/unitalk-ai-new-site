'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const COPY = {
  fr: {
    kicker: 'Accompagnement humain',
    title: 'Besoin d’aide pour organiser le travail ?',
    lead: 'Les experts Unitalk vous accompagnent pour cadrer les missions, définir les rôles, connecter les applications et organiser les validations.',
    cta: 'Découvrir les experts',
  },
  en: {
    kicker: 'Human support',
    title: 'Need help organizing the work?',
    lead: 'Unitalk experts help you frame missions, define roles, connect applications and organize validations.',
    cta: 'Meet the experts',
  },
} as const

export function BandExperts() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-b border-[#E7E0D2] bg-[#EFE9DD] px-6 py-12 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-[#E4DDCE] bg-[#F7F4ED] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.kicker}</p>
          <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#6B6459]">{t.lead}</p>
        </div>
        <Link
          href="/experts"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#1C1A17] px-6 py-3 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:bg-[#1C1A17] hover:text-[#FBF9F3]"
        >
          {t.cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  )
}
