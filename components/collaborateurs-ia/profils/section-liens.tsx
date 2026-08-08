'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const COPY = {
  fr: {
    items: [
      {
        title: 'Développez ce qu’il sait faire.',
        lead: 'Ajoutez les méthodes précises nécessaires à ses missions.',
        cta: 'Découvrir les compétences',
        href: '/collaborateurs-ia/competences',
      },
      {
        title: 'Donnez-lui les moyens d’agir.',
        lead: 'Connectez les outils et les données nécessaires, avec des droits précis.',
        cta: 'Voir les applications',
        href: '/collaborateurs-ia/applications',
      },
      {
        title: 'Confiez-lui un travail concret.',
        lead: 'Commencez par le résultat à obtenir, même si vous ne connaissez pas encore le profil adapté.',
        cta: 'Explorer les missions',
        href: '/missions',
      },
    ],
  },
  en: {
    items: [
      {
        title: 'Grow what it can do.',
        lead: 'Add the precise methods its missions require.',
        cta: 'Explore skills',
        href: '/collaborateurs-ia/competences',
      },
      {
        title: 'Give it the means to act.',
        lead: 'Connect the tools and data it needs, with precise rights.',
        cta: 'See applications',
        href: '/collaborateurs-ia/applications',
      },
      {
        title: 'Give it concrete work.',
        lead: 'Start from the outcome you want, even if you don’t know the right profile yet.',
        cta: 'Explore missions',
        href: '/missions',
      },
    ],
  },
} as const

export function SectionLiens() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-b border-[#E7E0D2] bg-[#F4F1EA] px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {t.items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group flex flex-col rounded-2xl border border-[#E1D9C9] bg-[#FBF9F3] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D10E63]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]"
          >
            <h3 className="text-balance text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">
              {it.title}
            </h3>
            <p className="mt-2 flex-1 text-pretty text-[14px] leading-relaxed text-[#6B6459]">{it.lead}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B00C54]">
              {it.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
